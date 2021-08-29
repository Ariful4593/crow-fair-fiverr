import React from 'react';
import './Buttons.css';
import addUnit from '../../images/addunit.png'
import { Link } from 'react-router-dom';
import person from '../../images/person.png'


const Buttons = ({ handleUser, lat, lng }) => {

    
    return (
        <div className=" add-button">
            <button onClick={handleUser} className="border mr-4" style={{ marginLeft: '-60px' }}><img className="" src={person} alt="" /></button>
            <Link to={`/addNew-tribe/${lat}/${lng}`}>
                <button className="border"><img className="" src={addUnit} alt="" /></button>
            </Link>
        </div>
    );
};

export default React.memo(Buttons);