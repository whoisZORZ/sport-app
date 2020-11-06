import React, { Component } from 'react';
import {Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MatchService from '../services/MatchService';
import UserService from "../services/UserService";

class TeamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams: [],
            currentPage: 1,
            teamsPerPage: 5
        }
    }

    viewTeam(id) {
        this.props.history.push(`/view-team/${id}`);
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

        MatchService.getTeams().then((res) => {
            this.setState({teams: res.data});
        });
    }

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    previousPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.teams.length / this.state.teamsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.teams.length / this.state.teamsPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.teams.length / this.state.teamsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {
        const {teams, currentPage, teamsPerPage} = this.state;
        const lastIndex = currentPage * teamsPerPage;
        const firstIndex = lastIndex - teamsPerPage;
        const currentTeams = teams.slice(firstIndex, lastIndex);
        const totalPages = teams.length / teamsPerPage;

        return (
            <div>
                <h2 className="text-center">Teams</h2>
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
                            {teams.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">No Teams Available</td>
                                </tr>:
                                currentTeams.map(
                                    team => 
                                    <tr key = {team.id}>
                                        <td className="align-middle">{team.id}</td>
                                        <td className="align-middle">{team.fullName}</td>
                                        <td className="align-middle">{team.shortName}</td>
                                        <td className="align-middle">{team.foundingDate}</td>
                                        <td className="align-middle">{team.teamValue}</td>
                                        <td className="align-middle">{team.valueCurrency}</td>
                                        <td className="align-middle">{<img src={team.imageLink} alt="Team" width="100px" height="100px"/>}</td>
                                        <td className="align-middle">{team.homePlace}</td>
                                        <td className="align-middle">
                                            <button onClick={ () => this.viewTeam(team.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Card.Footer>
                    <div style={{"margin-left": "auto"}}>
                        Showing Page {currentPage} of {Math.ceil(totalPages)}
                    </div>
                    <div style={{"margin-right": "0"}}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.firstPage}>
                                    <FontAwesomeIcon icon={faFastBackward}/> First
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.previousPage}>
                                    <FontAwesomeIcon icon={faStepBackward}/> Previous
                                </Button >
                            </InputGroup.Prepend>
                            <FormControl className={"page-num bg-white"} name="currentPage" value={currentPage}
                                    onChange={this.changePage}/>
                            <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                    onClick={this.nextPage}>
                                    <FontAwesomeIcon icon={faStepForward}/> Next
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                    onClick={this.lastPage}>
                                    <FontAwesomeIcon icon={faFastForward}/> Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    </Card.Footer>
                </div>
            </div>
        );
    }
}

export default TeamComponent;