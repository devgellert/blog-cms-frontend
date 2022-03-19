import React from "react";
import { FC, memo } from "react";
import slugify from "slugify";
//
import Input from "../../Input/Input";

type Props = {
    name: string;
    slug: string;
    setSlug: (value: string) => void;
    slugError: string;
};

const SlugField: FC<Props> = ({ slug, setSlug, slugError, name }) => {
    return (
        <Input
            name={name}
            value={slug}
            setValue={setSlug}
            label="Slug"
            errorText={slugError}
            onBlur={() => setSlug(slugify(slug))}
            onKeyPressCapture={e => {
                console.log(e.key);
                if (e.key === "Enter") {
                    setSlug(slugify(slug));
                }
            }}
        />
    );
};

export default memo(SlugField);
