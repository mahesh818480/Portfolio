import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: '', component: MainpageComponent },
    { path: 'home', component: MainpageComponent },
    { path: 'about', component: MainpageComponent },
    { path: 'contact', component: MainpageComponent },
    { path: 'projects', component: MainpageComponent }
];
