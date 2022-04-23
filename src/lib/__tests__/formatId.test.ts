import formatId from "../formatId";

it("formats id correctly with default padding", () => {
    const id = formatId(6, "P");

    expect(id).toBe("P#000006");
});

it("formats id correctly with custom padding", () => {
    const id = formatId(6, "P", 10);

    expect(id).toBe("P#0000000006");
});

it("formats id correctly with another prefix and input id", () => {
    const id = formatId(100, "C", 10);

    expect(id).toBe("C#0000000100");
});
