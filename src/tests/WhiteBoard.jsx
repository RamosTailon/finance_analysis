import App from "../App"
import DragDrop from "./DragDrop"
import { useState } from 'react';


import './estilo.css'

const WhiteBoard = () => {
  const [xPosition, setXPosition] = useState(10)
  const [yPosition, setYPosition] = useState(100)
  const dragEnd = (e) => {
    let valor = e.target.attributes[2].value
    console.log(`criou ${valor}`)
    console.log(e.clientX, e.clientY)
    setXPosition(e.clientX)
    setYPosition(e.clientY)
  }


  return (
    <div className="quadro">
      <h1>Whiteboard</h1>
      <App />
    </div>
  )
}

export default WhiteBoard