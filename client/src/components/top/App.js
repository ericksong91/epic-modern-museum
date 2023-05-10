import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/user';
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
  const [artists, setArtists] = useState([]);
  const { user } = useContext(UserContext);

  //Museums is structured as: 
  // const testObj = {
  //   name: "muse",
  //   bio: "asdf",
  //   paintings: ["help", "test"],
  //   users: ["helpme1", "helpme2"]
  // }
  //I need to send the object to the write museum then update the museum Obj
  //Then I need to send a user object to the users array IF the user doesn't exist
  //User Object can be obtained from a users list and state that is also updated
  //Painting object can be obtained from the response
  //

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
          r.json().then((error) => alert(error.errors))
        }
      })
  }, [])

  useEffect(() => {
    fetch("/users")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setArtists(data);
          })
        } else {
          r.json().then((error) => alert(error.errors))
        }
      })
  }, [])

  console.log(artists)
  console.log(museums)
  console.log(paintings)

  function handleNewPainting(newPainting, setIsLoading, setErrors, cleanUp) {
    fetch('/paintings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPainting)
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            setPaintings([...paintings, data]);
            cleanUp();
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      })
  }

  function handleEditPainting(newPainting, setIsLoading, setErrors, onReveal) {
    fetch(`/paintings/${newPainting.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newPainting)
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            const updatedPaintings = paintings.map((paint) => {
              if (paint.id === data.id) {
                return data
              } else {
                return paint
              };
            });
            setPaintings(updatedPaintings);
            onReveal(false);
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      })
  }

  function handleDeletePainting(id, setErrors, navigate) {
    fetch(`/paintings/${id}`, {
      method: 'DELETE'
    })
      .then((r) => {
        if (r.ok) {
          const updatedPainting = paintings.filter((paint) => paint.id !== id);
          setPaintings(updatedPainting);
          navigate(-1);
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      })
  }

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile' element={
            <Profile museums={museums} paintings={paintings} onNewPainting={handleNewPainting} />
          } />
          <Route path='/locations' element={<Museums museums={museums} />} />
          <Route path='/locations/:id' element={<MuseumProfile museums={museums} paintings={paintings} artists={artists} />} />
          <Route path='/paintings/:id' element={
            <PaintingProfile paintings={paintings} museums={museums} artists={artists}
              onEditPainting={handleEditPainting} onDeletePainting={handleDeletePainting} />
          } />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
