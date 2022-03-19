import React, { FormEventHandler, useEffect, useState } from "react";
import { FC, memo } from "react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import { ApiCategory } from "../../../../types/api";
import api from "../../../../api";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import AuthSelectors from "../../../../redux/auth/selector";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { postActions } from "../../../../redux/post/slice";
//
import css from "./PostCreate.module.scss";

const PostCreate: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const {
        value: category,
        setValue: setCategory,
        errorText: categoryError,
        setError: setCategoryError
    } = useInput({ initialValue: "0" });

    const user = useSelector(AuthSelectors.getUser);

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { items }
                }: AxiosResponse<{ items: ApiCategory[] }> = await api.get(`/categories?page=1&limit=1000`);

                setCategories(items.map(elem => ({ id: elem.id, name: elem.name })));

                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        })();
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

    const categoryChoices = map([{ id: 0, name: "-" }, ...(categories || [])], elem => ({
        value: elem.id,
        text: elem.name
    }));

    return (
        <PageWrap title="New Post" buttons={[]} isLoading={isLoading}>
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
