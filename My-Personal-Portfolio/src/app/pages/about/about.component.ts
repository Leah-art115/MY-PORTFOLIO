import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  // About content 
aboutText = `
  I'm a dynamic self-taught developer fueled by a passion for crafting innovative, 
  high-impact solutions. My journey began with a spark of curiosity, which I transformed 
  into expertise through relentless learning and hands-on problem-solving. I thrive on 
  turning complex challenges into elegant, scalable full-stack applications that deliver 
  real value to users and businesses.
`;

journeyText = `
  My development journey started with mastering HTML, CSS, and JavaScript through 
  online resources, fueled by a drive to build meaningful web experiences. I expanded 
  my skills with Angular for dynamic frontends and NestJS for robust backend APIs. A 
  pivotal moment was completing an intensive coding bootcamp, where I gained hands-on 
  experience with real-world projects, collaborating in agile teams to deliver production-ready 
  applications. This blend of self-directed learning and practical teamwork has shaped me 
  into a versatile full-stack developer, ready to tackle diverse technical challenges.
`;

  // Key highlights
  highlights: Highlight[] = [
    {
      icon: 'fas fa-rocket',
      title: '1+ Year Experience',
      description: 'Self-taught developer with hands-on project experience'
    },
    {
      icon: 'fas fa-code',
      title: 'Full-Stack Focus',
      description: 'Proficient in both frontend and backend technologies'
    },
    {
      icon: 'fas fa-heart',
      title: 'Passionate Learner',
      description: 'Always eager to learn new technologies and best practices'
    },
    {
      icon: 'fas fa-users',
      title: 'Problem Solver',
      description: 'Love building solutions that make a real difference'
    }
  ];

  isVisible = false;

  ngOnInit() {
    this.setupScrollAnimation();
  }

  // Download CV function
  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/cv/alex-johnson-cv.pdf';
    link.download = 'Alex-Johnson-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private setupScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        observer.observe(aboutElement);
      }
    }, 100);
  }
}