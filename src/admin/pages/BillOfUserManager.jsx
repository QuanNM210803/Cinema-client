/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useParams } from 'react-router-dom'
import { getUserByIdAPI } from '~/apis/userApi'
import { useEffect, useState } from 'react'
import DataTableBillOfUser from '../components/DataTableBillOfUser'
import Loading from '~/admin/components/Loading'

function BillOfUserManager() {
	const { userId } = useParams()
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		getUserByIdAPI(userId)
			.then(res => setUser(res))
			.finally(() => setLoading(false))
	}, [userId])
	return (
		<Box
			component="main"
			sx={{
				// display:'flex',
				color: 'black',
				bgcolor: 'white',
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%'
			}}>
			<Toolbar />
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST BILLS</Box>
			</Box>
			<Box sx={{ height: 'fit-content', display: 'flex' }}>
				<Box sx={{ mr: '30px' }}>
					<Box sx={{ ml: '5px', fontSize: 15 }}>Name: {user?.fullName}</Box>
					<Box sx={{ ml: '5px', fontSize: 15 }}>Email: {user?.email}</Box>
					<Box sx={{ ml: '5px', fontSize: 15 }}>Date Of Birth: {user?.dob}</Box>
				</Box>
			</Box>
			{ loading ? <Loading /> : <DataTableBillOfUser userId={userId} /> }
		</Box>
	)
}

export default BillOfUserManager