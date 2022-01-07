import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import { useContext, useRef } from "react";
import CartModalContext from '../../../store/cart-modal-context-cmp';

const MealItemForm = (props) => {
  const amountFieldRef = useRef();

  const ctx = useContext(CartModalContext);

  const addMealToCart = (event) => {
    event.preventDefault();

    let myMeal;

    ctx.mealList.forEach((meal) => {
      if (!myMeal && meal.id === props.id) myMeal = meal;
    });

    const newItemToCart = {
      ...myMeal,
      amount: parseInt(amountFieldRef.current.value)
    };

    ctx.addItem(newItemToCart);
  };

  return (
    <form className={styles.form} onSubmit={addMealToCart}>
      <Input
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          ref: amountFieldRef,
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default MealItemForm;
