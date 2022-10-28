// Dependecies
import React from "react";
import { Link } from "react-router-dom";

// Redux Slices
import { getNumItems, getMemoizedNumItems } from './cartSlice';

// Hooks
import { useAppSelector } from '../../app/hooks';

// Styles
import styles from "./CartLink.module.css";

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItems);

  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{numItems ? numItems : 'Cart'}</span>
    </Link>
  );
}
