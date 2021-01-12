


import React from 'react';

import { /* Accordion, Card, Button, Nav */ Table, FormControl, Button } from 'react-bootstrap';


/**
 * @prop {array} data array for checked, key and value objects
 * @prop {function} sendData return data array when array's item is changed
 * 
 */
function FormTable(props) {

    const [data, setData] = React.useState(props.data);

    // remove item from array
    function removeItem(i) {
        const tempData = data;
        tempData.splice(i, 1);
        setData(() => [...tempData]);
        props.sendData(() => [...tempData]);
    }

    // add item to array
    function addItem() {
        const tempData = data;
        tempData.push({
            checked: true,
            key: '',
            value: ''
        });
        setData(() => [...tempData]);
        props.sendData(() => [...tempData]);
    }

    // update item in array
    function updateItem(e, i, key) {
        const tempData = data;
        if (key === 'checked') {
            tempData[i][key] = !tempData[i][key];
        } else {
            tempData[i][key] = e.target.value;
        }
        setData(() => [...tempData]);
        props.sendData(() => [...tempData]);
    }

    return (
        <Table striped bordered>
            <thead>
                <tr style={{background: '#F2F2F2'}}>
                    <th colSpan='4'>
                        {props.title}
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i) => {
                    return (
                        <tr key={i}>
                            <td onClick={(e) => { 
                                for (let i of e.target.children) {
                                    if (i.click) i.click();
                                }
                             }}>
                                <input type='checkbox' defaultChecked={e.checked} onChange={(e) => updateItem(e, i, 'checked')} style={{marginTop: '10px'}}/>
                            </td>
                            <td>
                                <FormControl placeholder='key' defaultValue={e.key} onChange={(e) => updateItem(e, i, 'key')} />
                            </td>
                            <td>
                                <FormControl placeholder='value' defaultValue={e.value} onChange={(e) => updateItem(e, i, 'value')} />
                            </td>
                            <td><Button variant='danger' onClick={() => removeItem(i)}>remove</Button></td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan='4'>
                        <Button variant='dark' onClick={addItem}>new item</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default FormTable;
