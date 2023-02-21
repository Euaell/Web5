import React, {useState} from 'react'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { CircularProgress, TablePagination} from "@mui/material";
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {AutoComplete, Input} from "antd";

export default function Customers() {
	const [rows, setRows] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [page, setPage] = React.useState(0);
  	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	  const [count, setCount] = React.useState(0)
	const [options, setOptions] = useState([]);

	  const searchResult = (query) => {
			createAPIEndpoint(ENDPOINTS.customer.get.all + `?phoneSrc=${query}`)
				.fetch()
				.then(res => {
					console.log(res.data);
					return res.data;
				})
				.then(data => {
					setRows(data.customers)
				})
				.catch(console.error)
		}
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };

	  const handleChangePage = (
		  event: React.MouseEvent<HTMLButtonElement> | null,
		  newPage: number
	  ) => {
		setPage(newPage);
	  };

	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	  };

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.customer.get.all + `/?page=${page + 1}&limit=${rowsPerPage}`)
			.fetch()
			.then(res => {
				return res.data
			})
			.then(data => {
				setCount(data.total)
				setRows(data.customers)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, [page, rowsPerPage])

  return (
	  <>
		   <AutoComplete
			  dropdownMatchSelectWidth={252}
			  style={{
				width: 300,
			  }}
			  options={options}
			  onSelect={onSelect}
			  onSearch={handleSearch}
			>
			  <Input.Search size="large" placeholder="Filter By Phone No." enterButton />
			</AutoComplete>
		  <br/>
		  <hr />
		  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Phone</TableCell>
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
					  {row.User.name}
				  </TableCell>
				  <TableCell align="center">{row.state ? row.state : 'N/A'}</TableCell>
				  <TableCell align="center">{row.city ? row.city : 'N/A'}</TableCell>
				  <TableCell align="center">{row.address ? row.address : 'N/A'}</TableCell>
				  <TableCell align="center">{row.User.phone}</TableCell>
				</TableRow>
          ))}
        </TableBody>
      </Table>
	  </TableContainer>
		  <TablePagination
			  count={count}
			  page={page}
			  rowsPerPage={rowsPerPage}
			  onPageChange={handleChangePage}
			  onRowsPerPageChange={handleChangeRowsPerPage}
			  showFirstButton={true}
			  showLastButton={true}
		  />
	  </>
  )
}
