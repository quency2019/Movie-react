import React, { Component } from 'react'
import UserForm from '../../components/UserForm'
import { IUser, UserService } from '../../services/UserService'

export default class AddUser extends Component {
    render() {
        return (
            <div>
                <UserForm onChange={
                    async (value: IUser) => {
                        const res = await UserService.add(value)
                        return res.err

                    }
                } />>
            </div>
        )
    }
}
