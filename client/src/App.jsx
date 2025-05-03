import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import TasksPage from './pages/TasksPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <TasksPage />
    </>
  )
}

export default App
