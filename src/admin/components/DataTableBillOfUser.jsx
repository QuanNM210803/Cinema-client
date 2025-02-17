import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'
import { useEffect } from 'react'
import { getListBillByUserIdAPI } from '~/apis/billApi'
import { getListTicketByBillIdAPI } from '~/apis/ticketApi'
import { formatNumber } from '~/utils/formatVnd'
import { toast } from 'react-toastify'
import Loading from './Loading'

export default function DataTableBillOfUser({ userId }) {
	const [rows, setRows] = useState([])
	const [listBill, setListBill] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		getListBillByUserIdAPI(userId).then(res => {
			// Tạo một mảng các promise cho tất cả các cuộc gọi API
			const promises = res.map(item => getListTicketByBillIdAPI(item.id))

			// Sử dụng Promise.all để đợi cho tất cả các promise được giải quyết
			Promise.all(promises).then(responses => {
				const newData = res.map((item, index) => createData(item, responses[index]))
				// console.log('🚀 ~ Promise.all ~ newData:', newData)
				setRows(newData)
			})
				.catch(error => {
					toast.error(error.response.data)
				})
				.finally(() => setLoading(false))
			setListBill(res)
		}).catch(error => {
			toast.error(error.response.data)
		})
	}, [userId])

	function createData(bill, ticket) {
		return {
			bill,
			history: ticket
		}
	}

	function Row(props) {
		const { row } = props
		const [open, setOpen] = React.useState(false)

		return (
			<React.Fragment>
				<TableRow sx={{ bgcolor: '#FEFAF6' }}>
					<TableCell>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
							sx={{ color: 'black' }}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{`${row?.bill.createdDate.toString() + ' ' + row?.bill.createdTime}`}</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{row?.history[0]?.scheduleResponse.startDate + ' ' + row?.history[0]?.scheduleResponse.startTime}</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{row?.history[0]?.scheduleResponse.movieResponse.name}</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{row?.history[0]?.scheduleResponse.roomResponse.branchResponse.name}</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{formatNumber(row?.bill?.payment)}.000đ</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{row?.bill.numberOfTickets}</TableCell>
					<TableCell sx={{ color: 'black' }} align="center">{row?.bill.userResponse.fullName}</TableCell>
				</TableRow>
				<TableRow sx={{ borderTop: '1px solid gray' }}>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1, width: '300px' }}>
								<Typography variant="h6" gutterBottom component="div">
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell align="center">Seat</TableCell>
											<TableCell align="center">Price</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{row?.history?.map((historyRow) => (
											<TableRow key={historyRow?.id}>
												<TableCell align="center">{historyRow?.seatResponse.name}</TableCell>
												<TableCell align="center">{formatNumber(historyRow?.price)}.000đ</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		)
	}

	Row.propTypes = {
		row: PropTypes.shape({
			calories: PropTypes.number.isRequired,
			carbs: PropTypes.number.isRequired,
			fat: PropTypes.number.isRequired,
			history: PropTypes.arrayOf(
				PropTypes.shape({
					amount: PropTypes.number.isRequired,
					customerId: PropTypes.string.isRequired,
					date: PropTypes.string.isRequired
				})
			).isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			protein: PropTypes.number.isRequired
		}).isRequired
	}

	return (
		loading
			? (<Loading />)
			:
			(
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table" sx={{ color: 'black' }}>
						<TableHead>
							<TableRow sx={{ color: 'black' }}>
								<TableCell />
								<TableCell align="center">Create At</TableCell>
								<TableCell align="center">Show Time</TableCell>
								<TableCell align="center">Film</TableCell>
								<TableCell align="center">Branch</TableCell>
								<TableCell align="center">Payment</TableCell>
								<TableCell align="center">Number Tickets</TableCell>
								<TableCell align="center">Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<Row key={row.name} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)

	)
}