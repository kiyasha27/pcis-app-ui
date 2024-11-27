import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  uploadForm: FormGroup;
  sites = ['254005-johns-eastern', '120287-21st-century', '117420-seminole-county-school-board', '117421-seminole-county-school-board'];
  businessFolders = ['Claims', 'Company', 'Intake', 'PAC_Policy', 'Vendor', 'WC_Policy'];
  documentTypes = ['Vendor Withdholding', 'Intake Investigation', 'Policy Application'];
  classifications = ['Notes', 'Other', 'COI'];

  showBusinessLevel = false;
  showClassificationType = false;
  showDocumentType = false;
  showMetadata = false;
  showFileUpload = false;

  fileToUpload: File | null = null;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      site: [''],
      folder: [''],
      classification: [''],
      documentType: [''],
      name: [''],
      surname: [''],
    });
  }

  onSiteChange(event: Event) {
    this.showBusinessLevel = true;
  }

  onFolderChange(event: Event) {
    this.showClassificationType = true;
  }

  onClassificationChange(event: Event) {
    this.showDocumentType = true;
    this.showMetadata = true;
    this.showFileUpload = true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
    }
  }

  onSubmit() {
    if (this.uploadForm.valid && this.fileToUpload) {
      console.log('Form submitted:', this.uploadForm.value);
      console.log('File:', this.fileToUpload);
    }
  }
}
