import { PageButton } from "../../app/components/PageWrap/PageWrap";
import prefixRoute from "../prefixRoute";

const createCategoryPageButtonConfig = (navigate: (url: string) => void, categoryId: number): PageButton[] => {
    return [
        {
            text: "New Translation",
            color: "success",
            variant: "contained",
            onClick: () => {
                navigate(prefixRoute(`/categories/${categoryId}/translations/create`));
            }
        },
        {
            text: "Edit Category",
            color: "primary",
            variant: "contained",
            onClick: () => {
                navigate(prefixRoute(`/categories/${categoryId}/edit`));
            }
        }
    ];
};

export default createCategoryPageButtonConfig;
