import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'



const root = createRoot(document.getElementById('root'))

const CreateButton = () => {
  return <button>Hola button</button>
}

root.render(
  <Fragment>
    {CreateButton()}
    {CreateButton()}
    {CreateButton()}
  </Fragment>
  
)
