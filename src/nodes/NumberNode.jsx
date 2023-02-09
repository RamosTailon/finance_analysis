import React, { memo } from 'react'
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
				style={{ background: '#ecf31a' }}
				onConnect={(params) => console.log('handle onConnect', params)}
				isConnectable={isConnectable}
			/>
			<div>
				Número <strong>{data.numberRender}</strong>
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