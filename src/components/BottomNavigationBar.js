import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { IconButton } from '@rmwc/icon-button'

import '@material/icon-button/dist/mdc.icon-button.css';

function BottomNavigationBar(props) {
    const [isChecked, setIsChecked] = useState(false)

    const styles = {
        container: {
            backgroundColor: props.backgroundColor,
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '56px'
        },
        hBar: {
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            height: '56px',
            color: '#FFF'
        }      
    }

    const handleClick = (pathname) => {
        const path = pathname === 'home' ? '/' : `/${pathname}`

        props.history.push(path);

        setIsChecked(!isChecked)
    }

    return (
        <div className={['bottom-navigation-bar-container', props.className].join(' ')} style={styles.container}>
            <div style={styles.hBar}>
                {props.items.map((item, index) => (
                <IconButton
                    key={index}
                    checked={isChecked}
                    aria-label={item.aria} 
                    alt={item.alt} 
                    icon={item.icon}
                    onIcon={item.onIcon} 
                    onClick={() => handleClick(item.id)}
                />
                ))}
            </div>
        </div>
    )
}

BottomNavigationBar.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    currentIndex: PropTypes.number,
    items: PropTypes.array,
    history: PropTypes.object
}

BottomNavigationBar.defaultProps = {
    backgroundColor: '#6200EE'
}

export default withRouter(BottomNavigationBar)
