import {Component, OnInit} from '@angular/core';
import {HousingService} from 'src/app/services/housing.service';
import {ActivatedRoute} from '@angular/router';
import {IPropertyBase} from "../../model/IPropertyBase";
import {PropertyService} from "../../services/property.service";

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent = 1;
    properties: IPropertyBase[];
    city: string = '';
    searchCity: string = '';
    sortByParameter: string = 'City';
    sortDirection: string = 'asc';

    sortOptions = [
        {label: 'City', value: 'City'},
        {label: 'Price', value: 'Price'}
    ]




        constructor(private route: ActivatedRoute, private propertyService: PropertyService) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.url.toString()) {
            this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
        }
        this.propertyService.getAllProperties(this.SellRent).subscribe(
            data => {
                this.properties = data;
                let dataFromLocalStorage = localStorage.getItem('newProp') ?? "[]";
                const newProperty = JSON.parse(dataFromLocalStorage);

                if (newProperty.SellRent === this.SellRent) {
                    this.properties = [newProperty, ...this.properties];
                }
            }, error => {
                console.log('http error:');
                console.log(error);
            }
        );
    }

    onCityFilter(clear: boolean = false) {
        if (clear) {
            this.city = '';
        }
        this.searchCity = this.city;
    }

    onSortDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
}
