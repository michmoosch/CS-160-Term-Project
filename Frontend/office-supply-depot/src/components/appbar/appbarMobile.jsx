import { IconButton } from '@mui/material'
import React from 'react'
import { AppbarContainer, AppbarHeader } from '../../Styles/appbar'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';

function AppbarMobile({ matches }) {
  return (
    <AppbarContainer>
      <IconButton>
        <MenuIcon/>
      </IconButton>
      <AppbarHeader src="/images/logo/logo.png"/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
      <Actions matches={matches}/>
    </AppbarContainer>
  )
}

export default AppbarMobile