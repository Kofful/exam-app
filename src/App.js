import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {client} from "./api/graphql/apolloConfig";
import Developers from './pages/Developers/Developers';
import Developer from './pages/Developer/Developer';
import CreateAccount from './pages/Register/Register';
import Projects from './pages/Projects/Projects';
import Project from './pages/Project/Project';
import Login from "./pages/Login/Login"
import "./App.sass";

class App extends Component {

    renderHeader() {
        return (
            <div className={"header"}>
                <div className={"header-top"}>
                    <div className={"back"} onClick={() => {
                        window.history.back()
                    }}>
                        <img alt={"back"} src={require("./assets/img/arrow-left.png")}/>
                    </div>
                    <p><span className={"not-shred"}>NOT</span> SHRED</p>
                </div>
                <div className={"tabControl"}>
                    <Link to="/">MAIN</Link>
                    <Link to="/developers">DEVELOPERS</Link>
                    <Link to="/projects">PROJECTS</Link>
                </div>
            </div>
        )
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <div className={"App"}>
                    <Router>
                        <>
                            {this.renderHeader()}
                            <Route exact path="/" component={Login}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={CreateAccount}/>
                            <Route path="/settings" component={Developer}/>
                            <Route exact path="/developers" component={Developers}/>
                            <Route exact path="/developers/:id" component={Developer}/>
                            <Route exact path="/projects" component={Projects}/>
                            <Route exact path="/projects/:id" component={Project}/>
                        </>
                    </Router>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
