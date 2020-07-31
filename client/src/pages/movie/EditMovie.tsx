import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import MovieForm from '../../components/MovieForm'
import { MovieService, IMovie } from '../../services/MovieService'

interface IParams {
    id: string
}
interface IState {
    movie: IMovie | undefined
}
export default class EditMovie extends Component<RouteComponentProps<IParams>, IState>{

    state = {
        movie: undefined
    }
    async componentDidMount() {
        const res = await MovieService.findById(this.props.match.params.id)
        this.setState({
            movie: res.data!
        })

    }
    render() {
        return (
            <>
                <MovieForm onSubmit={async (movie) => {
                    const res = await MovieService.edit(this.props.match.params.id, movie)
                    if (res.data) {
                        return ""
                    } else {
                        return res.err
                    }

                }}
                    movie={this.state.movie}
                />
            </>

        )
    }
}
