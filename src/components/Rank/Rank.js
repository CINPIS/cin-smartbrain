import React from 'react';


const Rank = ({name, entries}) => {
    return (
        <div >
            <div className="f3 washed-yellow serif">
                {`Hi, ${name}!`}
            </div>
            
        </div>
    );
}
//pure function: simple component with no state
export default Rank;
