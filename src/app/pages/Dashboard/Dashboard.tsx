import { FC, memo } from "react";
import PageWrap from "../../components/PageWrap/PageWrap";

type Props = {};

const DashBoard: FC<Props> = ({}) => {
    return (
        <PageWrap title="Dashboard" buttons={[]}>
            <div></div>
        </PageWrap>
    );
};

export default memo(DashBoard);
