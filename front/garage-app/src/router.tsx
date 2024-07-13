import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Car from "./pages/cars/Car";
import CarForm from "./pages/cars/CarForm";
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        children:[
            {
                path: "/",
                element: <Car/>
            },
            {
                path: "/detalhe/:id?",
                element: <CarForm/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
])

export { router };