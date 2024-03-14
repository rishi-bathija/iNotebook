import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  let showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      {/* Wrap the whole application into the Notestate so that the state variables of the Notestate are accessible by all the components and tgheir sub-components*/}
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          {/* <h1>This is iNotebook</h1> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              {/* <Route exact path="/about" element={<About />}></Route> */}
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;