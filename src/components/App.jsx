import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Disk from './disk/Disk.jsx';
import Profile from './profile/Profile';
import Recognition from './recognize/Recognize';

function App() {

    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        // eslint-disable-next-line
        dispatch(auth());
        // eslint-disable-next-line
    }, []);

  return (
      <BrowserRouter>
          <div className='app'>
              <Navbar/>
              <div className="wrap">
              {
                !isAuth ?
                  <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recognition" element={<Recognition />} />
                    <Route
                      path="*"
                      element={<Navigate to="/login" />}
                    />
                  </Routes>
                  :
                  <Routes>
                    <Route path="/" element={<Disk />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                      path="*"
                      element={<Navigate to="/" />}
                    />
                  </Routes>
              }
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;