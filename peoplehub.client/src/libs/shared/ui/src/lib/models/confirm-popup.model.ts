export interface ConfirmPopup {
  text: string;
  value: string;
  bgColor: string;
  color: string;
  hoverBGColor: string;
  hoverColor: string;
  borderColor: string;
  showBorder: boolean;
}

export interface PopupOptions {
  title: string;
  label: string;
  changeIcon?: string;
  borderColor?: string;
  buttons: ConfirmPopup[];
}
