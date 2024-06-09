import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import axios from 'axios'

axios.defaults.baseURL = 'https://ramarfx-todo-api.vercel.app/api'
axios.defaults.headers.common.Accept = 'application/json'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
