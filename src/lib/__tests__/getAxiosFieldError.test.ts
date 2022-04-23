import getAxiosFieldError from "../getAxiosFieldError";

it("gets correct axios error", () => {
    const err = getAxiosFieldError(
        {
            response: {
                data: {
                    errors: {
                        children: {
                            ["test-field"]: {
                                errors: ["test-error"]
                            }
                        }
                    }
                }
            }
        },
        "test-field"
    );

    expect(err).toBe("test-error");
});

it("gets empty string on axios error not found", () => {
    const err = getAxiosFieldError({}, "test-field");

    expect(err).toBe("");
});
