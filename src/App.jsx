import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, updateEdge, addEdge, Controls, useReactFlow } from 'reactflow';

import 'reactflow/dist/style.css';

import ColorSelectorNode from './nodes/ColorSelectorNode';
import DragDrop from './tests/DragDrop';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };


const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const [xPosition, setXPosition] = useState(10)
  const [yPosition, setYPosition] = useState(100)

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
        data: { onChange: onChanges, color: initBgColor },
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
  const [els, setEls] = useState(nodes)
  const yPos = useRef(0);
  const deleteNodeById = (id) => {
    setNodes(nds => nds.filter(node => node.id !== id));
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );

  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdates = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const addNodesCall = (e) => {
    let valor = e.target.attributes[2].value
    yPos.current += 50;
    console.log(e.clientX, e.clientY)
    setEls((els) => {
      console.log(els);
      return [
        ...els,
        {
          id: Math.floor(Math.random() * 100),
          height: 37,
          width: 150,
          type: 'input',
          data: { label: valor },
          // position: { x: 10, y: yPos.current },
          position: { x: e.clientX - 140, y: e.clientY - 320 },
          // position: { x: xPos, y: yPos },
          sourcePosition: 'right'
        }

      ]
    })
    setNodes([...nodes, ...els])
  }


  // const dragEnd = (e) => {
  //   let valor = e.target.attributes[2].value
  //   console.log(`criou ${valor}`)
  //   // console.log(e.clientX, e.clientY)
  //   setXPosition(e.clientX)
  //   setYPosition(e.clientY)
  //   addNodesCall()
  //   setNodes([...nodes, ...els])
  //   console.log(xPosition, yPosition)
  // }



  return (
    <div className='container'>
      <button onClick={addNodesCall}>Add</button>
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

        onEdgeUpdate={onEdgeUpdates}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}

      >

      </ReactFlow>
      <DragDrop dragEnd={addNodesCall} />
    </div>
  );
};

export default App;
