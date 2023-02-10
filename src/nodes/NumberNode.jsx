import React from 'react'
import { Handle } from 'reactflow';

/*
node que é para renderizar um numero de outro texto
*/

const NumberNode = ({ data, isConnectable }) => {
	return (
		<>
			<Handle
				type="target"
				position="left"
				id="a"
				style={{ top: 10, background: '#ecf31a' }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position="left"
				id="b"
				style={{ bottom: 3, top: 'auto', background: '#ecf31a' }}
				isConnectable={isConnectable}
			/>
			<div>
				Número: <strong>{data.numberRender}</strong>
			</div>
			<Handle
				type="source"
				position="right"
				id="a"
				style={{ top: 15, background: '#1af3cb' }}
				isConnectable={isConnectable}
			/>
		</>
	)
}

export default NumberNode