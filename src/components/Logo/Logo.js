import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import guru from './guru.png';

const Logo = () => {
    return (
        <div className='ma5 mt0' style={{}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 20 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"><img src={guru} alt='logo' /> </div>
            </Tilt>
        </div>
    );
}
//pure function: simple component with no state
export default Logo;