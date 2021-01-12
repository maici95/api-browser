


import React from 'react';

import { Form, DropdownButton, Dropdown, Navbar, Row, Col, InputGroup, FormControl, Button,
    Accordion, Tabs, Tab,
    Card

} from 'react-bootstrap';
import History from './components/History';
import FormTable from './components/FormTable';


function App(props) {

    const [history, setHistory] = React.useState([]);
    const [response, setResponse] = React.useState({});

    const [formBody, setBody] = React.useState([]);

    const opts = [
        {title: 'Authorization', data: [], func: () => {}, disabled: true},
        {title: 'Params', data: [], func: () => {}, disabled: true},
        {title: 'Headers', data: [], func: () => {}, disabled: true},
        {title: 'Body', data: formBody, func: setBody}
    ];

    // send request to server
    function request() {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (method === 'POST' || method === 'PATCH') {
            const body = {}
            for (let i of formBody) {
                if (i.value !== '' && i.checked) {
                    body[i.key] = i.value;
                }
            }
            options.body = JSON.stringify(body);
        }

        const tempHistory = history;
        tempHistory.push({
            method: method,
            url: url.current.value
        });
        setHistory(() => [...tempHistory]);

        fetch(url.current.value, options)
            .then(res => res.json())
            .then(result => {
                setResponse(result);
            });
    }

    const [sideBarHeight, setSideBarHeight] = React.useState(100);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (!loaded) {
            resize();
            window.addEventListener('resize', resize);
            window.addEventListener('zoom', resize);
            setLoaded(true);
        }
    }, [loaded]);


    function resize() {
        setSideBarHeight(0);
        const body = document.querySelector('body');
        const html = document.querySelector('html');
        const height = Math.max(body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        setSideBarHeight(height - 55);
    }

    const [method, setMethod] = React.useState('GET');
    const url = React.useRef(null);

    return (
        <div>
            <Navbar style={{background: '#343A40', color: '#ddd'}}>
                <h1 style={{fontSize: '26px'}}>API-browser</h1>
            </Navbar>

            <Row style={{margin: 0}}>
                <Col xs={3} style={{paddingTop: '20px', maxWidth: '360px', height: sideBarHeight + 'px', background: '#f5f5f5', borderRight: '2px solid #ddd'}}>
                    <Tabs defaultActiveKey='history' id='uncontrolled-tab-example'>
                        <Tab eventKey='history' title='History'>
                            <History.List>
                                <Button variant='danger' onClick={() => setHistory([])} style={{width: '100%', margin: '10px 0'}}>clear all</Button>
                                {history.map((e, i) => {
                                    return (
                                        <History.Item key={i} method={e.method} url={e.url} onClick={() => {
                                                setMethod(e.method);
                                                url.current.value = e.url;
                                            }}
                                        />
                                    );
                                })}
                            </History.List>
                        </Tab>
                    </Tabs>
                </Col>

                <Col>
                    <Row style={{padding: '20px 0'}}>
                        <Col xs={9}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <DropdownButton title={method} variant='outline' className='test' style={{padding: 0, border: '0', borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px', background: '#ddd'}}>
                                        {['GET', 'POST', 'PATCH', 'DELETE'].map((e, i) => {
                                            return (
                                                <Dropdown.Item key={i} onClick={() => setMethod(e)}>{e}</Dropdown.Item>
                                            );
                                        })}
                                    </DropdownButton >
                                </InputGroup.Prepend>
                                <FormControl placeholder='http://localhost:3000/users' ref={url} defaultValue='http://localhost:3000/users' />
                            </InputGroup>
                        </Col>
                        <Col xs={3}>
                            <Button style={{float: 'right', width: '100%'}} variant='dark' onClick={request}>Go</Button>
                        </Col>
                    </Row>

                    <Accordion defaultActiveKey='-1'>
                        <Card>
                            <div style={{padding: '', background: '#343A40', borderTopLeftRadius: '3px', borderTopRightRadius: '3px'}}>
                                {opts.map((e, i) => {
                                    return (
                                        <Accordion.Toggle variant='link' as={Button} disabled={e.disabled} eventKey={i.toString()} key={i}>
                                            <div style={{color: '#ddd'}}>
                                                {e.title}
                                            </div>
                                        </Accordion.Toggle>
                                    );
                                })}
                            </div>
                                {opts.map((e, i) => {
                                    return (
                                        <Accordion.Collapse eventKey={i.toString()} key={i}>
                                            <FormTable title={e.title} data={e.data} sendData={e.func} />
                                        </Accordion.Collapse>
                                    );
                                })}
                        </Card>
                    </Accordion>

                    <br/>

                    <Form.Control style={{fontSize: '12px', height: '400px', background: '#f5f5f5'}} readOnly as='textarea' value={JSON.stringify(response, null, '\t')} />

                </Col>
            </Row>
        </div>
    );
}

export default App;
