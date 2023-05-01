import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Appbar() {
  return (
    <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
        //   borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" color="inherit" noWrap>
            OSD
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Appbar