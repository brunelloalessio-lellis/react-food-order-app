import Card from "../UI/Card";
import classes from "./AvaiableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useContext } from "react";
import CartModalContext from "../../store/cart-modal-context-cmp";

const AvaiableMeals = () => {
  const ctx = useContext(CartModalContext);


  if(ctx.mealListError){
    return (
      <section className={classes.meals}>
        <Card>
          Error loading meals!
        </Card>
      </section>
    );
  }

  if(ctx.mealListIsLoading){
    return (
      <section className={classes.meals}>
        <Card>
          Meal list loading ...
        </Card>
      </section>
    );
  }

  if(!ctx.mealListLoaded){
    return (
      <section className={classes.meals}>
        <Card>
          No meals actually loaded.
        </Card>
      </section>
    );
  }

  if(ctx.mealList.length===0){
    return (
      <section className={classes.meals}>
        <Card>
          No meals.
        </Card>
      </section>
    );
  }

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
