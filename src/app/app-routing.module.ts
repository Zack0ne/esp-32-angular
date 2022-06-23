import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorComponent } from './sensor/sensor.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
      path: 'sensor',
      component: SensorComponent
  },
  {
      path: 'table',
      component: TableComponent
  },
  // {
  //     path: 'courses',
  //     component: CoursesComponent
  // },
  {
      path: '',
      redirectTo: '/sensor',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/sensor',
      pathMatch: 'full'
  }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
