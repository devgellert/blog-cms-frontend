import { FC, memo } from "react";
import { get } from "lodash";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import Grid from "../../../components/Grid/Grid";
import GridConfig from "../../../components/Grid/types/GridConfig";
import { ApiPost } from "../../../../types/api";

type Data = {
    id: number;
    slug: string;
    userEmail: string;
    category: string;
};

const gridConfig: GridConfig<Data, ApiPost> = {
    columns: [
        {
            id: "id",
            label: "Id"
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
        }
    ],
    transformer: object => {
        return {
            id: object.id,
            slug: object.slug,
            category: get(object, "category.name", "-"),
            userEmail: object.author.username
        };
    },
    apiEndpoint: "/posts"
};

type Props = {};

const Posts: FC<Props> = ({}) => {
    return (
        <PageWrap
            title="Posts"
            buttons={[
                {
                    text: "New Post",
                    onClick: () => {
                        /*TODO: implement*/
                    },
                    color: "success"
                }
            ]}
        >
            <Grid config={gridConfig} />
        </PageWrap>
    );
};

export default memo(Posts);
