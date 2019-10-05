import { Component, OnInit } from '@angular/core';
import { SimpleContractService } from 'src/app/service/simple-contract.service';
import { SimpleContract } from 'src/app/model/simple-contract';
import * as fileSaver from 'file-saver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-contract',
  templateUrl: './simple-contract.component.html',
  styleUrls: ['./simple-contract.component.css']
})
export class SimpleContractComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(private simpleContractService: SimpleContractService, private fb: FormBuilder) { }

  public isCollapsed = false;
  contracts: SimpleContract[] = new Array();
  contract: SimpleContract;
  ngOnInit() {
    this.contract = new SimpleContract();
    this.getAllContracts();
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      customerCompanyName: ['', Validators.required],
      expirationDate: ['']
    });
  }

  getAllContracts() {
    this.simpleContractService.getAllContracts().subscribe(value => {
      this.contracts = value;
      console.log(this.contracts);
    });
  }

  submit() {
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.contract = this.form.value;
    this.simpleContractService.save(this.contract).subscribe(value =>{
    this.getAllContracts();
    this.contract = new SimpleContract();
    });

  }

  downloadPdfWithId(id: number) {
    this.simpleContractService.downloadPdfWithId(id)
      .subscribe(responce => {
        const filename = responce.headers.get('id');
        this.saveFile(responce.body, id);
      });
  }
  saveFile(data: any, id?: number) {
    const blob = new Blob([data], { type: 'application/pdf' });
    fileSaver.saveAs(blob, id);
  }

  saveContract() {
    this.simpleContractService.save(this.contract)
      .subscribe(value => {
        this.ngOnInit();
      });
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this contract ?")) {
      this.simpleContractService.delete(id)
        .subscribe(value => {
          this.getAllContracts();
        })
    }
  }
}
