import arrow_narrow_right from '@iconify-icons/tabler/arrow-narrow-right';
import arrow_sort from '@iconify-icons/tabler/arrows-sort';
import arrow_down_lg from '@iconify/icons-ci/arrow-down-lg';
import administrator_line from '@iconify/icons-clarity/administrator-line';
import leave_user from '@iconify/icons-fluent-mdl2/leave-user';
import call_24_filled from '@iconify/icons-fluent/call-24-filled';
import arrow_uturn_left from '@iconify/icons-heroicons/arrow-uturn-left';
import arrow_uturn_right from '@iconify/icons-heroicons/arrow-uturn-right';
import round_keyboard_arrow_left from '@iconify/icons-ic/round-keyboard-arrow-left';
import round_plus from '@iconify/icons-ic/round-plus';
import icon_park_outline_down from '@iconify/icons-icon-park-outline/down';
import icon_park_outline_up from '@iconify/icons-icon-park-outline/up';
import key_lucide from '@iconify/icons-lucide/key';
import hamburger_menu from '@iconify/icons-lucide/menu';
import moon from '@iconify/icons-lucide/moon';
import brightness from '@iconify/icons-lucide/sun';
import check_circle_outline_rounded from '@iconify/icons-material-symbols/check-circle-outline-rounded';
import delete_outline from '@iconify/icons-material-symbols/delete-outline';
import download_rounded from '@iconify/icons-material-symbols/download-rounded';
import keyboard_arrow_down from '@iconify/icons-material-symbols/keyboard-arrow-down-rounded';
import keyboard_double_arrow_left_rounded from '@iconify/icons-material-symbols/keyboard-double-arrow-left-rounded';
import keyboard_double_arrow_right_rounded from '@iconify/icons-material-symbols/keyboard-double-arrow-right-rounded';
import logout_rounded from '@iconify/icons-material-symbols/logout-rounded';
import person from '@iconify/icons-material-symbols/person';
import person_check_outline from '@iconify/icons-material-symbols/person-check-outline';
import group from '@iconify/icons-mdi/account-group';
import announcement_outline from '@iconify/icons-mdi/announcement-outline';
import arrow_down_outline from '@iconify/icons-mdi/arrow-down';
import arrow_up_outline from '@iconify/icons-mdi/arrow-up';
import calendar_month from '@iconify/icons-mdi/calendar-month';
import tick from '@iconify/icons-mdi/check';
import schedule from '@iconify/icons-mdi/clock-outline';
import content_save from '@iconify/icons-mdi/content-save';
import dollar from '@iconify/icons-mdi/currency-usd';
import dots_horizontal from '@iconify/icons-mdi/dots-horizontal';
import edit_box_outline from '@iconify/icons-mdi/edit-box-outline';
import email_outline from '@iconify/icons-mdi/email-outline';
import doc_plaintext from '@iconify/icons-mdi/file-document-outline';
import home from '@iconify/icons-mdi/home';
import keyboard_arrow_left from '@iconify/icons-mdi/keyboard-arrow-left';
import keyboard_arrow_right from '@iconify/icons-mdi/keyboard-arrow-right';
import announcement_megaphone from '@iconify/icons-mdi/megaphone';
import receipt from '@iconify/icons-mdi/receipt';
import view_dashboard_outline from '@iconify/icons-mdi/view-dashboard-outline';
import dots_fill from '@iconify/icons-mingcute/dots-fill';
import suitcase_line from '@iconify/icons-mingcute/suitcase-line';
import cross_2 from '@iconify/icons-radix-icons/cross-2';
import cross_circle from '@iconify/icons-system-uicons/cross-circle';
import chart_growth from '@iconify/icons-uil/chart-growth';
import { addIcon, IconifyIcon } from 'iconify-icon';

export const iconRegistry: Record<string, IconifyIcon> = {
  'schedule': schedule,
  'group': group,
  'home': home,
  'save': content_save,
  'calendar': calendar_month,
  'arrow_down': keyboard_arrow_down,
  'arrow_left_round': round_keyboard_arrow_left,
  'arrow_left': keyboard_arrow_left,
  'arrow_right': keyboard_arrow_right,
  'double_arrow_left': keyboard_double_arrow_left_rounded,
  'double_arrow_right': keyboard_double_arrow_right_rounded,
  'check_circle_outline': check_circle_outline_rounded,
  'cross_circle_outline': cross_circle,
  'arrow_sort':arrow_sort,
  'dots_fill' : dots_fill,
  'arrow_uturn_left' : arrow_uturn_left,
  'arrow_uturn_right' : arrow_uturn_right,
  'edit' : edit_box_outline,
  'delete' : delete_outline,
  'arrow_up_outline': arrow_up_outline,
  'arrow_down_outline': arrow_down_outline,
  'tick': tick,
  'doc_plaintext': doc_plaintext,
  'key_lucide': key_lucide,
  'dollar': dollar,
  'cross_2': cross_2,
  'download_rounded': download_rounded,
  'announcement_megaphone': announcement_megaphone,
  'person_check_outline': person_check_outline,
  'leave_user': leave_user,
  'administrator_line': administrator_line,
  'suitcase_line': suitcase_line,
  'chart_growth': chart_growth,
  'dots_horizontal': dots_horizontal,
  'receipt_dollar': receipt,
  'view_dashboard_outline': view_dashboard_outline,
  'person': person,
  'announcement_outline':announcement_outline,
  'arrow_narrow_right': arrow_narrow_right,
  'logout': logout_rounded,
  'arrow_down_lg': arrow_down_lg,
  'icon_park_outline_down': icon_park_outline_down,
  'icon_park_outline_up': icon_park_outline_up,
  'hamburger_menu':hamburger_menu,
  'brightness':brightness,
  'moon':moon,
  'round_plus':round_plus,
  'email_outline':email_outline,
  'call_24_filled':call_24_filled,
};

export const registerIcons = (): void => {
  for (const [name, data] of Object.entries(iconRegistry)) {
    addIcon(name, data);
  }
}
