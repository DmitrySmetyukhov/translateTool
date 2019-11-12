import {Component} from '@angular/core';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {TranslationService} from './shared/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translateTool';
  show = true;

  constructor(private translationService: TranslationService) {
  }

  translate() {
    let url = '/assets/translations.ods';
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = (e) => {
      let data = new Uint8Array(req.response);
      let workbook = XLSX.read(data, {type: 'array'});

      console.log(workbook.SheetNames[0], 'workbook.SheetNames[0];');

      const sheet = workbook.Sheets.Sheet1;
      const keys = Object.keys(sheet);

      const langsCellNames = keys.filter(k =>
        k.includes('1')
      );

      const valuesArrays: any[] = [];

      langsCellNames.forEach(cn => {
        const firstChar = cn[0];
        const colKeys = keys.filter(k => k.includes(firstChar));

        const colValues = colKeys.map(k => {
          return sheet[k].w;
        });

        valuesArrays.push(colValues);
      });

      const resultObject = {};
      valuesArrays.forEach((array, index) => {
        if (index === 0) {
          return;
        }

        resultObject[array[0]] = {};

        valuesArrays[0].forEach((origin, i) => {
          if (i === 0) {
            return;
          }
          resultObject[array[0]][origin] = array[i];
        });
      });

      Object.keys(resultObject).forEach(key => {
        resultObject[key] = resultObject[key];
      });

      const json = JSON.stringify(resultObject);


      // const blob = new Blob([json], {type: 'application/json'});
      // saveAs(blob, 'hello world.json');

      const headPart = `
         export const Translations = `;

      const blob = new Blob([headPart + json], {type: 'application/json'});
      saveAs(blob, 'translations.ts');
    };
    req.send();
  }


  setLocale(locale: string) {
    this.translationService.setLocale(locale);
    this.show = false;
    setTimeout(() => {
      this.show = true;
    });
  }
}
