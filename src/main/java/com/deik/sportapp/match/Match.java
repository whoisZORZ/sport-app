package com.deik.sportapp.match;

import com.deik.sportapp.match.stats.amfootball.AmFootballStats;
import com.deik.sportapp.match.stats.basketball.BasketballStats;
import com.deik.sportapp.match.stats.football.FootballStats;
import com.deik.sportapp.match.stats.handball.HandballStats;
import com.deik.sportapp.match.stats.hockey.HockeyStats;
import com.deik.sportapp.season.Season;
import com.deik.sportapp.team.Team;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "match", schema = "competitions")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "seasonId", nullable = false)
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("seasonId")
    private Season seasonId;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "homeTeam", nullable = false)
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("homeTeam")
    private Team homeTeam;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "awayTeam", nullable = false)
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("awayTeam")
    private Team awayTeam;

    @Column(name = "homeScore")
    private int homeScore;

    @Column(name = "awayScore")
    private int awayScore;

    @Column(name = "place")
    private String place;

    @Column(name = "date")
    private Date date;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private AmFootballStats amFootballStats;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private BasketballStats basketballStats;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private FootballStats footballStats;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private HandballStats handballStats;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private HockeyStats hockeyStats;

    public Match() {
    }

    public Match(String id, Season seasonId, Team homeTeam, Team awayTeam, int homeScore, int awayScore, String place, Date date) {
        this.id = id;
        this.seasonId = seasonId;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.place = place;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Season getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(Season seasonId) {
        this.seasonId = seasonId;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }

    public int getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public AmFootballStats getAmFootballStats() {
        return amFootballStats;
    }

    public void setAmFootballStats(AmFootballStats amFootballStats) {
        this.amFootballStats = amFootballStats;
    }

    public BasketballStats getBasketballStats() {
        return basketballStats;
    }

    public void setBasketballStats(BasketballStats basketballStats) {
        this.basketballStats = basketballStats;
    }

    public FootballStats getFootballStats() {
        return footballStats;
    }

    public void setFootballStats(FootballStats footballStats) {
        this.footballStats = footballStats;
    }

    public HandballStats getHandballStats() {
        return handballStats;
    }

    public void setHandballStats(HandballStats handballStats) {
        this.handballStats = handballStats;
    }

    public HockeyStats getHockeyStats() {
        return hockeyStats;
    }

    public void setHockeyStats(HockeyStats hockeyStats) {
        this.hockeyStats = hockeyStats;
    }

}
