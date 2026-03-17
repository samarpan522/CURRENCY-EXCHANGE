import { useState, useEffect } from "react";
import "./CurrencyConverter.css";
import axios from "axios";

const CurrencyConverter = () => {
  const [exchangerates, setExchangerates] = useState({});
  const [amount, SetAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("NPR");
  const [convertedamount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setExchangerates(response.data.rates);
      })

      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangerates[tocurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, tocurrency, exchangerates]);

  const handlechange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "amount":
        SetAmount(value);
        break;

      case "fromCurrency":
        setFromCurrency(value);
        break;

      case "tocurrency":
        setTocurrency(value);
        break;
    }
  };

  return (
    <>
      <div className="currency">
        <div className="currency-h2">
          <div className="hello">
            <h1>Currency Converter</h1>
          </div>
          <div className="Amount">
            <div className="holo">
              <p>Amount:</p>
              <input
                onChange={handlechange}
                type="number"
                name="amount"
                value={amount}
                placeholder="Enter your Amount"
              />
            </div>
            <div className="holo">
              <p>From Currency:</p>
              <select
                className="input"
                value={fromCurrency}
                onChange={handlechange}
                name="fromCurrency"
              >
                {Object.keys(exchangerates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="holo">
              <p>To Currency:</p>
              <select
                className="input"
                value={tocurrency}
                onChange={handlechange}
                name="tocurrency"
                id="cars"
              >
                {Object.keys(exchangerates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="converted">
            <h2>
              Converted Amounnt: <b>{convertedamount}</b>{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
