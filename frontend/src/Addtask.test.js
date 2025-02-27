import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTask from "./AddTask";


global.fetch = jest.fn(); // Mock fetch API
global.alert = jest.fn(); // Mock alert

describe("AddTask Component", () => {
    beforeEach(() => {
        fetch.mockClear();
        alert.mockClear();
    });

    test("renders Add Task form", () => {
        render(<AddTask />);
        expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/due Date/i)).toBeInTheDocument();
    });

    test("updates input fields correctly", () => {
        render(<AddTask />);
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const dueDateInput = screen.getByLabelText(/due Date/i);

        fireEvent.change(titleInput, { target: { value: "Test Task" } });
        fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
        fireEvent.change(dueDateInput, { target: { value: "2025-03-01T12:00" } });

        expect(titleInput.value).toBe("Test Task");
        expect(descriptionInput.value).toBe("Test Description");
        expect(dueDateInput.value).toBe("2025-03-01T12:00");
    });

    test("submits form and calls fetch", async () => {
        fetch.mockResolvedValueOnce({ ok: true });
    
        render(<AddTask />);
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Task" } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Some details" } });
        fireEvent.change(screen.getByLabelText(/due Date/i), { target: { value: "2025-03-01T12:00" } });
    
        fireEvent.click(screen.getByText(/Create Task/i));
    
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/addtask"),
                expect.objectContaining({
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: "New Task",
                        description: "Some details",
                        status: "pending",
                        dueDate: "2025-03-01T12:00"
                    })
                })
            );
        });
    
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith("Task added successfully!");
        });
    });    

    test("handles failed fetch", async () => {
        fetch.mockResolvedValueOnce({ ok: false });
    
        render(<AddTask />);
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Failed Task" } });
        fireEvent.click(screen.getByText(/Create Task/i));
    
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith("Failed to add task.");
        });
    });
    
});
