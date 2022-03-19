import React, { FormEventHandler, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
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
//
import css from "./PostTranslationCreate.module.scss";

type Props = {};

const PostTranslationCreate: FC<Props> = ({}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { value: title, setValue: setTitle, errorText: titleError, setError: setTitleError } = useInput({});
    const { value: locale, setValue: setLocale, errorText: localeError, setError: setLocaleError } = useInput({});
    const { value: mTitle, setValue: setMTitle, errorText: mTitleError, setError: setMTitleError } = useInput({});
    const { value: mDesc, setValue: setMDesc, errorText: mDescError, setError: setMDescError } = useInput({});
    const { value: ogTitle, setValue: setOgTitle, errorText: ogTitleError, setError: setOgTitleError } = useInput({});
    const { value: ogDesc, setValue: setOgDesc, errorText: ogDescError, setError: setOgDescError } = useInput({});

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: FormEventHandler = async e => {
        try {
            e.preventDefault();

            setIsLoading(true);

            setTitleError("");
            setLocaleError("");
            setMTitleError("");
            setMDescError("");
            setOgTitleError("");
            setOgDescError("");

            await api.post(`/posts/${postId}/translations`, {
                locale,
                title,
                metaTitle: mTitle,
                metaDescription: mDesc,
                ogTitle,
                ogDescription: ogDesc,
                content: "[]" // TODO: content
            });

            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }));

            navigate(`/posts/${postId}`);
        } catch (e) {
            setLocaleError(getAxiosFieldError(e, "locale"));
            setTitleError(getAxiosFieldError(e, "title"));
            setMTitleError(getAxiosFieldError(e, "metaTitle"));
            setMDescError(getAxiosFieldError(e, "metaDescription"));
            setOgTitleError(getAxiosFieldError(e, "ogTitle"));
            setOgDescError(getAxiosFieldError(e, "ogDescription"));

            const error = getAxiosError(e);
            if (error.includes("already exists")) {
                setLocaleError(`Locale already exists for this post.`);
            }

            dispatch(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to create translation."
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrap title={`#${postId} Post Locale Create`} buttons={[]} isLoading={isLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["PostTranslationCreate"]}>
                <form onSubmit={onSubmit}>
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6" className={css["title"]}>
                                General
                            </Typography>

                            <TwoColumnGrid>
                                <Input
                                    name="post-locale"
                                    value={locale}
                                    setValue={setLocale}
                                    label="Locale"
                                    errorText={localeError}
                                />

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

export default memo(PostTranslationCreate);
