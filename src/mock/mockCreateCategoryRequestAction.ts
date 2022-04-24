import { categoryActions } from "../redux/category/slice";

export default categoryActions.createCategoryRequest({
    slug: "slug",
    parent: null,
    name: "string",
    enabled: false,
    cb: {
        setNameError: url => {},
        setParentError: url => {},
        setSlugError: url => {},
        navigate: url => {}
    }
});
