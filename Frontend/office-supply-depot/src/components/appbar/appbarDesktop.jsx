import React from 'react'
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, AppbarContainer, AppbarHeader, MyList } from '../../Styles/appbar';
import { ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';


function appbarDesktop({ matches }) {
  return (
        <AppbarContainer>
        <AppbarHeader src="/images/logo/logo.png"/>
        <MyList type="row">
            <ListItemText primary="Home"/>
            <ListItemText primary="Categories"/>
            <ListItemText primary="Product"/>
            <ListItemText primary="Contact Us"/>
            <ListItemButton>
                <ListItemIcon>
                    <SearchIcon/>
                </ListItemIcon>
            </ListItemButton>
        </MyList>
        <Actions matches={matches}/>
    </AppbarContainer>
  )
}

export default appbarDesktop