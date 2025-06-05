import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './Admin/Admin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Admin/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
