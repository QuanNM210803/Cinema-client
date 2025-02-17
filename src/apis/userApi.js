import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const getListUserAPI = async () => {
	try {
		const res = await axios.get(`${API_ROOT}/users/all`, { headers: getHeader() })
		// lay data qua property data cua axios
		// console.log('🚀 ~ addNewMovieAPI ~ res:', res)
		return res.data
	} catch (error) {
		return
	}
}
export const getUserByIdAPI = async (userId) => {
	try {
		const res = await axios.get(`${API_ROOT}/users/${userId}`, { headers: getHeader() })
		// lay data qua property data cua axios
		// console.log('🚀 ~ addNewMovieAPI ~ res:', res)
		return res.data
	} catch (error) {
		return
	}
}
export const updateUserByIdAPI = async (data, userId) => {
	try {
		const res = await axios.put(`${API_ROOT}/users/update/admin/${userId}`, data, { headers: getHeader() })
		// lay data qua property data cua axios
		// console.log('🚀 ~ addNewMovieAPI ~ res:', res)
		toast.success('Update Successfully!')
		return res.data
	} catch (error) {
		toast.error(error.response.data)
	}
}
export const updateUserClientByIdAPI = async (data, userId) => {
	try {
		const res = await axios.put(`${API_ROOT}/users/update/user/${userId}`, data, { headers: getHeader() })
		// lay data qua property data cua axios
		// console.log('🚀 ~ addNewMovieAPI ~ res:', res)
		toast.success('Update Successfully!')
		return res.data
	} catch (error) {
		toast.error(error.response.data)
	}
}