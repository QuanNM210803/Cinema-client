import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { HashLink } from 'react-router-hash-link'
const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: '',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		border: '1px solid rgba(255, 255, 255, 0.8)'
	}
}))

export default function CustomizedMenus() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<Button
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{
					my: 2, color: 'white', '&:hover': {
						color: '#87A922' // Chuyển màu văn bản sang xanh khi di chuột vào
					},
					pt: '0px',
					pb: '0px'
				}}
			>
            Khác
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button'
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<HashLink to="/rules#aboutUs" style={{ color:'rgba(255, 255, 255, 0.8)' }}>
					<MenuItem onClick={handleClose} disableRipple >
                  Về chúng tôi
					</MenuItem>
				</HashLink>

				<HashLink to="/rules#terms" style={{ color:'rgba(255, 255, 255, 0.8)' }}>
					<MenuItem onClick={handleClose} disableRipple >
                  Điều khoản sử dụng
					</MenuItem>
				</HashLink>
				<HashLink to="/rules#customer-care" style={{ color:'rgba(255, 255, 255, 0.8)' }}>
					<MenuItem onClick={handleClose} disableRipple>
                  Chăm sóc khách hàng
					</MenuItem>
				</HashLink>

				<HashLink to="/rules#privacy-policy" style={{ color:'rgba(255, 255, 255, 0.8)' }}>
					<MenuItem onClick={handleClose} disableRipple>
                  Chính sách bảo mật
					</MenuItem>
				</HashLink>
			</StyledMenu>
		</div>
	)
}
