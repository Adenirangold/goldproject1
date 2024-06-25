import { auth } from "./app/_lib/auth";

// export const middleware = auth;
export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/account"],
};
