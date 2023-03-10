import React from 'react'
import {createAPIEndpoint, ENDPOINTS} from "../api";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TablePagination
} from "@mui/material";
import {DatePicker} from "antd";

export default function Bills() {

	const [rows, setRows] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [page, setPage] = React.useState(0);
  	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	  const [date, setDate] = React.useState(null);
	  const [paid, setPaid] = React.useState("either")
	const [count, setCount] = React.useState(0)

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

	  const handleChangeMonth = (date, dateString) => {
		  setDate(dateString)
	  }

	  const handleChangePaid = (event) => {
		  setPaid(event.target.value)
	  }

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.bill.get.all + `/?page=${page}&limit=${rowsPerPage}&paid=${paid}&date=${date}`)
			.fetch()
			.then(res => {
				return res.data
			})
			.then(data => {
				setCount(data.total)
				setRows(data.bills)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, [paid, page, rowsPerPage, date])

  return (
	  <>
		  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			  <InputLabel id="demo-select-small">Status</InputLabel>
			  <Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={paid}
				label="Status"
				onChange={handleChangePaid}
			  >
				<MenuItem value="either">
				  <em>Either</em>
				</MenuItem>
				<MenuItem value={true}>Paid</MenuItem>
				<MenuItem value={false}>Unpaid</MenuItem>
			  </Select>
			</FormControl>


    	<DatePicker onChange={handleChangeMonth} picker="month" style={{margin: "10px"}} popupStyle={{ zIndex: 5000, marginTop: "40px" }}
		/>

		  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell align="center">Volume (L)</TableCell>
            <TableCell align="center">Rate</TableCell>
			  <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Statue</TableCell>
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
					  {row.customer.User.name}
				  </TableCell>
				  <TableCell align="center">{row.volume}</TableCell>
				  <TableCell align="center">{row.rate}</TableCell>
					<TableCell align="center">{row.amount}</TableCell>
				  <TableCell align="center">{row.customer.User.phone}</TableCell>
				  <TableCell align="center">
					  <Button
						variant="contained"
						color={"success"}
						{...(!row.paid && {color:"error", variant:"outlined"})}
						>
						{row.paid ? "Paid" : "UnPaid"}
					</Button>
				  </TableCell>
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
