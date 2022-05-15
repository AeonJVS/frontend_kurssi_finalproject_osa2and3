import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddCustomer = ({ saveCustomer }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    // HANDLERS
    const handleClickChange = (event) => {
        setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
    }

    const handleClickOpenDialog = () => {
        setDialogOpen(true);
    }
    
    const handleClickCloseDialog = () => {
        setDialogOpen(false);
    }

    // ADD-FUNCTION
    const addCustomer = () => {
        saveCustomer(newCustomer);
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
                Add a customer
            </Button>

            <Dialog 
                open={dialogOpen}
                onClose={handleClickCloseDialog}
            >
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill information, please</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={newCustomer.firstname}
                        onChange={event => handleClickChange(event)}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={newCustomer.lastname}
                        onChange={event => handleClickChange(event)}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={newCustomer.streetaddress}
                        onChange={event => handleClickChange(event)}
                        label="Street address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={newCustomer.postcode}
                        onChange={event => handleClickChange(event)}
                        label="Post code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={newCustomer.city}
                        onChange={event => handleClickChange(event)}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={newCustomer.email}
                        onChange={event => handleClickChange(event)}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={newCustomer.phone}
                        onChange={event => handleClickChange(event)}
                        label="Phone number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
export default AddCustomer;