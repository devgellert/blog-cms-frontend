import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import AuthSelectors from "../../../../redux/auth/selector";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { postActions } from "../../../../redux/post/slice";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
import PostSelectors from "../../../../redux/post/selector";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import { ApiImage } from "../../../../types/api";
import OgImageFields from "../../../components/OgImageFields/OgImageFields";
//
import css from "./PostCreate.module.scss";

const PostCreate: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryChoices = useSelector(CategorySelectors.getCategoryOptions);
    const user = useSelector(AuthSelectors.getUser);
    const isPageLoading = useSelector(PostSelectors.isPostCreatePageLoading);

    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
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
        dispatch(categoryActions.initCategoryOptionsRequest({ flow: "post-create-page" }));

        return () => {
            dispatch(postActions.unmountPostCreatePage());
        };
    }, []);

    const createPost = () => {
        dispatch(
            postActions.createPostRequest({
                slug: slugify(slug),
                category: category === "0" || category === 0 ? null : Number(category),
                author: user?.id as number,
                enabled,
                ogImage,
                cb: {
                    setCategoryError,
                    setSlugError,
                    navigate
                }
            })
        );
    };

    return (
        <PageWrap title="New Post" buttons={[]} isLoading={isPageLoading}>
            <Container maxWidth="lg" className={css["PostCreate"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        createPost();
                    }}
                >
                    <div className={css["input-grid"]}>
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
                                    choices={categoryChoices}
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
                    </div>

                    <Button type="submit" color="success" variant="contained" className={css["button"]}>
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(PostCreate);
