import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f4 code washed-yellow'>
                {'This Magic Brain will detect faces in your pictures. Git it a try!'}
            </p>
            <div className="center">
                <div className='form center shadow-5 br3 pa4'>
                    <input type='text' placeholder='Insert a link' className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button 
                        onClick={onButtonSubmit} 
                        className='w-30 grow f4 link ph3 pv2 dib gray bg-washed-red'>Detect</button>
                </div>
            </div>
        </div>
    );
}
//pure function: simple component with no state
export default ImageLinkForm;