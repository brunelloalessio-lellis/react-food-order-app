import Card from "../UI/Card";
import classes from "./AvaiableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useContext } from "react";
import CartModalContext from "../../store/cart-modal-context-cmp";

const AvaiableMeals = () => {
  const ctx = useContext(CartModalContext);

  const mealsList = ctx.mealList.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        description={meal.description}
        name={meal.name}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaiableMeals;
