import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from "react-router-dom"
import { connect } from 'react-redux'
import { Button } from '@rmwc/button'
import { Typography } from '@rmwc/typography'
import { Select } from '@rmwc/select'

import '@material/button/dist/mdc.button.css';
import '@material/select/dist/mdc.select.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';


function Login(props) { 
  const [userId, setUserId] = useState('')
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  let handleChange = (event) => {
    setUserId(event.target.value)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    props.handleLogIn(userId)
    history.replace(from)
  }
  
  let renderSelectInput = () => {
    let options = []

    Object.entries(props.users).forEach(([key, value]) => {
      options.push({id: key, label: value.name, value: value.id})    
    })

    return <Select
      //label='Select User'
      placeholder='Select User'
      name='user' 
      value={userId} 
      options={options} 
      onChange={handleChange}
      rootProps={{style: {width: '100%'}}}
      outlined
    />
  }

  return (
    <div id="login">
      <form name='login-form' onSubmit={handleSubmit}>
        { from.pathname === '/' ? 
        null 
        :
        <div className='alert alert-critical' role='alert'>
          <h4 className="alert-heading">Unauthorized!</h4>
          <p>You must log in to view the page at {from.pathname}</p>
        </div>
        }
        <div>
          <Typography
            use='headline5'
            tag='p'
          >
          Log In
          </Typography> 
          <div>
            {renderSelectInput()}
          </div>
        </div>
        <div className='action-items'>
            <Button  
              label='Sign In'
              raised 
            />
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  users: PropTypes.object,
  handleLogIn: PropTypes.func
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Login)