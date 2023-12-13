
import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";



function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const removeclasses = () => {
    document.body.classList.remove('bg-primary')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('text-black')
    document.body.classList.remove('text-white')
  }
  const toggleMode = (cls) => {
    removeclasses();
    document.body.classList.add(`bg-${cls}`);
    if ((cls === "danger") || (cls === "success") || (cls === "primary")) {
      setMode('dark');
    }
    else if ((cls === "warning")) {
      setMode('light');
    }
    else if (cls === null) {
      if (mode === "light") {
        setMode("dark");
        document.body.style.backgroundColor = "black";
        showAlert("success", "Dark mode Enabled");
      }
      else {
        setMode("light");
        showAlert("success", "Light mode Enabled");
        document.body.style.backgroundColor = "white";
      }
    }
  };

  const showAlert = (message, text) => {
    setAlert({
      msg: message,
      text: text
    })
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  };

  return (
    <>
      <Router>
        <HashRouter basename='/'>
        <Navbar mode={mode} toggleMode={toggleMode} headLink="Home"/>
        <Alert alert={alert} />
        <div className="container my-4" >
          <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/" element={<TextArea showAlert={showAlert} mode={mode} heading="Enter text below" />} />
          </Routes>
        </div>
        </HashRouter>
      </Router>
    </>
  );

}

export default App;
