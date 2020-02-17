import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar'
import { FaHome, FaPlus, FaTrophy } from 'react-icons/fa'
import { Grid, GridCell } from '@rmwc/grid'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import AppBar from './AppBar'
import Home from '../routes/Home'
import NewQuestion from '../routes/NewQuestion'
import LeaderBoard from '../routes/LeaderBoard'
import Question from '../routes/Question'
import Login from '../routes/Login';
import BottomNavigationBar from './BottomNavigationBar'
import NotFound from '../routes/NotFound'
import { fakeAuth } from '../utils/auth'
import { setAuthedUser } from '../actions/authedUser'

import '@material/layout-grid/dist/mdc.layout-grid.css';

class App extends Component {
  static propTypes = {
    authedUser: PropTypes.string,
    avatarURL: PropTypes.string,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    name: PropTypes.string,
    setAuthedUser: PropTypes.func
  }

  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
    // TODO: add items to localStorage
  }

  handleLogIn = (userId) => {
    fakeAuth.authenticate()
    this.setState({ isLoggedIn: true })
    this.props.setAuthedUser(userId)
  }

  handleLogOut = () => {
    fakeAuth.signout()
    this.setState({ isLoggedIn: false })                                                                                                                                                                                                             
    this.props.setAuthedUser(null)
  }

  render() {
    console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL)
    const navButtons = [
      { 
        id:'home', 
        label:'home', 
        icon: <FaHome style={{ opacity: '76%' }}/>,
        onIcon: <FaHome/>,
      },
      { 
        id:'add', 
        label:'new', 
        icon: <FaPlus style={{ opacity: '76%' }}/>,
        onIcon: <FaPlus/>, 
      },
      { 
        id:'leaderboard', 
        label:'leaderboard', 
        icon: <FaTrophy style={{ opacity: '76%' }}/>,
        onIcon: <FaTrophy/>, 
      }
    ]

    return (
      <Router basename='/wouldyourather'>
        <AppBar
          title='Would You Rather?'
          handleLogOut={this.handleLogOut}
          authedUser={this.props.authedUser}
          name={this.props.name}
          avatarURL={this.props.avatarURL}
        />
        <TopAppBarFixedAdjust/>
        <LoadingBar/>
        <Grid>
          <GridCell span={12}>        
            <div className='container content-container'>
              {this.props.loading === true
                ? null
                : 
                <Switch>
                  <PrivateRoute path='/' exact>
                    <Home/>
                  </PrivateRoute>
                  <Route path='/login' exact>
                    <Login handleLogIn={this.handleLogIn}/>
                  </Route>
                  <PrivateRoute path='/questions/:question_id' exact>
                    <Question/>
                  </PrivateRoute>
                  <PrivateRoute path='/leaderboard' exact>
                    <LeaderBoard/>
                  </PrivateRoute>
                  <PrivateRoute path='/add' exact>
                    <NewQuestion/>
                  </PrivateRoute>
                  <Route path='/*' component={NotFound} />
                </Switch>            
              }
            </div>
          </GridCell>
        </Grid>
        {this.state.isLoggedIn && 
          <BottomNavigationBar
            items={navButtons}
            className='test-class'
            backgroundColor='#0336FF'
          />
        }
      </Router>
    )
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}s
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

function mapStateToProps({ users, authedUser }) {
  const userId = authedUser

  return {
    loading: users === null,
    authedUser: userId,
    name: userId !== null ? users[userId].name : null,
    avatarURL: userId !== null ? users[userId].avatarURL : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
      setAuthedUser: (userId) => dispatch(setAuthedUser(userId)),
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
