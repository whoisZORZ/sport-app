import React, { Component } from 'react';
import MatchService from '../services/MatchService';
import UserService from "../services/UserService";

class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: []
        }
    }
    
    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        );

        MatchService.getMatches().then((res) => {
            this.setState({matches: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Matches</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Match ID</th>
                                <th>Season ID</th>
                                <th>Home Team</th>
                                <th>Away Team</th>
                                <th>Home Score</th>
                                <th>Away Score</th>
                                <th>Place</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.matches.map(
                                    match => 
                                    <tr key = {match.id}>
                                        <td>{match.id}</td>
                                        <td>{match.season_id}</td>
                                        <td>{match.home_team}</td>
                                        <td>{match.away_team}</td>
                                        <td>{match.homeScore}</td>
                                        <td>{match.awayScore}</td>
                                        <td>{match.place}</td>
                                        <td>{match.date}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MatchComponent;