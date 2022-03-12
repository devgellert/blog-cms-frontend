import { FC, memo } from "react";
import { useParams } from "react-router-dom";
//
// import css from "./style.module.scss";

type Props = {};

const Category: FC<Props> = ({}) => {
    const params = useParams();

    return <div>Category ({params.categoryId})</div>;
};

export default memo(Category);
