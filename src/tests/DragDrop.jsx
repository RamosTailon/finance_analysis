import './estilo.css'


const DragDrop = () => {
	const testes = (e) => {
		console.log(e.clientX, e.clientY)
	}
	return (
		<div className='drag'>
			<div className='function' onMouseMove={testes}>
				<p>Valor</p>
			</div>
			<div className='function'>
				<p>Soma</p>
			</div>
			<div className='function'>
				<p>Pesquisar Valor</p>
			</div>
			<div className='function'>
				<p>Resultado</p>
			</div>
		</div >
	)
}

export default DragDrop