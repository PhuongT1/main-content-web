const convertToRem = (value: any) => {
	if (value && !isNaN(value)) {
		return value / 16 + 'rem'
	}
	return value
}

const remConvert = (stringValue: string) => {
	// Example stringValue= '10px 3px'
	if (!stringValue) return
	const baseFontSize = 16
	const pxList = stringValue.split(' ')
	
	return pxList
		.map((px) => {
			const pxValue = parseInt(px, 10)
			return (pxValue / baseFontSize).toFixed(4) + 'rem'
		})
		.join(' ')
}

export { convertToRem, remConvert }
