import { PageButton } from "../../app/components/PageWrap/PageWrap";

const createCategoryPageButtonConfig = (navigate: (url: string) => void, categoryId: number): PageButton[] => {
    return [
        {
            text: "Create Translation",
            color: "success",
            variant: "contained",
            onClick: () => {
                navigate(`/categories/${categoryId}/translations/create`);
            }
        },
        {
            text: "Edit Category",
            color: "primary",
            variant: "contained",
            onClick: () => {
                navigate(`/categories/${categoryId}/edit`);
            }
        }
    ];
};

export default createCategoryPageButtonConfig;
