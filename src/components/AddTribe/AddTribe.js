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
import TextField from '@material-ui/core/TextField';

import './AddTribe.css'
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddTribe = () => {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [open, setOpen] = React.useState(true);
    const { lat, lng } = useParams();

    const [client, setClient] = useState('Tribe');
    const [type, setType] = useState('Standard');
    const [age, setAge] = useState(0);
    const [rented, setRented] = useState('Yes');
    const [menuTitle, setMenuTitle] = useState('');
    const history = useHistory()


    const handleClose = (status) => {
        setOpen(false);
        if (status === 'Ok') {
            try {
                fetch('https://secure-everglades-52808.herokuapp.com/addTribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        menuTitle: menuTitle,
                        position: { lat: lat, lng: lng },
                        client: client,
                        type: type,
                        serviceAge: `${age} hours`,
                        rented: rented,
                        serviceTable: [],
                    })
                })
                    .then(res => res.json())
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                history.push('/')
            } catch(err) {

            }
        } else {
            try{
                history.push('/')
            }catch(err){
                
            }
        }

        // window.location.reload()
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
                    <DialogTitle>Enter Details for new units</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <TextField id="standard-basic2" className="border-0" label="Position" value={`${lat}, ${lng}`} /><br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Tribe'}>Tribe</MenuItem>
                                    <MenuItem value={'Personal'}>Personal</MenuItem>
                                    <MenuItem value={'Private'}>Private</MenuItem>                        </Select>
                            </FormControl><br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Standard'}>Standard</MenuItem>
                                    <MenuItem value={'Handicap'}>Handicap</MenuItem>
                                </Select>
                            </FormControl><br />
                            <TextField id="standard-basic5" value={age} onChange={(e) => setAge(e.target.value)} label="Next service(hours)" /><br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">Rented</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={rented}
                                    onChange={(e) => setRented(e.target.value)}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                </Select>
                            </FormControl><br />
                            <TextField id="standard-basic1" className="border-0" label="Description" value={menuTitle} onChange={(e) => setMenuTitle(e.target.value)} /><br />
                        </form>
                    </DialogContent>
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

export default React.memo(AddTribe)