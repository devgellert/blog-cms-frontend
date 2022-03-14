import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";

type Props = {};

const Categories: FC<Props> = ({}) => {
    const navigate = useNavigate();

    return (
        <PageWrap
            title="Categories"
            buttons={[
                {
                    text: "New Category",
                    onClick: () => {
                        navigate("/categories/create");
                    },
                    color: "success"
                }
            ]}
        >
            <CategoryGrid />
        </PageWrap>
    );
};

export default memo(Categories);
