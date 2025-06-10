import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n/config';
import { Locale } from './i18n/types';

export function middleware(request: NextRequest) {
  // Получаем параметр locale из URL
  const locale = request.nextUrl.searchParams.get('locale');
  
  // Если параметр locale присутствует и валиден, устанавливаем cookie
  if (locale && locales.includes(locale as Locale)) {
    const response = NextResponse.next();
    
    // Устанавливаем cookie с локалью
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 дней
    });

    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // Применяем middleware ко всем страницам кроме API routes и статических файлов
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};