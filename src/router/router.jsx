import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import axios from "axios";
import ModelDetails from "../pages/ModelDetails";
import AddModel from "../pages/AddModal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home,
                loader:()=>axios.get('http://localhost:3000/recent-model')
            },
            {
                path:'/model-details/:id',
                element:<PrivateRoute><ModelDetails/></PrivateRoute>,
                 loader:({params})=>axios.get(`http://localhost:3000/model-details/${params.id}`)
            },
            {
                path:'/add-model',
                element:<AddModel/>
            },
            {
                path:'/auth/login',
                element:<Login/>
            }
            ,
            {
                path:'/auth/register',
                Component:Register
            }
        ]
    }
])