import React, { useEffect, useRef, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import { Button, Container, List, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import formatDateString from "../../../../lib/formatDateString";
import TabPanel from "../../../components/TabPanel/TabPanel";
import SimpleListItem from "../../../components/SimpleListItem/SimpleListItem";
import useTranslationTabs from "../../../../lib/hooks/useTranslationTabs";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import createPostPageButtonConfig from "../../../../lib/post/createPostPageButtonConfig";
import { postActions } from "../../../../redux/post/slice";
import PostSelectors from "../../../../redux/post/selector";
//
import css from "./Post.module.scss";
import editorToolsConfig from "../../../../lib/config/editorToolsConfig";
import prefixRoute from "../../../../lib/prefixRoute";

const editorElement = <div id="editor" />;

const Post: FC = ({}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const translations = useSelector(PostSelectors.getPostTranslations);
    const post = useSelector(PostSelectors.getPost);
    const isPageLoading = useSelector(PostSelectors.isPostDetailsPageLoading);

    const { tabIndex, tabsElement } = useTranslationTabs((translations || []).map(elem => elem.locale));

    useEffect(() => {
        dispatch(postActions.fetchAndSetPostAndTranslations({ postId: Number(postId) }));

        return () => {
            dispatch(postActions.unmountPostDetailsPage());
        };
    }, []);

    const editorRef = useRef<EditorJS>();

    useEffect(() => {
        if (translations && translations.length && translations[tabIndex] && translations[tabIndex].content) {
            // @ts-ignore
            editorRef.current = new EditorJS({
                holder: "editor",
                data: JSON.parse(translations[tabIndex].content),
                readOnly: true,
                tools: editorToolsConfig
            });
        }
    }, [translations, tabIndex]);

    const removePostTranslation = async (locale: string) => {
        dispatch(
            postActions.removePostTranslationRequest({ postId: Number(postId), locale, flow: "post-details-page" })
        );
    };

    return (
        <PageWrap
            title="Post"
            isLoading={isPageLoading}
            hasTopPadding
            buttons={createPostPageButtonConfig(navigate, Number(postId))}
        >
            <Container maxWidth="lg" className={css["Post"]}>
                <TwoColumnGrid>
                    <SimpleCard>
                        <Typography variant="h6">General</Typography>

                        <List dense={false}>
                            <SimpleListItem title="Category" text={post?.category?.name || "Uncategorized"} />

                            <SimpleListItem
                                title="Created At"
                                text={post ? formatDateString(post?.createdAt) : "n/a"}
                            />

                            <SimpleListItem
                                title="Last Updated At"
                                text={post ? formatDateString(post?.updatedAt) : "n/a"}
                            />
                        </List>
                    </SimpleCard>

                    <SimpleCard>
                        <Typography variant="h6">SEO</Typography>

                        <SimpleListItem title="Slug" text={post?.slug || "n/a"} />

                        <Typography variant="h6">Author</Typography>

                        <List>
                            <SimpleListItem title="Username" text={post?.author.username || "n/a"} />
                        </List>
                    </SimpleCard>
                </TwoColumnGrid>

                <SimpleCard className={css["translation-card"]}>
                    <header className={css["card-header"]}>
                        <Typography variant="h6">Translations</Typography>

                        <Button
                            onClick={() => {
                                navigate(prefixRoute(`/posts/${postId}/translations/create`));
                            }}
                            variant="outlined"
                            color="success"
                        >
                            Create Translation
                        </Button>
                    </header>

                    {!!translations?.length && (
                        <>
                            {tabsElement}

                            {translations?.map((elem, index) => (
                                <TabPanel value={tabIndex} index={index} key={index}>
                                    <Button
                                        onClick={() => {
                                            navigate(prefixRoute(`/posts/${postId}/translations/${elem.locale}/edit`));
                                        }}
                                        variant="outlined"
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        onClick={() => removePostTranslation(elem.locale)}
                                        variant="outlined"
                                        color="error"
                                        className={css["btn-remove"]}
                                    >
                                        Remove
                                    </Button>

                                    <TwoColumnGrid>
                                        <List dense={false}>
                                            <Typography variant="h6">General</Typography>

                                            <SimpleListItem title="Title" text={elem.title} />

                                            <SimpleListItem
                                                title="Enabled"
                                                text={elem.enabled ? "Enabled" : "Disabled"}
                                            />
                                        </List>

                                        <List dense={false}>
                                            <Typography variant="h6">SEO</Typography>

                                            <SimpleListItem title="Meta Title" text={elem.metaTitle} />

                                            <SimpleListItem title="Meta Description" text={elem.metaDescription} />

                                            <SimpleListItem title="OG Title" text={elem.ogTitle} />

                                            <SimpleListItem title="OG Description" text={elem.ogDescription} />
                                        </List>
                                    </TwoColumnGrid>

                                    <Typography variant="h6">Content</Typography>

                                    {editorElement}
                                </TabPanel>
                            ))}
                        </>
                    )}

                    {!translations?.length && <Typography variant="body1">-</Typography>}
                </SimpleCard>
            </Container>
        </PageWrap>
    );
};

export default memo(Post);
