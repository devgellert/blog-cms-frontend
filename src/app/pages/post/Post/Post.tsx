import React, { SyntheticEvent, useEffect, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import {
    Button,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
//
import { ApiPost, ApiPostTranslation } from "../../../../types/api";
import api from "../../../../api";
import formatDateString from "../../../../lib/formatDateString";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { uiActions } from "../../../../redux/ui/slice";
//
import css from "./Post.module.scss";

type Props = {};

const Post: FC<Props> = ({}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [post, setPost] = useState<null | ApiPost>();
    const [translations, setTranslations] = useState<null | ApiPostTranslation[]>(null);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        fetchAndSetData();
    }, []);

    const fetchAndSetData = async () => {
        try {
            const { data }: AxiosResponse<ApiPost> = await api.get(`/posts/${postId}`);

            const {
                data: { items: translations }
            }: AxiosResponse<{ items: ApiPostTranslation[] }> = await api.get(`/posts/${postId}/translations`);

            setPost(data);
            setTranslations(translations);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setTab(0);
    }, [translations?.length]);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const removePostTranslation = async (locale: string) => {
        try {
            await api.delete(`/posts/${postId}/translations/${locale}`);

            fetchAndSetData();
            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully removed translation." }));
        } catch (e) {
            dispatch(uiActions.displaySnackbar({ type: "error", text: "Failed to remove translation." }));
        }
    };

    return (
        <PageWrap title="Post" isLoading={post === null} hasTopPadding={true} buttons={[]}>
            <Container maxWidth="lg" className={css["Post"]}>
                <div className={css["data-wrap"]}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">General</Typography>

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText primary={"Category"} secondary={post?.category?.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={"Created At"}
                                        secondary={post ? formatDateString(post?.createdAt) : "n/a"}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={"Last Updated At"}
                                        secondary={post ? formatDateString(post?.updatedAt) : "n/a"}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6">SEO</Typography>

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText primary={"Slug"} secondary={post?.slug} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6">Author</Typography>

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText primary={"Username"} secondary={post?.author.username} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </div>

                <Card className={css["translation-card"]}>
                    <CardContent>
                        <header className={css["card-header"]}>
                            <Typography variant="h6">Translations</Typography>

                            <Button
                                disabled
                                onClick={() => {
                                    navigate(`/posts/${postId}/translations/create`);
                                }}
                                variant="outlined"
                                color="success"
                            >
                                Create Translation
                            </Button>
                        </header>

                        {!!translations?.length && (
                            <>
                                <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                                    {translations?.map(elem => (
                                        <Tab label={elem.locale} />
                                    ))}
                                </Tabs>

                                {translations?.map((elem, index) => (
                                    <TabPanel value={tab} index={index} key={index}>
                                        <div className={css["translation-grid"]}>
                                            <List dense={false}>
                                                <Typography variant="h6">General</Typography>

                                                <ListItem>
                                                    <ListItemText primary={"Title"} secondary={elem.title} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={"Enabled"}
                                                        secondary={elem.enabled ? "Enabled" : "Disabled"}
                                                    />
                                                </ListItem>
                                            </List>

                                            <List dense={false}>
                                                <Typography variant="h6">SEO</Typography>

                                                <ListItem>
                                                    <ListItemText primary={"Meta Title"} secondary={elem.metaTitle} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={"Meta Description"}
                                                        secondary={elem.metaDescription}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={"OG Title"} secondary={elem.ogTitle} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={"OG Description"}
                                                        secondary={elem.ogDescription}
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>

                                        <Button
                                            disabled
                                            onClick={() => {
                                                navigate(`/posts/${postId}/translations/${elem.locale}/edit`);
                                            }}
                                            variant="outlined"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            disabled
                                            onClick={() => removePostTranslation(elem.locale)}
                                            variant="outlined"
                                            color={"error"}
                                            className={css["btn-remove"]}
                                        >
                                            Remove
                                        </Button>
                                    </TabPanel>
                                ))}
                            </>
                        )}

                        {!translations?.length && <Typography variant="body1">-</Typography>}
                    </CardContent>
                </Card>
            </Container>
        </PageWrap>
    );
};

export default memo(Post);
