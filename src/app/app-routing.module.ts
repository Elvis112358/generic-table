import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';

const routes: Routes = [
  {
    path: '',
    component: TestTableExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
