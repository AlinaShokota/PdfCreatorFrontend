import { Component, OnInit } from '@angular/core';
import { WebsitePriceService } from 'src/app/service/website-price.service';
import { WebsitePrice } from 'src/app/model/website-price';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-website-price',
  templateUrl: './website-price.component.html',
  styleUrls: ['./website-price.component.css']
})
export class WebsitePriceComponent implements OnInit {

  constructor(private websitePriceService: WebsitePriceService) { }
  public isCollapsed = false;

  websitePriceDocuments: WebsitePrice[] = new Array();
  websitePriceDocument: WebsitePrice;

  ngOnInit() {
    this.websitePriceDocument = new WebsitePrice();
    this.getAllDocuments();
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

}
