import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile-link',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.scss']
})
export class ProfileLinkComponent implements ICellRendererAngularComp {
  public cellValue!: string;
  params!: ICellRendererParams;

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

  handlerClick(action ='') {
    this.params.context.dashboard.handlerActions(action, this.params)
  }
}
