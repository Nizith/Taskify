import React, { useState } from "react";
import api from "../api"

export default function AddTask() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        dueDate: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/addtask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Task added successfully!");
                setFormData({ title: "", description: "", status: "pending", dueDate: "" });
            } else {
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-md w-[4in] m-auto p-4">
            <h2 className="text-xl font-bold mb-4 underline">Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="title"  className="block font-semibold">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 outline-2 outline-gray-300 focus:outline-2 focus:outline-indigo-600 rounded-md" />
                </div>

                <div className="mb-2">
                    <label htmlFor="description"  className="block font-semibold">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 outline-2 outline-gray-300 focus:outline-2 focus:outline-indigo-600 rounded-md">
                    </textarea>
                </div>

                <div className="mb-5">
                    <label htmlFor="dueDate"  className="Due Date *:block font-semibold">Due Date</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full p-2 outline-2 outline-gray-300 focus:outline-2 focus:outline-indigo-600 rounded-md" />
                </div>

                <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white border border-gray-500 py-2 rounded-md font-semibold">Create Task</button>
            </form>
        </div>
    );
}