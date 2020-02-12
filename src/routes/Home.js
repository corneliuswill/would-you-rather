import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TabBar, Tab } from '@rmwc/tabs'
import QuestionCard from '../components/QuestionCard'
import TabPanel from '../components/TabPanel'

import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';

class Home extends Component {

    componentDidMount() {
        document.getElementById('tab-panel-2').style.display = 'none'
    }

    compare = (a, b) => {
        const timestampA = new Date(a.timestamp)
        const timestampB = new Date(b.timestamp)

        let comparison = 0
        if (timestampA > timestampB) {
            comparison = 1;
        } else if (timestampA < timestampB) {
            comparison = -1
        }

        return comparison * -1
    }

    handleClick = (evt) => {
        let tabPanelContainer = document.getElementsByClassName('tab-panel')
        Array.from(tabPanelContainer).forEach((el) => {
            el.style.display = 'none'
        })
        let tabPanel = document.getElementById('tab-panel-' + evt.target.tabId)
        tabPanel.style.display = 'block'
    }

    render() {
        let { authedUser, users, questions } = this.props
        let answered = [], 
            unanswered = []
    
        const questionValues = Object.values(questions)

        for (const value of questionValues) {
            if (value.optionOne.votes.includes(authedUser) || value.optionTwo.votes.includes(authedUser)) {
                answered.push(value)
            } else {
                unanswered.push(value)
            }
        }

        return (
            <div id="home">
                {/* TODO: Extract to seperate Tabs component */}
                <TabBar style={{ marginBottom: '16px' }}>
                    <Tab id="1" label='Unanswered' onInteraction={(evt) => this.handleClick(evt)}/>
                    <Tab id="2" label='Answered' onInteraction={(evt) => this.handleClick(evt)}/> 
                </TabBar>

                <div className="tab-content-container">

                    <TabPanel index={1} value={1}>
                        {unanswered.sort(this.compare).map((obj, key) => (
                            <QuestionCard
                                key={key}
                                id={questions[obj.id].id}
                                author={users[questions[obj.id].author].name}
                                avatarURL={users[questions[obj.id].author].avatarURL}
                                name={users[questions[obj.id].author].name}
                                optionOne={questions[obj.id].optionOne.text}
                                optionTwo={questions[obj.id].optionTwo.text}
                                timestamp={questions[obj.id].timestamp}
                            />
                        ))}
                    </TabPanel>

                    <TabPanel index={2} value={2}>
                        <ul>
                        {answered.sort(this.compare).map(obj => (
                            <li key={obj.id}>
                            <QuestionCard
                                id={questions[obj.id].id}
                                author={users[questions[obj.id].author].name}
                                avatarURL={users[questions[obj.id].author].avatarURL}
                                name={users[questions[obj.id].author].name}
                                optionOne={questions[obj.id].optionOne.text}
                                optionTwo={questions[obj.id].optionTwo.text}
                                timestamp={questions[obj.id].timestamp}
                            />
                            </li>
                        ))}
                        </ul>
                    </TabPanel>

                </div>
            </div>
        )
    }
}

Home.propTypes = {
    authedUser: PropTypes.string,
    users: PropTypes.object,
    questions: PropTypes.object
}

function mapStatetoProps(state) {
    return {
        authedUser: state.authedUser,
        users: state.users,
        questions: state.questions
    }
}

export default connect(mapStatetoProps)(Home)