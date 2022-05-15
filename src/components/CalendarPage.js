import React, { useState, setState } from "react";
import Calendar from "react-calendar";
import Grid from "@material-ui/core/Grid";

const CalendarPage = () => {
    // Due to time constraints this calendar is rudimentary and does not link with fetched data

    const [date, setDate] = useState("");
  
    const onChange = date => {
      setDate(date.toString());
    }

    return (
        <div>
            <Grid container direction="column" alignItems="center">
            <Grid>
                <Calendar onClickDay={data => onChange(data)} />
            </Grid>
                <h1>Date:</h1>
                <h2>{date}</h2>
            </Grid>
        </div>
    )

}


export default CalendarPage;