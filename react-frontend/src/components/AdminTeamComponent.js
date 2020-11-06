import React, { Component } from 'react';
import MatchService from '../services/MatchService';
import UserService from '../services/UserService';

class AdminTeamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams: []
        }
        this.addTeam = this.addTeam.bind(this);
        this.editTeam = this.editTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
    }

    addTeam() {
        this.props.history.push(`/add-team/_add`);
    }

    editTeam(id) {
        this.props.history.push(`/add-team/${id}`);
    }

    deleteTeam(id) {
        MatchService.deleteTeam(id).then(res => {
            this.setState({teams: this.state.teams.filter(team => team.id !== id)});
        });
    }

    viewTeam(id) {
        this.props.history.push(`/view-team/${id}`);
    }

    componentDidMount() {
        UserService.getAdminBoard().then (
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

        MatchService.getTeams().then((res) => {
            this.setState({teams: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Teams</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addTeam}>Add Team</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Team ID</th>
                                <th>Full Name</th>
                                <th>Short Name</th>
                                <th>Founding Date</th>
                                <th>Value</th>
                                <th>Currency</th>
                                <th>Image</th>
                                <th>Home Place</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.teams.map(
                                    team => 
                                    <tr key = {team.id}>
                                        <td className="align-middle">{team.id}</td>
                                        <td className="align-middle">{team.fullName}</td>
                                        <td className="align-middle" width="8%">{team.shortName}</td>
                                        <td className="align-middle">{team.foundingDate}</td>
                                        <td className="align-middle">{team.teamValue}</td>
                                        <td className="align-middle" width="5%">{team.valueCurrency}</td>
                                        <td className="align-middle">{<img src={team.imageLink} alt="Team" width="100px" height="100px"/>}</td>
                                        <td className="align-middle">{team.homePlace}</td>
                                        <td className="align-middle">
                                            <button onClick={ () => this.editTeam(team.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTeam(team.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginTop: "10px"}} onClick={ () => this.viewTeam(team.id)} className="btn btn-info">View</button>
                                        </td>
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

export default AdminTeamComponent;