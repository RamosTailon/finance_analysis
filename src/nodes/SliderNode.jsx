import React from 'react'
import { Handle } from 'reactflow';

const SliderNode = ({ data, isConnectable }) => {
	return (
		<>
			<div>
				Range de 0 a 10
			</div>
			<input
				className="nodrag"
				type="range"
				onChange={data.onChange}
				min={0}
				max={10}
				id="" />
			<Handle
				type="source"
				position="right"
				style={{ background: '#ecf31a' }}
				isConnectable={isConnectable}
			/>
		</>
	)
}

export default SliderNode