import { HttpInterceptorFn } from '@angular/common/http';
import { ROLE_STORAGE_KEY } from './access.service';

/** Header the server reads the role from until real sign-in (JWT) is switched on. */
export const ROLE_HEADER = 'X-PeopleHub-Role';

/** Sends the signed-in role with every API call so the server can enforce Setup's page access. */
export const roleHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let role = '';
  try {
    role = (localStorage.getItem(ROLE_STORAGE_KEY) || '').trim().toLowerCase();
  } catch {
    role = '';
  }
  const isApi = req.url.startsWith('/api/') || req.url.includes('/api/');
  if (!role || !isApi || req.headers.has(ROLE_HEADER)) return next(req);
  return next(req.clone({ setHeaders: { [ROLE_HEADER]: role } }));
};
