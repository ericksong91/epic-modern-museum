import { useState, useEffect } from 'react';
import { useContext } from 'react';
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
  const { user, setUser, artists } = useContext(UserContext);

  useEffect(() => {
    fetch("/museums")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setMuseums(data);
          })
        } else {
          r.json().then((error) => alert(error.errors));
        };
      });
  }, []);

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
            const updatedUserPaintings = [...user.paintings, data];
            const filteredMuseums = museums.map((muse) => {
              if (muse.id === data.museum_id) {
                return {
                  id: muse.id,
                  bio: muse.bio,
                  location: muse.location,
                  name: muse.name,
                  paintings: [...muse.paintings, data]
                }
              } else {
                return muse
              }
            });

            const userMuseumsNew = [];

            museums.forEach((museum) => {
              updatedUserPaintings.forEach((paint) => {
                if (paint.museum_id === museum.id) {
                  return userMuseumsNew.push(museum);
                };
              });
            });

            const uniqueUserMuseums = userMuseumsNew.filter((value, index) => {
              return index === userMuseumsNew.findIndex(value2 => JSON.stringify(value2) === JSON.stringify(value));
            });

            const userObj = {
              bio: user.bio,
              id: user.id,
              museums: uniqueUserMuseums,
              paintings: updatedUserPaintings,
              username: user.username
            }

            setUser(userObj);
            setMuseums(filteredMuseums);
            cleanUp();
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        };
      });
  };

  function handleEditPainting(newPainting, oldMuseumId, setIsLoading, setErrors, onReveal) {
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
            const updatedUserPaintings = user.paintings.map((paint) => {
              if (paint.id === data.id) {
                return data
              } else {
                return paint
              }
            });
            const filteredMuseums = museums.map((muse) => {
              if (muse.id === data.museum_id) {
                return {
                  id: muse.id,
                  bio: muse.bio,
                  location: muse.location,
                  name: muse.name,
                  paintings: [...muse.paintings, data]
                }
              } else if (muse.id === oldMuseumId) {
                return {
                  id: muse.id,
                  bio: muse.bio,
                  location: muse.location,
                  name: muse.name,
                  paintings: muse.paintings.filter((paint) => paint.id !== newPainting.id)
                }
              } else {
                return muse
              };
            });

            const userMuseumsNew = [];

            museums.forEach((museum) => {
              updatedUserPaintings.forEach((paint) => {
                if (paint.museum_id === museum.id) {
                  return userMuseumsNew.push(museum);
                };
              });
            });

            const uniqueUserMuseums = userMuseumsNew.filter((value, index) => {
              return index === userMuseumsNew.findIndex(value2 => JSON.stringify(value2) === JSON.stringify(value));
            });

            const userObj = {
              bio: user.bio,
              id: user.id,
              museums: uniqueUserMuseums,
              paintings: updatedUserPaintings,
              username: user.username
            };

            setUser(userObj);
            setMuseums(filteredMuseums);
            onReveal(false);
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        };
      });
  };

  function handleDeletePainting(painting, setErrors, navigate) {
    fetch(`/paintings/${painting.id}`, {
      method: 'DELETE'
    })
      .then((r) => {
        if (r.ok) {
          const updatedUserPaintings = user.paintings.filter((paint) => paint.id !== painting.id);
          const filteredMuseums = museums.map((muse) => {
            if (muse.id === painting.museum_id) {
              return {
                id: muse.id,
                bio: muse.bio,
                location: muse.location,
                name: muse.name,
                paintings: muse.paintings.filter((paint) => paint.id !== painting.id)
              };
            } else {
              return muse;
            };
          });

          const userMuseumsNew = [];

          museums.forEach((museum) => {
            updatedUserPaintings.forEach((paint) => {
              if (paint.museum_id === museum.id) {
                return userMuseumsNew.push(museum);
              };
            });
          });

          const uniqueUserMuseums = userMuseumsNew.filter((value, index) => {
            return index === userMuseumsNew.findIndex(value2 => JSON.stringify(value2) === JSON.stringify(value));
          });

          const userObj = {
            bio: user.bio,
            id: user.id,
            museums: uniqueUserMuseums,
            paintings: updatedUserPaintings,
            username: user.username
          };

          setUser(userObj);
          setMuseums(filteredMuseums);
          navigate(-1);
        } else {
          r.json().then((error) => setErrors(error.errors));
        };
      });
  };

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile' element={
            <Profile museums={museums} artists={artists}
              onNewPainting={handleNewPainting} setMuseums={setMuseums} />
          } />
          <Route path='/locations' element={<Museums museums={museums} />} />
          <Route path='/locations/:id' element={<MuseumProfile museums={museums} artists={artists} />} />
          <Route path='/paintings/:id' element={
            <PaintingProfile museums={museums} artists={artists}
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
