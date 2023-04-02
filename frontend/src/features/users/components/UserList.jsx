import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import userApi from '../../auth/reducers/authApi';

export default function UserList() {
  let defaultUsers = []
  const [fetchUsers] = userApi.useFetchUsersMutation()
  const [userList, setUserList] = useState(()=>[])
  console.log(userList)
  useEffect(()=> {
    const getAllUsers = async()=>{
      const allUsers = await fetchUsers()
      
        console.log(allUsers)
        setUserList(allUsers.data)
    }
    getAllUsers()
    
    return
  },[])
  return (
    <div>
    {userList.map(user => {
      return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user.email}
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      )
    })
    
        }
        </div>
  )
}