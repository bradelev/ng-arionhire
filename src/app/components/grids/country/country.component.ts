import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatTooltipModule } from '@angular/material/tooltip';

const COUNTRIES: any = {
  "Argentina": "🇦🇷",
  "Bolivia": "🇧🇴",
  "Brazil": "🇧🇷",
  "Chile": "🇨🇱",
  "Colombia": "🇨🇴",
  "Costa Rica": "🇨🇷",
  "Cuba": "🇨🇺",
  "Dominican Republic": "🇩🇴",
  "Ecuador": "🇪🇨",
  "El Salvador": "🇸🇻",
  "Guatemala": "🇬🇹",
  "Honduras": "🇭🇳",
  "Mexico": "🇲🇽",
  "Nicaragua": "🇳🇮",
  "Panama": "🇵🇦",
  "Paraguay": "🇵🇾",
  "Peru": "🇵🇪",
  "Puerto Rico": "🇵🇷",
  "Uruguay": "🇺🇾",
  "Venezuela": "🇻🇪"
}


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements ICellRendererAngularComp {
  public cellValue!: string;
  params!: ICellRendererParams;

  countries: any = COUNTRIES;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.cellValue = 'actions';
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = 'actions';
    this.params = params;
    return true;
  }
}
