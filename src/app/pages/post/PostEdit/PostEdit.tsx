import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import { styled } from "@mui/material/styles";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import { postActions } from "../../../../redux/post/slice";
import CategorySelectors from "../../../../redux/category/selector";
import PostSelectors from "../../../../redux/post/selector";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../../../../api";
import { ApiImage } from "../../../../types/api";
import createMediaUrl from "../../../../lib/createMediaUrl";
import SimpleImage from "../../../components/SimpleImage/SimpleImage";
//
import css from "./PostEdit.module.scss";
import FileField from "../../../components/inputs/FileField/FileField";
import OgImageFields from "../../../components/OgImageFields/OgImageFields";

const Input = styled("input")({
    display: "none"
});

type Props = {};

const PostEdit: FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const categoryOptions = useSelector(CategorySelectors.getCategoryOptions);
    const isPageLoading = useSelector(PostSelectors.isPostEditPageLoading);

    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const { value: author, setValue: setAuthor } = useInput({});
    const {
        value: category,
        setValue: setCategory,
        errorText: categoryError,
        setError: setCategoryError
    } = useInput({ initialValue: "0" });
    const [ogImage, setOgImage] = useState<null | ApiImage>(null);
    const [enabled, setEnabled] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(
            postActions.initPostEditPageRequest({
                postId: Number(postId),
                cb: { setCategory, setSlug, setAuthor, setEnabled, setOgImage }
            })
        );

        return () => {
            dispatch(postActions.unmountPostEditPage());
        };
    }, []);

    const editPost = () => {
        dispatch(
            postActions.editPostRequest({
                postId: Number(postId),
                slug: slugify(slug),
                author,
                category,
                enabled,
                ogImage,
                cb: {
                    navigate,
                    setCategoryError,
                    setSlugError
                }
            })
        );
    };

    return (
        <PageWrap title="Edit Post" buttons={[]} isLoading={isPageLoading}>
            <Container maxWidth="lg" className={css["PostEdit"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        editPost();
                    }}
                >
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <TwoColumnGrid>
                                <SelectField
                                    name="post-category"
                                    labelId="category-label"
                                    label="Category"
                                    errorText={categoryError}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    choices={categoryOptions}
                                />

                                <div />

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
                            </TwoColumnGrid>
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <TwoColumnGrid>
                                <SlugField name="post-slug" slug={slug} setSlug={setSlug} slugError={slugError} />

                                <div />

                                <OgImageFields ogImage={ogImage} setOgImage={setOgImage} />
                            </TwoColumnGrid>
                        </SimpleCard>
                    </TwoColumnGrid>

                    <Button type="submit" color="success" variant="contained" className={css["button"]}>
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(PostEdit);
