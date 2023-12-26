import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <Link to='/'><h1 className='text-5xl shadow-2xl  w-2/4 p-20 border-black font-bold text-center my-5'>Online Admission</h1></Link>
      <Outlet></Outlet>
      <footer className='text-center mt-20'>
        <p className='font-bold '>Powered by</p>
        <p className='font-semibold text-gray-400'>UoB Computer Club</p>
      </footer>
    </>
  )
}

export default App
