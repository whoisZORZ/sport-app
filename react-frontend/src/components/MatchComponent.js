import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import {Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes} from '@fortawesome/free-solid-svg-icons';
import MatchService from '../services/MatchService';
import AuthService from "../services/AuthService";
import './Style.css';

class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            matches: [],
            teams: [],
            currentPage: 1,
            matchesPerPage: 10,
            search: '',
            sortToggle: true
        }
    }
    
    viewMatch(id) {
        if (id.substring(0, 2) === "41") {
            this.props.history.push(`/view-football-match/${id}`);
        }
        else if (id.substring(0, 2) === "42") {
            this.props.history.push(`/view-amfootball-match/${id}`);
        }
        else if (id.substring(0, 2) === "43") {
            this.props.history.push(`/view-basketball-match/${id}`);
        }
        else if (id.substring(0, 2) === "44") {
            this.props.history.push(`/view-handball-match/${id}`);
        }
        else if (id.substring(0, 2) === "45") {
            this.props.history.push(`/view-hockey-match/${id}`);
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})

        MatchService.getMatches().then((res) => {
            this.setState({matches: res.data});
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
        if (this.state.currentPage < Math.ceil(this.state.matches.length / this.state.matchesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.matches.length / this.state.matchesPerPage)
            });
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.matches.length / this.state.matchesPerPage)) {
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
        MatchService.getMatches().then((res) => {
            this.setState({currentMatches: res.data});
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

        const {matches, currentPage, matchesPerPage, search} = this.state;
        const lastIndex = currentPage * matchesPerPage;
        const firstIndex = lastIndex - matchesPerPage;

        matches.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            return (isReversed * a.date.localeCompare(b.date));
        });

        const filteredMatches = matches.filter( match => {
            return (match.date.indexOf(search) !== -1)
            || (match.homeScore.toString().indexOf(search) !== -1)
            || (match.awayScore.toString().indexOf(search) !== -1)
            || (match.place.toLowerCase().indexOf(search.toLowerCase() ) !== -1);
        })

        const currentMatches = filteredMatches.slice(firstIndex, lastIndex);
        const totalPages = filteredMatches.length / matchesPerPage;

        return (
            <div>
                <h2 className="text-center">Matches</h2>
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
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center align-middle">Season</th>
                                <th className="text-center align-middle" onClick={this.sortData}>Date<div className={this.state.sortToggle ? "arrow arrow-up" : "arrow arrow-down"}></div></th>
                                <th className="text-right align-middle">Home Team</th>
                                <th className="text-center align-middle" style={{width:"100px"}}>Score</th>
                                <th className="text-left align-middle">Away Team</th>
                                <th className="text-left align-middle">Place</th>
                                <th className="text-center align-middle"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">No Matches Available</td>
                                </tr>:
                                currentMatches.map(
                                    match => 
                                    <tr key = {match.id}>
                                        <td className="text-center align-middle">{match.seasonId}</td>
                                        <td className="text-center align-middle">{match.date}</td>
                                        <td className="text-right align-middle" style={{fontWeight:"bold"}}>{match.homeName}</td>
                                        <td className="text-center align-middle" style={{fontWeight:"bold"}}>{match.homeScore} - {match.awayScore}</td>
                                        <td className="text-left align-middle" style={{fontWeight:"bold"}}>{match.awayName}</td>
                                        <td className="text-left align-middle">{match.place}</td>
                                        <td className="text-center align-middle">
                                            <button onClick={ () => this.viewMatch(match.id)} className="btn btn-info">View details! &#62;&#62;</button>
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
                    <div style={{"margin-right": "0", marginTop:"5px"}}>
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

export default MatchComponent;