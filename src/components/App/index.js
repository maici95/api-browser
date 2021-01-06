


import React from 'react';
import Form from "../Form";

const options = ['GET', 'POST', 'PATCH', 'DELETE'];

export default function App() {

    function test(object) {
        const options = {
            method: object.method,
            'Content-Type': 'application/json'
        }

        fetch(object.url, options)
            .then(res => res.json())
            .then(r1 => {
                console.log(r1);

            });
    }


    return (
        <div>
            <h1>API-browser</h1>

            <Form.Body next={test}>
                url: <Form.Input name="url" defaultValue="http://localhost:3000/test" />
                method: <Form.Select options={options} name="method" />

                <Form.Button />
            </Form.Body>

            <br/>
            <br/>
            <br/>


        </div>
    );
}
