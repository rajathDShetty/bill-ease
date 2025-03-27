import './App.css';
import ShoppingBasket from "./ShoppingBasket";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div className="App">
      <header className='p-3 mb-2 bg-primary text-white text-start fs-2'>
      <i className="bi bi-cart-check-fill"></i> &nbsp; 
      <span>Shopping Basket App</span>
      </header>
      <ShoppingBasket />
    </div>
  );
}

export default App;
