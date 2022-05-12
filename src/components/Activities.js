import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Activities = ({ infoTrainings , setInfoTrainings }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toString().slice(0, 15));
    const gridRef = useRef();

    // DATE-CHANGER
    const changeDate = (newDate) => {
        setSelectedDate(newDate.toString().slice(0, 15));
    }

    // AG-GRID COLUMN DEFINITIONS
    const columns = [
        { field: "activity" , sortable: true , filter: true, floatingFilter: true },
        { field: "duration" , sortable: true , filter: true, floatingFilter: true },
        { field: "date" , cellRenderer: (data) => {return selectedDate} }
    ]

    // DELETES A DATAENTRY
    const deleteInfo = () => {
        if (gridRef.current.getSelectedNodes().length > 0 ) {
          setInfoTrainings(infoTrainings.filter((dataEntry, index) => 
            index !== gridRef.current.getSelectedNodes()[0].childIndex
          ))
        } else {
          alert('Select row first!')
        }
      }

    return (
        <div className='ag-theme-material' style={{height: '700px', width: '70%', margin: 'auto'}}>

            <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">

                <Button onClick={deleteInfo}>Delete entry</Button>
                <p>Filter date</p>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker value={selectedDate} onChange={selectedDate => changeDate(selectedDate)} />
                </MuiPickersUtilsProvider>

            </Stack>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={infoTrainings}>
            </AgGridReact>
        </div>
    )
}

export default Activities;