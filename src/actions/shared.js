import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, updateUserAnswers } from '../actions/users'
import { receiveQuestions, updateQuestionVotes } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(null))
                dispatch(hideLoading())
            })
    }
}

export function handleSaveQuestionAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(({ users, questions }) => {
            dispatch(updateUserAnswers(users))
            dispatch(updateQuestionVotes(questions))
            dispatch(hideLoading())
        })
    }
}