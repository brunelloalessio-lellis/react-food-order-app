import { useContext } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartModalContext from "./store/cart-modal-context-cmp";

function App() {

  const ctx = useContext(CartModalContext)

  return (
    <>
      {ctx.isCartOpened && <Cart />}
      <Header/>
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
