import './App.css'
import './css/Button.css';
import { BrowserRouter} from 'react-router-dom';

import LiveUpdateContextProvider from './contexts/LiveUpdateContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router from './Router';


function App() {

  return (
    <BrowserRouter>
      <LiveUpdateContextProvider >
        <div className="app">
          <Router />
          <Footer />
        </div>
      </LiveUpdateContextProvider>
    </BrowserRouter>
  );
}

export default App;
