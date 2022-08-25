import React from 'react'
import { Button, Grid } from '@mui/material'
import SearchBar from '../../../core/components/searchBar'
import UserList from '../../users/components/UserList'


export default function UserDashboard() {
  return (
    <>
      <Grid container style={{ marginBottom: '2rem'}}>
          <Grid item xs={9}>
            <Button
              variant="contained"
              >+ New User
            </Button>
          </Grid>
          <Grid item xs={3}>
            <SearchBar/>
          </Grid>
      </Grid>
      <UserList/>
    </>
  )
}
