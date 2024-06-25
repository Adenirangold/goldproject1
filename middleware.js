import { auth } from "./app/_lib/auth";

// export const middleware = auth;

export function middleware(req) {
  console.log("Middleware executed");

  // Assuming 'auth' is a function that checks authentication
  const isAuthenticated = auth(req);
  console.log("Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Proceeding to next response");
  return NextResponse.next();
}

export const config = {
  matcher: ["/account"],
};
