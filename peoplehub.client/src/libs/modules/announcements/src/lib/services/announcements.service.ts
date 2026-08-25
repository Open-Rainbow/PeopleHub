import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'common';

/**
 * Facade service for the Announcements module.
 *
 * Announcement data operations are backed by the shared `CommonService`
 * so all HTTP calls remain centralized. This service exposes a focused,
 * module-specific API for announcement components.
 */
@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  private readonly commonService = inject(CommonService);

  getAnnouncements(): Observable<unknown> {
    return this.commonService.getAddAnnouncements();
  }

  getExpiredAnnouncements(): Observable<unknown> {
    return this.commonService.getExpiredAnnouncements();
  }

  addAnnouncement(
    model: Parameters<CommonService['addAnnouncement']>[0],
  ): Observable<unknown> {
    return this.commonService.addAnnouncement(model);
  }

  deleteAnnouncement(id: unknown): Observable<unknown> {
    return this.commonService.deleteAnnouncement(id);
  }
}
