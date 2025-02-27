import React from "react"
import AddTask from "./AddTask"
import GetTasks from "./GetTasks"

function App() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-4/5 bg-gray-200 rounded-4xl border-2 border-gray-400">
          <h1 className="text-center text-4xl font-bold mt-2 text-indigo-700">Taskify</h1>
          <p className="text-center">Create and manage your tasks</p>
          <div className="flex justify-between p-5 m-7 mt-2 rounded-4xl bg-white ">
            <AddTask />
            <div className="border-l-2 border-gray-400"></div>
            <GetTasks />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
