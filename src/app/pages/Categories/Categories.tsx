import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";

const Categories: FC = () => {
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
