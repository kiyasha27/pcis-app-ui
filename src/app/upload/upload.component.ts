import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile!: File;
  nodeType: string = ''; // This will be set dynamically based on documentType
  batch: boolean = false;

  // UI flags for conditional rendering
  showDocumentType: boolean = false;
  showClassificationType: boolean = false;
  showBusinessLevel: boolean = false;

  // Dropdown options
  sites: string[] = [
    '254005-johns-eastern',
    '120287-21st-century',
    '117420-seminole-county-school-board',
    '117421-seminole-county-school-board',
  ];
  businessFolders: string[] = [
    'Claims',
    'Company',
    'Intake',
    'PAC_Policy',
    'Vendor',
    'WC_Policy',
  ];
  classifications: string[] = [];
  documentTypes: string[] = ['Vendor Withholding'];

  constructor(private uploadService: UploadService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      site: ['', Validators.required],
      folder: ['', Validators.required],
      classification: ['', Validators.required],
      documentType: ['', Validators.required],
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      batch: [false],
    });
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Generate relative path dynamically
  generateRelativePath(): string {
    const site = this.uploadForm.get('site')?.value;
    const folder = this.uploadForm.get('folder')?.value;
    const classification = this.uploadForm.get('classification')?.value;
    const clientName = this.uploadForm.get('clientName')?.value;
    const clientCode = this.uploadForm.get('clientCode')?.value;

    if (site && folder && clientCode && classification) {
      return `Sites/${site}/documentLibrary/${folder}/${clientCode}/${classification}`;
    }
    return '';
  }

  // Upload the selected file
  upload(): void {
    if (!this.selectedFile || !this.nodeType) {
      alert('Please select a file and enter a node type.');
      return;
    }

    const relativePath = this.generateRelativePath();
    if (!relativePath) {
      alert('Failed to generate relative path. Please fill in all required fields.');
      return;
    }

    this.uploadService
      .uploadFile(this.selectedFile, this.nodeType, relativePath)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully!', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }

  // Handle form submission
  onSubmit(): void {
    if (this.uploadForm.valid) {
      this.upload();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Handle site change
  onSiteChange(event: any): void {
    const selectedSite = event.target.value;
    if (selectedSite) {
      this.showBusinessLevel = true; // Show the business level dropdown
    } else {
      this.businessFolders = [];
      this.showBusinessLevel = false;
    }
  }

  // Handle folder change
  onFolderChange(event: any): void {
    const folder = event.target.value;

    if (folder) {
      const folderClassifications: { [key: string]: string[] } = {
        Intake: ['Other', 'Intake'],
        Claims: ['Other', 'Notes', 'Correspondence', 'Litigation', 'Payments'],
        WC_Policy: ['Other', 'Notes', 'Correspondence', 'Policy'],
        PAC_Policy: ['Other', 'Notes', 'Correspondence', 'Policy'],
        Company: ['Other', 'Notes', 'Correspondence', 'Company'],
        Vendor: ['Other', 'Notices', 'COI'],
      };

      this.classifications = folderClassifications[folder] || [];
      this.showClassificationType = true;
      this.showDocumentType = false;
      this.uploadForm.patchValue({ classification: '', documentType: '' });
    }
  }

  // Handle classification change
  onClassificationChange(event: any): void {
    const selectedClassification = event.target.value;
    if (selectedClassification) {
      this.showDocumentType = true; // Show the document type dropdown
    } else {
      this.documentTypes = [];
      this.showDocumentType = false;
    }
  }

  // Handle document type change and set nodeType dynamically
  onDocumentTypeChange(event: any): void {
    const selectedDocType = event.target.value;
    if (selectedDocType) {
      // Set nodeType based on document type
      switch (selectedDocType) {
        case 'Vendor Withholding':
          this.nodeType = 'pcis:vendor_Withholding';
          break;
        // Add more cases for other document types as necessary
        default:
          this.nodeType = '';
          break;
      }
    }
  }
}
