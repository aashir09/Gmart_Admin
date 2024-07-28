import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Add_item from './Pages/Add_item/Add_item'
import List_item from './Pages/List_item/List_item'
import Orders from './Pages/Orders/Orders'
import Edit_item from './Pages/Edit_item/Edit_item'
function App() {
  return (
    <>
    <div >
        <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path="/Add_item" element={<Add_item />} />
        <Route path="/Edit_item/:id" element={<Edit_item />} />
        <Route path='/List_item' element={<List_item/>} />
        <Route path='/Orders' element={<Orders/>} />
        </Routes>
      </div>
      </>
  )
}

export default App
