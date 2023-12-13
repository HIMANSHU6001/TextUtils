import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function TextArea(props) {
    const [text, setText] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("success", "Text Copied to the Clipboard");
    }

    const handleUp = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('success',' Converted to Uppercase');
    }

    const handleLo = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('success',' Converted to Lowercase');
    }

    const handleClear = () => {
        let newText = '';
        setText(newText);
        props.showAlert('success',' Text Cleared');
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    return (
        <>
            <div className="mb-3" >
                <h3 style={{color: props.mode === "dark" ? "white" : "black"}}>{props.heading}</h3>
                <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#042743' : 'white', color: props.mode === 'light' ? 'black' : 'white' }} value={text} onChange={handleChange} id="myBox" rows="10"></textarea>
                <button disabled={text.length === 0} onClick={handleUp} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Convert to Uppercase</button>
                <button disabled={text.length === 0} onClick={handleLo} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Convert to Lowercase</button>
                <button disabled={text.length === 0} onClick={handleClear} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Clear Text</button>
                <button disabled={text.length === 0} onClick={handleCopy} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Copy To Clipboard</button>
            </div>
            <div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h3>Text Summary</h3>
                <p>{text.split(" ").filter((element) => {return element.length !== 0 }).length} words and {text.length} charecters</p>
            </div>
        </>
    );
}

TextArea.propTypes = {
    heading: PropTypes.string
};

TextArea.defaultProps = {
    heading: "Enter a heading"
};