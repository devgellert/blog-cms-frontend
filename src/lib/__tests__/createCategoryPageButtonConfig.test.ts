import createCategoryPageButtonConfig from "../category/createCategoryPageButtonConfig";
import { noop, isArray } from "lodash";

it("returns array", () => {
    const config = createCategoryPageButtonConfig(noop, 10);

    expect(isArray(config)).toBe(true);
});
