import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from '../top/Profile';
import Museums from '../Museums';
import MuseumProfile from '../MuseumProfile';
import PaintingProfile from '../PaintingProfile';
import { Container } from '@mui/material';
import '../../css/App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [museums, setMuseums] = useState([]);

  useEffect(() => {
    fetch("/museums")
      .then((r) => r.json())
      .then((data) => setMuseums(data))
      .catch(() => alert("Error!"))
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/locations' element={<Museums museums={museums} />} />
          <Route path='/locations/:id' element={<MuseumProfile museums={museums} />} />
          <Route path='/paintings/:id' element={<PaintingProfile museums={museums} />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
