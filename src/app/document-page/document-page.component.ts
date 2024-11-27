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
    { name: '254005-johns-eastern', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/0bbdc496-3220-46e0-9d60-b14bac1e879a' },
    { name: '120287-21st-century', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/061c530c-da49-4fa6-b096-0fa26a7f771b' },
    { name: '117420-seminole-county-school-board', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/5fb2d7b6-4f82-4cf2-bf7c-399f083ed753' },
    { name: '117421-seminole-county-school-board', link: 'https://documentsqa.pcisvision.com/alfresco-digital-workspace-4.4.1/#/libraries/c0b4bdf6-6e83-44de-97e8-0faace811411' },
  
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
