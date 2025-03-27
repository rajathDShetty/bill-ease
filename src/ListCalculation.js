import React, { useState } from "react";

const PRICES = {
  apple: 35,
  banana: 20,
  melon: 50,
  lime: 15,
};

const VALID_ITEMS = new Set(["apple", "banana", "melon", "lime"]);

const calculateTotal = (basket) => {
  const itemCounts = basket.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let total = 0;
  const calculatedPrices = {};

  Object.entries(itemCounts).forEach(([item, count]) => {
    let price = count * (PRICES[item] || 0);

    if (item === "melon") {
      price = Math.floor(count / 2) * PRICES.melon + (count % 2) * PRICES.melon;
    }
    else if (item === "lime") {
      price = Math.floor(count / 3) * 2 * PRICES.lime + (count % 3) * PRICES.lime;
    }

    calculatedPrices[item] = price;
    total += price;
  });

  return { total: total, calculatedPrices };
};

const parseInput = (input) => {
  try {
    let parsedInput = JSON.parse(input);
    if (Array.isArray(parsedInput)) {
      return parsedInput
        .map((item) => item.trim().toLowerCase())
        .filter((item) => VALID_ITEMS.has(item));
    }
  } catch {
    return input
      .split(/[\s,]+/) 
      .map((item) => item.replace(/[^a-zA-Z]/g, "").trim().toLowerCase()) 
      .filter((item) => VALID_ITEMS.has(item));
  }
  return [];
};

const ListCalculation = () => {
  const [input, setInput] = useState("");
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [calculatedPrices, setCalculatedPrices] = useState({});

  const handleCalculate = () => {
    const items = parseInput(input);
    setBasket(items);
    const { total, calculatedPrices } = calculateTotal(items);
    setTotal(total);
    setCalculatedPrices(calculatedPrices);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Shopping Basket</h2>

      <input
        type="text"
        className="border p-2 w-full rounded mb-2"
        placeholder='Enter items: apple, Apple, BANANA, melon, LIME'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleCalculate}
        className="bg-primary text-white px-4 py-2 rounded w-full mb-4"
      >
        Calculate Total
      </button>

      {basket.length > 0 && (
        <table className="table">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Item</th>
              <th className="border p-2">Count</th>
              <th className="border p-2">Price (£)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(calculatedPrices).map(([item, price]) => (
              <tr key={item}>
                <td className="border p-2 capitalize">{item}</td>
                <td className="border p-2">{basket.filter((i) => i === item).length}</td>
                <td className="border p-2">{(price).toFixed(2)}p</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className="border p-2">Total</td>
              <td className="border p-2">-</td>
              <td className="border p-2">{total.toFixed(2)}p</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListCalculation;
