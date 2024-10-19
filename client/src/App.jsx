import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Auth from "@/components/Auth/Auth.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/auth" element={
              <Auth />
            } />

            <Route path="*" element={
                <Navigate to="/auth"/>
                }
            />
        </Routes>
    </BrowserRouter>
  )
}

export default App
