// Dependencies
import React from "react";
import classNames from 'classnames';

// Redux Hooks
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// Redux Slices
import { getTotalPrice, removeFromCart, updateQuatity, checkoutCart } from './cartSlice';

// Styles
import styles from "./Cart.module.css";

export function Cart() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const items = useAppSelector(state => state.cart.items);
  const checkoutState = useAppSelector(state => state.cart.checkoutState);
  const errorMessage = useAppSelector(state => state.cart.errorMessage);
  const totalPrice = useAppSelector(getTotalPrice);

  function onQuantityChange(e: React.FocusEvent<HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuatity({ id, quantity }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart())
  }

  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === 'ERROR',
    [styles.checkoutLoading]: checkoutState === 'LOADING'
  })

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]) => (
            <tr>
              <td>{products[id].name}</td>
              <td>
                <input onBlur={(e) => onQuantityChange(e, id)} type="text" className={styles.input} defaultValue={quantity} />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button onClick={() => dispatch(removeFromCart(id))} aria-label={`Remove ${products[id].name} from Shopping Cart`}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={(e) => onCheckout(e)}>
        {checkoutState === 'ERROR' && errorMessage ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
