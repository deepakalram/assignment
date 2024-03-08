import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.scss']
})
export class AddPinComponent {

  @Input() form: any;
  @Input() customers: any[] = [];

  base64: any = '';

  @Output() onSubmitEvent = new EventEmitter<Object>();

  constructor(private _apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._apiService._addPins({ ...this.form.value, image: this.base64 }).subscribe((res) => {
      if (res.status) {
        this.toastr.success('Success', 'Pin added successfully');
        this.onSubmitEvent.emit('submit');
      }
    })

  }

  onCancel() {
    this.onSubmitEvent.emit('reset');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files: any = event?.dataTransfer?.files;
    this.getBase64(files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.base64 = reader.result
      this.form.patchValue({
        image: this.base64
      })
    };
    reader.onerror = (error) => console.log('Error: ', error);
  }

}
