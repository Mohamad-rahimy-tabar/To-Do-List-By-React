import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.text : "");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const changeHandler = (e) => {
    setInput(e.target.value.toUpperCase());
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // add entered todo to todos =>
    if (!input) {
      alert("enter todo !");
      return;
    }
    props.addTodoHandler(input);
    setInput("");
    
  };

  return (
    <div className={styles.todoform}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          type="text"
          value={input}
          onChange={changeHandler}
          className={styles.input}
          placeholder={props.placeholder}
          ref={inputRef}
          disabled={props.inputstatus}
        />
        <button type="submit" className={styles.btn} disabled={props.inputstatus}>
          {props.name}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
