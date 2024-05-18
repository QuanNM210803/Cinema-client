import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Loading() {
	return (
		<Box sx={{
			display:'flex',
			color: 'black',
			flexGrow: 1,
			height: '80%',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<CircularProgress sx={{ mr:2 }} />
			<Typography>Loading data...</Typography>
		</Box>
	)
}

export default Loading