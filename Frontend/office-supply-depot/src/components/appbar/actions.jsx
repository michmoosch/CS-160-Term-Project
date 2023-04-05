import { Divider, ListItemButton, ListItemIcon } from '@mui/material'
import React, { Component } from 'react'
import { MyList, ActionIconsContainerDesktop, ActionIconsContainerMobile } from '../../Styles/appbar'
import ShoppingCardIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Colors } from '../../Styles/theme';


function Actions({matches}) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

  return (
    <Component>
      <MyList type='row'>
        <ListItemButton sx={{justifyContent: 'center'}}>
            <ListItemIcon sx={{display: 'flex', justifyContent: 'center', color: matches && Colors.secondary}}>
                <ShoppingCardIcon/>
            </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem/>
        <ListItemButton sx={{justifyContent: 'center'}}>
          <ListItemIcon sx={{display: 'flex', justifyContent: 'center', color: matches && Colors.secondary}}>
                <FavoriteIcon/>
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation='vertical' flexItem/>
        <ListItemButton sx={{justifyContent: 'center'}}>
          <ListItemIcon sx={{display: 'flex', justifyContent: 'center', color: matches && Colors.secondary}}>
                <PersonIcon/>
            </ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem/>
      </MyList>
    </Component>
    
  )
}

export default Actions