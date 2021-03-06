import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import MatchService from '../services/MatchService';
import AuthService from "../services/AuthService";

class ViewTeamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            team: {}
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})

        MatchService.getTeamById(this.state.id).then(res => {
            this.setState({team: res.data});
        })
    }

    return() {
        this.props.history.push('/teams');
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div>
                <br></br>
                <div className="card col-md-7 offset-md-2.5">
                    <div className="card-body">
                        <div className="row" >
                            <div style={{marginLeft: "30px"}}>{<img src={this.state.team.imageLink} alt="Team" height="80px" />}</div>
                            <div style={{fontSize:"35px", marginTop:"10px", marginLeft:"25px", FontWeight: "bold"}}>{this.state.team.fullName}</div>
                        </div>

                        <br></br>
                        <div style={{height:"80px" ,horizontalAlign:"center", verticalAlign:"center", backgroundColor:"#e0e0d1"}}>
                            <div className="row" style={{marginLeft:"30px", paddingTop:"5px"}}>
                                <label>The team was founded in </label>
                                <div style={{marginLeft: "5px"}}>{this.state.team.foundingDate}</div>
                                <label>.</label>
                            </div>

                            <div className="row" style={{marginLeft:"30px", marginTop:"-10px"}}>
                                <label>They play their home matches in the</label>
                                <div style={{marginLeft: "5px"}}>{this.state.team.homePlace}</div>
                                <label>.</label>
                            </div>

                            <div className="row" style={{marginLeft:"30px", marginTop:"-10px"}}>
                                <label>The estimated value of the team is</label>
                                <div style={{marginLeft: "5px"}}>{this.state.team.teamValue}</div>
                                <div style={{marginLeft: "5px"}}>{this.state.team.valueCurrency}</div>
                                <label>.</label>
                            </div>
                        </div>


                        <br></br>
                        <div className="row" style={{marginLeft:"10px"}}>
                            <button className="btn btn-danger" onClick={this.return.bind(this)}>&#60;&#60; Return</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewTeamComponent;