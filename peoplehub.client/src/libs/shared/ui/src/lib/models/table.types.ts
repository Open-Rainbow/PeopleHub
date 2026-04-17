import { TemplateRef } from '@angular/core';
import type { TextCell, ImageCell, UserCell, ValueDropdownCell, IconCell, IconPopoverCell, IconPanelCell, ChipCell } from './table.model';

export type TableCell =
  | TextCell
  | ImageCell
  | UserCell
  | ValueDropdownCell
  | IconCell
  | IconPopoverCell
  | IconPanelCell
  | ChipCell;

export type TableRow = TableCell[];

export type TableData = TableRow[];

