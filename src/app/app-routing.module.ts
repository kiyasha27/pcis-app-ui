import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { QueuedTasksComponent } from './queued-tasks/queued-tasks.component';
import { DocumentPageComponent } from './document-page/document-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'completed-tasks', component: CompletedTasksComponent },
  { path: 'queued-tasks', component: QueuedTasksComponent},
  { path: 'document-page', component: DocumentPageComponent}



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
