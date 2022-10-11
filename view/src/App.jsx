import "./Styles/App.css";
import Welcome from "./Pages/Welcome";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' exact element={<Home />}>
              <Route path='/:boardId' element={<Home />} />
            </Route>
            <Route path='/' element={<Welcome />}>
              <Route path='welcome' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
