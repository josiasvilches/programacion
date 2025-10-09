import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevPanelComponent } from './components/dev-panel/dev-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Rotisería El Buen Sabor';
}