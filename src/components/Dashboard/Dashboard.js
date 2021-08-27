import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Dashboard.css';
import Maps from '../Maps/Maps';
import { collectionContext } from '../../App';
import {
    Link
} from "react-router-dom";

import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import deleteIcon from '../../images/delete.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        textAlign: 'center',
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));



const Dashboard = () => {
    const classes = useStyles();

    const { value1 } = useContext(collectionContext);
    const [, setLongAndLat] = value1;
    const handleLngAndLat = (lat, lng) => {
        const center = {
            lat: lat,
            lng: lng
        };
        setLongAndLat(center);
    }

    const [userData, setUserData] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/userData')
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [])


    return (
        <div className="container dashboard-area">
            <div className="row">
                <div className="col-12 p-0">
                    <div className={classes.grow}>

                        <AppBar position="static">
                            <Toolbar>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Crow Fair
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
                <div className="col-md-4 list-area">
                    <div className={classes.root}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Units {userData.length}</Typography>
                            </AccordionSummary>
                            <div>
                                {
                                    userData.map((data, index) => {

                                        return (
                                            <Accordion key={index}>

                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`panel${data.areaControls}a-content`}
                                                    id={`panel${data.id}a-header`}
                                                >
                                                    <Typography className={classes.heading}><strong>{data.menuTitle}</strong></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className="user-data">
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.position}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p onClick={() => handleLngAndLat(data.lat, data.lng)} className="lang-and-lat">{`${data.lat}, ${data.lng}`}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p className="lang-and-lat-edit" >{data.positionStatus}</p>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.client}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p>{data.tribe}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <Link to={`/client-edit/${data._id}`}>
                                                                    <p className="client-edit">
                                                                        edit
                                                                    </p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.type}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="tr2">{data.category}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <Link to={`/type-edit/${data._id}`}>
                                                                    <p className="tr3">{data.typeStatus}</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.serviceAge}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="tr2">{data.duration}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <Link to={`/service-edit/${data._id}`} >
                                                                    <p className="tr3">{data.serviceAgeStatus}</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.rent}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="tr2">{data.rentState}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <Link to={`/rent-service/${data._id}`}>
                                                                    <p className="tr3">{data.rentStatus}</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{data.service}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="tr2">{data.blank}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <Link to={`/add-service/${data._id}`}>
                                                                    <p className="tr3">{data.plusServices}</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="row border">
                                                            <div className="col-12 text-center border">
                                                                <h3>History</h3>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 border">
                                                                <h5>Event</h5>
                                                            </div>
                                                            <div className="col-6 border">
                                                                <h5>Date</h5>
                                                            </div>
                                                        </div>
                                                        {
                                                            data.serviceTable.map((item, index) => (
                                                                <div className="row" key={`${index}${Math.random()}`
                                                                }>
                                                                    <div className="col-6 border">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <p>{item.eventType}</p>
                                                                            </div>
                                                                            <div className="col-6 text-center">
                                                                                <Link to={`delete-service/${item.id}/${data._id}`}>
                                                                                    <img style={{ height: '40px' }} src={deleteIcon} alt="" />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6 border">
                                                                        <p>{item.date}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })
                                }
                            </div>
                        </Accordion>

                    </div>
                </div>

                <div className="col-md-8 p-0" style={{height: '100vh'}}>
                    <Maps />
                </div>
            </div>
        </div >
    );
};

export default Dashboard;