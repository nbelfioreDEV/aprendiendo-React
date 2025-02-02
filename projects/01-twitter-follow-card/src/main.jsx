import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const root = createRoot(document.getElementById('root'))

const CreateButton = () => {
  return <button>Hola button</button>
}

root.render(
  <App />
)