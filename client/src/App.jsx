import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Auth from "@/components/Auth/Auth.jsx";
import Home from "@/components/home/home.jsx";
import Courses from "@/components/courses/coursesStudent.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/auth" element={
              <Auth />
            } />

            <Route path="/home" element={
                <Home />
            } />
			  <Route path="/courses" element={
				<Courses />
			} />
            <Route path="*" element={
                <Navigate to="/auth"/>
            }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
