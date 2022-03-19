import React, { useEffect, useRef } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Paper from "@mui/material/Paper";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import { postActions } from "../../../../redux/post/slice";
import PostSelectors from "../../../../redux/post/selector";
//
import css from "./PostTranslationEdit.module.scss";

type Props = {};

const EDITOR_ID = "editor";

const PostTranslationEdit: FC<Props> = ({}) => {
    const { postId, locale } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isPageLoading = useSelector(PostSelectors.isPostTranslationEditPageLoading);

    const { value: content, setValue: setContent, errorText: contentError, setError: setContentError } = useInput({});

    const editorRef = useRef<EditorJS>();

    useEffect(() => {
        if (!isPageLoading) {
            // @ts-ignore
            editorRef.current = new EditorJS({
                holder: EDITOR_ID,
                data: content ? JSON.parse(content) : {},
                placeholder: "Let`s write an awesome post!"
            });
        }
    }, [isPageLoading]);

    const { value: title, setValue: setTitle, errorText: titleError, setError: setTitleError } = useInput({});
    const { value: mTitle, setValue: setMTitle, errorText: mTitleError, setError: setMTitleError } = useInput({});
    const { value: mDesc, setValue: setMDesc, errorText: mDescError, setError: setMDescError } = useInput({});
    const { value: ogTitle, setValue: setOgTitle, errorText: ogTitleError, setError: setOgTitleError } = useInput({});
    const { value: ogDesc, setValue: setOgDesc, errorText: ogDescError, setError: setOgDescError } = useInput({});

    useEffect(() => {
        dispatch(
            postActions.initTranslationEditPageRequest({
                postId: Number(postId),
                locale: locale as string,
                cb: {
                    setTitle,
                    setOgTitle,
                    setMTitle,
                    setOgDesc,
                    setMDesc,
                    setContent
                }
            })
        );

        return () => {
            dispatch(postActions.unmountTranslationEditPage());
        };
    }, []);

    const onSubmit = async () => {
        const content = await editorRef.current?.save();

        const jsonContent = JSON.stringify(content);

        setContent(jsonContent);

        dispatch(
            postActions.editTranslationRequest({
                postId: Number(postId),
                locale: locale as string,
                content: jsonContent,
                ogTitle,
                ogDescription: ogDesc,
                title,
                metaTitle: mTitle,
                metaDescription: mDesc,
                cb: {
                    navigate,
                    setMDescError,
                    setOgDescError,
                    setMTitleError,
                    setOgTitleError,
                    setTitleError
                }
            })
        );
    };

    return (
        <PageWrap title={`#${postId} Post Locale Create`} buttons={[]} isLoading={isPageLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["PostTranslationEdit"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        onSubmit();
                    }}
                >
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6" className={css["title"]}>
                                General
                            </Typography>

                            <TwoColumnGrid>
                                <Input
                                    name="post-title"
                                    value={title}
                                    setValue={setTitle}
                                    label="Title"
                                    errorText={titleError}
                                />
                            </TwoColumnGrid>
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6" className={css["title"]}>
                                SEO
                            </Typography>

                            <TwoColumnGrid>
                                <Input
                                    name="post-meta-title"
                                    value={mTitle}
                                    setValue={setMTitle}
                                    label="Meta Title"
                                    errorText={mTitleError}
                                />
                                <Input
                                    name="post-meta-description"
                                    value={mDesc}
                                    setValue={setMDesc}
                                    label="Meta Description"
                                    errorText={mDescError}
                                />
                                <Input
                                    name="post-og-title"
                                    value={ogTitle}
                                    setValue={setOgTitle}
                                    label="OG Title"
                                    errorText={ogTitleError}
                                />
                                <Input
                                    name="post-og-description"
                                    value={ogDesc}
                                    setValue={setOgDesc}
                                    label="OG Description"
                                    errorText={ogDescError}
                                />
                            </TwoColumnGrid>
                        </SimpleCard>
                    </TwoColumnGrid>

                    <SimpleCard className={css["content-card"]}>
                        <Typography variant="h6" className={css["title"]}>
                            Content
                        </Typography>

                        <Paper id={EDITOR_ID} className={css["editor-paper"]} />
                    </SimpleCard>

                    <Button
                        type="submit"
                        onClick={onSubmit}
                        color="success"
                        variant="contained"
                        className={css["button"]}
                    >
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(PostTranslationEdit);
