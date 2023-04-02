import React from 'react'
import { Button, Grid } from '@mui/material'
import SearchBar from '../../../core/components/searchBar'
import UserList from '../../users/components/UserList'
import { useNavigate } from 'react-router-dom'



export default function UserDashboard() {
  const navigate = useNavigate()
  return (
    <>
      <Grid container style={{ marginBottom: '2rem'}}>
          <Grid item xs={9}>
            <Button
              variant="contained"
              onClick={()=> navigate("/new_user", {replace: true})}
              >+ New User
            </Button>
          </Grid>
          <Grid item xs={3}>
          </Grid>
      </Grid>
      <UserList/>
    </>
  )
}
