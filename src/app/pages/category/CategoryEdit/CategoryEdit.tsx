import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import Input from "../../../components/Input/Input";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
//
import css from "./CategoryEdit.module.scss";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {};

const CategoryEdit: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const categoryOptions = useSelector(CategorySelectors.getCategoryOptions);
    const isPageLoading = useSelector(CategorySelectors.isCategoryEditPageLoading);

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const {
        value: parent,
        setValue: setParent,
        errorText: parentError,
        setError: setParentError
    } = useInput({ initialValue: "0" });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        dispatch(
            categoryActions.initCategoryEditPageRequest({
                categoryId: Number(categoryId),
                cb: { setName, setSlug, setParent, setEnabled }
            })
        );

        return () => {
            dispatch(categoryActions.unmountCategoryEditPage());
        };
    }, []);

    const editCategory = () => {
        dispatch(
            categoryActions.editCategoryRequest({
                categoryId: Number(categoryId),
                parent,
                name,
                slug: slugify(slug),
                enabled,
                cb: {
                    setNameError,
                    navigate,
                    setParentError,
                    setSlugError
                }
            })
        );
    };

    return (
        <PageWrap title="New Category" buttons={[]} isLoading={isPageLoading}>
            <Container maxWidth="lg" className={css["CategoryEdit"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        editCategory();
                    }}
                >
                    <TwoColumnGrid>
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
                            <Typography variant="h6">SEO</Typography>

                            <SlugField name="category-slug" slug={slug} setSlug={setSlug} slugError={slugError} />
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

export default memo(CategoryEdit);
