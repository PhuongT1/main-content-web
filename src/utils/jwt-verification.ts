import { jwtDecode } from 'jwt-decode';

export function jwtVerification(access_token: string) {
	try {
		if (!Boolean(access_token.trim())) {
			return false;
		}
		const decoded: any = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}
