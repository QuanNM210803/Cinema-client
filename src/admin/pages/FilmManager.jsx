/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import AddNewForm from '../components/AddNewFilmForm'
import ViewAndUpdateButtonFilm from '../components/ViewAndUpdateButtonFIlm'
import { useEffect, useState } from 'react'
import { getAllMovieAPI } from '~/apis/movieApi'
import { formatNumber } from '~/utils/formatVnd'
import Loading from '~/admin/components/Loading'


function FilmManager() {
	const [listMovie, setListMovie] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		getAllMovieAPI()
			.then(res => {
				setListMovie(res)
				console.log('🚀 ~ getAllMovieAPI ~ res:', res)
			})
			.finally(() => setLoading(false))
	}, [])

	const handleAddNew = (data) => {
		const updatedList = [...listMovie, data]
		// console.log('🚀 ~ handleAddNew ~ updatedList:', updatedList)
		setListMovie(updatedList)
	}

	const handleUpdate = (data) => {
		const updatedList = listMovie.map(film => {
			if (film?.id.toString() === data?.id.toString()) {
				return data // Áp dụng dữ liệu mới vào phim cần cập nhật
			}
			return film
		})
		console.log('🚀 ~ handleUpdate ~ updatedList:', updatedList)
		setListMovie(updatedList)
	}
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'name', headerName: 'Name', width: 200, editable: false },
		{
			field: 'actor',
			headerName: 'Actor',
			type: 'array',
			width: 180,
			editable: false
		},
		{ field: 'director', headerName: 'Director', width: 100, editable: false },
		{ field: 'language', headerName: 'Language', width: 100, editable: false },
		{ field: 'category', headerName: 'Category', width: 100, editable: false },
		{ field: 'releaseDate', headerName: 'ReleaseDate', width: 100, editable: false },
		{ field: 'duration', headerName: 'Duration (minute)', width: 100, editable: false },
		{
			field: 'revenue',
			headerName: 'Revenue',
			width: 100,
			editable: false,
			valueGetter: (params) => {
				return params !== 0 ? (formatNumber(params) + '.000đ') : 0
			}
		},
		{ field: 'numberOfTickets', headerName: 'Number Ticket', width: 130, editable: false },
		{
			field: 'button',
			headerName: 'Action',
			width: 100,
			renderCell: (params) => {
				return (
					<ViewAndUpdateButtonFilm params={params} handleUpdate={handleUpdate}/>
				)
			},
			disableColumnMenu: true,
			sortable: false
		}
	]
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
				<Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST FILM</Box>
			</Box>
			<AddNewForm handleAddNew={handleAddNew} />
			{ loading ? <Loading /> : <DataTable rows={listMovie} columns={columns}/> }
		</Box>
	)
}

export default FilmManager