import Navbar from './Navbar'

import '../../css/App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navbar />} />
      </Routes>
    </div>
  );
}

export default App;
