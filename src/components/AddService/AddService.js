import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import './AddService.css'
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
    const { addServiceId } = useParams();
    const history = useHistory();
    const handleClose = (status) => {
        status === 'Okay' ? history.push('/') : history.push(`/newAdd-service/${addServiceId}`)
        setOpen(false);

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
                    <DialogTitle>Service now?(Default)</DialogTitle>
                    <p className="text-center">Click 'No' to chose date time of service</p>
                    <DialogActions>
                        <Button onClick={() => handleClose('Okay')} color="primary">
                            Okay
                        </Button>
                        <Button onClick={() => handleClose('No')} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </Modal>
        </div>
    );
}