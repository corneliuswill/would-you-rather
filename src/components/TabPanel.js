import React from 'react'
import PropTypes from 'prop-types';

function TabPanel(props) {
    let { index } = props

    const styles = {
        tabPanel: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center'          
        },
        hidden: {
            display: 'none'
        },
        visible: {
            display: 'block'
        }
    }

    return (
        <div id={`tab-panel-${index}`} className={props.class} style={{...styles.tabPanel, ...props.isActive ? styles.visible : styles.hidden}}>
            {props.children}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool
}

export default TabPanel