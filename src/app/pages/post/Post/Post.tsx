import React from "react";
import { FC, memo } from "react";
import PageWrap from "../../../components/PageWrap/PageWrap";
import { Card, CardContent, Container } from "@mui/material";
//
// import css from "./Post.module.scss";

type Props = {};

const Post: FC<Props> = ({}) => {
    return (
        <PageWrap title="Post" isLoading={false} hasTopPadding={true} buttons={[]}>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <h1>hi</h1>
                    </CardContent>
                </Card>
            </Container>
        </PageWrap>
    );
};

export default memo(Post);
