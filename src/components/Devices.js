import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {
	Backdrop,
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TablePagination
} from "@mui/material";

export default function Devices() {
	const [rows, setRows] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [status, setStatus] = React.useState("either")
	const [type, setType] = React.useState("either")
	const [page, setPage] = React.useState(0);
  	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	  const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };

	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	  };

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.device.get.all + `/?status=${status}&type=${type}&page=${page}&limit=${rowsPerPage}`)
			.fetch()
			.then(res => {
				return res.data
			})
			.then(data => {
				setRows(data.devices)
				setLoading(false)
				console.log(data.devices)
			})
			.catch(err => console.log(err))
	}, [type, status, page, rowsPerPage])

	const handleChangeStatus = (event) => {
		setStatus(event.target.value)
	}
	const handleChangeType = (event) => {
		setType(event.target.value)
	}

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

  return (
	  <>
		  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			  <InputLabel id="demo-select-small">Status</InputLabel>
			  <Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={status}
				label="Status"
				onChange={handleChangeStatus}
			  >
				<MenuItem value="either">
				  <em>Either</em>
				</MenuItem>
				<MenuItem value="active">Active</MenuItem>
				<MenuItem value="inactive">InActive</MenuItem>
			  </Select>
			</FormControl>
		  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			  <InputLabel id="demo-select-small">Type</InputLabel>
			  <Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={type}
				label="Type"
				onChange={handleChangeType}
			  >
				<MenuItem value="either">
				  <em>Either</em>
				</MenuItem>
				<MenuItem value="intermediate">Intermediate</MenuItem>
				<MenuItem value="hh">House-Hold</MenuItem>
			  </Select>
			</FormControl>
	  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {loading ?
			  <CircularProgress color="inherit" />
			  :
			  rows.map((row) => (
				<TableRow
				  key={row._id}
				  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				  <TableCell component="th" scope="row">
					<Button
						variant="outlined"
						color={"success"}
						{...(row.status === "active" && {color:"error"})}
						>
						{row.status === "active" ? "Active" : "Inactive"}
					</Button>
				  </TableCell>
				  <TableCell align="center">{row.state ? row.state : 'N/A'}</TableCell>
				  <TableCell align="center">{row.city ? row.city : 'N/A'}</TableCell>
				  <TableCell align="center">{row.address ? row.address : 'N/A'}</TableCell>
				  <TableCell align="center">{row.admin ? row.admin.name : 'N/A'}</TableCell>
				</TableRow>
          ))}
        </TableBody>
      </Table>
	  </TableContainer>
		  <TablePagination
			  count={rows.length}
			  page={page}
			  rowsPerPage={rowsPerPage}
			  onPageChange={handleChangePage}
			  onRowsPerPageChange={handleChangeRowsPerPage}
		  />
		  </>
  )
}
