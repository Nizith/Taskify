import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GetTasks from "./GetTasks";

beforeAll(() => {
    global.alert = jest.fn();
});

test("renders Latest Tasks heading", () => {
    render(<GetTasks />);
    expect(screen.getByText(/Latest Tasks/i)).toBeInTheDocument();
});

test("calls changeStatus when Done button is clicked", async () => {
    const mockTasks = [
        { id: 1, title: "Test Task", description: "Test Desc", status: "pending" }
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockTasks)
    });

    render(<GetTasks />);
    
    const button = await screen.findByText("Done");
    fireEvent.click(button);
    
    expect(await screen.findByText("Completed")).toBeInTheDocument();
});
