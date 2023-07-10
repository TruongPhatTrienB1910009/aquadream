import React from 'react';
import styles from "./ExploreCategories.module.css"

const DateTimeDisplay = ({ value, type, isDanger }: any) => {
  return (
    <div className={isDanger ? 'countdown danger' : `${styles.countdown}`} >
      <p>{value} </p>
      <span> {type} </span>
    </div>
  );
};

export default DateTimeDisplay;