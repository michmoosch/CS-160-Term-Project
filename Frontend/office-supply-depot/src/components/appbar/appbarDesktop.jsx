import React from 'react'
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, AppbarContainer, AppbarHeader, MyList } from '../../Styles/appbar';
import { ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';
import { useUIContext } from '../../context/ui';


function AppbarDesktop({ matches }) {

  const { setShowSearchBox } = useUIContext();

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
                    <SearchIcon onClick={() => setShowSearchBox(true)}/>
                </ListItemIcon>
            </ListItemButton>
        </MyList>
        <Actions matches={matches}/>
    </AppbarContainer>
  )
}

export default AppbarDesktop