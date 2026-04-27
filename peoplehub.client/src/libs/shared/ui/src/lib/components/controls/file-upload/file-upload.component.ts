import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-file-upload',
  imports: [CommonModule, IconComponent, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true
})
export class FileUploadComponent {
  @Input() label: string = 'Government ID';
  @Input() isRequired: boolean = true;
  @Input() errorNote: string = 'Please upload jpg, png, mp3 formats only';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef<HTMLInputElement>;

  fileName: string | null = null;
  isFocused: boolean = false;        
  isFileDialogOpen: boolean = false; 

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

   onAreaClick() {
    this.isFileDialogOpen = true; 
    this.fileInputRef.nativeElement.click();
  }

  @HostListener('window:focus')
  onWindowFocus() {
    setTimeout(() => {
      this.isFileDialogOpen = false;
    }, 200);
  }




onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

   const reader = new FileReader();

  reader.onload = () => {
    const fileObject = {
      name: file.name,
      type: file.type,
      data: reader.result as string
    };
    const control = this.parentFormGroup.get(this.id);
    if (control) {
      control.setValue(fileObject);
      control.markAsDirty();
      control.markAsTouched();
    }
    this.fileName = file.name;
  };

  reader.readAsDataURL(file);
}




  
  onFocus() {
    this.isFocused = true;
    this.control?.markAsTouched();
  }

  onBlur() {
    this.isFocused = false;
  }
}