import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddActivity = ({ saveActivity }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newActivity, setNewActivity] = useState({
        date: "",
        duration: null,
        activity: "",
        customer: ""
    });

    // HANDLERS
    const handleClickChange = (event) => {
        setNewActivity({ ...newActivity, [event.target.name]: event.target.value });
    }

    const handleClickOpenDialog = () => {
        setDialogOpen(true);
    }
    
    const handleClickCloseDialog = () => {
        setDialogOpen(false);
    }

    // ADD-FUNCTION
    const addActivity = () => {
        saveActivity(newActivity);
        handleClickCloseDialog();
      };

    return (
        <div>
            <Button
                style={{ margin: 10 }}
                variant="outlined"
                color="primary"
                onClick={handleClickOpenDialog}
            >
                Add an activity
            </Button>

            <Dialog 
                open={dialogOpen}
                onClose={handleClickCloseDialog}
            >
                <DialogTitle>New activity</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill information, please</DialogContentText>
                    <TextField
                          autoFocus
                          margin="dense"
                          name="date"
                          type="datetime-local"
                          value={newActivity.date}
                          onChange={event => handleClickChange(event)}
                          fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={newActivity.duration}
                        onChange={event => handleClickChange(event)}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={newActivity.activity}
                        onChange={event => handleClickChange(event)}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addActivity} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddActivity;