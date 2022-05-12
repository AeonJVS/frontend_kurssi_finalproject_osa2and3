import './App.css';

import React, { useState, useEffect, useRef } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './components/Home.js'
import Activities from './components/Activities.js';
import Customers from './components/Customers.js';

const App = () => {
  // CONSTANTS --- info refers to all extracted, organized data from the API
  const [infoTrainings, setInfoTrainings] = useState([]);
  const [infoCustomers, setInfoCustomers] = useState([]);
  const gridRef = useRef();

  // FETCHERS --- fetches the data from the API exactly once for activities and customers
  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(response => response.json())
      .then(data => {
        setInfoTrainings(data.content);
      })
  }, [])

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => {
        setInfoCustomers(data.content);
      })
  }, [])


  return (
    <div className='ag-theme-material' style={{height: '700px', width: '70%', margin: 'auto'}}>
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/activities">Activities</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activities" element={<Activities infoTrainings={infoTrainings} setInfoTrainings={setInfoTrainings}/>} />
          <Route path="/customers" element={<Customers infoCustomers={infoCustomers} setInfoCustomers={setInfoCustomers}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


/*

      {info.map((stuff) => 
        <tr key={stuff.date}>
          <td>{stuff.activity}</td>
        </tr>
      )}

*/