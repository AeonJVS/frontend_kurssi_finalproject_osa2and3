import React, { useState, useEffect, useRef } from 'react';

import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddActivity from './AddActivity';

const Activities = ({ infoTrainings , setInfoTrainings, fetchActivities }) => {
    // CONSTANT DEFINITIONS
    const [selectedDate, setSelectedDate] = useState(new Date().toString().slice(0, 15));
    const [newActivity, setNewActivity] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();

    // DATE-CHANGER
    const changeDate = (newDate) => {
        setSelectedDate(newDate.toString().slice(0, 15));
    }

    // AG-GRID COLUMN DEFINITIONS
    const columns = [
        { field: "activity" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "duration" , sortable: true , filter: true, floatingFilter: true, editable: true },
        { field: "date" , filter: true, floatingFilter: true, valueFormatter: (data) => {
          return data.value ? (new Date(data.value)).toString().slice(0, 15) : '';
          }, editable: true }
    ]

    // FETCH ACTIVITIES --- might be completely useless ?
    useEffect(() => {
        fetchActivities();
    }, []);

    // CREATE A NEW DATAENTRY
    const saveActivity = newActivity => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newActivity)
        })
          .then(() => fetchActivities())
          .catch(err => console.error(err));
      };

    // UPDATE DATAENTRY --- requires user to select and edit row data before updating on click
    const editActivity = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
        const selection = gridRef.current.getSelectedNodes();
        fetch(selection[0].data.links[0].href, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(selection[0].data)
        })
          .then(() => fetchActivities())
          .finally(alert('Entry updated successfully!'))
          .catch(err => console.error(err));
      } else {
        alert('Double click a data row and edit before updating!')
      }
    };

    // DELETES A DATAENTRY --- assign selection with the data of currently selected node and delete
    const deleteActivity = () => {
      if (gridRef.current.getSelectedNodes().length > 0 && (window.confirm("Delete activity permanently?"))) {
        const selection = gridRef.current.getSelectedNodes()
          fetch(selection[0].data.links[0].href, { method: "DELETE" })
          .then(() => fetchActivities())
          .then(() => setOpen(true))
          .catch(err => console.error(err))
        
      } else {
        alert('Select row first!')
      }
    }

    return (
        <div className='ag-theme-material' style={{height: '700px', width: '100%', margin: 'auto'}}>

            <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">

                <AddActivity saveActivity={saveActivity} />

                <Button onClick={() => editActivity()}>
                  Update activity
                </Button>

                <Button onClick={() => deleteActivity()}>
                    Delete activity
                    <DeleteOutlineIcon />
                </Button>

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