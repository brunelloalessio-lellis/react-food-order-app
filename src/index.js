import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { CartModalContextProvider } from "./store/cart-modal-context";

ReactDOM.render(
  <CartModalContextProvider>
    <App />
  </CartModalContextProvider>,
  document.getElementById("root")
);
