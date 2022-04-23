import createPostPageButtonConfig from "../post/createPostPageButtonConfig";
import { noop, isArray } from "lodash";

it("returns array", () => {
    const config = createPostPageButtonConfig(noop, 10);

    expect(isArray(config)).toBe(true);
});
