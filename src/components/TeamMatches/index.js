// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://api.ccbp.in/ipl/'
class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }
  componentDidMount() {
    this.getTeamMatches()
  }
  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    data: data.data,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })
  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL = fetchedData.team_banner_url,
      LatestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: formattedData, isLoading: false})
  }
  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent_matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }
  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, LatestMatch} = teamMatchesData

    return (
      <div className="response-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch LatestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }
  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )
  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }
  render() {
    const {isLoading} = this.state
    const className = `team-matches-container${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
