import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { FileUploadSelection, UploadedFileData } from '../../../models/component-models/file-upload.model';
import type { FileUploadValue } from '../../../models/component-models/file-upload.types';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-file-upload',
  imports: [CommonModule, IconComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() label: string = 'Government ID';
  @Input() isRequired: boolean = true;
  @Input() errorNote: string = 'Please upload jpg, png, mp3 formats only';
  @Input() parentFormGroup?: FormGroup;
  @Input() id: string = 'fileUpload';
  @Input() placeholder: string = 'Upload the file';
  @Input() accept: string = '.jpg,.jpeg,.png,.pdf,.mp3';
  @Input() multiple: boolean = false;
  @Input() showRemoveAction: boolean = true;
  @Output() fileSelectionChange = new EventEmitter<FileUploadSelection>();

  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef<HTMLInputElement>;

  selectedFiles: UploadedFileData[] = [];
  isFocused: boolean = false;
  isFileDialogOpen: boolean = false;

  private disabled = false;
  private onChange: (value: FileUploadValue) => void = () => {};
  private onTouched: () => void = () => {};

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }

  get hasValue(): boolean {
    return this.selectedFiles.length > 0;
  }

  get displayValue(): string {
    if (this.selectedFiles.length === 0) {
      return this.placeholder;
    }

    if (this.selectedFiles.length === 1) {
      return this.selectedFiles[0].name;
    }

    return `${this.selectedFiles.length} files selected`;
  }

  get triggerId(): string {
    return `${this.id}-trigger`;
  }

  get inputId(): string {
    return `${this.id}-native`;
  }

  get helperId(): string {
    return `${this.id}-helper`;
  }

  get isDisabled(): boolean {
    return this.disabled || !!this.control?.disabled;
  }

  onAreaClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.isFileDialogOpen = true;
    this.fileInputRef.nativeElement.click();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    setTimeout(() => {
      this.isFileDialogOpen = false;
    }, 200);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;

    if (!fileList || fileList.length === 0) {
      return;
    }

    const selectedNativeFiles = this.multiple ? Array.from(fileList) : [fileList[0]];
    const mappedFiles = await Promise.all(selectedNativeFiles.map((file) => this.mapToUploadedFile(file)));

    this.selectedFiles = mappedFiles;

    const nextValue: FileUploadValue = this.multiple ? mappedFiles : mappedFiles[0] ?? null;
    this.applyValue(nextValue, 'user');
  }

  clearFiles(event?: Event): void {
    event?.stopPropagation();

    if (this.isDisabled) {
      return;
    }

    this.selectedFiles = [];

    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }

    this.applyValue(null, 'user');
  }

  onFocus(): void {
    this.isFocused = true;
    this.control?.markAsTouched();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.control?.markAsTouched();
  }

  writeValue(value: FileUploadValue): void {
    if (!value) {
      this.selectedFiles = [];
      if (this.fileInputRef?.nativeElement) {
        this.fileInputRef.nativeElement.value = '';
      }
      return;
    }

    const files = Array.isArray(value) ? value : [value];
    this.selectedFiles = files;
    this.fileSelectionChange.emit({ files, source: 'writeValue' });
  }

  registerOnChange(fn: (value: FileUploadValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private applyValue(value: FileUploadValue, source: 'user' | 'writeValue'): void {
    this.onChange(value);
    this.onTouched();

    if (this.control) {
      this.control.setValue(value);
      this.control.markAsDirty();
      this.control.markAsTouched();
    }

    this.fileSelectionChange.emit({ files: this.selectedFiles, source });
  }

  private mapToUploadedFile(file: File): Promise<UploadedFileData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          data: reader.result as string
        });
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsDataURL(file);
    });
  }
}