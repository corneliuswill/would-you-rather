import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { IconButton } from '@rmwc/icon-button'

import '@material/icon-button/dist/mdc.icon-button.css';

function BottomNavigationBar(props) {
    const styles = {
        container: {
            backgroundColor: '#6200EE',
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
    }

    return (
        <div className='bottom-navigation-bar-container' style={styles.container}>
            <div style={styles.hBar}>
                {props.items.map((item, index) => (
                <IconButton
                    key={index}
                    aria-label={item.aria} 
                    alt={item.alt} 
                    icon={item.icon} 
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
    class: PropTypes.string,
    currentIndex: PropTypes.number,
    items: PropTypes.array,
    history: PropTypes.object
}


export default withRouter(BottomNavigationBar)
