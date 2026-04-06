import type { NextRequest, NextResponse } from 'next/server';

/**
 * add the CORS headers to the response
 */
export function cors(request: NextRequest, res: NextResponse<unknown>) {
	request.headers.append('Access-Control-Allow-Credentials', 'true');
	const origin = request.headers.get('origin') || '*';

	if (origin !== '*') {
		res.headers.append('Access-Control-Allow-Origin', origin);
	} else {
		res.headers.append('Access-Control-Allow-Origin', '*');
	}
	res.headers.append(
		'Access-Control-Allow-Methods',
		'GET,DELETE,PATCH,POST,PUT',
	);
	res.headers.append(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);
}
