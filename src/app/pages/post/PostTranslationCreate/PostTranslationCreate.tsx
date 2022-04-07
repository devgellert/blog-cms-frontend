import React, { useEffect, useRef, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import EditorJS from "@editorjs/editorjs";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import { postActions } from "../../../../redux/post/slice";
import PostSelectors from "../../../../redux/post/selector";
import editorToolsConfig from "../../../../lib/config/editorToolsConfig";
//
import css from "./PostTranslationCreate.module.scss";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {};

const EDITOR_ID = "editor";

const PostTranslationCreate: FC<Props> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { postId } = useParams();

    const isPageLoading = useSelector(PostSelectors.isPostTranslationCreatePageLoading);

    const { value: content, setValue: setContent } = useInput({});

    const editorRef = useRef<EditorJS>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // @ts-ignore
        editorRef.current = new EditorJS({
            holder: EDITOR_ID,
            data: content ? JSON.parse(content) : {},
            placeholder: "Let`s write an awesome post!",
            tools: editorToolsConfig
        });
    }, [isPageLoading]);

    const { value: title, setValue: setTitle, errorText: titleError, setError: setTitleError } = useInput({});
    const { value: locale, setValue: setLocale, errorText: localeError, setError: setLocaleError } = useInput({});
    const { value: mTitle, setValue: setMTitle, errorText: mTitleError, setError: setMTitleError } = useInput({});
    const { value: mDesc, setValue: setMDesc, errorText: mDescError, setError: setMDescError } = useInput({});
    const { value: ogTitle, setValue: setOgTitle, errorText: ogTitleError, setError: setOgTitleError } = useInput({});
    const { value: ogDesc, setValue: setOgDesc, errorText: ogDescError, setError: setOgDescError } = useInput({});
    const [enabled, setEnabled] = useState(false);

    const createTranslation = async () => {
        const content = await editorRef.current?.save();

        const jsonContent = JSON.stringify(content);

        setContent(jsonContent);

        dispatch(
            postActions.createTranslationRequest({
                postId: Number(postId),
                locale,
                title,
                metaTitle: mTitle,
                ogTitle,
                ogDescription: ogDesc,
                content: jsonContent,
                metaDescription: mDesc,
                enabled,
                cb: {
                    setOgTitleError,
                    setTitleError,
                    setMTitleError,
                    setOgDescError,
                    setMDescError,
                    setLocaleError,
                    navigate
                }
            })
        );
    };

    return (
        <PageWrap title={`#${postId} Post Locale Create`} buttons={[]} isLoading={isPageLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["PostTranslationCreate"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        createTranslation();
                    }}
                >
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6" className={css["title"]}>
                                General
                            </Typography>

                            <Input
                                name="post-locale"
                                value={locale}
                                setValue={setLocale}
                                label="Locale"
                                errorText={localeError}
                                hasMarginBottom
                            />

                            <Input
                                name="post-title"
                                value={title}
                                setValue={setTitle}
                                label="Title"
                                errorText={titleError}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={e => {
                                            setEnabled((e.target as any)?.checked);
                                        }}
                                        checked={enabled}
                                    />
                                }
                                label="Enabled"
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6" className={css["title"]}>
                                SEO
                            </Typography>

                            <Input
                                name="post-meta-title"
                                value={mTitle}
                                setValue={setMTitle}
                                label="Meta Title"
                                errorText={mTitleError}
                                hasMarginBottom
                            />
                            <Input
                                name="post-meta-description"
                                value={mDesc}
                                setValue={setMDesc}
                                label="Meta Description"
                                errorText={mDescError}
                                hasMarginBottom
                            />
                            <Input
                                name="post-og-title"
                                value={ogTitle}
                                setValue={setOgTitle}
                                label="OG Title"
                                errorText={ogTitleError}
                                hasMarginBottom
                            />
                            <Input
                                name="post-og-description"
                                value={ogDesc}
                                setValue={setOgDesc}
                                label="OG Description"
                                errorText={ogDescError}
                            />
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
                        onClick={createTranslation}
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

export default memo(PostTranslationCreate);
