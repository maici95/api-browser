


import React from 'react';
import Form from "../Form";
import History from '../History';

const methods = ['GET', 'POST', 'PATCH', 'DELETE'];

export default function App() {

    function test(object, noTrack) {
        const options = {
            method: object.method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                mode: 'cors',
            }
        }

        if (object.method === 'POST' || object.method === 'PATCH') {
            const obj = '{'+object.formBody+'}';
            options.body = obj;
        }

        if (!noTrack) {
            let tempHistory = history;
            tempHistory.push(object);
            setHistory(() => [...tempHistory]);
        }

        fetch(object.url, options)
            .then(res => res.json())
            .then(r1 => {

                console.log(r1);
                setResult(
                    JSON.stringify(r1, null, '\t')
                );

            });
    }

    const [result, setResult] = React.useState('[\n]');
    const [history, setHistory] = React.useState([]);

    return (
        <div style={{width: '800px', margin: '0 auto'}}>
            <h1>API-browser</h1>

            <Form.FBody next={test}>

                <div className='form-container'>
                    <Form.FLabel text='url' />
                    <Form.FInput name='url' label='url' defaultValue='http://localhost:3000/test' />
                    <Form.FSelect name='method' methods={methods} /><br/>

                    <Form.FLabel text='body' />
                    <Form.FTextarea name='formBody' rows='4' placeholder={'"username": "maici95"'} />
                    <br/>
                    <Form.FButton />
                    
                </div>
            </Form.FBody>

            <br/>
            history:
            <History.HBody>
                {history.map((e, i) => {

                    return (
                        <History.HItem key={i} index={i} onclick={() => test(e, true)}>
                            <div style={{width: '100px'}}>{e.method}</div>
                            <div>{e.url}</div>
                        </History.HItem>
                    );
                })}
            </History.HBody>

            <br/>
            result:
            <Form.FTextarea readOnly rows='20' value={result} style={{width: '100%'}}></Form.FTextarea>

            <br/>
            <br/>
            <br/>


        </div>
    );
}
