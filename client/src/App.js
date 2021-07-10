import './App.css'
import { BrowserRouter***REMOVED*** Switch***REMOVED*** Route } from 'react-router-dom';

// import FilesUpload from './components/files-upload';
import EditPage from './pages/Edit';
import React***REMOVED*** { useEffect***REMOVED*** useState } from 'react';
import LiveUpdateContextProvider from './contexts/LiveUpdateContext';
import Preview from './pages/Preview';
import Account from './pages/Account'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Redirect from './pages/Redirect';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';

// import SignUp from './pages/Sig'
import Portfolio from './components/Portfolio';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  return (
    <BrowserRouter>
      <LiveUpdateContextProvider >
        <div className="app">
          <Navbar />

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>

            <Route exact path='/auth/forgot'>
              <Forgot />
            </Route>

            <Route exact path='/auth/reset'>
              <Reset />
            </Route>

            <Route exact path="/redirect">
              <Redirect />
            </Route>

            <Route exact path="/account">
              <Account />
            </Route>
          
            <Route exact path='/portfolio/edit'>
              <SideBar />
              <EditPage />
            </Route>

            <Route exact path="/portfolio/:username">
              <SideBar />
              <Portfolio /> 
            </Route>

            <Route path="*">
              <div className="container">
                <h1>No route found </h1>
              </div>
            </Route>

          </Switch>

            <Footer />
        </div>
      </LiveUpdateContextProvider>
    </BrowserRouter>
  );
}

export default App;
