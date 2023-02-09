import React, { useEffect, useState } from 'react'
import './estilo.css'


const DragDrop = ({ parentCallback }) => {
	const [valueName, setValueName] = useState('');

	const onDragStart = (e, nodeType) => {
		e.dataTransfer.setData('application/reactflow', nodeType);
		e.dataTransfer.effectAllowed = 'move';
		setValueName(e.target.attributes[2].value)
	}

	useEffect(() => {
		// console.log(valueName)
		parentCallback(valueName)
	}, [valueName])
	return (
		<div className='drag'>
			<div className='function'
				draggable
				value={'Input de número'}
				onDragStart={(event) => onDragStart(event, 'input')}
			>
				<p>Valor</p>
			</div>
			<div className='function'
				draggable
				value={'Função de soma'}
				onDragStart={(event) => onDragStart(event, 'default')}
			>
				<p>Soma</p>
			</div>
			<div className='function'
				draggable
				value={'Função de Pesquisar'}
				onDragStart={(event) => onDragStart(event, 'default')}
			>
				<p>Pesquisar Valor</p>
			</div>
			<div className='function'
				draggable
				value={'Output de resultado'}
				onDragStart={(event) => onDragStart(event, 'output')}
			>
				<p>Resultado</p>
			</div>
		</div >
	)
}

export default DragDrop