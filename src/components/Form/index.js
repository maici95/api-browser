


import React from 'react';

/* import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import style from '../../style'; */

/**
 *      Form's body
 */
const FBody = function FBody(props) {

    // handle form onsubmit -- return object of form's input
    function onSubmit(event) {
        event.preventDefault();

        const object = {};

        // get data out of form's input fields
        for (let input of event.target.children) {

            // if input is div element
            if (input.tagName === 'DIV') {
                const c = input.children;

                for (let cInput of c) {
                    object[cInput.name] = cInput.value;
                }
                continue;
            }

            if (input.name) {
                object[input.name] = input.value;
            }
        }

        // call next function after form is processed
        if (props.next) {
            props.next(object);
        }

    }

    return (
        <form onSubmit={onSubmit}>
            {props.children}
        </form>
    );
}


/**
 *      Form input field's label
 */
const FLabel = function FLabel(props) {

    const style = {
        background: '#222'
    }

    return (
        <input value={props.text} readOnly style={style} />
    );
}


/**
 *      Form input field
 */
const FInput = function FInput(props) {

    return (
        <input name={props.name} type={props.type || 'text'} defaultValue={props.defaultValue} />
/*         <>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.label}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl name={props.name} type={props.type || 'text'} defaultValue={props.defaultValue} />
        </> */
    );
}



/**
 *      Form button
 */
const FButton = function FButton() {

    const style = {
        background: 'tomato',
        color: '#333',
        fontWeight: 'bold'
    }

    return (
        //<Button type="submit">Go</Button>
        <input type="submit" value="Go" style={style} />
    );
}



/**
 *      Form textarea
 */
const FTextarea = function FTextarea(props) {

    const readOnly = props.readOnly || false;

    return (
        <textarea name={props.name} readOnly={readOnly} rows={props.rows} value={props.value} style={props.style} placeholder={props.placeholder} >
        </textarea>
    );
}



/**
 *      Form select element
 */
const FSelect = function FSelect(props) {

    //const [title, setTitle] = React.useState(props.title || 'method');

    return (
/*         <DropdownButton title={title}>
            <Dropdown.Item name={props.name}>Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
        </DropdownButton> */
        <select name={props.name}>
            {props.methods && props.methods.map((e, i) => {
                return (
                    <FOption key={i} value={e} />
                );
            })}
        </select>
    );
}



/**
 *      Form option element
 */
const FOption = function FOption(props) {

    return (
        <option>
            {props.value}
        </option>
    );
}




const Form = {
    FBody,
    FInput,
    FButton,
    FSelect,
    FLabel,
    FTextarea
}

export default Form;
