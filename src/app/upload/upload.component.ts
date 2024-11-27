import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  uploadForm: FormGroup;

  // Provided values
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
  documentTypes: string[] = ['Vendor Withholding', 'Company Contract', 'Intake FROI', 'Policy Invoice', 'Claim Investigation'];

  fileToUpload: File | null = null;

  // Visibility control for steps
  showBusinessLevel = false;
  showClassificationType = false;
  showDocumentType = false;
  showFileUpload = false;

  // Metadata fields visibility
  showStandardMetadata = false;
  showVendorMetadata = false;
  showCompanyMetadata = false;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      site: ['', Validators.required],
      folder: ['', Validators.required],
      classification: ['', Validators.required],
      documentType: ['', Validators.required],
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      batch: ['', Validators.required]
    });
  }

  onSiteChange(event: any): void {
    if (event.target.value) {
      this.showBusinessLevel = true;
      this.showClassificationType = false;
      this.showDocumentType = false;
      this.showFileUpload = false;
      this.uploadForm.patchValue({ folder: '', classification: '', documentType: '' });
    }
  }

  onFolderChange(event: any): void {
    const folder = event.target.value;

    if (folder) {
      // Map folders to classification types
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
      this.showFileUpload = false;
      this.uploadForm.patchValue({ classification: '', documentType: '' });
    }
  }

  onClassificationChange(event: any): void {
    if (event.target.value) {
      this.showDocumentType = true;
      this.showStandardMetadata = true;
    }
  }

  onDocumentTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
  
    // Reset visibility for unique metadata fields
    this.showStandardMetadata = true;
  
    // Remove all dynamically added controls
    ['intakeId', 'investigator', 'disputeType', 'policyName', 'policyNumber', 
     'policyExpirationDate', 'policyEffectiveDate', 'itemName', 'coverageCode', 
     'vendorStatus', 'vendorId', 'vendorName', 'companyCode', 'description', 'companyName']
      .forEach((key) => {
        if (this.uploadForm.contains(key)) {
          this.uploadForm.removeControl(key);
        }
      });
  
    // Add controls based on document type
    switch (selectedType) {
      case 'Intake FROI':
        this.uploadForm.addControl('intakeId', this.fb.control('', Validators.required));
        this.uploadForm.addControl('investigator', this.fb.control('', Validators.required));
        this.uploadForm.addControl('disputeType', this.fb.control('', Validators.required));
        break;
  
      case 'Policy Invoice':
        this.uploadForm.addControl('policyName', this.fb.control('', Validators.required));
        this.uploadForm.addControl('policyNumber', this.fb.control('', Validators.required));
        this.uploadForm.addControl('policyExpirationDate', this.fb.control('', Validators.required));
        this.uploadForm.addControl('policyEffectiveDate', this.fb.control('', Validators.required));
        this.uploadForm.addControl('itemName', this.fb.control('', Validators.required));
        this.uploadForm.addControl('coverageCode', this.fb.control('', Validators.required));
        break;
  
      case 'Claim Investigation':
        this.uploadForm.addControl('investigator', this.fb.control('', Validators.required));
        this.uploadForm.addControl('disputeType', this.fb.control('', Validators.required));
        break;
  
      case 'Vendor Withholding':
        this.uploadForm.addControl('vendorStatus', this.fb.control('', Validators.required));
        this.uploadForm.addControl('vendorId', this.fb.control('', Validators.required));
        this.uploadForm.addControl('vendorName', this.fb.control('', Validators.required));
        break;

      case 'Company Contract':
        this.uploadForm.addControl('companyCode', this.fb.control('', Validators.required));
        this.uploadForm.addControl('description', this.fb.control('', Validators.required));
        this.uploadForm.addControl('companyName', this.fb.control('', Validators.required));
        break;
  
      default:
        break;
    }
  
    // Enable the file upload section when a document type is selected
    this.showFileUpload = !!selectedType;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.fileToUpload) {
      console.log('Form Submitted:', this.uploadForm.value);
      console.log('File:', this.fileToUpload);
    }
  }
}
