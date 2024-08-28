import { Link } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
const NavigationBar = () => {
  const {web3State}  = useWeb3Context();
  const {electionCommisionStatus, selectedAccount} = web3State

  return (
      <header>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                { selectedAccount ? (
                     <li>
                      <Link to="/candidate-register">Candidate Register</Link>
                    </li>
                    ):(<div></div>)
                }
                { selectedAccount ? (
                     <li>
                      <Link to="/candidate-list">Candidate List</Link>
                    </li>
                    ):(<div></div>)
                }
                { selectedAccount ? (
                     <li>
                      <Link to="/voter-register">Voter Register</Link>
                    </li>
                    ):(<div></div>)
                }
                 { selectedAccount ? (
                     <li>
                       <Link to="/voter-list">Voter List</Link>
                    </li>
                    ):(<div></div>)
                }
                 { selectedAccount ? (
                     <li>
                        <Link to="/election-commision">Election Commision</Link>
                    </li>
                    ):(<div></div>)
                }

                {/* {electionCommisionStatus ? (<li>
                  <Link to="/voter-list">Voter List</Link>
                </li>):(<div></div>)} */}
                {/* {electionCommisionStatus ? (<li>
                <Link to="/election-commision">Election Commision</Link>
                </li>):(<div></div>)} */}
              </ul>
            </nav>
          </header>
  )
}

export default NavigationBar