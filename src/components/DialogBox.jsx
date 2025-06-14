import { useState, useEffect } from "react";

export default function DialogBox({ todo, onEditSubmit }) {
  const [todoText, setTodoText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("personal");

  // Effect to update internal state when the `todo` prop changes
  useEffect(() => {
    setTodoText(todo?.todoText || "");
    setDescription(todo?.description || "");
    setDueDate(todo?.dueDate || "");
    setPriority(todo?.priority || "low");
    setCategory(todo?.category || "others");
  }, [todo]);

  const handleEditSubmit = () => {
    onEditSubmit({
      id: todo.id,
      todoText,
      description,
      dueDate,
      priority,
      category,
      status: todo.status,
    });
  };

  return (
    <dialog id="edit-todo" className="modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubmit({
            todoText,
            description,
            dueDate,
            priority,
            category,
          });
        }}
        className="flex flex-col gap-y-3 w-[60%]  bg-gray-200  text-black dark:bg-bl border border-gray-400 rounded  px-2 py-3 gap-x-1 mb-3"
      >
        <div className="bg-black w-full text-white mb-2 flex items-center justify-between mx-auto py-1 px-2 rounded">
          <h1 className="text-3xl font-bold">Edit Your Task</h1>
          <button
            onClick={() => document.getElementById("edit-todo").close()}
            className="bg-red-600 p-1 rounded flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <input
          required
          type="text"
          name="todo"
          defaultValue={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a task"
          className="w-full h-[40px] rounded outline-none border border-gray-400 pl-1.5"
        />
        <textarea
          name="description"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none border rounded border-gray-400"
        ></textarea>
        <div className="flex justify-between items-center ">
          <input
            required
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            id="dueDate"
            className="w-[50%] h-8 pl-1 border border-gray-400 rounded"
          />
          <select
            name="priority"
            id="priority"
            className=" w-[45%] h-8 pl-1 border border-gray-400 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <select
          name="category"
          id="category"
          className=" h-8 border pl-1 border-gray-400 rounded w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="family">Family</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
          <option value="others">Others</option>
        </select>
        <button className="flex items-center justify-center gap-x-1.5 bg-linear-to-r from-indigo-500 to-indigo-600 text-white px-2 py-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 stroke-amber-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span>Edit</span>
        </button>
      </form>
    </dialog>
  );
}
