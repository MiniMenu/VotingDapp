import {createBrowserRouter} from 'react-router-dom'
import CandidateRegistration from '../pages/Candidate/CandidateRegistration'
import VoterRegistration from '../pages/Voter/VoterRegistration'
import CandidateDisplay from '../pages/Candidate/CandidateDisplay'
import VoterDisplay from '../pages/Voter/VoterDisplay'
import Wallet from '../pages/Wallet/Wallet'
import NavigationBar  from '../components/NavigationBar/NavigationBar'
import ElectionCommision from '../pages/Election/ElectionCommision';
import TokenExchange from '../pages/TokenExchange/TokenExchange'
import VoterProfile from '../pages/Voter/VoterProfile'
const routes = createBrowserRouter([
    {
        path: '/',
        element:  (<div><NavigationBar /> <Wallet /></div>)
    },
    {
        path: '/candidate-register',
        element:( <div><NavigationBar /> <CandidateRegistration /></div>)
    },
    {
        path: '/candidate-list',
        element: ( <div><NavigationBar /> <CandidateDisplay /></div>)
    },
    {
        path:'/election-commision',
        element:( <div><NavigationBar /> <ElectionCommision /></div>) 
    },
    {
        path: '/voter-register',
        element: ( <div><NavigationBar /> <VoterRegistration /></div>)
    },
    {
        path: '/voter-list',
        element:  ( <div><NavigationBar /> <VoterDisplay /></div>)
    },
    {
        path: '/token-exchange',
        element:  ( <div><NavigationBar /> <TokenExchange /></div>)
    },
    {
        path: '/voter-profile',
        element:  ( <div><NavigationBar /> <VoterProfile /></div>)
    },
])
export default routes