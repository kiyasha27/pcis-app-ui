import { Component} from '@angular/core';
import { AlfrescoService } from '../alfresco.service';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent {
  displayedColumns = ['folderName', 'action'];
  folders = [
    { name: 'Claims', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/410b8d17-5bca-456c-aabc-48ba44beaa79' },
    { name: 'Policies', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/143eb9dd-02a6-4729-b2e1-d942faabfbc7' },
    { name: 'Other', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/f29687c6-8be7-4522-bfa2-c75a5050ca22' },
    { name: 'Intake', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/4f8eb3d5-75e7-4559-976f-4e0b0a94b021' },
    { name: 'Payments', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/23031267-8273-463f-a9e4-c4ea17c47305' },
  
  ];

  openFolder(link: string): void {
    window.open(link, '_blank'); // Open the link in a new tab
  }
  searchTerm: string = ''; // Variable to bind to the search input

  // Filtered list based on the search term
  filteredFolders() {
    return this.folders.filter((folder) =>
      folder.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
