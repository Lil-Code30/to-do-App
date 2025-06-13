import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import CategoryBox from "./components/CategoryBox";
import DialogBox from "./components/DialogBox";

function App() {
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todo, setTodo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // all categories
  const allCategories = [
    "personal",
    "work",
    "family",
    "health",
    "business",
    "others",
  ];

  // add new todo
  const handleSubmit = (formData) => {
    const todoText = formData.get("todo");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");
    const category = formData.get("category");

    if (!todoText) {
      setErrorMsg("Please Enter Your Task");
    }

    const newTodo = {
      id: uuidv4(),
      todoText,
      description,
      dueDate,
      priority,
      category,
      status: false,
    };
    setTodoLists((prevTodoList) => {
      return [...prevTodoList, newTodo];
    });
    setErrorMsg("");
  };

  // function to handle if a task is done or not
  const handleTaskDone = (todoId) => {
    setTodoLists((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  //function to delete a todo
  const handleDelete = (todoId) => {
    setTodoLists((prevTodoList) => {
      return prevTodoList.filter((todo) => todo.id !== todoId);
    });
  };

  // function to count the number of todos under a specific category
  const NumberOfTodosInCategory = (categoryName) => {
    const todosInCategory = todoLists.filter(
      (todo) => todo.category === categoryName
    );
    return todosInCategory.length;
  };

  // map all categories elements
  const allCategoriesEl = allCategories.map((category) => (
    <CategoryBox
      key={uuidv4()}
      count={NumberOfTodosInCategory(category)}
      categoryName={category}
    />
  ));
  const handleEditModal = (todo) => {
    setTodo(todo);
    document.getElementById("edit-todo").showModal();
  };

  // map all todos
  const todoListEl = todoLists.map((el) => {
    return (
      <div
        key={el.id}
        className={`flex items-center justify-between w-full border border-gray-500 my-3 px-2 py-1 rounded ${
          el.status ? "todoDone-div" : ""
        }`}
      >
        <input
          type="checkbox"
          onChange={() => handleTaskDone(el.id)}
          name="check"
          checked={el.status}
        />
        <div className=" w-[85%]">
          <p className={`text-[20px] mb-1 ${el.status ? "todoDone-text" : ""}`}>
            {el.todoText}
          </p>
          <span className={`${el.category} font-semibold p-0.5 rounded`}>
            {el.category}
          </span>
        </div>
        <div className="flex-center">
          <button onClick={() => handleEditModal(el)}>
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
          </button>
          <button onClick={() => handleDelete(el.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 stroke-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  });

  // update the localstorage every time that the todoList is updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoLists));
  }, [todoLists]);

  return (
    <>
      <DialogBox todo={todo} />
      <header className="h-[180px] text-white  bg-[url('./assets/images/home-hero.jpg')]">
        <div className="flex justify-between items-center pt-8 md:w-[80%] lg:w-[50%] mx-auto px-2 md:px-0">
          <h1 className="text-3xl  font-semibold">TODO</h1>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
        </div>
      </header>
      <main className="bg-transparent -translate-y-20 flex flex-col gap-y-5 md:w-[80%] lg:w-[50%] mx-auto px-2 md:px-0">
        <form
          action={handleSubmit}
          className="flex flex-col gap-y-3 w-full bg-gray-200 text-black dark:bg-bl border border-gray-400 rounded  px-2 py-3 gap-x-1 mb-3"
        >
          <input
            required
            type="text"
            name="todo"
            placeholder="Enter a task"
            className="w-full h-[40px] rounded outline-none border border-gray-400 pl-1.5"
          />
          <textarea
            placeholder="Enter your task description"
            name="description"
            rows="10"
            className="outline-none border rounded border-gray-400"
          ></textarea>
          <div className="flex justify-between items-center ">
            <input
              required
              type="date"
              name="dueDate"
              id="dueDate"
              className="w-[50%] h-8 pl-1 border border-gray-400 rounded"
            />
            <select
              name="priority"
              id="priority"
              className=" w-[45%] h-8 pl-1 border border-gray-400 rounded"
              defaultValue={"priority"}
            >
              <option disabled>priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <select
            name="category"
            id="category"
            className="h-8 border pl-1 border-gray-400 rounded w-full"
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
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Add</span>
          </button>
        </form>
        <section className="grid grid-cols-3 gap-2">{allCategoriesEl}</section>
        <section>
          <h2 className="text-4xl font-semibold my-1.5">All Tasks</h2>
          {todoLists.length > 0 ? (
            todoListEl
          ) : (
            <p className="text-3xl text-center font-semibold">
              You have no tasks added
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
