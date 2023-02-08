import React from 'react'
import './estilo.css'


const DragDrop = () => {

	const onDragStart = (e, nodeType) => {
		e.dataTransfer.setData('application/reactflow', nodeType);
		e.dataTransfer.effectAllowed = 'move';
	}

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