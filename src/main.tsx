import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthRoot from './pages/AuthRoot/AuthRoot'
import Login from './pages/Login'
import DashboardRoot from './pages/DashboardRoot/DashboardRoot'
import ReadItems from './pages/ReadItem/ReadItems'
import ShowItem from './pages/ShowItem/ShowItem'
import AddItem from './pages/AddItem/AddItem'
import EditItem from './pages/EditItem/EditItem'
import Register from './pages/Register/Register'

const router = createBrowserRouter([
{
    path: "/",
    element: <AuthRoot />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ]
  },
{
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
        path: "",
        element: <ReadItems />,
      },
      {
        path: "show/:id",
        element: <ShowItem />,
      },
      {
        path: "add",
        element: <AddItem />,
      },
      {
        path: "edit/:id",
        element: <EditItem />,
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
