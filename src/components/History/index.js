


function List(props) {

    const style = {
        padding: '10px',
        overflow: 'auto',
        borderTop: '1px solid #ddd'
    }

    return (
        <ul style={style}>
            {props.children}
        </ul>
    );
}

function Item(props) {

    const style = {
        listStyle: 'none',
        fontSize: '14px',
        lineHeight: '50px',
        overflow: 'auto',
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
        cursor: 'pointer'
    };

    return (
        <li style={style} className='history-item' onClick={props.onClick}>
            <div style={{float: 'left', minWidth: '40px', width: '30%', lineHeight: '24px'}}>{props.method}</div>
            <div style={{float: 'left', width: '70%', lineHeight: '24px', wordBreak: 'break-all'}}>{props.url}</div>
        </li>
    );
}

const History = {
    List,
    Item
}

export default History;
