import React from 'react';
import './styles/App.css';
import AuthIndex from "./features/authorization/Index"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthIndex />
      </header>
    </div>
  );
}

export default App;
