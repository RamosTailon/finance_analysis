import './estilo.css'


const DragDrop = ({dragEnd}) => {

	
	return (
		<div className='drag'>
			<div className='function'
				draggable
				value={'Input de número'}
				onDragEnd={(e) => dragEnd(e)}
			>
				<p>Valor</p>
			</div>
			<div className='function'
				draggable
				value={'Função de soma'}
				onDragEnd={(e) => dragEnd(e)}
			>
				<p>Soma</p>
			</div>
			<div className='function'
				draggable
				value={'Função de procurar valor'}
				onDragEnd={(e) => dragEnd(e)}
			>
				<p>Pesquisar Valor</p>
			</div>
			<div className='function'
				draggable
				value={'Output de resultado'}
				onDragEnd={(e) => dragEnd(e)}
			>
				<p>Resultado</p>
			</div>
		</div >
	)
}

export default DragDrop