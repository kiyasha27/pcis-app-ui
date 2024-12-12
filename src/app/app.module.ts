import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MainComponent } from './main/main.component';
import { RouterLinkActiveExactDirective } from './main/appRouterLinkActiveExact.directive';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { QueuedTasksComponent } from './queued-tasks/queued-tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DocumentPageComponent } from './document-page/document-page.component';
import { Routes } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component'; // Import the component
import { UploadService } from './upload/upload.service'; // Import the service
import { ReactiveFormsModule } from '@angular/forms';
import { UploadStartProcessComponent } from './upload-start-process/upload-start-process.component'; // Import this module
import { MatPaginatorModule } from '@angular/material/paginator';





// Import FormsModule
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    RouterLinkActiveExactDirective,
    ProfileComponent,
    TimetableComponent,
    CompletedTasksComponent,
    QueuedTasksComponent,
    DocumentPageComponent,
    UploadComponent,
    UploadStartProcessComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    HttpClientModule,
    MatPaginatorModule,  // Add MatPaginatorModule here
    MatCardModule,       // Ensure other necessary Material modules are imported
    MatButtonModule,
  ],
  providers: [UploadService], // Provide the service
  bootstrap: [AppComponent]
})
export class AppModule { }
