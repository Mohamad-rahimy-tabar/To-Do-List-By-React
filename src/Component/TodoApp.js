import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "./Navbar";
export const TodosData = React.createContext();
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [inputDisable, setInputDisable] = useState(false);
  useEffect(() => {
    filter(selectedOption);
  }, [todos, selectedOption]);

  function idMaker() {
    const newtodos = [...todos];
    let id = 1;
    let isExsist = newtodos.some((todo) => todo.id === id);
    while (isExsist) {
      id++;
      isExsist = newtodos.some((todo) => todo.id === id);
    }
    return id;
  }

  const addTodo = (input) => {
    const id = idMaker();
    const newTodo = { id, text: input, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const removeHandler = (id) => {
    const newtodo = [...todos];
    const filtered = newtodo.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  const edittodo = (id, input) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const editingtodo = { ...todos[index] };
    editingtodo.text = input;
    const updatedtodo = [...todos];
    updatedtodo[index] = editingtodo;
    setTodos(updatedtodo);
    setInputDisable(false);
  };
  const filter = (selected) => {
    switch (selected) {
      case "Completed":
        setFilterTodos(todos.filter((t) => t.isCompleted));
        break;
      case "NotCompleted":
        setFilterTodos(todos.filter((t) => !t.isCompleted));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  };
  return (
    <TodosData.Provider value={[todos, setTodos]}>
      <div className={styles.container}>
        <Navbar todos={todos} filter={filter} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <TodoForm addTodoHandler={addTodo} name="Add" placeholder="Add todo ..." inputstatus={inputDisable} />
        <TodoList
          todos={filterTodos}
          removeHandler={removeHandler}
          updatetodo={edittodo}
          state={[inputDisable, setInputDisable]}
        />
      </div>
    </TodosData.Provider>
  );
};

export default TodoApp;
