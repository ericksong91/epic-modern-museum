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
  const [paintings, setPaintings] = useState([]);
  const { user, setUser, artists } = useContext(UserContext);

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
            const userPaintings = [...user.paintings, data]
            const museum = museums.find((muse) => muse.id === data.museum_id);
            const filteredMuseums = museums.map((muse) => {
              if (muse.id === data.museum_id) {
                return {
                  id: museum.id,
                  bio: museum.bio,
                  location: museum.location,
                  name: museum.name,
                  paintings: [...museum.paintings, data]
                }
              } else {
                return muse
              }
            });

            const userMuseumsNew = [];
            const userPaintingsMuseums = userPaintings.map((paint) => paint.museum_id);

            for (let i = 0; i < museums.length; i++){
              userPaintingsMuseums.forEach((muse) => {
                if(muse === museums[i].id) {
                  return userMuseumsNew.push(museums[i])
                }
              })
            };

            const uniqueUserMuseums = userMuseumsNew.filter((value, index) => {
              return index === userMuseumsNew.findIndex(value2 => JSON.stringify(value2) === JSON.stringify(value));
            });

            const userObj = {
              bio: user.bio,
              id: user.id,
              museums: uniqueUserMuseums,
              paintings: userPaintings,
              username: user.username
            }

            setUser(userObj);
            setMuseums(filteredMuseums);
            setPaintings(userPaintings);
            cleanUp();
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      })
  }

  function handleEditPainting(newPainting, oldMuseum, setIsLoading, setErrors, onReveal) {
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
            const updatedUserPaintings = user.paintings.map((paint) => {
              if (paint.id === data.id) {
                return data
              } else {
                return paint
              }
            });
            const museum = museums.find((muse) => muse.id === data.museum_id);
            const filteredMuseums = museums.map((muse) => {
              if (muse.id === data.museum_id) {
                return {
                  id: museum.id,
                  bio: museum.bio,
                  location: museum.location,
                  name: museum.name,
                  paintings: [...museum.paintings, data]
                }
              } else {
                return muse
              }
            });

            const userMuseumsNew = [];
            const userPaintingsMuseums = updatedUserPaintings.map((paint) => paint.museum_id);

            for (let i = 0; i < museums.length; i++){
              userPaintingsMuseums.forEach((muse) => {
                if(muse === museums[i].id) {
                  return userMuseumsNew.push(museums[i])
                }
              })
            };

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
            setPaintings(updatedPaintings);
            onReveal(false);
          })
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      })
  }

  function handleDeletePainting(painting, setErrors, navigate) {
    fetch(`/paintings/${painting.id}`, {
      method: 'DELETE'
    })
      .then((r) => {
        if (r.ok) {
          const museum = museums.find((muse) => muse.id === painting.museum_id);
          const updatedPaintings = paintings.filter((paint) => paint.id !== painting.id);
          const updatedUserPaintings = user.paintings.filter((paint) => paint.id !== painting.id)
          const filteredMuseums = museums.map((muse) => {
            if (muse.id === painting.museum_id) {
              return {
                id: museum.id,
                bio: museum.bio,
                location: museum.location,
                name: museum.name,
                paintings: museum.paintings.filter((paint) => paint.id !== painting.id)
              }
            } else {
              return muse
            }
          });

          const userMuseumsNew = [];
          const userPaintingsMuseums = updatedUserPaintings.map((paint) => paint.museum_id);

          for (let i = 0; i < museums.length; i++){
            userPaintingsMuseums.forEach((muse) => {
              if(muse === museums[i].id) {
                return userMuseumsNew.push(museums[i])
              }
            })
          };

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
          setPaintings(updatedPaintings);
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
            <Profile museums={museums} paintings={paintings} artists={artists}
              onNewPainting={handleNewPainting} />
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
