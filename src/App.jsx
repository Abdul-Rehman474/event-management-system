import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import MyEvents from './pages/MyEvents'
import NotFound from './pages/NotFound'
import EventDetails from './pages/EventDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Events />} />
      <Route path='/events/:id' element={<EventDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/my-events' element={<MyEvents />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
export default App