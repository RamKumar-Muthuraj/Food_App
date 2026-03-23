import React from 'react'
import { UserProvider } from './API/currentUserContext'
import { RouterProvider } from 'react-router-dom'
import "./index.css";
import { router } from './routes/routes';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
