export interface JwtPayload {
  email: string;
  name: string;
  role?: string; // Optional field to indicate user role, e.g., 'admin', 'user'
}
