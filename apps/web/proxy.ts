import { auth } from '@repo/auth/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });

    const protectedPageRoute = ['/app'];

    // Protect pages
    if (protectedPageRoute.includes(request.nextUrl.pathname) && !session) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Protect APIs
    // if (request.nextUrl.pathname.startsWith('/api/auth/') && !session) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
}