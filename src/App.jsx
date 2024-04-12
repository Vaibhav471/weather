import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Table from './assets/Table'
import Weather from './assets/Weather'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' Component={Table}/>
        <Route path='/weather' Component={Weather}/>
    </Routes>
    </>
  )
}

export default App
