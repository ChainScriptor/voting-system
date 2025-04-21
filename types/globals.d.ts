export {}

// Create a type for the roles
export type Roles = 'voting_admin' | 'Member'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}