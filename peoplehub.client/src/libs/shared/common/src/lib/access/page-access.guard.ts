import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AccessService } from './access.service';
import { pageKeyOf, ROLE_SHELLS } from './route-page-map';

/**
 * Role shells (`/employee`, `/manager`, `/hr`, `/admin`, `/superadmin`): blocks pages the role has no "view" access to
 * (configured in Setup) and keeps users inside their own shell.
 */
export const pageAccessGuard: CanActivateChildFn = async (_child, state) => {
  const access = inject(AccessService);
  const router = inject(Router);

  const role = access.role();
  if (!role) return router.createUrlTree(['/login']);

  const segments = state.url.split(/[?#;(]/)[0].split('/').filter(Boolean);
  const shell = (segments[0] ?? '').toLowerCase();
  const home = router.createUrlTree([`/${role}`, 'dashboard']);

  // Built-in roles have their own shell; do not let /employee users browse /admin pages.
  if (ROLE_SHELLS.includes(role) && ROLE_SHELLS.includes(shell) && shell !== role) return home;

  await access.load();
  const pageKey = pageKeyOf(segments[1]);
  if (!pageKey || pageKey === 'dashboard') return true;
  return access.can(pageKey, 'view') ? true : home;
};
