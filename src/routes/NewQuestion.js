import React,  { useState } from 'react'
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

function NewQuestion(props) {
    const [state, setState] = useState({
        optionOneText: '',
        optionTwoText: '',
        toHome: false       
    })

    const handleOptionChange = (evt) => {
        const value = evt.target.value
        setState({
            ...state,
            [evt.target.name]: value
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = props
        
        dispatch(handleAddQuestion(state.optionOneText, state.optionTwoText))
        
        setState(() => ({
            ...state,
            toHome: true
        }))        
    }

    if (state.toHome === true) {
        return <Redirect to='/' />
    }

    return (
        <div id='add'>
            <form name='add-form' onSubmit={handleSubmit}>
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
                        name='optionOneText'
                        value={state.optionOneText}
                        onChange={handleOptionChange}
                    />
                </div>
                <div style={{marginBottom: '8px'}}>
                    <Typography
                        tag='div'
                        style={{textAlign: 'center'}}
                    >
                    OR
                    </Typography>
                </div>
                <div>
                    <TextField
                        fullwidth  
                        placeholder='Enter option two'
                        name='optionTwoText'
                        value={state.optionTwoText}
                        onChange={handleOptionChange}
                        
                    />
                </div>
                <div className='action-items'>
                    <Button
                        disabled={!(state.optionOneText && state.optionTwoText)} 
                        raised
                        label='Create Question'
                    />
                </div>                
            </form>
        </div>
    )
}

NewQuestion.propTypes = {
    dispatch: PropTypes.func
}

export default connect()(NewQuestion)