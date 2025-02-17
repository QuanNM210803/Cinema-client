import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const getListAreaAPI = async () => {
	try {
		const res = await axios.get(`${API_ROOT}/areas/all`, { headers: getHeader() })
		// lay data qua property data cua axios
		// console.log('🚀 ~ addNewMovieAPI ~ res:', res)
		return res.data
	} catch (error) {
		// console.log(error)
		return
	}
}