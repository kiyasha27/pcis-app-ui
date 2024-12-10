import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-upload-start-process',
  templateUrl: './upload-start-process.component.html',
  styleUrls: ['./upload-start-process.component.scss']
})
export class UploadStartProcessComponent {
  uploadForm: FormGroup;
  selectedFile!: File;
  nodeType: string = 'pcis:claims_Black_HCFA'; // This will be set dynamically based on documentType
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
  entryId: any;


  // Dropdown options
  sites: string[] = [
    '254005-johns-eastern',
    '120287-21st-century',
    '117420-seminole-county-school-board',
    '117421-seminole-county-school-board',
  ];
  businessFolders: string[] = [
    'Claim',
    'Company',
    'Intake', 
    'PAC_Policy',
    'Vendor',
    'WC_Policy',
  ];

  constructor(private uploadService: UploadService, private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      site: ['', Validators.required]

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

    if (site) {
      return `Sites/${site}/documentLibrary/Landing Folder`;
    }
    return '';
  }

  upload(): void {
    if (!this.selectedFile) {
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
      case 'pcis:claims_Black_HCFA':
        properties = {
          'aspectNames':'davies:scanner',
          'davies:IDX_Company_Num':'254005',
          'davies:Application':'WorkComp',
          'davies:DOC_ORIGIN':'O',
          'davies:DOC_CAT':'CHECKS',
          'davies:DOC_STATUS':'Unseen',
          'davies:Bypass_Workflow':'Yes',
          'davies:SYS_STATUS': 'E',
          'davies:Document_Definition': 'wcChecks',
          'pcis:batch': 'b65474567456',
          'pcis:batch_id':'0898907546',
          'pcis:client_code': 'client63456453',
          'pcis:bypass_workflow_type':'true',
          'pcis:client_name':'client',
          'pcis:document_create_by':'Admin',
          'pcis_document_origin':'device',
          'pcis:document_origin_type':'machine',
          'pcis:document_status':'indexed',
          'pcis:insured_first_name':'Charlie',
          'pcis:insured_last_name':'Delta',
          'pcis:page':'756475',
          'pcis:policy_type':'claim',
          'pcis:workflow_status':'In-Progress',
          'pcis:bill_review_id':'bill_01',
          'pcis:claim_number':'30024',
          'pcis:claimant_first_name':'Echo',
          'pcis:claimant_last_name':'Foxtrot',
          'pcis:claimant_name':'Echo Foxtrot',
          'pcis:dispute_name':'Accident',
          'pcis:dispute_type':'Accident',
          'pcis:employer_name':'PCIS',
          'pcis:intake_id':'intake_5463465499'

        };
        break;

      default:
        
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
      this.entryId = response?.entry?.id;
      if (this.entryId) {
        console.log('Uploaded file nodeID:', this.entryId);
        this.uploadedFileId = this.entryId; // Save it for later use
      } else {
        console.warn('ID not found in response:', response);
      }

      console.log('File uploaded successfully!', response);
      alert('Your upload was successful.');
      this.sendProcessInstance();
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
  
  sendProcessInstance() {
    console.log('Preparing to send API request...');
    console.log('entryId:', this.entryId); // Debug log

    if (!this.entryId) {
        console.error('Error: entryId is undefined or empty.');
        return; // Stop execution if entryId is invalid
    }

    const apiUrl = 'http://192.168.82.62:8081/activiti-app/api/enterprise/process-instances';
    const payload = {
        businessKey: '30024',
        name: 'PCIS_Checks',
        processDefinitionKey: 'PCIS_Checks',
        variables: [
          {
            "name": "businessKey",
            "scope": "local",
            "type": "string",
            "value": "30024"
        },
            {
                name: 'DOC_STATUS',
                scope: 'local',
                type: 'string',
                value: 'Unseen'
            },
            {
                name: 'DocumentNodeID',
                scope: 'local',
                type: 'string',
                value: this.entryId
                          },
            {
                name: 'First_Adjuster',
                scope: 'local',
                type: 'string',
                value: '203'
            },
            {
                name: 'Second_Adjuster',
                scope: 'local',
                type: 'string',
                value: ''
            },
            {
                name: 'adjusterGroupID',
                scope: 'local',
                type: 'string',
                value: '106'
            },
            {
                name: 'First_Supervisor',
                scope: 'local',
                type: 'string',
                value: '203'
            },
            {
                name: 'Second_Supervisor',
                scope: 'local',
                type: 'string',
                value: ''
            },
            {
                name: 'supervisorGroupID',
                scope: 'local',
                type: 'string',
                value: '52'
            }
        ]
    };

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g')
        
    });

    this.http.post(apiUrl, payload, { headers }).subscribe(
        (response) => {
            console.log('Process instance created:', response);
            alert('Your process was successfully started!');
            window.location.reload();
        },
        (error) => {
            console.error('Error creating process instance:', error);
        }
    );
}

}
