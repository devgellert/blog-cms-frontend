import React, { FormEventHandler, useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
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
//
import css from "./PostCreate.module.scss";
import PostSelectors from "../../../../redux/post/selector";

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

    useEffect(() => {
        dispatch(categoryActions.initCategoryOptionsRequest({ flow: "post-create-page" }));

        return () => {
            dispatch(postActions.unmountPostCreatePage());
        };
    }, []);

    const onSubmit: FormEventHandler = async e => {
        e.preventDefault();

        dispatch(
            postActions.createPostRequest({
                slug: slugify(slug),
                category: category == "0" ? null : Number(category),
                author: user?.id as number,
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
                <form onSubmit={onSubmit}>
                    <div className={css["input-grid"]}>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <SelectField
                                name="post-category"
                                labelId="category-label"
                                label="Category"
                                errorText={categoryError}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                choices={categoryChoices}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField name="post-slug" slug={slug} setSlug={setSlug} slugError={slugError} />
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
