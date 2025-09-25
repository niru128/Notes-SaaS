
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Notes from './Pages/Notes.jsx'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/notes' element={<Notes/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
