import React, { useState } from 'react'
import { TabBar, Tab } from '@rmwc/tabs'
import { withRouter } from 'react-router-dom' 

import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';

function TabNav(props) {
    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (evt) => {
        setActiveTab(evt.detail.index)
    }

    const handleClick = (evt) => {
        const path = evt.detail.tabId === 'home' ? '/' : `/${evt.detail.tabId}`

        props.history.push(path);
    }

    return (
        <TabBar
            activeTabIndex={activeTab}
            onActivate={evt => handleChange(evt)}
        >   
            {props.tabs.map((tab, index) => (
            <Tab 
                className={tab.class} 
                key={index} id={tab.id} 
                label={tab.label} 
                icon={tab.icon} 
                onInteraction={(evt) => handleClick(evt)}
            />
            ))}     
        </TabBar>
    )
}

export default withRouter(TabNav)