import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("My App works as expected", async () => {
    const user = userEvent.setup();
    const app = render(<App />);
    const textAreaForm = app.getByPlaceholderText("Enter text");
    await user.type(textAreaForm, "Hola mundo");
    const result = await app.findAllByDisplayValue(/Hello world/i, {}, { timeout: 3000 });

    expect(result).toBeTruthy();
});