import { Component, OnInit } from '@angular/core';
import { SimpleContractService } from 'src/app/service/simple-contract.service';
import { SimpleContract } from 'src/app/model/simple-contract';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-simple-contract',
  templateUrl: './simple-contract.component.html',
  styleUrls: ['./simple-contract.component.css']
})
export class SimpleContractComponent implements OnInit {

  constructor(private simpleContractService: SimpleContractService) { }

  contracts: SimpleContract[] = new Array();
  contract: SimpleContract;
  ngOnInit() {
    this.contract = new SimpleContract();
    this.getAllContracts();
  }

  getAllContracts() {
    this.simpleContractService.getAllContracts().subscribe(value => {
      this.contracts = value;
      console.log(this.contracts);
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
        this.getAllContracts();
        this.contract = new SimpleContract();
      });
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this contract ?")) {
      this.simpleContractService.delete(id)
        .subscribe(value => {
          this.getAllContracts();
        })
    }





    // this.simpleContractService.delete(id)
    // .subscribe(value =>{
    //   this.getAllContracts();
    // })
  }
}
