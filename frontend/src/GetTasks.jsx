import React, { useEffect, useState } from "react";
import api from "../api";

export default function GetTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${api}/alltasks`);
                if (response.ok) {
                    const data = await response.json();
                    const pendingTasks = data.filter( task => task.status == 'pending')
                    console.log("Pending tasks : ", pendingTasks)
                    setTasks(pendingTasks.slice(-5).reverse()); // Get the latest 5 tasks
                } else {
                    console.error("Failed to fetch tasks");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const changeStatus = async (id) => {
        try {
            const response = await fetch(`${api}/edittask/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: "completed" })
            });

            if (response.ok) {
                alert("Status updated successfully!");
                setTasks(tasks.map(task => task.id === id ? { ...task, status: "completed" } : task));
            } else {
                alert("Failed to update task.");
            }
        } catch (error) {
            console.error("Error updating task status:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-xl w-[4in] m-auto p-4">
            <h2 className="text-xl font-bold mb-4 underline">Latest Tasks</h2>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className="border-2 border-gray-200 my-3 p-2 rounded-md shadow-sm">
                            <strong>{task.title}</strong>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <button
                                    onClick={() => changeStatus(task.id)}
                                    className={`px-6 py-1 rounded-md text-white font-semibold border border-gray-500 ${task.status === "completed" ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
                                    disabled={task.status === "completed"}
                                >
                                    {task.status === "completed" ? "Completed" : "Done"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
}
