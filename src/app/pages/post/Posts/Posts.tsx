import React, { FC, memo, useState } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import Grid from "../../../components/Grid/Grid";
import GridConfig from "../../../components/Grid/types/GridConfig";
import { ApiPost } from "../../../../types/api";
import Popup from "../../../components/Popup/Popup";
import api from "../../../../api";
import { gridActions } from "../../../../redux/grid/slice";
import { uiActions } from "../../../../redux/ui/slice";
import formatDateString from "../../../../lib/formatDateString";
import prefixRoute from "../../../../lib/prefixRoute";

type Data = {
    id: number;
    slug: string;
    userEmail: string;
    category: string;
    createdAt: string;
    updatedAt: string;
};

type Props = {};

const Posts: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [removeId, setRemoveId] = useState<null | number>(null);

    const config: GridConfig<Data, ApiPost> = {
        columns: [
            {
                id: "id",
                label: ""
            },
            {
                id: "slug",
                label: "Slug"
            },
            {
                id: "userEmail",
                label: "User"
            },
            {
                id: "category",
                label: "Category"
            },
            {
                id: "createdAt",
                label: "Created At",
                format: formatDateString
            },
            {
                id: "updatedAt",
                label: "Last Updated At",
                format: formatDateString
            }
        ],
        transformer: object => {
            return {
                id: object.id,
                slug: object.slug,
                category: get(object, "category.name", "-"),
                userEmail: object.author.username,
                createdAt: object.createdAt,
                updatedAt: object.updatedAt
            };
        },
        apiEndpoint: "/posts",
        actions: [
            {
                text: "Details",
                createLink: row => {
                    return prefixRoute(`/posts/${row.id}`);
                }
            },
            {
                text: "Edit",
                createLink: row => {
                    return prefixRoute(`/posts/${row.id}/edit`);
                }
            },
            {
                text: "Delete",
                onClick: row => setRemoveId(row.id)
            }
        ]
    };

    const removeCategory = async () => {
        try {
            await api.delete(`/posts/${removeId}`);

            dispatch(
                gridActions.fetchRows({ transformer: config.transformer as any, apiEndpoint: config.apiEndpoint })
            );

            dispatch(uiActions.displaySnackbar({ type: "success", text: `Successfully removed post #${removeId}` }));
        } catch (e) {
            dispatch(uiActions.displaySnackbar({ type: "error", text: `Failed to remove post #${removeId}` }));
        } finally {
            setRemoveId(null);
        }
    };

    return (
        <PageWrap
            title="Posts"
            buttons={[
                {
                    text: "New Post",
                    onClick: () => {
                        navigate(prefixRoute(`/posts/create`));
                    },
                    color: "success"
                }
            ]}
        >
            <Grid config={config} />

            <Popup
                title={`Do you want to remove post with id: #${removeId}`}
                isOpen={removeId !== null}
                onYesClick={removeCategory}
                setIsOpen={() => setRemoveId(null)}
            />
        </PageWrap>
    );
};

export default memo(Posts);
