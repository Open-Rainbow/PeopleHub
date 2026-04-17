export interface CalendarPositionedEvent {
  original: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  startMinutes: number;
  endMinutes: number;
  top: number;
  height: number;
  col: number;
  totalCols: number;
  left: number;
  width: number;
  overlap: boolean;
}