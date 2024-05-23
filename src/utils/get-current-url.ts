import { isServer } from "./types"

export default function getCurrentUrl() {
    const wd = isServer() ? undefined : window
    const pathname = wd?.location.href
    return !!pathname ? pathname : ''
}