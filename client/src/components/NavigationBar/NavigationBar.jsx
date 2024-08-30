import { Link } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
const NavigationBar = () => {
  const {web3State}  = useWeb3Context();
  const {electionCommisionStatus, selectedAccount} = web3State

  return (
    selectedAccount ? (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/candidate-register">Candidate Register</Link>
            </li>
            <li>
              <Link to="/candidate-list">Candidate List</Link>
            </li>
            <li>
              <Link to="/voter-register">Voter Register</Link>
            </li>
            {electionCommisionStatus && (
              <>
                <li>
                  <Link to="/voter-list">Voter List</Link>
                </li>
                <li>
                  <Link to="/election-commision">Election Commision</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/token-exchange">Token Exchange</Link>
            </li>
            <li>
              <Link to={`/voter-profile`}>Voter Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    ) : (
      <div></div>
    )
  );
}

export default NavigationBar