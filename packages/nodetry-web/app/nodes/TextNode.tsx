import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };



export default function TextUpdaterNode({ data }: any) {
    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);


    const handleStyle = {
        width: '28px',
        height: '28px',
        border: '5px solid white',
    };

    const handleStyleLeft = {
        ...handleStyle,
        marginLeft: '-10px',
    };

    const handleStyleRight = {
        ...handleStyle,
        marginRight: '-10px',
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    top: '40px',
                    ...handleStyleLeft,
                }}
                id="d"
            />
            <Handle type="target" position={Position.Left} style={{top: '80px', ...handleStyleLeft}} id="c" />
            <div
                style={{
                    height: '200px',
                    background: 'white',
                    color: 'black',
                }}
            >
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" style={{background: '#ccc'}} />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            />

            <Handle
                type="source"
                position={Position.Right}
                style={{
                    top: '80px',
                    ...handleStyleRight,
                }}
                id="e"
            />
        </>
    );
}
