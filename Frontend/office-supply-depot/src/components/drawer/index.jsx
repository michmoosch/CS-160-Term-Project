import { Drawer, List, ListItemButton, ListItemText, Divider, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useUIContext } from '../../context/ui';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerCloseButton } from '../../Styles/appbar';
import { lighten } from "polished";
import { Colors } from '../../Styles/theme';

const MiddleDivider = styled((props) => (
    <Divider variant='middle' {...props}/>
))``;

export default function AppDrawer() {

    const {drawerOpen, setDrawerOpen} = useUIContext();

    return (
        <>
          {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.white),
            }}
          />
        </DrawerCloseButton>
      )}
          <Drawer open={drawerOpen}>
            <List>
              <ListItemButton>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
              <MiddleDivider />
              <ListItemButton>
                <ListItemText>Categories</ListItemText>
              </ListItemButton>
              <MiddleDivider />
              <ListItemButton>
                <ListItemText>Products</ListItemText>
              </ListItemButton>
              <MiddleDivider />
              <ListItemButton>
                <ListItemText>About Us</ListItemText>
              </ListItemButton>
              <MiddleDivider />
              <ListItemButton>
                <ListItemText>Contact Us</ListItemText>
              </ListItemButton>
              <MiddleDivider />
            </List>
          </Drawer>
        </>
      );
    }