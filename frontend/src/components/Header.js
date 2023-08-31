import React from 'react';
import styles from './header.module.css'; 

export default function Header() {
  return (
    <div className={styles.header}> 
      <h1 className={styles.title}>Add from Excel</h1> 
    </div>
  );
}