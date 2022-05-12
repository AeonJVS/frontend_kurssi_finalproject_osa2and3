import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Customers = ({ infoCustomers , setInfoCustomers }) => {
    const gridRef = useRef();


    // AG-GRID COLUMN DEFINITIONS
    const columns = [
        { field: "firstname" , sortable: true , filter: true, floatingFilter: true },
        { field: "lastname" , sortable: true , filter: true, floatingFilter: true },
        { field: "email" , sortable: true , filter: true, floatingFilter: true }
    ]

    // DELETES A DATAENTRY
    const deleteInfo = () => {
        if (gridRef.current.getSelectedNodes().length > 0 ) {
          setInfoCustomers(infoCustomers.filter((dataEntry, index) => 
            index !== gridRef.current.getSelectedNodes()[0].childIndex
          ))
        } else {
          alert('Select row first!')
        }
      }

    return (
        <div className='ag-theme-material' style={{height: '700px', width: '70%', margin: 'auto'}}>

            <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">

                <Button onClick={deleteInfo}>Delete</Button>

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