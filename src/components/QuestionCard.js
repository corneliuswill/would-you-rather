import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Typography } from '@rmwc/typography'
import {
    Card,
    CardPrimaryAction,
    CardActions,
    CardActionButtons,
    CardActionButton,
} from '@rmwc/card'
import { Avatar } from '@rmwc/avatar';
import { months } from '../utils/utils'

import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/avatar/avatar.css'

function QuestionCard(props) {
    let { name, optionOne, timestamp } = props

    let month = months[new Date(timestamp).getMonth()]
    let fullYear = new Date(timestamp).getFullYear()

    const handleClick = () => {
        props.history.push(`/questions/${props.id}`)
    }

    const styles = {
        questionCardHeader: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px'            
        }
    } 
    return (
        <Card style={{ margin: '0 0 16px 0', backgroundColor: '#F8F8F8' }}>
            <div>
                <Typography
                    tag='div' 
                    use='caption'
                    style={{ color: '#616161', padding: '16px 16px 0 16px'}}
                >
                    {month} {fullYear}
                </Typography>
            </div>
            <div style={styles.questionCardHeader}>
                <div>
                    <Avatar
                        src={props.avatarURL}
                        size='large'
                    />
                </div>
                <div style={{ padding: '0.5rem' }}>
                    <Typography
                        use='headline6'
                        tag='h2'
                    >
                        {name} asks: 
                    </Typography>
                </div>
            </div>

            <CardPrimaryAction>
                <div style={{ padding: '0 16px 0 16px' }}>
                    <div style={{ margin: '0 0 16px 0'}}>       
                        <Typography 
                            use='body2'
                            style={{ fontWeight: '600', color: '#333' }}
                        >
                            Would you rather
                        </Typography>
                        </div>
                        <div>
                        <Typography
                            use="body2"
                        >
                            ...{optionOne} or...
                        </Typography>
                    </div>                    
                </div>
            </CardPrimaryAction>
            <CardActions>
                <CardActionButtons>
                    <CardActionButton
                        onClick={handleClick}
                    >
                    View Poll
                    </CardActionButton>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
}

QuestionCard.propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    history: PropTypes.object,
    name: PropTypes.string.isRequired,
    optionOne: PropTypes.string.isRequired,
    optionTwo: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
}

export default withRouter(QuestionCard)