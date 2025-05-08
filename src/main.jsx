import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/authRedux">
      <App />
    </BrowserRouter>
  </Provider>
);
