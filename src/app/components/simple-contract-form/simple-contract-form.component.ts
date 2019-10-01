import { Component, OnInit } from '@angular/core';
import { SimpleContract } from 'src/app/model/simple-contract';
import { SimpleContractService } from 'src/app/service/simple-contract.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-simple-contract-form',
  templateUrl: './simple-contract-form.component.html',
  styleUrls: ['./simple-contract-form.component.css']
})
export class SimpleContractFormComponent implements OnInit {

  constructor(private simpleContractService: SimpleContractService) { }

  contract: SimpleContract = new SimpleContract();

  id: number = 0;
  ngOnInit() {
  }

  saveContract() {
    this.simpleContractService.save(this.contract)
    .subscribe(value =>{
      window.location.href = 'contract';
    });
  }

  saveAndDownload(){
    this.saveContract();
    this.id = this.contract.id;
    this.downloadPdfWithId(this.id);
  }
  downloadPdfWithId(id: number){
    this.simpleContractService.downloadPdfWithId(id)
    .subscribe(responce => {
      const filename = responce.headers.get('id');
      this.saveFile(responce.body, id);

    })
  }
  saveFile(data: any, id?: number) {
    const blob = new Blob([data], {type: 'application/pdf'});
    fileSaver.saveAs(blob, id);
  }

}
