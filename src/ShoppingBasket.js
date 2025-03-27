import React, { useState } from "react";

const PRICES = {
  Apple: 35,
  Banana: 20,
  Melon: 50,
  Lime: 15,
};

const calculateTotal = (itemCounts) => {
  let total = 0;
  const calculatedPrices = {};

  Object.entries(itemCounts).forEach(([item, count]) => {
    let price = 0;
    if (item === "Melon") {
      price = Math.floor(count / 2) * PRICES.Melon + (count % 2) * PRICES.Melon;
    } else if (item === "Lime") {
      price = Math.floor(count / 3) * 2 * PRICES.Lime + (count % 3) * PRICES.Lime;
    } else {
      price = count * PRICES[item];
    }
    calculatedPrices[item] = price;
    total += price;
  });

//   return { total: total / 100, calculatedPrices };
return { total: total, calculatedPrices };
};

const ShoppingBasket = () => {
  const [basket, setBasket] = useState([]);
  const [item, setItem] = useState("");
  const [total, setTotal] = useState(0);
  const [calculatedPrices, setCalculatedPrices] = useState({});

  const addItem = () => {
    if (item && PRICES[item]) {
      const newBasket = [...basket, item];
      setBasket(newBasket);
      const itemCounts = newBasket.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      const { total, calculatedPrices } = calculateTotal(itemCounts);
      setTotal(total);
      setCalculatedPrices(calculatedPrices);
    //   setItem("");
    }
  };

  const itemCounts = basket.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <div className="row">
        <div className="col-3"></div>
        <div className="col-6"><h2 className="text-xl font-bold mb-4"><i class="bi bi-cart3"></i> Basket</h2>
      <div className="flex gap-2 mb-4">
        <select
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select an item</option>
          {Object.keys(PRICES).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <button onClick={addItem} className="bg-primary text-white px-4 py-2 rounded">
          Add Item
        </button><br/><br/>
      
      
      <table className="table">
        <thead>
          <tr className="bg-gray-200">
            <th scope="col">Item</th>
            <th scope="col">Count</th>
            <th scope="col">Price (p)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(itemCounts).map(([item, count]) => (
            <tr key={item}>
              <td className="border p-2">{item}</td>
              <td className="border p-2">{count}</td>
              <td className="border p-2">{(calculatedPrices[item]).toFixed(2)}p</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="border p-2">Total</td>
            <td className="border p-2">-</td>
            <td className="border p-2">{total.toFixed(2)}p</td>
          </tr>
        </tbody>
      </table>
      </div></div>
        <div className="col-3"></div>
        </div>
    </div>
  );
};

export default ShoppingBasket;
