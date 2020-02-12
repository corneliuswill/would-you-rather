import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { updateUserQuestions } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const GET_QUESTION = 'GET_QUESTION'
export const UPDATE_QUESTION_VOTES = 'UPDATE_QUESTION_VOTES'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function updateQuestionVotes (questions) {
    return {
        type: UPDATE_QUESTION_VOTES,
        questions
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(updateUserQuestions(question))
            dispatch(hideLoading())
        })
    }
}

