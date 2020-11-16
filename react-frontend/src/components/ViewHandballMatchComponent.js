import React, { Component } from 'react';
import MatchService from '../services/MatchService';

class ViewHandballMatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            match: {},
            handballStats: {}
        }
    }

    componentDidMount() {
        MatchService.getMatchById(this.state.id).then(res => {
            this.setState({match: res.data});
        })
        MatchService.getHandballStatsById(this.state.id).then(res => {
            this.setState({handballStats: res.data});
        })
    }

    return() {
        this.props.history.push('/matches');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <div className="card-body">
                        <div className="text-center" style={{backgroundColor:"#33cc33", color:"#ffffff", height:"120px", horizontalAlign:"center", verticalAlign:"center"}}>
                            <div className="row">
                                <label style={{marginLeft: "25px"}}>Season:</label>
                                <div style={{marginLeft: "5px"}}>{this.state.match.seasonId}</div>
                            </div>
                            <table style={{marginLeft: "0px", marginTop:"0px", marginBottom:"10px", fontSize:"22px", width:"483px"}}>
                                <tr style={{align:"center", height:"80px"}}>
                                    <th style={{align:"center", width:"200px"}}>
                                        <div className="text-center" style={{marginRight:"0px"}}>{this.state.match.homeTeam}</div>
                                    </th>
                                    <th style={{align:"center"}}>
                                        <div className="text-center" style={{FontWeight: "bold", backgroundColor:"#1f7a1f", width:"40px", height:"40px"}}>{this.state.match.homeScore}</div>
                                    </th>
                                    <th style={{align:"center"}}>
                                        <div className="text-center" style={{FontWeight: "bold", backgroundColor:"#1f7a1f", width:"40px", height:"40px"}}>{this.state.match.awayScore}</div>
                                    </th>
                                    <th style={{align:"center", width:"200px"}}>
                                        <div className="text-center" style={{marginLeft:"0px"}}>{this.state.match.awayTeam}</div>
                                    </th>
                                </tr>
                            </table>
                        </div>

                        <div style={{marginLeft: "10px", marginTop: "10px"}}>Events:</div>

                        <div style={{marginLeft: "10px", marginTop: "10px"}}>Statistics:</div>

                        <table className="text-center align-middle table table-striped" style={{marginLeft: "0px", marginTop:"0px", marginBottom:"10px", fontSize:"16px", width:"483px"}}>
                            <tr>
                                <td style={{width:"161px"}}>{this.state.handballStats.hShootingEfficiency}</td>
                                <td style={{width:"161px"}}>Shooting efficiency</td>
                                <td style={{width:"161px"}}>{this.state.handballStats.aShootingEfficiency}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hWingGoals}</td>
                                <td>Wing goals</td>
                                <td>{this.state.handballStats.aWingGoals}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hFastbreakGoals}</td>
                                <td>Fastbreak goals</td>
                                <td>{this.state.handballStats.aFastbreakGoals}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hSevenMeters}</td>
                                <td>7 meters</td>
                                <td>{this.state.handballStats.aSevenMeters}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hSaves}</td>
                                <td>Saves</td>
                                <td>{this.state.handballStats.aSaves}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hTwoMinPenalty}</td>
                                <td>2 minute penalties</td>
                                <td>{this.state.handballStats.aTwoMinPenalty}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hYellowCards}</td>
                                <td>Yellow cards</td>
                                <td>{this.state.handballStats.aYellowCards}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hGoalStreak}</td>
                                <td>Goal streak</td>
                                <td>{this.state.handballStats.aGoalStreak}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hGoalsInPowerplay}</td>
                                <td>Power play goals</td>
                                <td>{this.state.handballStats.aGoalsInPowerplay}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hShorthandedGoals}</td>
                                <td>Shorthanded goals</td>
                                <td>{this.state.handballStats.aShorthandedGoals}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hSteals}</td>
                                <td>Steals</td>
                                <td>{this.state.handballStats.aSteals}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hTechnicalFaults}</td>
                                <td>Technical faults</td>
                                <td>{this.state.handballStats.aTechnicalFaults}</td>
                            </tr>
                            <tr>
                                <td>{this.state.handballStats.hTimeouts}</td>
                                <td>Timeouts</td>
                                <td>{this.state.handballStats.aTimeouts}</td>
                            </tr>
                        </table>


                        

                        <div style={{marginLeft:"10px"}}>
                            <div className="row">
                                <div style={{marginLeft: "10px", marginTop: "20px"}}>{this.state.match.date}</div>
                            </div>

                            <div className="row">
                                <label style={{marginLeft: "10px"}}>Played in the </label>
                                <div style={{marginLeft: "5px"}}>{this.state.match.place}</div>
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

export default ViewHandballMatchComponent;