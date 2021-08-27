import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import './DeleteService.css'
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
}));

export default function ServerModal() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [open, setOpen] = React.useState(true);
    const { deleteServiceId, docId } = useParams();
    const history = useHistory()


    console.log(deleteServiceId, docId)
    const handleClose = (status) => {
        setOpen(false);
        if (status === 'Ok') {
            fetch(`http://localhost:4000/deleteService/${deleteServiceId}/${docId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(result => console.log(result))
                .catch(err => console.log(err))

            history.push('/')
            window.location.reload()
        }else{
            history.push('/')
        }

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
                    <DialogTitle>Delete this service record?</DialogTitle>

                    <DialogActions>
                        <Button onClick={() => handleClose('Cancel')} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleClose('Ok')} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Modal>
        </div>
    );
}