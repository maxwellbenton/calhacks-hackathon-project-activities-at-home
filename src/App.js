import React from 'react';
import Main from './components/Main';
import { ConfigProvider } from './configContext';
import { Icon } from 'semantic-ui-react'
import './App.css';

function App() {

  return (
    <div className="App">
      <ConfigProvider>
        <Icon name='home' size='huge' />
        <h1>At Home Sub</h1>
        <h3>An easy way to organize your kid's day!</h3>
        <Main />
      </ConfigProvider>
    </div>
  );
}

export default App;
