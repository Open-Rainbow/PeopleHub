import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'ui';
import { Announcement } from 'common';

@Component({
  selector: 'announcements-root',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  template: `
    <div class="container w-full h-full p-[20px]">
      <p class="text-[20px] font-semibold mb-[25px]">Announcements & Notifications</p>

      @if (highPriorityAnnouncements.length > 0) {
        <div class="w-full h-full bg-white rounded-[12px] p-[20px] border border-[#e6e9f0] mx-auto font-['Segoe_UI',sans-serif]">
          <h3 class="text-black text-[16px] font-normal mb-[20px] flex items-center gap-[8px]">
            Pinned Announcements
          </h3>

          @for (announcement of highPriorityAnnouncements; track announcement; let last = $last) {
            <div>
              <div class="flex items-center gap-[10px]">
                <h4 class="text-[15px] font-semibold text-[#1a1a1a]">{{ announcement.title }}</h4>
                <ui-chip
                  [text]="announcement.priority"
                  [color]="announcement.priority === 'Medium' ? '#b38742' : (announcement.priority === 'Low' ? '#23816c' : '#aa355b')"
                  [activeColor]="announcement.priority === 'Medium' ? '#b38742' : (announcement.priority === 'Low' ? '#23816c' : '#aa355b')"
                  [activeBGColor]="announcement.priority === 'Medium' ? '#fef9c2' : (announcement.priority === 'Low' ? '#dbfce7' : '#ffe2e2')"
                  [bgColor]="announcement.priority === 'Medium' ? '#fef9c2' : (announcement.priority === 'Low' ? '#dbfce7' : '#ffe2e2')">
                </ui-chip>
              </div>

              <p class="text-[14px] text-[#4b4b4b] my-[10px] mb-[16px] leading-[1.4]">{{ announcement.description }}</p>

              <div class="flex justify-between items-center text-[13px] text-[#6c6c6c]">
                <div class="text-[12px] font-medium flex items-center gap-[4px]">
                  <span class="text-black">Expire on:</span>
                  <span class="text-[#C0171A]">{{ formatDate(announcement.expireDate) }}</span>
                </div>
                <span class="italic text-[#666]">by {{ announcement.postedBy }} on {{ formatDate(announcement.postedDate) }}</span>
              </div>
            </div>

            @if (!last) {
              <hr class="border-0 border-t border-[#e2e8f0] my-[30px] opacity-60">
            }
          }
        </div>
      }

      @if (otherAnnouncements.length > 0) {
        <div class="w-full h-full bg-white rounded-[12px] p-[20px] border border-[#e6e9f0] mx-auto mt-[25px] font-['Segoe_UI',sans-serif]">
          <h3 class="text-black text-[16px] font-normal mb-[20px] flex items-center gap-[8px]">
            Recent Announcements
          </h3>

          @for (announcement of otherAnnouncements; track announcement; let last = $last) {
            <div>
              <div class="flex items-center gap-[10px]">
                <h4 class="text-[15px] font-semibold text-[#1a1a1a]">{{ announcement.title }}</h4>
                <ui-chip
                  [text]="announcement.priority"
                  [color]="announcement.priority === 'Medium' ? '#b38742' : (announcement.priority === 'Low' ? '#23816c' : '#aa355b')"
                  [activeColor]="announcement.priority === 'Medium' ? '#b38742' : (announcement.priority === 'Low' ? '#23816c' : '#aa355b')"
                  [activeBGColor]="announcement.priority === 'Medium' ? '#fef9c2' : (announcement.priority === 'Low' ? '#dbfce7' : '#ffe2e2')"
                  [bgColor]="announcement.priority === 'Medium' ? '#fef9c2' : (announcement.priority === 'Low' ? '#dbfce7' : '#ffe2e2')">
                </ui-chip>
              </div>

              <p class="text-[14px] text-[#4b4b4b] my-[10px] mb-[16px] leading-[1.4]">{{ announcement.description }}</p>

              <div class="flex justify-between items-center text-[13px] text-[#6c6c6c]">
                <div class="text-[12px] font-medium flex items-center gap-[4px]">
                  <span class="text-black">Expire on:</span>
                  <span class="text-[#C0171A]">{{ formatDate(announcement.expireDate) }}</span>
                </div>
                <span class="italic text-[#666]">by {{ announcement.postedBy }} on {{ formatDate(announcement.postedDate) }}</span>
              </div>
            </div>

            @if (!last) {
              <hr class="border-0 border-t border-[#e2e8f0] my-[30px] opacity-60">
            }
          }
        </div>
      }
    </div>
  `,
})
export class Announcements {
  @Input() announcements: Announcement[] = [
    {
      announcementId: 1,
      title: 'Holiday Schedule Update',
      priority: 'Medium',
      description: 'Please note that the office will be closed from December 24th to January 2nd.',
      postedDate: '30/12/2024',
      postedBy: 'HR Department',
      expireDate: '24/12/2024',
      expireOn: new Date(),
    },
    {
      announcementId: 2,
      title: 'New Security Policy',
      priority: 'Low',
      description: 'All employees must update their passwords by end of week following the new security guidelines.',
      postedDate: '25/12/2024',
      postedBy: 'IT Security',
      expireDate: '24/12/2024',
      expireOn: new Date(),
    },
    {
      announcementId: 3,
      title: 'Critical System Update',
      priority: 'High',
      description: 'Urgent system maintenance scheduled. Please save all work before 6 PM today.',
      postedDate: '29/12/2024',
      postedBy: 'IT Department',
      expireDate: '30/12/2024',
      expireOn: new Date(),
    },
  ];

  get highPriorityAnnouncements(): Announcement[] {
    return this.announcements
      .filter(a => a.priority === 'High')
      .sort((a, b) => this.parseDate(b.postedDate) - this.parseDate(a.postedDate));
  }

  get otherAnnouncements(): Announcement[] {
    return this.announcements
      .filter(a => a.priority !== 'High')
      .sort((a, b) => this.parseDate(b.postedDate) - this.parseDate(a.postedDate));
  }

  formatDate(value: string): string {
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    }
    return value;
  }

  private parseDate(value: string): number {
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day).getTime();
    }
    return 0;
  }
}



