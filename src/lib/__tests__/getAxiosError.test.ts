import getAxiosError from "../getAxiosError";

it("gets correct axios error", () => {
    const err = getAxiosError({
        response: {
            data: {
                message: "test-error"
            }
        }
    });

    expect(err).toBe("test-error");
});

it("gets empty string on axios error not found", () => {
    const err = getAxiosError({});

    expect(err).toBe("");
});
