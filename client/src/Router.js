import { useContext } from "react"

import { Switch***REMOVED*** Route } from 'react-router-dom';


import EditPage from './pages/Edit';
import Account from './pages/Account'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Redirect from './pages/Redirect';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import Community from './pages/Community';

import Portfolio from './components/Portfolio';
import SideBar from './components/SideBar';
import Load from "./components/Load";


import { LiveUpdateContext } from "./contexts/LiveUpdateContext"
import CommentBlock from "./styled-components/CommentBlock";
import Navbar from "./components/Navbar";

const Router = () => {
    const { globalLoading } = useContext(LiveUpdateContext);
    return (
        <Load loading={globalLoading}>
            <Switch>
                <Route exact path='/'>
                    <Navbar />
                    <Home />
                </Route>
                <Route exact path="/auth">
                    <Navbar />
                    <Auth />
                </Route>

                <Route exact path='/auth/forgot'>
                    <Navbar />
                    <Forgot />
                </Route>

                <Route exact path='/auth/reset'>
                    <Navbar />
                    <Reset />
                </Route>

                <Route exact path="/redirect">
                    <Navbar />
                    <Redirect />
                </Route>

                <Route exact path="/account">
                    <Navbar />
                    <Account />
                </Route>
            
                <Route exact path='/portfolio/edit'>
                    <Navbar />
                    <SideBar />
                    <EditPage />
                </Route>

                <Route exact path="/portfolio/:username">
                    <Navbar />
                    <SideBar />
                    <Portfolio /> 
                </Route>

                <Route exact path="/community">
                    <Community />
                </Route>

                <Route exact path="/community/comments/:postId">
                    <CommentBlock />
                </Route>

                <Route path="*">
                    <Navbar />
                    <div className="container">
                        <h1>No route found </h1>
                    </div>
                </Route>
          </Switch>
        </Load>
    )
}

export default Router
