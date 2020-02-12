import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { IconButton } from '@rmwc/icon-button'

import './BottomNavigationBar.css'
import '@material/icon-button/dist/mdc.icon-button.css';


function BottomNavigationBar(props) {

    const handleClick = (pathname) => {
        const path = pathname === 'home' ? '/' : `/${pathname}`

        props.history.push(path);
    }

    return (
        <div className='bottom-navigation-bar-container'>
            <div className="bottom-navigation-bar-row">
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
