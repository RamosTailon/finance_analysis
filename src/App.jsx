import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/style.css';

//CUSTOM NODES
import ColorSelectorNode from './nodes/ColorSelectorNode';
import NumberNode from './nodes/NumberNode';
import SliderNode from './nodes/SliderNode';

import DragDrop from './tests/DragDrop';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  custom: NumberNode,
  slider: SliderNode
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

let id = 0;
const getId = () => `dndnode_${id++}`;
const initNumber = 5
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const [number, setNumber] = useState(initNumber)


  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    const onChanges = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);
          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };
    const onChangesSlider = (e) => {
      setNodes((nds) =>
        nds.map((node) => {
          // if (node.id !== node.target) {
          //   return node;
          // }
          const numberRender = e.target.value

          setNumber(numberRender)
          return {
            ...node,
            data: {
              ...node.data,
              numberRender,
            },
          };
        })
      );
    }


    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'Investimento A' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChanges, color: bgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Retorno A' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Retorno B' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },
      {
        id: '5',
        type: 'custom',
        data: { onChange: onChangesSlider, numberRender: number },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 350, y: -10 }
      },
      {
        id: '6',
        type: 'slider',
        data: { onChange: onChangesSlider },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 0, y: -10 }
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);
  const deleteNodeById = (id) => {
    setNodes(nds => nds.filter(node => node.id !== id));
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, [])

  const [nameDrop, setNameDrop] = useState('')

  const getData = (data) => {
    setNameDrop(data)
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = e.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: e.clientX - reactFlowBounds.left,
      y: e.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: nameDrop },
    };
    setNodes((nds) => nds.concat(newNode))
  }, [reactFlowInstance, nameDrop]);


  return (
    <div className='container'>
      <ReactFlowProvider>
        <div style={{ width: '75%', height: '100%' }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={deleteNodeById}
            onConnect={onConnect}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultViewport={defaultViewport}
            fitView
            attributionPosition="bottom-left"

            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
          >
          </ReactFlow>
        </div>
        <DragDrop parentCallback={getData} />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
