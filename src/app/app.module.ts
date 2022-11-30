import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDataGridModule } from './table-data-grid/table-data-grid.module';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent
  ],
  imports: [
    BrowserModule,
    TableDataGridModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
