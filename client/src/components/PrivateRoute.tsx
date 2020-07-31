import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'

export default class PrivateRoute extends Component<any> {

    render() {
        const { component: Component, children, render, ...rest } = this.props
        return <Route
            {...rest}
            render={values => {

                if (localStorage.getItem('admin')) {
                    const admin = JSON.parse(localStorage.getItem('admin')!)
                    if (admin) {
                        return <Component {...values}></Component>
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: values.location.pathname
                            }}
                        />
                    )

                }
            }}
        />

    }
}
