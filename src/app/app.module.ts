import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './generic-table/dg-column/dg-column.component';
import { TableRowTemplateDirective } from './generic-table/directives/tableRowtemplate.directive';
import { TemplateDirective } from './generic-table/directives/template.directive';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent,
    GenericTableComponent,
    ColumnComponent,
    TemplateDirective,
    TableRowTemplateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
