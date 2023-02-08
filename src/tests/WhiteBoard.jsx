import App from "../App"
import DragDrop from "./DragDrop"
import { useState } from 'react';


import './estilo.css'

const WhiteBoard = () => {

  return (
    <div className="quadro">
      <h1>Whiteboard</h1>
      <App />
    </div>
  )
}

export default WhiteBoard