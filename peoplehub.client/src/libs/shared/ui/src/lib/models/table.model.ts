import { TemplateRef } from '@angular/core';

export interface BaseCell {
  colName: string;
  showValue?: boolean;
  iconName?: string;
  showIcon?: boolean;
  colClickIconName?: string;
  colClickIconName2?: string;
  colIconName?: string;
  colIconName2?: string;
  showColIcon?: boolean;
  showHoverIcon?: boolean;
  hoverIconName?: string;
  iconColor?: string;
  type?: string;
  width?: string;
  align?: string;
  color?: string;
  attendance?: string;
  freeze?: boolean;
  isLink?: boolean;
  showSerialNo?: boolean;
  thColSpan?: number;
  thRowSpan?: number;
  tdColSpan?: number;
  tdRowSpan?: number;
  thHidden?: boolean;
  tdHidden?: boolean;
  thProperties?: ThProperties;
  tdProperties?: TdProperties;
}

export interface ThProperties {
  fontProperties?: FontProperties;
  BGColor?: string;
}

export interface TdProperties {
  fontProperties?: FontProperties;
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
  showEditIconName?: string;
  showDeleteIconName?: string;
  BGColor?: string;
}

export interface FontProperties {
  fontWeight?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  hoverColor?: string;
  fontAlign?: string;
}

export interface TextCell extends BaseCell {
  type: TableCellType.TEXT;
  value?: string;
}
export interface ImageCell extends BaseCell {
  type: TableCellType.IMAGE;
  value?: { tabIcon?: string; tabName?: string; subTabName?: string };
}
export interface UserCell extends BaseCell {
  type: TableCellType.USER;
  value?: { title?: string; subtitle?: string };
}

export interface ValueDropdownCell extends BaseCell {
  type: TableCellType.VALUE_DROPDOWN;
  value?: string;
  options: { label: string; value: any; isDefault?: boolean }[];
}

export interface IconPopoverCell extends BaseCell {
  type: TableCellType.ICON_POPOVER;
  value?: {
    iconName: string;
    description?: string;
    popupPosition?: 'top' | 'bottom' | 'left' | 'right';
    bgColor?: string;
    hoverBgColor?: string;
    hoverColor?: string;
    popupBgColor?: string;
    popupTxtColor?: string;
  };
}

export interface IconCell extends BaseCell {
  type: TableCellType.ICON;
  value?: { iconName: string; iconColor?: string };
}

export interface IconPanelCell extends BaseCell {
  type: TableCellType.ICON_PANEL;
  value?: {
    iconName: string;
    iconColor?: string;
    customReason?: string;
    panelContent?: TemplateRef<any>;
  };
}
export interface ChipCell extends BaseCell {
  type: TableCellType.CHIP;
  value?: {
    status: 'Pending' | 'Approved' | 'Rejected';
  };
}
export enum TableCellType {
  TEXT = 'text',
  IMAGE = 'image',
  USER = 'user',
  VALUE_DROPDOWN = 'dropdown',
  ICON = 'icon',
  ICON_POPOVER = 'iconPopover',
  ICON_PANEL = 'iconPanel',
  CHIP = 'chip',
}

export type { TableCell, TableRow, TableData } from './table.types';
