import { AnnouncementItem } from '../../models/announcement.model';
import { addDays, toIsoDate } from '../../utils/announcement.utils';

/** Demo data used until the announcements API is available. Dates are relative to today. */
export function buildSeedAnnouncements(today = new Date()): AnnouncementItem[] {
  const day = (offset: number) => toIsoDate(addDays(today, offset));
  const created = (offset: number) => addDays(today, offset).toISOString();

  return [
    {
      id: 1,
      title: 'Diwali celebrations and office closure',
      description:
        'Join us for Diwali celebrations in the cafeteria on Friday at 4 PM: sweets, rangoli and a team photo.\n\nThe office will stay closed on the following Monday. Emergency support rotations are shared with team leads.',
      priority: 'High',
      category: 'Celebration',
      department: 'All Departments',
      targetAudience: 'All Employees',
      publishOn: day(-1),
      expiresOn: day(10),
      postedBy: 'HR Team',
      isPinned: true,
      createdAt: created(-1),
    },
    {
      id: 2,
      title: 'Updated leave policy for 2027',
      description:
        'The 2027 leave policy is live. Highlights: 2 extra wellness days, carry-forward raised to 10 days, and paternity leave extended to 4 weeks. Please read the full policy in the HR portal before 30 November.',
      priority: 'High',
      category: 'Policy',
      department: 'All Departments',
      targetAudience: 'All Employees',
      publishOn: day(-3),
      expiresOn: day(40),
      postedBy: 'HR Team',
      isPinned: true,
      createdAt: created(-3),
    },
    {
      id: 3,
      title: 'VPN maintenance this Saturday',
      description:
        'The corporate VPN will be unavailable on Saturday between 10 PM and 2 AM IST for a firmware upgrade. Save your work and disconnect before the window starts.',
      priority: 'Medium',
      category: 'IT & Systems',
      department: 'Engineering',
      targetAudience: 'All Employees',
      publishOn: day(0),
      expiresOn: day(5),
      postedBy: 'IT Helpdesk',
      isPinned: false,
      createdAt: created(0),
    },
    {
      id: 4,
      title: 'Welcome our new joiners',
      description:
        'Please welcome the new members who joined the web team this week. Onboarding buddies have been assigned. Say hi on the team channel!',
      priority: 'Low',
      category: 'General',
      department: 'Engineering',
      targetAudience: 'All Employees',
      publishOn: day(-2),
      expiresOn: day(12),
      postedBy: 'Engineering Office',
      isPinned: false,
      createdAt: created(-2),
    },
    {
      id: 5,
      title: 'Quarterly town hall',
      description:
        'Our Q4 town hall is on the last Thursday of the month at 5 PM IST. Submit your questions for the leadership team using the form in the HR portal.',
      priority: 'Medium',
      category: 'Event',
      department: 'All Departments',
      targetAudience: 'All Employees',
      publishOn: day(4),
      expiresOn: day(20),
      postedBy: 'Leadership Office',
      isPinned: false,
      createdAt: created(-1),
    },
    {
      id: 6,
      title: 'Manager training: giving effective feedback',
      description:
        'A 2-hour workshop for people managers on structured feedback and growth conversations. Seats are limited to 25. Register by Wednesday.',
      priority: 'Low',
      category: 'Training',
      department: 'All Departments',
      targetAudience: 'Managers',
      publishOn: day(-6),
      expiresOn: day(2),
      postedBy: 'L&D Team',
      isPinned: false,
      createdAt: created(-6),
    },
    {
      id: 7,
      title: 'Submit investment declarations',
      description:
        'Submit your tax investment declarations for this financial year so that the correct TDS is applied from next month\'s payroll.',
      priority: 'High',
      category: 'HR',
      department: 'Finance',
      targetAudience: 'All Employees',
      publishOn: day(-25),
      expiresOn: day(-5),
      postedBy: 'Payroll Team',
      isPinned: false,
      createdAt: created(-25),
    },
    {
      id: 8,
      title: 'Independence Day flag hoisting',
      description: 'Flag hoisting at 9 AM in the main lobby, followed by breakfast for everyone.',
      priority: 'Low',
      category: 'Holiday',
      department: 'All Departments',
      targetAudience: 'All Employees',
      publishOn: day(-70),
      expiresOn: day(-64),
      postedBy: 'HR Team',
      isPinned: false,
      createdAt: created(-70),
    },
  ];
}
