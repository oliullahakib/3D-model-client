import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import axios from "axios";
import ModelDetails from "../pages/ModelDetails";
import AddModel from "../pages/AddModal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllModels from "../pages/AllModels";
import UpdateModel from "../pages/UpdateModel";
import MyModels from "../pages/MyModels";
import MyDownlod from "../pages/MyDownlod";
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
            },
            
            {
                path:'/all-models',
                Component:AllModels,
                 loader:()=>axios.get(`http://localhost:3000/models`)
            },
            {
                path:'/update-model/:id',
                Component:UpdateModel,
                 loader:({params})=>axios.get(`http://localhost:3000/model-details/${params.id}`)
            },
            {
                path:'/my-models',
                element:<PrivateRoute><MyModels/></PrivateRoute>
            },
            {
                path:'/my-downloads',
                element:<PrivateRoute><MyDownlod/></PrivateRoute>
            }

        ]
    }
])