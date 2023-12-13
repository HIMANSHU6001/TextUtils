import React from 'react';

function Alert(props) {
    return (
        <div style={{height:"50px", marginTop:"20px"}}>
            {props.alert && <div className={`alert alert-${props.alert.msg} alert-dismissible fade show container px-4 fixed`} role="alert">
                {props.alert.text}
            </div>}
        </div>
    )
};

export default Alert