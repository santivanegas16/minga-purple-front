import { createBrowserRouter, redirect } from "react-router-dom";
import Index from './Index'
import Register from './Register'
import NotAllowed from "./NotAllowed";
import CiaForm from './CiaForm'
import Main from '../layouts/Main'
import AuthorForm from './AuthorForm'
import MangaForm from './MangaForm';
import Login from './Login';
import ChapterForm from "./ChapterForm";

const router = createBrowserRouter([
    //necesita que pasemos un array de objetos
    //cada objeto tendra la propiedad PATH con la ruta y ELEMENT con el elemento que renderiza ese path
    {
        path: '/', // con una ruta
        element: <Main />, // renderizo un componente de tipo layaout
        children: [ // cuyos hijos van a ser todas las interfaces que tenga la app
            { path: '/', element: <Index /> },
            { path: '/index', element: <Index /> },
            { path: '/home', element: <Index /> },
            {
                path: '/register', element: <Register />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))
                    return (user) && redirect("/")
                }
            },
            {
                path: '/login', element: <Login />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))
                    return (user) && redirect("/")
                }
            },
            {
                path: '/cia-form', element: <CiaForm />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))
                    
                    user ? user = { role: user.role } : user = { role: 1 }

                    return (user.role === 1 || user.role === 2 || user.role === 3) && redirect("/not-allowed")
                }
            },
            {
                path: '/author-form', element: <AuthorForm />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))
                    
                    user ? user = { role: user.role } : user = { role: 1 }

                    return (user.role === 1 || user.role === 2 || user.role === 3) && redirect("/not-allowed")
                }
            },
            {
                path: '/manga-form', element: <MangaForm />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))

                    user ? user = { role: user.role } : user = { role: 0 }
                    
                    return (user.role === 0 || user.role === 3) && redirect("/not-allowed")
                }
            },
            {
                path: '/:manga_id/chapther-form', element: <ChapterForm />, loader: async () => {
                    let user = JSON.parse(localStorage.getItem("user"))
                    
                    user ? user = { role: user.role } : user = { role: 0 }

                    return (user.role === 0 || user.role === 3) && redirect("/not-allowed")
                }
            },
            { path: '/not-allowed', element: <NotAllowed /> },
        ]
    }
])

export default router