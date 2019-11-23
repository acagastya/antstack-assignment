import React from 'react';

import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  const [showTable, setShowTable] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [customerSort, setCustomerSort] = React.useState(
    false
  );
  return (
    <div className="App container mt-5">
      <Header />
      <Form
        setShowTable={setShowTable}
        setData={setData}
        setCustomerSort={setCustomerSort}
      />
      {showTable ? (
        <Table
          data={data}
          customerSort={customerSort}
          setData={setData}
          setCustomerSort={setCustomerSort}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
