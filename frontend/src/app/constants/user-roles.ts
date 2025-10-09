export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  EMPLOYER: 'EMPLOYER'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROLE_DISPLAY_NAMES = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.USER]: 'Usuario',
  [USER_ROLES.EMPLOYER]: 'Empleado'
} as const;

// Helper functions
export function isAdminRole(role: UserRole): boolean {
  return role === USER_ROLES.ADMIN;
}

export function isEmployerRole(role: UserRole): boolean {
  return role === USER_ROLES.EMPLOYER;
}

export function isUserRole(role: UserRole): boolean {
  return role === USER_ROLES.USER;
}

export function hasAdminPermissions(role: UserRole): boolean {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.EMPLOYER;
}

export function getRoleDisplayName(role: UserRole): string {
  return ROLE_DISPLAY_NAMES[role] || role;
}