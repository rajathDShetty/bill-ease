import React, { useState } from "react";
import "./App.css";
import ShoppingBasket from "./ShoppingBasket";
import ListCalculation from "./ListCalculation";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [activeComponent, setActiveComponent] = useState("ShoppingBasket");
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            <i className="bi bi-cart-check-fill"></i> Shopping Basket App
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className={`nav-link bg-primary ${activeComponent === "ShoppingBasket" ? "active" : ""}`}
                  onClick={() => setActiveComponent("ShoppingBasket")}
                >
                  Shopping Basket
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link bg-primary ${activeComponent === "ListCalucation" ? "active" : ""}`}
                  onClick={() => setActiveComponent("ListCalucation")}
                >
                  List Calculation
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Render the selected component */}
      <div className="container mt-4">
        {activeComponent === "ShoppingBasket" ? <ShoppingBasket /> : <ListCalculation />}
      </div>
    </div>
  );
}

export default App;
