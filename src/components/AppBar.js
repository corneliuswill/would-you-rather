import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from '@rmwc/drawer'
import { Avatar } from '@rmwc/avatar'
import { 
    TopAppBar, 
    TopAppBarRow, 
    TopAppBarSection, 
    TopAppBarTitle,
    TopAppBarActionItem 
} from '@rmwc/top-app-bar'

import Divider from './Divider'

import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.iconButton'
import '@material/drawer/dist/mdc.drawer.css';


function AppBar(props) {
    let history = useHistory()
    const [open, setOpen] = React.useState(false);

    var styles = {
        drawerHeader: {
            padding: '16px 0 0 0',
            textAlign: 'center'
        }
    }

    return (
        <React.Fragment>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        { props.authedUser &&
                        <TopAppBarActionItem
                                title='profile' 
                                aria-label='profile'
                                alt='profile'
                                icon="account_circle"
                                onClick={() => setOpen(!open)}
                            />
                        }
                        <TopAppBarTitle>{props.title}</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>                      
                        {   
                            props.authedUser !== null 
                            ?
                            <Fragment>
                            <TopAppBarActionItem
                                aria-label='Log Out'
                                alt='Log Out'
                                icon='logout'
                                onClick={() => {
                                    props.handleLogOut()
                                    history.push('/')
                                }}
                            />
                            </Fragment>
                            :
                            null
                        }
                    </TopAppBarSection>                
                </TopAppBarRow>
            </TopAppBar>
            <Drawer modal 
                open={open} 
                onClose={() => setOpen(false)}
            >
                <DrawerHeader style={styles.drawerHeader}>
                    <div>
                        <Avatar
                            src={props.avatarURL === '' ? 'images/avatars/add.png' : props.avatarURL}
                            size='xlarge'
                        />
                    </div>
                    <DrawerTitle>{props.name}</DrawerTitle>
                    <DrawerSubtitle>{props.authedUser}</DrawerSubtitle>
                </DrawerHeader>
                <Divider/>
                <DrawerContent>
                </DrawerContent>            
            </Drawer>
        </React.Fragment>
    )
}

AppBar.propTypes = {
    authedUser: PropTypes.string,
    avatarURL: PropTypes.string,
    handleLogOut: PropTypes.func.isRequired,
    name: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default AppBar