import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'countries',
    component: CountriesComponent
  },
  {
    path:'feedback',
    component: FeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
