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
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    fetch("/museums")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            const paintingList = [];
            data.forEach((museum) => museum.paintings.forEach((paint) => paintingList.push(paint)));
            paintingList.sort((a, b) => a.id - b.id);
            setMuseums(data);
            setPaintings(paintingList);
          })
        } else {
          r.json().then((error) => alert(error))
        }
      })
  }, [])

  function handleNewPainting(newPainting) {
    setPaintings([...paintings, newPainting])
  }

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile' element={<Profile museums={museums} paintings={paintings} onNewPainting={handleNewPainting} />} />
          <Route path='/locations' element={<Museums museums={museums} />} />
          <Route path='/locations/:id' element={<MuseumProfile museums={museums} paintings={paintings} />} />
          <Route path='/paintings/:id' element={<PaintingProfile paintings={paintings} museums={museums} />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
