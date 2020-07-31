import React from 'react';
import 'react-router-dom'
import Router from './router';
import { Provider } from 'react-redux'
import { store } from './store/index'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router></Router>
      </div>
    </Provider>

  );
}

export default App;
