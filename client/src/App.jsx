
import './App.css'

import Web3StateProvider from './context/Web3StateProvider'
import routes from './routes/routes'
import {RouterProvider} from 'react-router-dom';

function App() {

  return (
    <div> 
      <Web3StateProvider>
        <RouterProvider router={routes}/>
      </Web3StateProvider> 
    </div>
  )
}

export default App
