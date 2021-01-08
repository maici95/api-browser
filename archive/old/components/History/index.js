


import React from 'react';

const HBody = function HBody(props) {

    return (
        <ul className='history-container'>
            {props.children}
        </ul>
    );
}

const HItem = function HItem(props) {

    const style = {
        padding: '10px',
        background: (props.index % 2 === 0) ? '#262626' : '#383838',
        display: 'flex',
        flexFlow: 'row'
    }

    return (
        <li style={style} onClick={props.onclick} className='history-item'>
            {props.children}
        </li>
    );
}

const History = {
    HBody,
    HItem
};

export default History;
