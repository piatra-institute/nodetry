'use client';

import React, {
    useState,
    useCallback,
    useEffect,
} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';

import TextNode from './nodes/TextNode';



const initialNodes: Node[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: {
            label: '1aaa',
        },
    },
    {
        id: '2',
        position: { x: 0, y: 100 },
        data: {
            label: '2bbbb',
        },
    },
    {
        id: '3',
        type: 'textNode',
        position: { x: 0, y: 200 },
        data: {
            label: '3ccc',
        },
    },
];
const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3d', source: '2', target: '3', targetHandle: 'c' },
];

const nodeTypes = { textNode: TextNode };

const UNICODE = {
    MINUS: '\uFF0D',
    PLUS: '\uFF0B',
};



function AddNode ({
    add,
} : {
    add: (type: string) => void,
}) {
    const [show, setShow] = useState(false);


    const nodes = [
        {
            type: 'textNode',
            label: 'text node',
        },
        {
            type: 'rhymeNode',
            label: 'rhyme node',
        },
        {
            type: 'meterNode',
            label: 'meter node',
        },
        {
            type: 'themeNode',
            label: 'theme node',
        },
        {
            type: 'flowNode',
            label: 'flow node',
        },
        {
            type: 'punctuationNode',
            label: 'punctuation node',
        },
        {
            type: 'referenceNode',
            label: 'reference node',
        },
    ];

    return (
        <div
            className="absolute top-0 left-0 z-50"
        >
            <button
                className={`bg-white text-black font-bold py-2 px-4 m-[15px] ${show ? 'opacity-70' : ''}`}
                onClick={() => setShow(!show)}
            >
                {show ? UNICODE.MINUS : UNICODE.PLUS} add node
            </button>

            {show && (
                <div
                    className='bg-white text-black font-bold m-[15px] mt-0'
                >
                    <ul>
                        {nodes.map((node) => {
                            return (
                                <li
                                    className='cursor-pointer select-none hover:bg-gray-200 py-1 px-4'
                                    key={node.type + Math.random()}
                                    onClick={() => add(node.type)}
                                >
                                    {node.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}


function Nodetry () {
    return (
        <div
            className='absolute top-0 right-0 z-50'
        >
            <div
                className='bg-white text-black m-[15px] p-8 min-w-[400px]'
            >
                <h1
                    className='text-2xl font-bold text-center'
                >
                    nodetry
                </h1>

                <p>
                    try again
                </p>

                <p>
                    fail again
                </p>

                <p>
                    fail better
                </p>
            </div>
        </div>
    );
}


function Compute () {
    const [computing, setComputing] = useState(false);

    useEffect(() => {
        if (computing) {
            setTimeout(() => {
                setComputing(false);
            }, 1000);
        }
    }, [
        computing,
    ]);

    return (
        <div
            className="absolute top-0 left-1/2 z-50"
            style={{ transform: 'translateX(-50%)' }}
        >
            <button
                className={`bg-white text-black font-bold py-2 px-4 m-[15px] ${computing ? 'opacity-70 pointer-events-none' : ''}`}
                onClick={() => setComputing(true)}
            >
                {computing ? 'computing...' : 'compute'}
            </button>
        </div>
    );
}


function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div
            className="relative"
            style={{ width: '100vw', height: '100vh' }}
        >
            <AddNode
                add={(type) => {
                    setNodes((nodes) => [
                        ...nodes,
                        {
                            id: (nodes.length + 1).toString(),
                            type,
                            position: { x: 0, y: 0 },
                            data: {
                                label: 'new node',
                            },
                        },
                    ]);
                }}
            />

            <Compute />

            <Nodetry />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(
                    args,
                ) => {
                    onNodesChange(args);
                }}
                onEdgesChange={(
                    args,
                ) => {
                    onEdgesChange(args);
                }}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={{
                    style: {
                        strokeWidth: 5,
                    },
                }}
                fitView={true}
            >
                <Controls />
                <MiniMap />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </div>
    );
}


export default function Home() {
    return (
        <div>
            <Flow />
        </div>
    );
}
