import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Auth from './ui/Auth';

export default function AppRouter() {
    return (
        <div className="w-full flex flex-col justify-center">
            <Auth />
            <hr className='mb-10' />

            <Routes>
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}