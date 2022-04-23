import formatDateString from "../formatDateString";

it("formats date with time correctly", () => {
    const date = formatDateString("2000-09-22T22:00");

    expect(date).toBe("2000. 09. 22. 22:00:00");
});

it("formats date correctly", () => {
    const date = formatDateString("2000-09-22T22:00", true);

    expect(date).toBe("2000. 09. 22.");
});
