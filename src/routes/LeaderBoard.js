import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Avatar } from '@rmwc/avatar'
import { Typography } from '@rmwc/typography'
import { GiTrophyCup } from 'react-icons/gi'
import { FaMedal } from 'react-icons/fa'

import '@rmwc/avatar/avatar.css'

function LeaderBoard(props) {
    const usersValues = Object.values(props.users)

    let withSum = usersValues.map(user => (
        user = {...user,  sum: Object.keys(user.answers).length + user.questions.length }
    ))

    let sortedUsers = withSum.sort((a, b) => (a.sum > b.sum) ? -1 : 1)

    let prevScore = 0
    let prevRank = 0
    let rank

    var styles = {
        container: {
            position: 'relative',
            backgroundColor: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #DDD',
            borderRadius: '4px',
            padding: '8px',
            marginBottom: '4px'
        },
        avatarContainer: {
            display: 'flex',
            padding: '0 8px 0 0',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 0 8px 0'
        },
        scoreContainer: {
            display: 'flex',
            width: '100%',
            textAlign: 'center',
            margin: '0'
        },
        cellItem: {
            backgroundColor: '#49BFF7',
            color: '#FFF',
            fontWeight: '600',
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            padding: '4px 0',
            margin: '1px'
        },
        cellText: {
            fontSize: '12px'
        },
        scoreCell: {
            backgroundColor: '#42A5F5'
        }
    }

    const MEDAL = {
        1: '#D9A91A',
        2: '#A7A7A7',
        3: '#73451D'
    }

    const renderUserCard = (user, index) => {
        return (
            <div key={user.id} style={styles.container}>
                <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '12px', fontStyle: 'italic', color: '#666' }}>{`#${index}`}</span>
                { index < 4 &&
                <span style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <FaMedal
                        size='24'
                        color={MEDAL[index]}
                    />
                </span>
                }
                <div style={styles.avatarContainer}>
                    <div style={{ marginRight: '8px'}}>
                        <Avatar
                            src={user.avatarURL}
                            size='xlarge'
                        />
                    </div>
                    <div>
                        <Typography
                            use='body1'
                        >
                        {user.name}
                        </Typography>
                    </div>
                </div>
                <ul style={styles.scoreContainer}>
                    <li style={styles.cellItem}>
                         <span>{Object.keys(user.answers).length}</span>
                         <span style={styles.cellText}>Answered</span>
                    </li>
                    <li style={styles.cellItem}>
                        <span>{user.questions.length}</span>
                        <span  style={styles.cellText}>Created</span>
                    </li>
                    <li style={{...styles.cellItem, ...styles.scoreCell}}>
                        <span>{Object.keys(user.answers).length + user.questions.length}</span>
                        <span style={styles.cellText}>Score</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div id='leaderboard'>
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
                <GiTrophyCup
                    size={56}
                    color='#D9A91A'
                />
                <Typography
                    use='headline6'
                    tag='div'
                >
                    LEADERBOARD
                </Typography>
            </div>            
            {sortedUsers.map((user, index) => {
                if (prevScore === user.sum) {
                    rank = prevRank
                } else {
                    rank = index+1
                    prevRank = rank
                    prevScore = user.sum
                }
                return renderUserCard(user, rank)
            })}
        </div>
    )
}

LeaderBoard.propTypes = {
    users: PropTypes.object
}

function mapStateToProps({ users }) {
    return {
        users: users
    }
}

export default connect(mapStateToProps)(LeaderBoard)