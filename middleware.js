import { NextResponse } from 'next/server';

const username = 'admin';
const password = 'esp32uploadsecure!';

export function middleware(request) {
  const auth = request.headers.get('authorization');

  if (!auth) {
    return new NextResponse('Authorization required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Upload"',
      },
    });
  }

  const [scheme, encoded] = auth.split(' ');

  if (scheme !== 'Basic') {
    return new NextResponse('Invalid auth scheme', { status: 400 });
  }

  const decoded = Buffer.from(encoded, 'base64').toString();
  const [user, pass] = decoded.split(':');

  if (user !== username || pass !== password) {
    return new NextResponse('Invalid credentials', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/upload-admin/:path*'],
};
