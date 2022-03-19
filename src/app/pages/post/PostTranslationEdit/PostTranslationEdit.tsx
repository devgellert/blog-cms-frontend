import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import EditorJS from "@editorjs/editorjs";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import api from "../../../../api";
import getAxiosFieldError from "../../../../lib/getAxiosFieldError";
import { uiActions } from "../../../../redux/ui/slice";
import getAxiosError from "../../../../lib/getAxiosError";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import Paper from "@mui/material/Paper";
//
import css from "./PostTranslationEdit.module.scss";
import { AxiosResponse } from "axios";
import { ApiCategoryTranslation, ApiPostTranslation } from "../../../../types/api";

type Props = {};

const EDITOR_ID = "editor";

const PostTranslationEdit: FC<Props> = ({}) => {
    const { postId, locale } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const { value: content, setValue: setContent, errorText: contentError, setError: setContentError } = useInput({});

    const editorRef = useRef<EditorJS>();

    useEffect(() => {
        if (!isLoading) {
            // @ts-ignore
            editorRef.current = new EditorJS({
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: EDITOR_ID,
                data: content ? JSON.parse(content) : {},
                placeholder: "Let`s write an awesome post!"
            });
        }
    }, [isLoading]);

    const { value: title, setValue: setTitle, errorText: titleError, setError: setTitleError } = useInput({});
    const { value: mTitle, setValue: setMTitle, errorText: mTitleError, setError: setMTitleError } = useInput({});
    const { value: mDesc, setValue: setMDesc, errorText: mDescError, setError: setMDescError } = useInput({});
    const { value: ogTitle, setValue: setOgTitle, errorText: ogTitleError, setError: setOgTitleError } = useInput({});
    const { value: ogDesc, setValue: setOgDesc, errorText: ogDescError, setError: setOgDescError } = useInput({});

    useEffect(() => {
        (async () => {
            try {
                const { data }: AxiosResponse<ApiPostTranslation> = await api.get(
                    `/posts/${postId}/translations/${locale}`
                );
                setTitle(data.title);
                setMTitle(data.metaTitle);
                setMDesc(data.metaDescription);
                setOgTitle(data.ogTitle);
                setOgDesc(data.ogDescription);
                setContent(data.content);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const onSubmit: FormEventHandler = async e => {
        try {
            e.preventDefault();

            setIsLoading(true);

            setTitleError("");
            setMTitleError("");
            setMDescError("");
            setOgTitleError("");
            setOgDescError("");

            const content = await editorRef.current?.save();
            const jsonContent = JSON.stringify(content);

            setContent(jsonContent);

            await api.put(`/posts/${postId}/translations/${locale}`, {
                title,
                metaTitle: mTitle,
                metaDescription: mDesc,
                ogTitle,
                ogDescription: ogDesc,
                content: jsonContent
            });

            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully edited translation." }));

            navigate(`/posts/${postId}`);
        } catch (e) {
            setTitleError(getAxiosFieldError(e, "title"));
            setMTitleError(getAxiosFieldError(e, "metaTitle"));
            setMDescError(getAxiosFieldError(e, "metaDescription"));
            setOgTitleError(getAxiosFieldError(e, "ogTitle"));
            setOgDescError(getAxiosFieldError(e, "ogDescription"));

            dispatch(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to edit translation."
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrap title={`#${postId} Post Locale Create`} buttons={[]} isLoading={isLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["PostTranslationEdit"]}>
                <form onSubmit={onSubmit}>
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
