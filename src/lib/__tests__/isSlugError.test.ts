import isSlugError from "../isSlugError";

it("detects slug error", () => {
    const is = isSlugError("Some random slug error.");

    expect(is).toBe(true);
});

it("detects if not slug error", () => {
    const is = isSlugError("Some random general error.");

    expect(is).toBe(false);
});
