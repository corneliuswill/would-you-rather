import React from 'react'
import PropTypes from 'prop-types'

function Avatar(props) {
    const IMAGE_SIZE = {
        profile: '128px',
        xlarge: '64px',
        large: '48px',
        medium: '36px',
        small: '24',
    }

    const avatarURL = `${props.src}`

    return (
        <div 
            className='avatar-container' 
            style={{borderRadius: '50%', backgroundImage: `url(/${avatarURL})`, backgroundPosition: 'center', backgroundSize: 'cover', height: IMAGE_SIZE[props.size], width: IMAGE_SIZE[props.size]}}>
        </div>
    )
}

Avatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.string,
    alt: PropTypes.string
}

Avatar.defaultProps = {
    src: '',
    size: '48px',
    alt: ''
}

export default Avatar


