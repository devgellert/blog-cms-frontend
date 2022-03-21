import { PageButton } from "../../app/components/PageWrap/PageWrap";
import prefixRoute from "../prefixRoute";

const createCategoryPageButtonConfig = (navigate: (url: string) => void, postId: number): PageButton[] => {
    return [
        {
            text: "Create Translation",
            color: "success",
            variant: "contained",
            onClick: () => {
                navigate(prefixRoute(`/posts/${postId}/translations/create`));
            }
        },
        {
            text: "Edit Post",
            color: "primary",
            variant: "contained",
            onClick: () => {
                navigate(prefixRoute(`/posts/${postId}/edit`));
            }
        }
    ];
};

export default createCategoryPageButtonConfig;
