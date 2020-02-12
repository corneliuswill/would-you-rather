import React from 'react'
import PropTypes from  'prop-types'

function Divider(props) {
    return (
        <div style={{ backgroundColor: props.color, borderBottom: props.borderBottom, 'height': props.height, width: props.width, margin: props.margin, padding: props.padding }}></div>
    )
}

Divider.propTypes = {
    backgroundColor: PropTypes.string,
    borderBottom: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    padding: PropTypes.string,
    margin: PropTypes.string
}

Divider.defaultProps = {
    backgroundColor: '#CCC',
    borderBottom: '1px solid #CCC',
    height: '1px',
    width: '100%',
    margin: '16px 0 0 0',
    padding: '0 16px'
}

export default Divider
