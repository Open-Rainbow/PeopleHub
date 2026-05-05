export interface UploadedFileData {
  name: string;
  type: string;
  size?: number;
  lastModified?: number;
  data: string;
}

export interface FileUploadSelection {
  files: UploadedFileData[];
  source: 'user' | 'writeValue';
}
