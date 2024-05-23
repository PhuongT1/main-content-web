export function getYoutubeId(url: string): string {
  let formattedUrl = url.replace(/(>|<)/gi, '')
  // Regex to match different YouTube URL formats
  const idMatch = formattedUrl.match(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)([^\/?&"'>]+)/)
  return idMatch && idMatch[2] ? idMatch[2] : ''
}
