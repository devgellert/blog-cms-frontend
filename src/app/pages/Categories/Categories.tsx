import { FC, memo } from "react";
import PageWrap from "../../components/PageWrap/PageWrap";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
//
// import css from "./style.module.scss";

type Props = {};

const Categories: FC<Props> = ({}) => {
    return (
        <PageWrap
            title="Categories"
            buttons={[
                {
                    text: "New Category",
                    onClick: () => {
                        /*TODO: implement*/
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
