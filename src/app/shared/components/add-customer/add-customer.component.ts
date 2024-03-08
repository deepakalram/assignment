import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  @Input() form:any;
  @Input() regions: any[] = [];

  countries: any[] = [];

  @Output() onSubmitEvent = new EventEmitter<Object>();

  constructor(private _apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  onChange(type: string) {
    switch (type) {
      case 'region':
        const value = this.form.get(type)?.value;
        this.countries = (this.regions.find(item => item.id == value))?.value;
        break;

      default:
        console.log("change field not match")
        break;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._apiService._addCustomer(this.form.value).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Success', 'Customer added successfully');
        this.onSubmitEvent.emit('submit');
      }
    })

  }

  onCancel() {
    this.onSubmitEvent.emit('reset');
  }

}
