import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {ResumesComponent} from "./resumes/resumes.component";

const routes: Routes = [
  {
  path: '',
  component: ResumesComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
  ,
  { path: 'resumes', loadChildren: () => import('./resumes/resumes.module').then(m => m.ResumesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
