import { NextResponse } from 'next/server';
import { cors } from './middleware/cors.ts';
import type { NextFetchEvent, NextRequest } from 'next/server';

export function middleware(_request: NextRequest, event: NextFetchEvent) {
	// retrieve the current response
	const res = NextResponse.next();

	cors(_request, res);
	return res;
}

// specify the path regex to apply the middleware to
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
