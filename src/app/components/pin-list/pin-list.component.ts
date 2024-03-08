import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent {

  isDataLoading: boolean = false;
  pins: any[] = [];

  form!: FormGroup
  formName: string = '';

  regions: any[] = [];
  customers: any[] = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.getPins();
  }

  getPins() {
    this.isDataLoading = true;
    this._apiService._getPins().subscribe((res) => {
      if (res.status) {
        this.pins = res.data;
      }
    })
  }

  getCountries() {
    this._apiService._getCountries().subscribe((res: any) => {
      if (res['status-code'] == 200) {
        for (const key in res.data) {
          const row = res?.data[key];
          const findIndex = this.regions.findIndex(item => item?.id == row.region)
          if (findIndex != -1) {
            this.regions[findIndex].value.push(row.country)
          }
          else {
            this.regions.push({
              id: row.region,
              value: [row.country]
            })
          }
        }
      }
    })
  }

  getCustomer() {
    this._apiService._getCustomer().subscribe((res) => {
      if (res.status) {
        this.customers = res.data
      }
    })
  }

  initForm(type: string) {
    switch (type) {
      case 'customer':
        this.form = new FormBuilder().group({
          title: [null, [Validators.required, Validators.pattern(/^[A-Za-z\s'-]+$/)]],
          email: [null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
          region: [null, [Validators.required]],
          country: [null, [Validators.required]]
        })
        break;
      case 'pin':
        this.form = new FormBuilder().group({
          title: [null, [Validators.required, Validators.pattern(/^[A-Za-z\s'-]+$/)]],
          image: [null, [Validators.required]],
          collaboratory: [null, [Validators.required]],
          privcy: [null, [Validators.required]]
        })
        break;

      default:
        break;
    }
    this.formName = type;
  }

  formSubmit(event: any) {
    switch (event) {
      case 'submit':
        this.getPins();
        this.formSubmit('reset');
        break;
      case 'reset':
        this.form.reset();
        this.formName = '';
        break;

      default:
        break;
    }
  }

  onPopupToggole(type: string) {
    switch (type) {
      case "customer":
        this.getCountries();
        this.initForm(type)
        break;
      case "pin":
        this.getCustomer();
        this.initForm(type)
        break;

      default:
        break;
    }
  }
}
