import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PersonRegistryService} from "../../services/person-registry.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {i18nMetaToJSDoc} from "@angular/compiler/src/render3/view/i18n/meta";





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{



  constructor(
    public personService:PersonRegistryService,
  ) {}

  public htmlSource!:SafeResourceUrl;


  ngOnInit(): void {
    // this.personService.getMapFromElgun();
    // this.htmlSource=this.sanitarizer.bypassSecurityTrustHtml('assets/htmls/Test1.html');
  }

}
