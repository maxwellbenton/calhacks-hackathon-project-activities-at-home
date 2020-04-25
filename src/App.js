import React from 'react';
import Main from './components/Main';
import { ConfigProvider } from './configContext';
import './App.css';

function App() {

  return (
    <div className="App">
      <ConfigProvider>
        <h1>Activities @ Home</h1>
        <Main />
      </ConfigProvider>
    </div>
  );
}

export default App;
