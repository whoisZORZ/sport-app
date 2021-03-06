import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import {Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes} from '@fortawesome/free-solid-svg-icons';
import MatchService from '../services/MatchService';
import AuthService from "../services/AuthService";
import './Style.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            teams: [],
            currentPage: 1,
            teamsPerPage: 10,
            search: '',
            sortToggle: true
        }
    }

    viewTeam(id) {
        this.props.history.push(`/view-team/${id}`);
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})

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

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    cancelSearch = () => {
        this.setState({"search": ''})
        MatchService.getTeams().then((res) => {
            this.setState({currentTeams: res.data});
        });
    }

    sortData = () => {
        this.setState(state => ({
            sortToggle: !state.sortToggle
        }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {teams, currentPage, teamsPerPage, search} = this.state;
        const lastIndex = currentPage * teamsPerPage;
        const firstIndex = lastIndex - teamsPerPage;

        teams.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            return (isReversed * a.fullName.localeCompare(b.fullName));
        });

        const filteredTeams = teams.filter( team => {
            return (team.fullName.toLowerCase().indexOf(search.toLowerCase() ) !== -1)
        })

        const currentTeams = filteredTeams.slice(firstIndex, lastIndex);
        const totalPages = filteredTeams.length / teamsPerPage;

        return (
            <div>
                <h2 className="text-center">Teams</h2>
                <div style={{"float": "right"}}>
                    <InputGroup size="sm">
                        <FormControl placeholder="Search" name="search" value={search} className={"info-border bg-white"}
                            onChange={this.searchChange}/>
                        <InputGroup.Append>
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <br></br>
                <br></br>
                <div className="row" style={{width:"800px", marginLeft:"150px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style={{width:"250px"}}></th>
                                <th onClick={this.sortData} className="text-center align-middle" style={{width:"300px"}}>Name<div className={this.state.sortToggle ? "arrow arrow-up" : "arrow arrow-down"}></div></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.length === 0 ?
                                <tr align="center">
                                    <td colSpan="3">No Teams Available</td>
                                </tr>:
                                currentTeams.map(
                                    team => 
                                    <tr key = {team.id}>
                                        <td className="text-center align-middle">{<img src={team.imageLink} alt="Team" height="80px"/>}</td>
                                        <td className="text-left align-middle" style={{fontSize:"18px"}}>{team.fullName}</td>
                                        <td className="text-center align-middle">
                                            <button onClick={ () => this.viewTeam(team.id)} className="btn btn-info">View details! &#62;&#62;</button>
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
                                <Button type="button" variant="outline-info" disabled={currentPage === Math.ceil(totalPages) ? true : false}
                                    onClick={this.nextPage}>
                                    <FontAwesomeIcon icon={faStepForward}/> Next
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === Math.ceil(totalPages) ? true : false}
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