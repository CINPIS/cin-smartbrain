import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

        if (isSignedIn) {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '3em'}}>
                <p onClick={() => onRouteChange('signout')} className='f4 link dim black pa3 pointer code' style={{marginTop: '2em'}}>Sign Out</p>
                </nav>
            )

        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '3em'}}>
                    <p onClick={() => onRouteChange('signin')} className='f4 link dim black pa3 pointer code' style={{marginTop: '2em'}}>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f4 link dim black pa3 pointer code' style={{marginTop: '2em'}}>Register</p>
                </nav>
            );
        }
}
//pure function: simple component with no state
export default Navigation;