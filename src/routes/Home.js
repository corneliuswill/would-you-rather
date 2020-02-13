import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TabBar, Tab } from '@rmwc/tabs'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { FaQuestionCircle } from 'react-icons/fa'

import QuestionCard from '../components/QuestionCard'
import TabPanel from '../components/TabPanel'

import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';

function Home(props) {
    let { authedUser, users, questions } = props
    const [activeTab, setActiveTab] = useState(0)
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

    const compare = (a, b) => {
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

    const handleActivate = (evt) => {
        setActiveTab(evt.detail.index)
    }

    return (
        <div id="home">
            {/* TODO: Extract to seperate Tabs component */}
            <TabBar style={{ marginBottom: '16px' }} 
                activeTabIndex={activeTab}
                onActivate={evt => handleActivate(evt)}
            >
                <Tab label='Unanswered' icon={<FaRegQuestionCircle/>} stacked={true}/>
                <Tab label='Answered' icon={<FaQuestionCircle/>} stacked={true}/> 
            </TabBar>

            <div className="tab-content-container">

                <TabPanel 
                    index={0}
                    isActive={activeTab === 0}
                >
                    {unanswered.sort(compare).map((obj, key) => (
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

                <TabPanel 
                    index={1}
                    isActive={activeTab === 1}
                >
                    <ul>
                    {answered.sort(compare).map(obj => (
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