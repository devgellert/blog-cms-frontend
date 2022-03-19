import React, { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import Input from "../../../components/Input/Input";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
//
import css from "./CategoryCreate.module.scss";

const CategoryCreate: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryOptions = useSelector(CategorySelectors.getCategoryOptions);
    const isPageLoading = useSelector(CategorySelectors.isCategoryCreatePageLoading);

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const {
        value: parent,
        setValue: setParent,
        errorText: parentError,
        setError: setParentError
    } = useInput({ initialValue: "0" });

    useEffect(() => {
        dispatch(categoryActions.initCategoryOptionsRequest({ flow: "category-create-page" }));

        return () => {
            dispatch(categoryActions.unmountCategoryCreatePage());
        };
    }, []);

    const createCategory = () => {
        dispatch(
            categoryActions.createCategoryRequest({
                parent: parent == "0" ? null : Number(parent),
                name,
                slug,
                cb: {
                    navigate,
                    setParentError,
                    setSlugError,
                    setNameError
                }
            })
        );
    };

    return (
        <PageWrap title="New Category" buttons={[]} isLoading={isPageLoading}>
            <Container maxWidth="lg" className={css["CategoryCreate"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        createCategory();
                    }}
                >
                    <div className={css["input-grid"]}>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <Input
                                name="category-name"
                                value={name}
                                setValue={setName}
                                label="Name"
                                errorText={nameError}
                                hasMarginBottom
                            />

                            <SelectField
                                name="category-parent"
                                labelId="parent-label"
                                label="Parent"
                                errorText={parentError}
                                value={parent}
                                onChange={e => setParent(e.target.value)}
                                choices={categoryOptions}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField name="category-slug" slug={slug} setSlug={setSlug} slugError={slugError} />
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

export default memo(CategoryCreate);
