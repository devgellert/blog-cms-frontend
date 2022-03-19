import React, { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
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
//
import css from "./PostEdit.module.scss";

type Props = {};

const PostEdit: FC<Props> = ({}) => {
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

    useEffect(() => {
        dispatch(
            postActions.initPostEditPageRequest({ postId: Number(postId), cb: { setCategory, setSlug, setAuthor } })
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

                            <SelectField
                                name="post-category"
                                labelId="category-label"
                                label="Category"
                                errorText={categoryError}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                choices={categoryOptions}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField name="post-slug" slug={slug} setSlug={setSlug} slugError={slugError} />
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
