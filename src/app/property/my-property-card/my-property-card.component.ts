import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PropertyListDto} from "../../model/propertyListDto";

@Component({
    selector: 'app-my-property-card',
    templateUrl: './my-property-card.component.html',
    styleUrls: ['./my-property-card.component.css']
})
export class MyPropertyCardComponent implements OnInit {
    @Input() propertyData: PropertyListDto;
    @Output() openPropertyEditDialogEvent = new EventEmitter<boolean>();
    actionItems: MenuItem[];

    constructor() {
    }

    ngOnInit(): void {
    }


    openPropertyEditDialog() {
        this.openPropertyEditDialogEvent.emit(true);
    }
}
