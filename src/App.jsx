import React from 'react'
import SelectDefault from './components/Dropdown'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDefault from './components/Select'
import { Select, Option } from "@material-tailwind/react";
import Coding from './components/Coding';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputDefault />} />
          <Route path="/create-repl" element={<Coding />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App