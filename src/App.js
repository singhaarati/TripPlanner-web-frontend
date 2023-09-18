import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { RequireAuth } from './utils/RequireAuth';
import { AuthProvider } from './utils/authContext';

import AddDestination from './components/AddDestination';
import Booking from './components/Booking';
import AboutUs from './components/Dashboard/AboutUs';
import DetailDestination from './components/DetailDestination';
import MyBookingsList from './components/MyBookings';
import Signup from './components/Signup';



function App() {
  return (
    <div className='container'>
      {/* <h1 className='text-center'>Trip Planner</h1> */}
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/destination/:id' element={<DetailDestination />} />
          <Route path='/bookings/:id' element={<RequireAuth><Booking /></RequireAuth>} />
          <Route path='/MyBookings' element={<MyBookingsList />} />
          <Route path='/AddDestination' element={<AddDestination />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

