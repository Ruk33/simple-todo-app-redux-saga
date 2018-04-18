import { createStore } from "../store";

it("must create the store", () => {
    const store = createStore();
    expect(store).toBeDefined();
});
