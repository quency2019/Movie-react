import React, { Component } from 'react'
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieService'

export default class AddMovie extends Component {


    render() {
        return (

            <MovieForm onSubmit={async (movie) => {
                const res = await MovieService.add(movie)
                if (res.data) {
                    return ""
                } else {
                    return res.err
                }

            }} />

        )
    }
}
