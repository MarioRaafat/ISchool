import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from "@/components/Auth/Auth.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/author" element={
              <Auth />
            } />

            <Route path="*" element={<h1>Home</h1>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
