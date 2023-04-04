import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './generic-table/dg-column/dg-column.component';
import { TableRowTemplateDirective } from './generic-table/directives/tableRowtemplate.directive';
import { TemplateDirective } from './generic-table/directives/template.directive';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';
import { PagingComponent } from './generic-table/paging/paging.component';
import { UsersService } from './services/users.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent,
    GenericTableComponent,
    ColumnComponent,
    TemplateDirective,
    TableRowTemplateDirective,
    PagingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UsersService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
