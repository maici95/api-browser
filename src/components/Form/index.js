


// form's body
const Body = function Form(props) {

    function onSubmit(event) {
        event.preventDefault();

        const object = {};

        for (let input of event.target.children) {
            if (input.name) {
                object[input.name] = input.value;
            }
        }

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

// input field
const Input = function Input(props) {

    return (
        <input name={props.name} type={props.type || 'text'} defaultValue={props.defaultValue} />
    );
}

// button
const Button = function Button() {

    return (
        <input type="submit" />
    );
}

// select
const Select = function Select(props) {

    return (
        <select name={props.name}>
            {props.options && props.options.map((e, i) => {
                return (
                    <Option key={i} value={e} />
                );
            })}
        </select>
    );
}

// option
const Option = function Option(props) {

    return (
        <option>
            {props.value}
        </option>
    );
}

const Form = {
    Body,
    Input,
    Button,
    Select
}

export default Form;
