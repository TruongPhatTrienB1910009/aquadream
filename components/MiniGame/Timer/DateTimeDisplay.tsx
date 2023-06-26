import React from 'react';
import styles from "./timer.module.css";

const DateTimeDisplay = ({ value, type, isDanger }: any) => {
  return (
    <div className={isDanger ? 'countdown danger' : `${styles.countdown}`} >
      <p>{value} </p>
      <span> {type} </span>
    </div>
  );
};

export default DateTimeDisplay;