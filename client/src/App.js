import './App.css'
import './css/Button.css';
import { BrowserRouter} from 'react-router-dom';

import LiveUpdateContextProvider from './contexts/LiveUpdateContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router from './Router';
import SocketContextProvider from './contexts/SocketContext';


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
