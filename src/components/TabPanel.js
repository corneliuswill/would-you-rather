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
        }
    }

    return (
        <div id={`tab-panel-${index}`} className='tab-panel' style={styles.tabPanel}>
            {props.children}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    class: PropTypes.string,
    index: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired
}

export default TabPanel