import transformFieldError from "../transformFieldError";

it("transforms 'This value should not be null. error'", () => {
    const err = transformFieldError("This value should not be null.");

    expect(err).toBe("This value is required.");
});

it("does not transform other errors", () => {
    const err = transformFieldError("Simple error.");

    expect(err).toBe("Simple error.");
});
