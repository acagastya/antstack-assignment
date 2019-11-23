import React from 'react';

function Table({
  data,
  setCustomerSort,
  customerSort,
  setData
}) {
  setCustomerSort(false);

  if (customerSort) {
    const sortedArr = [...data];
    sortedArr.sort(
      (a, b) =>
        parseInt(a.customerId) - parseInt(b.customerId)
    );
    setData(sortedArr);
    setCustomerSort(false);
  }
  return (
    <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Order ID</th>
          <th>
            <a
              className="text-light"
              href="#!"
              onClick={() => setCustomerSort(true)}
            >
              Customer ID{' '}
              <span role="img" aria-label="sort">
                ⬇️
              </span>
            </a>
          </th>
          <th>Pin Code</th>
          <th>Order Date</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {data.map(order => {
          return (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerId}</td>
              <td>{order.deliveryPincode}</td>
              <td>{order.orderDate}</td>
              <td>
                <ul>
                  {Object.keys(order.items).map(item => (
                    <li
                      key={
                        JSON.stringify(order.items) +
                        order.orderId +
                        Math.random()
                      }
                    >
                      {item} &ndash; {order.items[item]}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
