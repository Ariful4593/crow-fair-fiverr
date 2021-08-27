import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';
import './NewDateTime.css'
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function ServerModal() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [open, setOpen] = useState(true);

    let currentdate = new Date();
    let hours = currentdate.getHours();
    let currentDatetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " "
        + hours + ":"
        + currentdate.getMinutes() + " " + (hours > 12 ? "PM" : "AM")

    const [datetime, setDateTime] = useState(currentDatetime)
    const { addNewServiceId } = useParams();
    const history = useHistory()


    const projectId = Math.random().toString(36).substring(7);
    const handleClose = () => {
        setOpen(false);
        fetch('http://localhost:4000/addServiceUpdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: addNewServiceId,
                projectId: projectId
            })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
        history.push('/')
    };

    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Pick custom date & time for servicing unit</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                defaultValue={datetime}
                                onClick={(e) => setDateTime(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Modal>
        </div>
    );
}