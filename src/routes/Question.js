import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { Typography } from '@rmwc/typography'
import { Radio } from '@rmwc/radio'
import { Button } from '@rmwc/button'
import { Avatar } from '@rmwc/avatar'
import { handleSaveQuestionAnswer } from '../actions/shared';

import '@material/radio/dist/mdc.radio.css'
import '@material/form-field/dist/mdc.form-field.css'
import '@rmwc/avatar/avatar.css'

class Question extends Component {
    state = {
        answer: ''
    }

    handleChange = (e) => {
        this.setState({
            answer: e.target.value
        })        
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { id } = this.props.question
        const { answer } = this.state
        const { dispatch } = this.props

        dispatch(handleSaveQuestionAnswer(id, answer))
        
        this.setState(() => ({
            answer: ''
        }))        
    }

    renderPoll = (author, question) => {
        return (
            <form name='poll-form' onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Avatar
                            src={`/${this.props.author.avatarURL}`}
                            size='large'
                        />
                    </div>
                    <div>
                        <Typography
                            use='headline6'
                            tag='h2'
                            style={{margin: '0 0 0 8px'}}
                        >
                        {author.name} asks:
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography
                        use='headline5'
                        tag='h2'
                    >
                    Would You Rather ...
                    </Typography>  
                </div>
                <div>
                    <Radio
                        label={question.optionOne.text}
                        value='optionOne'
                        name='radioOption'
                        onChange={this.handleChage}
                    />
                </div>     
                <div>
                    <Radio
                        label={question.optionTwo.text}
                        value='optionTwo'
                        name='radioOption'
                        onChange={this.handleChage}
                    />
                </div>
                <div className='action-items'>
                    <Button
                        disabled={!this.state.answer} 
                        raised
                        label='Vote'
                    />
                </div>                    
            </form>
        )
    }

    renderPollResults = (author, question) => {
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercentage = (optionOneVotes / totalVotes) * 100
        const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100

        var styles = {   
            container: {
                border: '1px solid #427FB3',
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '4px'
            },
            containerVoted: {
                backgroundColor: '#D1DEF3',
                border: '1px solid #427FB3',
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '4px',
            },            
            bar: {
                width: '100%',
                backgroundColor: '#EEE',
                height: '40px',
                color: '#FFF',
                borderRadius: '4px'
            },
            votes: {
                textAlign: 'center'
            }
        }

        return (
            <React.Fragment>
                <Typography
                    use='headline6'
                    tag='h2'
                >
                Results:
                </Typography>
                <div style={ question.optionOne.votes.includes(this.props.authedUser) ? styles.containerVoted : styles.container  }>
                    <p>Would you rather {question.optionOne.text}?</p>
                    <div style={styles.bar}>
                        <div style={{ height: '100%', width: `${optionOnePercentage}%`, backgroundColor: '#6610f2', borderRadius: '4px', opacity: '65%' }}></div>
                    </div>
                    <div style={styles.votes}>
                        {`${optionOneVotes} out of ${totalVotes} votes`}
                    </div>
                </div>
                <div style={ question.optionTwo.votes.includes(this.props.authedUser) ? styles.containerVoted : styles.container }>
                    <p>Would you rather {question.optionTwo.text}?</p>
                    <div style={styles.bar}>
                        <div style={{ height: '100%', width: `${optionTwoPercentage}%`, backgroundColor: '#6610f2', borderRadius: '4px', opacity: '65%' }}></div>
                    </div>
                    <div style={styles.votes}>
                        {`${optionTwoVotes} out of ${totalVotes} votes`}
                    </div>
                </div>  
            </React.Fragment>
        )
    }

    render() {
        const { author, question } = this.props

        if (!question) {
            return <Redirect to='/error' />
        }

        return (
            <div id='question'>
                { question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser) ? (
                    this.renderPollResults(author, question)
                ) : (
                    this.renderPoll(author, question)
                )}
            </div>
        )
    }
}

Question.propTypes = {
    authedUser: PropTypes.string,
    author: PropTypes.object,
    dispatch: PropTypes.func,
    question: PropTypes.object,
}

function mapStateToProps({ authedUser, questions, users }, ownProps) {
    const { question_id } = ownProps.match.params

    try {
        return {
            authedUser,
            author: users[questions[question_id].author],
            question: questions[question_id]
        }       
    }
    catch(e) {
        console.log('Error:', e)
        return {
            isError: true,
            message: e
        }
    }

}

export default withRouter(connect(mapStateToProps)(Question))