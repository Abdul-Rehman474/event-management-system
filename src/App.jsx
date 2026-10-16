import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import MyEvents from './pages/MyEvents'
import NotFound from './pages/NotFound'
import EventDetails from './pages/EventDetails'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path='/' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-events' element={<MyEvents />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App