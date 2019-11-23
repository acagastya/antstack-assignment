import React from 'react';

function Form(props) {
  const { setShowTable, setData, setCustomerSort } = props;
  return (
    <form className="form-inline mb-3">
      <label className="sr-only" htmlFor="piconde">
        Pin code
      </label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        id="pincode"
        placeholder="Pin Code"
      />

      <label className="sr-only" htmlFor="date">
        Date
      </label>
      <div className="input-group mb-2 mr-sm-2">
        <input
          type="date"
          className="form-control"
          id="date"
          placeholder="Date"
        />
      </div>

      <a
        href="#!"
        className="btn btn-primary mb-2 mr-2"
        onClick={async e => {
          const searchRes = await handleSearch(e);
          setCustomerSort(false);
          setData(searchRes);
          if (searchRes.length) setShowTable(true);
          else setShowTable(false);
        }}
      >
        Search
      </a>
      <a
        href="#1"
        type="clear"
        className="btn btn-danger mb-2 text-light"
        onClick={e => {
          handleClear(e);
          setShowTable(false);
          setData([]);
          setCustomerSort(false);
        }}
      >
        Clear
      </a>
    </form>
  );
}

async function handleSearch(e) {
  e.preventDefault();
  const pin = document.getElementById('pincode').value;
  const dateValue = document.getElementById('date').value;
  const date = new Date(dateValue);
  const [d, m, y] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  ];
  const formattedDate = dateValue
    ? [d, m, y].join('/')
    : undefined;
  const endpoint = 'http://0.0.0.0:3000/content/?';
  let queryString = endpoint;
  if (pin) queryString += `&deliveryPincode=${pin}`;
  if (formattedDate)
    queryString += `&orderDate=${formattedDate}`;

  const res = await fetch(queryString);
  const searchResults = await res.json();
  return searchResults;
}

function handleClear(e) {
  e.preventDefault();
  document.getElementById('pincode').value = '';
  document.getElementById('date').value = '';
}

export default Form;
