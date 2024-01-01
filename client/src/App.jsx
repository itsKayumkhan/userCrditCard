import React from 'react'
import Home from './pages/Home'
import Card from './components/Card'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/card/:id" element={<Card/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
