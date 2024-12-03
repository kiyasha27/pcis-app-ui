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

  // Additional metadata fields visibility
  showVendorFields: boolean = false;
  showIntakeFields: boolean = false;
  showClaimFields: boolean = false;
  showCompanyFields: boolean = false;
  showPolicyNoteCoverageSumFields: boolean = false;
  uploadResponse: any;
  uploadedFileId: any;


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
  documentTypes: string[] = ['Vendor Withholding', 'Intake FROI', 'Claim Investigation', 'Company Contact Updates', 'Policy Notes Coverage Summary'];

  constructor(private uploadService: UploadService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      site: ['', Validators.required],
      folder: ['', Validators.required],
      classification: ['', Validators.required],
      documentType: ['', Validators.required],
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      batch: [false],

      // Additional metadata fields
      vendorName: [''], // Optional fields
      vendorId: [''],
      vendorStatus: [''],
      disputeType: [''],
      investigator: [''],
      intakeId: [''],
      evidenceType: [''],
      locationCode: [''],
      workflowStatus: [''],
      policyNumber: [''],
      coverageCode: [''],
    });
  }

  // Handle file selection
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
  
  // Log the selected file to the console
  console.log('Selected file:', this.selectedFile);
}

  // Generate relative path dynamically
  generateRelativePath(): string {
    const site = this.uploadForm.get('site')?.value;
    const folder = this.uploadForm.get('folder')?.value;
    const classification = this.uploadForm.get('classification')?.value;
    const clientName = this.uploadForm.get('clientName')?.value;
    const clientCode = this.uploadForm.get('clientCode')?.value;
    const intakeId = this.uploadForm.get('intakeId')?.value;

    if (site && folder && intakeId && classification) {
      return `Sites/${site}/documentLibrary/${folder}/${intakeId}/${classification}`;
    }
    return '';
  }

  upload(): void {
    if (!this.selectedFile || !this.nodeType) {
      alert('Please select a file.');
      return;
    }
  
    const relativePath = this.generateRelativePath();
    if (!relativePath) {
      alert('Failed to generate relative path. Please fill in all required fields.');
      return;
    }
  
    // Dynamically set properties based on nodeType
    let properties: { [key: string]: string } = {};
  
    switch (this.nodeType) {
      case 'pcis:vendor_Withholding':
        properties = {
          'pcis:vendor_id': this.uploadForm.get('vendorId')?.value || 'DefaultVendorID',
          'pcis:vendor_name': this.uploadForm.get('vendorName')?.value || 'DefaultVendorName',
          'pcis:client_code': this.uploadForm.get('clientCode')?.value || 'DefaultClientCode',
          'pcis:client_name': this.uploadForm.get('clientName')?.value || 'DefaultClientName',
        };
        break;
  
      case 'pcis:intake_FROI':
        properties = {
          'pcis:client_code': this.uploadForm.get('clientCode')?.value || 'DefaultClientCode',
          'pcis:client_name': this.uploadForm.get('clientName')?.value || 'DefaultClientName',
          'pcis:intake_id': this.uploadForm.get('intakeId')?.value || 'DefaultIntakeID',
          'pcis:investigator': this.uploadForm.get('investigator')?.value || 'DefaultInvestigator',
          'pcis:dispute_type': this.uploadForm.get('disputeType')?.value || 'DefaultDisputeType',
        };
        break;

        case 'pcis:claims_Investigation':
        properties = {
          'pcis:client_code': this.uploadForm.get('clientCode')?.value || 'DefaultClientCode',
          'pcis:client_name': this.uploadForm.get('clientName')?.value || 'DefaultClientName',
          'pcis:intake_id': this.uploadForm.get('intakeId')?.value || 'DefaultIntakeID',
          'pcis:investigator': this.uploadForm.get('investigator')?.value || 'DefaultInvestigator',
          'pcis:dispute_type': this.uploadForm.get('disputeType')?.value || 'DefaultDisputeType',
          'pcis:evidence_type': this.uploadForm.get('evidenceType')?.value || 'DefaultEvidenceType',
          'pcis:location_code': this.uploadForm.get('locationCode')?.value || 'DefaultLocationCode',
        };
        break;
        case 'pcis:company_Contact_Updates':
        properties = {
          'pcis:client_code': this.uploadForm.get('clientCode')?.value || 'DefaultClientCode',
          'pcis:client_name': this.uploadForm.get('clientName')?.value || 'DefaultClientName',
          'pcis:workflow_status': this.uploadForm.get('workflowStatus')?.value || 'DefaultWorkflowStatus',

        };
        break;
        case 'pcis:policy_Notes_Coverage_Summary':
        properties = {
          'pcis:client_code': this.uploadForm.get('clientCode')?.value || 'DefaultClientCode',
          'pcis:client_name': this.uploadForm.get('clientName')?.value || 'DefaultClientName',
          'pcis:policy_number': this.uploadForm.get('policyNumber')?.value || 'DefaultPolicyNumber',
          'pcis:coverage_code': this.uploadForm.get('coverageCode')?.value || 'DefaultCoverageCode',

        };
        break;
  
      default:
        console.error('Unsupported nodeType:', this.nodeType);
        alert('Unsupported document type.');
        return;
    }
  
    this.uploadService
      .uploadFile(this.selectedFile, this.nodeType, relativePath, properties)
      .subscribe(
        (response) => {
        // Save the full response if needed
      this.uploadResponse = response;

      // Extract and store the ID from the response
      const entryId = response?.entry?.id;
      if (entryId) {
        console.log('Uploaded file nodeID:', entryId);
        this.uploadedFileId = entryId; // Save it for later use
      } else {
        console.warn('ID not found in response:', response);
      }

      console.log('File uploaded successfully!', response);
      alert('Your submission was successful.');
    },
    (error) => {
      console.error('Error uploading file:', error);
      alert('There was an error during the upload. Please try again.');
    }
  );
      
      console.log('Payload:', {
        file: this.selectedFile,
        nodeType: this.nodeType,
        relativePath,
        properties,
      });
  }
  

  // Handle form submission
  onSubmit(): void {
    if (this.uploadForm.valid) {
      this.upload();
    } else {
      alert('Your submission was successful.');
      location.reload(); // refresh page to start afresh
      
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
    this.resetAdditionalFields();

    if (selectedDocType) {
      // Set nodeType and toggle additional fields visibility
      switch (selectedDocType) {
        case 'Vendor Withholding':
          this.nodeType = 'pcis:vendor_Withholding';
          this.showVendorFields = true;
          break;
        case 'Intake FROI':
          this.nodeType = 'pcis:intake_FROI';
          this.showIntakeFields = true;
          break;
       case 'Claim Investigation':
            this.nodeType = 'pcis:claims_Investigation';
            this.showClaimFields = true;
            break; 
        case 'Company Contact Updates':
              this.nodeType = 'pcis:company_Contact_Updates';
              this.showCompanyFields = true;
              break; 
        case 'Policy Notes Coverage Summary':
              this.nodeType = 'pcis:policy_Notes_Coverage_Summary';
              this.showPolicyNoteCoverageSumFields = true;
              break;      
        default:
          this.nodeType = '';
          break;
      }
    }
  }

  // Reset additional metadata fields
  resetAdditionalFields(): void {
    this.showVendorFields = false;
    this.showIntakeFields = false;
    this.showClaimFields = false;
    this.showCompanyFields = false;
    this.showPolicyNoteCoverageSumFields = false;
    this.uploadForm.patchValue({
      vendorName: '',
      vendorId: '',
      vendorStatus: '',
      disputeType: '',
      investigator: '',
      intakeId: '',
      evidenceType: '',
      locationCode: '',
      policyNumber: '',
      coverageCode: '',
    });
  }

  
}
//old