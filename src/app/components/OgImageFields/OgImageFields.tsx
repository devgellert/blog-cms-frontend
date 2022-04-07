import React from "react";
import { FC, memo } from "react";
import SimpleImage from "../SimpleImage/SimpleImage";
import createMediaUrl from "../../../lib/createMediaUrl";
import FileField from "../inputs/FileField/FileField";
import api from "../../../api";
import { AxiosResponse } from "axios";
import { ApiImage } from "../../../types/api";
import { Button } from "@mui/material";
import { Setter } from "../../../types/common";
//
import css from "./OgImageFields.module.scss";

type Props = {
    ogImage: null | ApiImage;
    setOgImage: Setter<null | ApiImage>;
};

const OgImageFields: FC<Props> = ({ ogImage, setOgImage }) => {
    return (
        <div className={css["OgImageFields"]}>
            {ogImage !== null && <SimpleImage width={100} src={createMediaUrl(ogImage.fileName)} />}

            <FileField
                id="og-image-file"
                onChange={e => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    const promise = api.post("/upload-image", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    return promise.then((response: AxiosResponse<ApiImage>) => {
                        setOgImage({
                            ...response.data
                        });
                    });
                }}
                text={`${ogImage !== null ? "Change" : "Upload"} OG Image`}
            />

            {ogImage !== null && (
                <div
                    onClick={() => {
                        setOgImage(null);
                    }}
                    className={css["button-delete-og-image"]}
                >
                    <Button variant="contained" component="span" color="error">
                        Delete Og Image
                    </Button>
                </div>
            )}
        </div>
    );
};

export default memo(OgImageFields);
