import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import _Layout from './pages/Layout'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

export default function router() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <PrivateRoute path="/" component={_Layout}></PrivateRoute>
                </Switch>
            </Router>
        </div >
    )
}
