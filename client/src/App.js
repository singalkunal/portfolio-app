import { BrowserRouter } from 'react-router-dom';

import Router from './Router';

import LiveUpdateContextProvider from './contexts/LiveUpdateContext';
import SocketContextProvider from './contexts/SocketContext';

import './App.css';
import './css/Button.css';




function App() {

  return (
    <BrowserRouter>
      <LiveUpdateContextProvider >
          <SocketContextProvider>
            <div className="app">
              <Router />
            </div>
          </SocketContextProvider>
      </LiveUpdateContextProvider>
    </BrowserRouter>
  );
}

export default App;
