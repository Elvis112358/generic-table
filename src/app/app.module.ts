import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { ColumnComponent } from './generic-table/dg-column/dg-column.component';

@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent,
    GenericTableComponent,
    ColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
