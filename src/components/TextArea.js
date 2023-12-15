import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function TextArea(props) {
    const [text, setText] = useState('');
    const [memento, setMemento] = useState([]);
    const [callEffect, setCallEffect] = useState(false);

    useEffect(() => {
        console.log("in effect", callEffect);
        if (callEffect) {
            updateMementos();
        }
    }, [text])

    const updateMementos = () => {
        if (memento.length < 10) {
            setMemento([...memento, ...[text]]);
        } else {
            memento.shift();
            setMemento([...memento, ...[text]]);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("success", "Text Copied to the Clipboard");
    }

    const handleUp = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('success', ' Converted to Uppercase');

    }

    const handleLo = () => {
        let newText = text.toLocaleLowerCase();
        setText(newText);
        props.showAlert('success', ' Converted to Lowercase');

    }

    const handleClear = () => {
        setText("");
        props.showAlert('success', ' Text Cleared');
    }

    const handleChange = (event) => {
        setCallEffect(true);
        setText(event.target.value);
        setRedo([]);
        setEnableUndo(true);
    }

    const handleWhiteSpaces = () => {
        setText(text
            .split(" ")
            .filter(function (x) { return x !== ""; })
            .join(" ")
        );
    }
    const handleCapitalize = () => {
        setText(text
            .split(" ")
            .map(function (x) {
                if (x.length > 0) {
                    return x.charAt(0).toUpperCase() + x.slice(1);
                }
            })
            .join(" ")
        );
        props.showAlert('success', 'Text Capitalized');
    }

    const handleExtractNum = () => {
        if (Boolean(text.match(/\d+/g))) {
            setText(text.match(/\d+/g).join(", "));
            props.showAlert('success', 'Numbers Extracted');
        } else {
            props.showAlert('warning', 'No Numbers found');
        }
    }

    const handlExtractLink = () => {
        var urlR = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
        var urls = text.split('\n').join(" ").split(" ").filter(element => { return element.match(urlR) });
        if (urls.length !== 0) {
            setText(urls.join("\n"));
            props.showAlert('success', `Found ${urls.length} Links`);
        } else {
            props.showAlert('warning', 'No Links found')
        }
    }

    const [redo, setRedo] = useState([]);
    const [enableRedo, setEnableRedo] = useState(false);
    const [enableUndo, setEnableUndo] = useState(false);

    const handleUndo = () => {
        setEnableRedo(true);
        setCallEffect(false);
        if (memento.length > 1) {
            setText(memento[memento.length - 2]);
            setRedo([...redo, ...[memento.pop()]]);
        } else { setEnableUndo(false) }
    }
    const handleRedo = () => {
        setCallEffect(true);
        if (redo.length > 0) {
            setText(redo.pop());
        } else { setEnableRedo(false) }
    }
    const handleReverse = () => {
        setText(text.split("").reduce((acc, char) => char + acc, ""));
    }

    const handleSpecialChar = () => {
        const specialChars = /[^a-zA-Z0-9 ]/g;
        if (specialChars.test(text)) {
            props.showAlert("success", "Special charecter Removed");
        } else {
            props.showAlert("warning", "No Special charecter found");
        }
        setText(text.replace(/[^a-zA-Z0-9 ]/g, ''));
    }


    return (
        <>
            <div className="mb-3" >
                <h3 style={{ color: props.mode === "dark" ? "white" : "black" }}>{props.heading}</h3>
                <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#042743' : 'white', color: props.mode === 'light' ? 'black' : 'white' }} value={text} onChange={handleChange} id="myBox" rows="10"></textarea>
                <button disabled={text.length === 0} onClick={handleUp} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Convert to Uppercase</button>
                <button disabled={text.length === 0} onClick={handleLo} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Convert to Lowercase</button>
                <button disabled={text.length === 0} onClick={handleCapitalize} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Capitalize</button>
                <button disabled={text.length === 0} onClick={handleReverse} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Reverse Text</button>
                <button disabled={text.length === 0} onClick={handleWhiteSpaces} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Remove White spaces</button>
                <button disabled={text.length === 0} onClick={handleSpecialChar} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Remove Special Charecters</button>
                <button disabled={text.length === 0} onClick={handleExtractNum} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Extract Numbers</button>
                <button disabled={text.length === 0} onClick={handlExtractLink} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Extract Links</button>
                <button disabled={text.length === 0} onClick={handleClear} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Clear Text</button>
                <button disabled={text.length === 0} onClick={handleCopy} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Copy To Clipboard</button>
                <button disabled={!enableUndo} onClick={handleUndo} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Undo</button>
                <button disabled={!enableRedo} onClick={handleRedo} className={`mx-1 my-3 btn btn-${props.mode === 'dark' ? 'light' : 'dark'}`}>Redo</button>
            </div>
            <div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h3>Text Summary</h3>
                <p>{text.split(" ").filter((element) => { return element.length !== 0 }).length} words and {text.length} charecters</p>
            </div>
            <div className="container text-center">
                <span>Made with ❤️ by Himanshu Kaushik.<a href="https://github.com/HIMANSHU6001/TextUtils" style = {{fontSize: "2em", color: "black", marginLeft: "0.9rem"}}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z">
                            </path></svg></a></span></div>
        </>
    );
}

TextArea.propTypes = {
    heading: PropTypes.string
};

