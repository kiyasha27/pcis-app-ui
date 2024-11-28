import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile!: File; // The file to be uploaded
  nodeType: string = ''; // Node type (e.g., cm:content)
  batch: boolean = false; // Whether batch upload is enabled
  relativePath: string = ''; // Path to the target folder in Alfresco

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (!this.selectedFile || !this.nodeType || !this.relativePath) {
      alert('Please select a file, enter a node type, and provide a relative path.');
      return;
    }

    this.uploadService
  .uploadFile(this.selectedFile, this.nodeType, this.relativePath)
  .subscribe(
    (response) => {
      console.log('File uploaded successfully!', response);
    },
    (error) => {
      console.error('Error uploading file:', error);
    }
  );
  }
}