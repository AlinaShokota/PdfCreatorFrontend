import { Component, OnInit } from '@angular/core';
import { WebsitePriceService } from 'src/app/service/website-price.service';
import { WebsitePriceDocument } from 'src/app/model/website-price-document';
import * as fileSaver from 'file-saver';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PriceRow } from 'src/app/model/price-row';

@Component({
  selector: 'app-website-price',
  templateUrl: './website-price.component.html',
  styleUrls: ['./website-price.component.css']
})
export class WebsitePriceComponent implements OnInit {
  public form: FormGroup;
  public rows: FormArray;
  
  get rowsFormGroup() {
    return this.form.get('pricingRows') as FormArray;
  }

  constructor(private websitePriceService: WebsitePriceService,
    private fb: FormBuilder) { }
  public isCollapsed = false;

  websitePriceDocuments: WebsitePriceDocument[] = new Array();
  websitePriceDocument: WebsitePriceDocument;
  cost: number = 0;

  ngOnInit() {
    this.websitePriceDocument = new WebsitePriceDocument();
    this.getAllDocuments();

    this.form = this.fb.group({
      companyName: [],
      customerCompanyName: [],
      cost: [],
      pricingRows: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.rows = this.form.get('pricingRows') as FormArray;
  }

  // method triggered when form is submitted
  submit() {
    this.websitePriceDocument = this.form.value;
   this.calculateCost();
    this.websitePriceService.save(this.websitePriceDocument).subscribe(value =>{
      this.getAllDocuments();
      this.websitePriceDocument = new WebsitePriceDocument();
    });
  }
  calculateCost(){
    for (var val of this.websitePriceDocument.pricingRows) {
      this.cost += val.price;
      console.log(val.price);
    }
    this.websitePriceDocument.cost = this.cost;
  }

  getAllDocuments() {
    this.websitePriceService.getAllWebsitePriceDocuments().subscribe(value => {
      this.websitePriceDocuments = value;
      console.log(this.websitePriceDocuments);
    })
  }

  downloadPdfWithId(id: number) {
    this.websitePriceService.downloadPdfWithId(id)
      .subscribe(responce => {
        const filename = responce.headers.get('id');
        this.saveFile(responce.body, id);
      });
  }
  saveFile(data: any, id?: number) {
    const blob = new Blob([data], { type: 'application/pdf' });
    fileSaver.saveAs(blob, id);
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this contract ?")) {
      this.websitePriceService.delete(id)
        .subscribe(value => {
          this.getAllDocuments();
        })
    }
  }

  createContact(): FormGroup {
    return this.fb.group({
      title: [''], 
      description: [''],
      price: ['']
    });
  }

  // add a contact form group
  addContact() {
    this.rows.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.rows = this.form.get('contacts') as FormArray;
    this.rows.removeAt(index);
  }

  // triggered to change validation of value field type
  // changedFieldType(index) {
  //   let validators = null;

  //   if (this.getContactsFormGroup(index).controls['type'].value === 'email') {
  //     validators = Validators.compose([Validators.required, Validators.email]);
  //   } else {
  //     validators = Validators.compose([
  //       Validators.required,
  //       Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
  //     ]);
  //   }

  //   this.getContactsFormGroup(index).controls['value'].setValidators(
  //     validators
  //   );

  //   this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
  // }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.rows = this.form.get('contacts') as FormArray;
    const formGroup = this.rows.controls[index] as FormGroup;
    return formGroup;
  }

  

}
