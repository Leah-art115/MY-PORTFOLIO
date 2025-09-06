import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  
  // Personal Information 
  fullName = 'Leah Achieng';
  title = 'Full Stack Developer';
  tagline = 'Building real-world applications and Turning Complex Business Problems Into Simple Digital Solutions';
 profileImage = 'portfoliopicture.jpg';


  
  // Social links
  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/Leah-art115?tab=repositories', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/leah-achieng-a3b8a9360/', icon: 'fab fa-linkedin' },
  ];

  isLoaded = false;

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }
  

  // Smooth scroll to sections
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/cv/leah-achieng-cv.pdf'; 
    link.download = 'Leah Achieng cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Open cv in new tab 
    window.open('assets/cv/leah-achieng-cv.pdf', '_blank');
  }
}