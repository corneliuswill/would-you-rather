import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TextField } from '@rmwc/textfield'
import { Typography } from '@rmwc/typography'
import { Button } from '@rmwc/button'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

import '@material/textfield/dist/mdc.textfield.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/button/dist/mdc.button.css';

class NewQuestion extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }

    handleOptionOneChange = (evt) => {
        this.setState({
            optionOneText: evt.target.value
        })
    }

    handleOptionTwoChange = (evt) => {
        this.setState({
            optionTwoText: evt.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props
        
        dispatch(handleAddQuestion(optionOneText, optionTwoText))
        
        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))        
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state
    
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div id='add'>
                <form name='add-form' onSubmit={this.handleSubmit}>
                    <div style={{marginBottom: '24px'}}>
                        <Typography
                            use='body2'
                        >
                            Complete the question:
                        </Typography>                      
                    </div>
                    <div>
                        <Typography
                            use='body1'
                        >
                        Would you rather ... 
                        </Typography>                    
                    </div>
                    <div style={{marginBottom: '32px'}}>
                        <TextField
                            fullwidth  
                            placeholder='Enter option one'
                            value={optionOneText}
                            onChange={this.handleOptionOneChange}
                        />
                    </div>
                    <div style={{marginBottom: '8px'}}>
                        <Typography
                            tag='div'
                            style={{textAlign: 'center'}}
                        >
                        <span style={{ color: '#DDD'}}>––––––––––––––––––––</span>&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#DDD'}}>––––––––––––––––––––</span>
                        </Typography>
                    </div>
                    <div>
                        <TextField
                            fullwidth  
                            placeholder='Enter option two'
                            value={optionTwoText}
                            onChange={this.handleOptionTwoChange}
                            
                        />
                    </div>
                    <div className='action-items'>
                        <Button
                            disabled={!(this.state.optionOneText && this.state.optionTwoText)} 
                            raised
                            label='Create Question'
                        />
                    </div>                
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)