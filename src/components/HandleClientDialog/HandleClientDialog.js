import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './HandleClientDialog.css'
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
    const [clientType, setClientType] = React.useState('Tribe');
    const {clientId} = useParams();
    const history = useHistory()

    useEffect(() => {
        fetch('http://localhost:4000/clientUpdate', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: clientId,
                tribe: clientType,
            })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))

    }, [clientType, clientId])

    const handleClose = () => {
        setOpen(false);
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
                    <DialogTitle>Select New Client</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={clientType}
                                    onChange={(e) => setClientType(e.target.value)}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Tribe'}>Tribe</MenuItem>
                                    <MenuItem value={'Personal'}>Personal</MenuItem>
                                    <MenuItem value={'Private'}>Private</MenuItem>                        </Select>
                            </FormControl>
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