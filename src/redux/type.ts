import { AppState } from "./app/types";
import { AuthState } from "./auth/types";
import { GridState } from "./grid/types";
import { CategoryState } from "./category/types";
import { UIState } from "./ui/types";
import { PostState } from "./post/types";

export type StoreState = {
    app: AppState;
    auth: AuthState;
    grid: GridState;
    category: CategoryState;
    post: PostState;
    ui: UIState;
};
