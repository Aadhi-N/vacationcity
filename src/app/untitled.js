


    <div class="row" id="select-temp">
      <label>The temperature should be around: <span id="amount">{{selectedTemp}}</span> °
        <span [class.celcius]="celciusActive" id="celcius" (click)="setMetric($event)">Celcius</span> |
        <span [class.farenheit]="!farenheitActive" class="farenheit" (click)="setMetric($event)">Farenheit</span>
        <br />
        <div class="slider" [class.showCelcius]="celciusActive">
          <input *ngFor="let temp of temps" type="range" id="range" [min]="temp.low" [max]="temp.high" [value]="0" step="2" [(ngModel)]="selectedTemp" (ngModelChange)="tempSlider($event)">
        </div>
        <div class="slider" [class.showFarenheit]="!farenheitActive">
          <input *ngFor="let temp of temps" type="range" id="range" [min]="temp.low-8" [max]="temp.high+72" [value]="32" step="2" [(ngModel)]="selectedTemp" (ngModelChange)="tempSlider($event)">
        </div>


Celcius° | Fahrenheit°