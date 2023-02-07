import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import DragDrop from './tests/DragDrop'
import WhiteBoard from './tests/WhiteBoard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WhiteBoard />
  </React.StrictMode>,
)
