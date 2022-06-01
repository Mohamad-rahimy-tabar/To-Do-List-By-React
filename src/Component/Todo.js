import { IconContext } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import styles from "./style.module.css";
import React, { useContext } from "react";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import { TodosData } from "./TodoApp";

const Todo = ({ todo, editHandler, removeHandler }) => {
  const [checked, setChecked] = React.useState(false);
  const [todos, setTodos] = useContext(TodosData);
  const trashstyle = styles.trash;
  const editstyle = styles.edit;
  const changeHandler = (id) => {
    setChecked(!checked);
    const index = todos.findIndex((todo) => todo.id === id);
    const selectedTodo = { ...todos[index] };
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    const updatedTodos = [...todos];
    updatedTodos[index] = selectedTodo;
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todo}>
      <div className={styles.checkbox}>
        <Checkbox onChange={() => changeHandler(todo.id)} shape="curve" checked={todo.isCompleted} />
      </div>
      <div className={todo.isCompleted ? styles.todocomplete : styles.todotext}>{todo.text}</div>
      <div className={styles.iconcontainer}>
        <IconContext.Provider value={{ className: editstyle }}>
          <RiEditBoxLine onClick={editHandler} />
        </IconContext.Provider>
        <IconContext.Provider value={{ className: trashstyle }}>
          <FaRegTrashAlt onClick={removeHandler} />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Todo;
