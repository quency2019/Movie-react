import React, { Component } from 'react'
import { UserService, IUser } from '../../services/UserService'
import UserForm from '../../components/UserForm'

interface IState {
    user: IUser | undefined
}
export default class EditUser extends Component<any, IState> {
    state = {
        user: undefined
    }
    async componentDidMount() {
        const res = await UserService.findById(this.props.match.params.id)
        this.setState({
            user: res.data!
        })

    }

    render() {
        return (
            <div>
                <UserForm user={this.state.user} onChange={async (user) => {
                    const res = await UserService.edit(this.props.match.params.id, user)
                    return res.err


                }} />

            </div>
        )
    }
}
