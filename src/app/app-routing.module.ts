import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const titleDefault = 'Cursto Teacher';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard],
    data: {
      title: `${titleDefault} - Students`
    }
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {
      title: `${titleDefault} - Login`
    }
  },
  {
    path: "**",
    component: NotfoundComponent,
    data: {
      title: `${titleDefault} - Page not found`
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
