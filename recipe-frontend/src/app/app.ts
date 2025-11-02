import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar'; // ton composant

@Component({
  selector: 'app-root',
  standalone: true, // ✅ important si ce composant n’est pas dans un module
  imports: [RouterOutlet, NavbarComponent], // ✅ ajoute NavbarComponent ici
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recipe-frontend');
}
