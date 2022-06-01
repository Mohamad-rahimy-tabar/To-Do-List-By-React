import styles from "./style.module.css";
import React from "react";
const Navbar = ({ todos, filter, selectedOption, setSelectedOption }) => {
  const filtertodo = todos.filter((t) => !t.isCompleted);

  const changeHandler = (e) => {
    setSelectedOption(e.target.value);
    filter(selectedOption);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_text}>
        {todos.length === 0 ? (
          <>Add Today Todos</>
        ) : (
          <>
            You Have
            <span>{filtertodo.length}</span>
            Tasks that are not completed!
          </>
        )}
      </div>
      <div className={styles.navbar_header}>
        <h2>To Do List App</h2>
      </div>
      <div className={styles.navbar_select}>
        <select
          onChange={changeHandler}
          value={selectedOption}
          className={styles.select}
          disabled={todos.length === 0 ? true : false}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="NotCompleted">NotCompleted</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
