
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div id="mainApp">
      <Header />
      <ToastContainer />
      <div id="rootOutlet" className='bg-miraplayMainBg min-h-[calc(100vh-56px)]'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
