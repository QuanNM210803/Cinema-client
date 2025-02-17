/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import Divider from '@mui/material/Divider'
import Logout from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useState } from 'react'
import logo2 from '~/assets/logo2.png'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import { useAuth } from '~/pages/Auth/AuthProvider'
import { Dashboard } from '@mui/icons-material'
import BasicMenu from '../BasicMenu'

const Navbar = ({ avatar, fullName }) => {
	const [user, setUser] = useState({})
	const userId = localStorage.getItem('userId')
	const navigate = useNavigate()
	const auth = useAuth()
	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const [photo, setPhoto] = useState(avatar)
	const [name, setName] = useState(fullName)
	useEffect(() => {
		if (localStorage.getItem('user')) {
			const userLocal = JSON.parse(localStorage.getItem('user'))
			setUser(userLocal)
		} else {
			getUserByIdAPI(userId)
				.then(res => {
					setUser(res)
				})
		}
	}, [userId])

	useEffect(() => {
		setPhoto(avatar)
	}, [avatar])

	useEffect(() => {
		setName(fullName)
	}, [fullName])

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const [color, setColor] = useState(false)

	const changeColor = () => {
		if (window.scrollY >= 90) {
			setColor(true)
		} else {
			setColor(false)
		}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}


	window.addEventListener('scroll', changeColor)

	return (
		<div className={color ? 'header header-bg' : 'header'}>
			<nav className='navbar'>
				<Link to='/' className='logo' >
					<img style={{ width: '100px', height: '60px' }} src={logo2} alt='logo' />
				</Link>
				<Container maxWidth="xl" sx={{ zIndex: 10 }}>
					<Toolbar disableGutters sx={{ pt: '0px', pb: '0px' }}>
						<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'white',
								textDecoration: 'none'
							}}
						>
                     LuxC
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								sx={{ color: 'white', paddingBottom: '0px', paddingTop: '0px' }}
							>
								<MenuIcon sx={{}} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
									paddingBottom: 0,
									paddingTop: 0
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
									paddingTop: 0,
									paddingBottom: 0,
									'.MuiList-root': {
										paddingBottom: 0,
										paddingTop: 0
									},
									'.MuiMenuItem-root:hover': {
										bgcolor: '#87A922'
									},
									borderRadius: '5px'
								}}
							>
								<Link to='/branchs'>
									<MenuItem
										onClick={handleCloseNavMenu}
										sx={{
											':hover': {
												color: '#87A922'
											},
											bgcolor: '#222831'
										}}
									>
										<Typography textAlign="center" sx={{ color: 'white' }}>Hệ thống rạp</Typography>
									</MenuItem>
								</Link>
							</Menu>
						</Box>
						{/* <Box></Box> */}
						<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'white',
								textDecoration: 'none'
							}}
						>
                     LuxC
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', pt: '0px', pb: '0px' } }}>
							<Link to='/branchs'>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2, color: 'white', display: 'block', '&:hover': {
											color: '#87A922' // Chuyển màu văn bản sang xanh khi di chuột vào
										},
										pt: '0px',
										pb: '0px'
									}}
								>
                           Hệ thống rạp
								</Button>
							</Link>
							<Box sx={{
								alignItems: 'center',
								justifyContent: 'center',
								display: 'flex'
							}}>
								<BasicMenu></BasicMenu>
							</Box>
						</Box>
						<Box sx={{ flexGrow: 0, display:'flex', alignItems:'center', justifyContent:'center' }}>
							{ userId === null ?
								<Link to='/login'>
									<Button
										onClick={handleCloseNavMenu}
										sx={{
											my: 2, color: 'white', display: 'block', '&:hover': {
												color: '#87A922' // Chuyển màu văn bản sang xanh khi di chuột vào
											},
											pt: '0px',
											pb: '0px'
										}}
									>
                  Login / Register
									</Button>
								</Link>
								: <>
									<Link to='/profile'>
										<Typography textAlign="center" sx={{ mr:2, color: 'white', cursor:'pointer', ':hover' : { color: '#87A922' } }}>{user?.fullName}</Typography>
									</Link>
									<Tooltip title="Open settings">
										<IconButton onClick={handleClick} sx={{ p: 0 }}>
											<img style={{ width:40, height:40, borderRadius:'50%' }} alt="Avatar" src={`data:image/jpeg;base64,${photo}`} />
										</IconButton>
									</Tooltip>
								</>
							}
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: 'visible',
										filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										mt: 1.5,
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1
										},
										'&::before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0
										}
									}
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<MenuItem onClick={() => {
									handleClose()
									navigate('/profile')
								}}>
									<Avatar alt="Avatar" src={`data:image/jpeg;base64,${photo}`} /> Thông tin
								</MenuItem>
								<Divider />
								{ localStorage.getItem('userRole')?.includes('ROLE_ADMIN')
                && <Link to='/admin'>
                	<MenuItem sx={{ color:'black' }}>
                		<ListItemIcon>
                			<Dashboard fontSize="small" />
                		</ListItemIcon>
                    Dashboard
                	</MenuItem>
                </Link>
								}
								<MenuItem onClick={() => {
									handleClose()
									auth.handleLogout()
								}}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
                  Đăng xuất
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</nav>
		</div >
	)
}

export default Navbar