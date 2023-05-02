import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Museums from '../Museums';
import MuseumProfile from '../MuseumProfile';
import LoginForm from '../sessions/LoginForm';
import Profile from '../top/Profile';
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
          <Route path="/profile" element={<Profile />} />
          <Route path='/museums' element={<Museums museums={museums} />} />
          <Route path='/museums/:id' element={<MuseumProfile museums={museums} />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
