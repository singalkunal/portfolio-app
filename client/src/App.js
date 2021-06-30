import './App.css'
import { BrowserRouter***REMOVED*** Switch***REMOVED*** Route } from 'react-router-dom';

// import FilesUpload from './components/files-upload';
import EditPage from './pages/Edit';
import React from 'react';
import LiveUpdateContextProvider from './contexts/LiveUpdateContext';
import Preview from './pages/Preview';
import Account from './pages/Account'
import Home from './pages/Home';
import Auth from './pages/Auth';
// import SignUp from './pages/Sig'
import Portfolio from './components/Portfolio';
import SideBar from './components/SideBar';

function App() {

  return (
    <BrowserRouter>
      <LiveUpdateContextProvider >
        <div className="app">
          <h3>Navbar</h3>

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>

            <Route exact path="/account">
              <Account />
            </Route>
            
            <Route exact path='/portfolio/edit'>
              <SideBar />
              <EditPage />
            </Route>
              
            <Route exact path="/preview/:profileId">
              <Preview /> 
            </Route>

            <Route exact path="/portfolio/:uid">
              <SideBar />
              <Portfolio /> 
            </Route>

            <Route path="*">
              No route found 
            </Route>

          </Switch>

          <section className="footer">
            <h3>Footer</h3>
          </section>
        </div>
      </LiveUpdateContextProvider>
    </BrowserRouter>
  );
}

export default App;
