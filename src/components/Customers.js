import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import AddCustomer from './AddCustomer';

const Customers = ({ infoCustomers , setInfoCustomers, fetchCustomers }) => {
    // CONSTANT DEFINITIONS
    const [newCustomer, setNewCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentlySelectedRow, setCurrentlySelectedRow] = useState([]);
    const gridRef = useRef();


    // AG-GRID COLUMN DEFINITIONS
    const columns = [
        { field: "firstname" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "lastname" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "streetaddress" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "postcode" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "city" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "email" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "phone" , sortable: true , filter: true, floatingFilter: true, editable: true }
    ]


    // CREATE A NEW DATAENTRY
    const saveCustomer = newCustomer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer)
          })
            .then(() => fetchCustomers())
            .catch(err => console.error(err));
    };

    // UPDATE DATAENTRY --- requires user to select and edit row data before updating on click
    const editCustomer = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
        const selection = gridRef.current.getSelectedNodes();
        fetch(selection[0].data.links[0].href, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(selection[0].data)
        })
          .then(() => fetchCustomers())
          .finally(alert('Entry updated successfully!'))
          .catch(err => console.error(err));
      } else {
        alert('Double click a data row and edit before updating!')
      }
    };
  

    // DELETES A DATAENTRY --- assign selection with the data of currently selected node and delete
    const deleteCustomer = () => {
        if (gridRef.current.getSelectedNodes().length > 0 && (window.confirm("Delete customer permanently?"))) {
          const selection = gridRef.current.getSelectedNodes();
          fetch(selection[0].data.links[0].href, { method: "DELETE" })
          .then(() => fetchCustomers())
          .then(() => setOpen(true))
          .catch(err => console.error(err))
        } else {
          alert('Select row first!')
        }
      }

    return (
        <div className='ag-theme-material' style={{height: '700px', width: '100%', margin: 'auto'}}>
            
            <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">
  
                <AddCustomer saveCustomer={saveCustomer} />

                <Button onClick={() => editCustomer()}>
                  Update customer
                </Button>

                <Button onClick={() => deleteCustomer()}>
                    Delete customer
                    <DeleteOutlineIcon />
                </Button>
                
            </Stack>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={infoCustomers}>
            </AgGridReact>
        </div>
    )
}

export default Customers;