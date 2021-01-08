


import React from 'react';

import { Form, DropdownButton, Dropdown, Navbar, Row, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import History from './components/History';

function App(props) {

    const colStyle = {

    }

    const [history, setHistory] = React.useState([
        {method: 'POST', url: 'http://localhost:3000'},
        {method: 'POST', url: 'http://localhost:3000'},
        {method: 'POST', url: 'http://localhost:3000/test/dot/api/computer/uesrs/test/nogo/lists?id=235235253'}
    ]);

    function request() {
        const options = {
            method: method
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
                console.log(result);
            });
    }

    const [method, setMethod] = React.useState('GET');
//    const [url, setUrl] = React.useState('http://localhost:3000/users');
    const url = React.useRef(null);

    return (
        <div>
            <Navbar style={{background: '#444', color: '#ddd'}}>
                <h1 style={{fontSize: '26px'}}>API-browser</h1>
            </Navbar>


            <Row style={{margin: 0}}>
                <Col xs={3} style={{maxWidth: '360px'}}>
                    <History.List>
                        {history.map((e, i) => {
                            return (
                                <History.Item key={i} method={e.method} url={e.url} />
                            );
                        })}
                    </History.List>
                </Col>
                <Col>

                    <Row style={{padding: '20px 0'}}>
                        <Col xs={9}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <DropdownButton title={method} variant='outline' className='test' as={Button} style={{padding: 0, border: '0', background: '#ddd'}}>
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
                    
                    <Form.Control as='text'>

                    </Form.Control>

                </Col>
            </Row>



        </div>
    );
}

export default App;
