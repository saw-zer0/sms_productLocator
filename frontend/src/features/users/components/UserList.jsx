import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import userApi from '../../auth/reducers/authApi';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';


export default function UserList() {

  const [fetchUsers] = userApi.useFetchUsersMutation()
  const [userDelete] = userApi.useUserDeleteMutation()
  const [userList, setUserList] = useState(()=>[])

  const getAllUsers = async()=>{
    const allUsers = await fetchUsers()
    
      console.log(allUsers)
      setUserList(allUsers.data)
  }
  useEffect(()=> {
    getAllUsers()
    
    return
  },[])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const handleDelete =(id) => {
    const delResponse = userDelete(id)
    getAllUsers()
  }

  return (
    <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">UserId</StyledTableCell>
              <StyledTableCell align="right">UserName</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">IsAdmin</StyledTableCell>
              <StyledTableCell align="right">Encrypted Password</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <StyledTableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="right">{user._id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.email.split("@")[0]}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{"true"}</StyledTableCell>
                <StyledTableCell align="right">{user.password.slice(0, 10) + "..."}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="delete"
                    onClick={()=>handleDelete(user._id)}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
  )
}