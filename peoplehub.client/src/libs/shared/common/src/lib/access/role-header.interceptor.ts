import { HttpInterceptorFn } from '@angular/common/http';
import { ROLE_STORAGE_KEY } from './access.service';
import { ORG_HEADER, selectedOrganizationId } from '../organization/organization.service';

/** Header the server reads the role from until real sign-in (JWT) is switched on. */
export const ROLE_HEADER = 'X-PeopleHub-Role';

/**
 * Sends the signed-in role with every API call so the server can enforce Setup's page access.
 * Super Admin also sends the organization picked in the header (the server ignores it for other roles).
 */
export const roleHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let role = '';
  try {
    role = (localStorage.getItem(ROLE_STORAGE_KEY) || '').trim().toLowerCase();
  } catch {
    role = '';
  }
  const isApi = req.url.startsWith('/api/') || req.url.includes('/api/');
  if (!role || !isApi) return next(req);

  const headers: Record<string, string> = {};
  if (!req.headers.has(ROLE_HEADER)) headers[ROLE_HEADER] = role;
  const orgId = role === 'superadmin' ? selectedOrganizationId() : null;
  if (orgId && !req.headers.has(ORG_HEADER)) headers[ORG_HEADER] = String(orgId);
  return Object.keys(headers).length ? next(req.clone({ setHeaders: headers })) : next(req);
};
