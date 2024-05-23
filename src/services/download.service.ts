import axios from '@/services/axios'
import globalAxios from 'axios'
import { IResponse } from '@/types/response.types'
import { IBlog } from '@/types/blog.type'

export async function downloadCardNews(id: string | number) {
	const res = await axios.get<any>(`/content-blogs/download-images/${id}`, {
		responseType: 'arraybuffer'
	})
	const { data, error }: IResponse = res
	const url = URL.createObjectURL(
		new Blob([data], {
			type: 'arraybuffer'
		})
	)
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', 'file.zip')
	document.body.appendChild(link)
	link.click()
	link.remove()
	
	return {
		data: data?.data as IBlog,
		error: error
	}
}

export async function downloadDataReferentFile(fileUrl: string, fileName: string) {
	try {
		// Make a GET request to the specified endpoint
		const res = await globalAxios.get(fileUrl, { responseType: 'blob' })
		// Create a Blob from the array buffer
		const blob = new Blob([res.data])
		// Create a URL for the Blob
		const url = URL.createObjectURL(blob)
		// Create a download link
		const link = document.createElement('a')
		link.href = url
		// Set the download attribute with the original filename
		link.download = fileName
		// Append the link to the document body
		document.body.appendChild(link)
		
		// Simulate a click on the link to trigger the download
		link.click()
		
		// Remove the link from the DOM
		link.remove()
		URL.revokeObjectURL(url)
		
	} catch (error) {
		// Handle errors here
		console.error('Error downloading file:', error)
		return error
	}
}