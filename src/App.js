import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTrasactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTrasactions)
  }, [])

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/api/transactions';
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/api/transaction';
    const price = name.split(' ')[0];
    console.log(price);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        dateTime
      })
    }).then(resp =>
      resp.json()).then((response) => {
        setName("");
        setDateTime("");
        setDescription("");
        console.info('fetch()', response);
      });
    };

    
   
  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="+200 product" />

          <input type="datetime-local"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}></input>
        </div>

        <div className="description">
          <input type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="description" />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (

          <div className="transaction">
            <div className="left">
              <div className="name">
                {transaction.name}
              </div>
              <div className="description">
                {transaction.description}
              </div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? "red" : "green")}>
                {transaction.price}
              </div>
              <div className="datetime">
                {transaction.dateTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
