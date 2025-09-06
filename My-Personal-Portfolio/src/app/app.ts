import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HeroComponent } from './pages/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { CertificationsComponent } from './pages/certifications/certifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent,  FooterComponent, ServicesComponent, CertificationsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'My-Personal-Portfolio';
}
