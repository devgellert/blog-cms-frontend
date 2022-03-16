import React, { FormEventHandler, useEffect, useState } from "react";
import { FC, memo } from "react";
import { map, unset } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import { ApiCategory, ApiPost } from "../../../../types/api";
import api from "../../../../api";
import getAxiosFieldError from "../../../../lib/getAxiosFieldError";
import getAxiosError from "../../../../lib/getAxiosError";
import isSlugError from "../../../../lib/isSlugError";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import { uiActions } from "../../../../redux/ui/slice";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
//
import css from "./PostEdit.module.scss";

type Props = {};

const PostEdit: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const [categories, setCategories] = useState<ApiCategory[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const { value: author, setValue: setAuthor } = useInput({});
    const {
        value: category,
        setValue: setCategory,
        errorText: categoryError,
        setError: setCategoryError
    } = useInput({ initialValue: "0" });

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const { data: post }: AxiosResponse<ApiPost> = await api.get(`/posts/${postId}`);

                setSlug(post.slug);
                setCategory(post.category?.id ?? "0");
                setAuthor(post.author.id);

                const {
                    data: { items: categories }
                }: AxiosResponse<{ items: ApiCategory[] }> = await api.get("/categories?page=1&limit=1000");

                setCategories(categories);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const onSubmit: FormEventHandler = async event => {
        try {
            event.preventDefault();

            setIsLoading(true);

            setCategoryError("");
            setSlugError("");

            const normalizedCategory = category == "0" ? null : Number(category);

            const body = {
                slug: slugify(slug),
                category: normalizedCategory,
                author: author
            };

            if (body.category === null) {
                unset(body, "category");
            }

            const response: AxiosResponse<ApiCategory> = await api.put(`/posts/${postId}`, body);

            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully edited post." }));

            navigate(`/posts/${response.data.id}`);
        } catch (e) {
            setErrors(e);
            dispatch(uiActions.displaySnackbar({ type: "error", text: "Failed to edit post." }));
        } finally {
            setIsLoading(false);
        }
    };

    const setErrors = (e: any) => {
        const slugError = getAxiosFieldError(e, "slug");
        setSlugError(slugError);
        const categoryError = getAxiosFieldError(e, "category");
        setCategoryError(categoryError);

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }
    };

    const categoryChoices = map([{ id: 0, name: "-" }, ...(categories || [])], elem => ({
        value: elem.id,
        text: elem.name
    }));

    return (
        <PageWrap title="Edit Post" buttons={[]} isLoading={isLoading}>
            <Container maxWidth="lg" className={css["PostEdit"]}>
                <form onSubmit={onSubmit}>
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <SelectField
                                labelId="parent-label"
                                label="Parent"
                                errorText={categoryError}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                choices={categoryChoices}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField slug={slug} setSlug={setSlug} slugError={slugError} />
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
