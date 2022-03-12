import { FC, memo } from "react";
import PageWrap from "../../components/PageWrap/PageWrap";
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
            <div></div>
        </PageWrap>
    );
};

export default memo(Categories);
