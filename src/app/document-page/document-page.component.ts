import { Component} from '@angular/core';
import { AlfrescoService } from '../alfresco.service';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent {
  
  searchTerm: string = ''; // Variable to bind to the search input
  folders = [
      { name: 'Default', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 1', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/8693cc87-c637-4dc8-9fcf-132bf46e149b' },
    { name: 'Folder 2', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/b9da19a2-f1f8-459e-8637-497c0b80d1f3' },
    { name: 'Folder 3', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 4', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 5', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 6', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 7', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 8', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 9', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },
    { name: 'Folder 10', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/ef1ed811-edaa-4364-972d-6f1b95a9216a' },

    // Add more folder objects as needed
  ];

  // Filtered list based on the search term
  filteredFolders() {
    return this.folders.filter((folder) =>
      folder.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  openFolder(link: string) {
    // Logic to open the folder in a new tab
    window.open(link, '_blank'); // Opens the link in a new tab
  }
  
}
