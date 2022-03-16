import { PageButton } from "../../app/components/PageWrap/PageWrap";

const createCategoryPageButtonConfig = (navigate: (url: string) => void, postId: number): PageButton[] => {
    return [
        {
            text: "Create Translation",
            color: "success",
            variant: "contained",
            onClick: () => {
                navigate(`/posts/${postId}/translations/create`);
            }
        },
        {
            text: "Edit Product",
            color: "primary",
            variant: "contained",
            onClick: () => {
                navigate(`/posts/${postId}/edit`);
            }
        }
    ];
};

export default createCategoryPageButtonConfig;
