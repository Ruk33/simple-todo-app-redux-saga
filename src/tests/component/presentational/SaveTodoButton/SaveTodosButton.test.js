import React from "react";
import { shallow } from "enzyme";
import { SaveTodosButton } from "../../../../component/presentational/SaveTodosButton/SaveTodosButton";

it("must render save todos button", () => {
    const button = <SaveTodosButton />;
    expect(button).toBeTruthy();
});

it("must render save todos button as button and with label 'Save ToDos'", () => {
    const button = shallow(<SaveTodosButton />);
    expect(button.type()).toBe("button");
    expect(button.text()).toBe("Save ToDos");
});

it("must call function on click", done => {
    const button = shallow(<SaveTodosButton onClick={done} />);
    button.simulate("click");
});
