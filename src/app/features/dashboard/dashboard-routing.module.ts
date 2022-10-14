import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolebaseGuard } from 'src/app/core/guards/rolebase.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', 
    component: DashboardComponent,
    canActivate: [RolebaseGuard],
    data: {
      authorities: ['ROLE_CUSTOMER', 'ROLE_ADMIN']
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
