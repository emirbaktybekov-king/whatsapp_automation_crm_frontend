import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;

  // Разрешаем доступ к публичным маршрутам
  if (path.startsWith("/auth") || path === "/favicon.ico") {
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      verify(accessToken, "your_development_secret_key");
      return NextResponse.next();
    } catch (error) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await axios.post(
          `${API_URL}/api/v1/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        const responseCookies = NextResponse.next();
        responseCookies.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
        responseCookies.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        return responseCookies;
      } catch (refreshError) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
