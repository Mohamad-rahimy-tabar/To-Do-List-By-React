import { useState } from "react";
import styles from "./style.module.css";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoList = ({ todos, removeHandler, updatetodo, state }) => {
  const [edit, setEdit] = useState({ id: null });
  const [inputDisable,setInputDisable] = state;
  const updateHandler = (input) => {
    updatetodo(edit.id, input);
    setEdit({ id: null });
  };
  const renderTodos = () => {
    if (todos.length === 0) return <div className={styles.todolistempty}>add some todos</div>;
    return todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          removeHandler={() => removeHandler(todo.id)}
          editHandler={() => {
            setEdit(todo);
            setInputDisable(true);
          }}
        />
      );
    });
  };
  return (
    <div className={edit.id ? styles.todolistforedit : styles.todolist}>
      {edit.id ? (
        <TodoForm
          addTodoHandler={updateHandler}
          edit={edit}
          name="Update"
          placeholder="Update todo ..."
          inputstatus={false}
        />
      ) : (
        renderTodos()
      )}
    </div>
  );
};

export default TodoList;
