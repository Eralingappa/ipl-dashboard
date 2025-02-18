// Write your code here
import './index.css'
const MatchCard = props => {
  const {matchDeatails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDeatails

  const getMatchStatusClassName = status =>
    status === Won ? 'match-won' : 'match-lost'

  const matchStatusClassName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
