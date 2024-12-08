import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";
import store from "./app/store";

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <StrictMode>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </StrictMode>
      </Router>
    </Provider>
  );
};

export default Root;
