import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    SearchResultItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
    exports: [SearchResultItemComponent]
})
export class SearchResultItemModule { }
