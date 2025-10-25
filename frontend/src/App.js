// frontend/src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StationHub from './components/StationHub';
import Register from './components/Register'; // <-- IMPORT
import Login from './components/Login'; // <-- IMPORT
import Navbar from './components/Navbar'; // <-- IMPORT
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Navbar /> {/* <-- Your navigation bar will be on every page */}
      
      <main className="container">
        <Routes>
          <Route path="/" element={<StationHub />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* You will add more routes here, like /fare-calculator */}
        </Routes>
      </main>
    </div>
  );
}

// You can add this to App.css to make it look clean
/*
.container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}
*/

export default App;
// You can create App.css to style the header
// frontend/src/App.css
/*
.app-header {
  background: var(--color-red);
  color: white;
  padding: 10px 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}
*/



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
