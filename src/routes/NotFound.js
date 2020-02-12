import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@rmwc/typography'
import { Button } from '@rmwc/button'
import { withRouter } from 'react-router-dom'

import ThinkingEmoji from '../assets/images/thinking-emoji.png'

const NotFound = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <img src={ThinkingEmoji} alt='Thinking Emoji'/>
            </div>
            <Typography
                use='headline3'
            >
            OOPS!
            </Typography>
            <Typography
                use='headline5'
                tag='div'
            >
            Something went wrong.
            </Typography>
            <div className="action-items">
                <Button  
                    label='Return to Home'
                    raised
                    onClick={() => props.history.push('/')}
                />                
            </div>
        </div>
    )
}

NotFound.propTypes = {
    history: PropTypes.object
}

export default withRouter(NotFound)
