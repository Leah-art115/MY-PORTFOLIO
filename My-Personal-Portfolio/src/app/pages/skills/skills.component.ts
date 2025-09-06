import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  level: number; 
  category: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  isVisible = false;
  animateProgress = false;

  // Skills data organized by category
  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'Angular', icon: 'fab fa-angular', level: 90, category: 'frontend' },
        { name: 'TypeScript', icon: 'fab fa-js-square', level: 85, category: 'frontend' },
        { name: 'HTML5', icon: 'fab fa-html5', level: 95, category: 'frontend' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90, category: 'frontend' },
        { name: 'TailwindCSS', icon: 'fas fa-paint-brush', level: 85, category: 'frontend' },
        { name: 'JavaScript', icon: 'fab fa-js', level: 80, category: 'frontend' }
      ]
    },
    {
      name: 'Backend',
      icon: 'fas fa-server',
      skills: [
        { name: 'NestJS', icon: 'fas fa-node-js', level: 85, category: 'backend' },
        { name: 'Node.js', icon: 'fab fa-node-js', level: 80, category: 'backend' },
        { name: 'PostgreSQL', icon: 'fas fa-database', level: 75, category: 'backend' },
        { name: 'Prisma', icon: 'fas fa-layer-group', level: 80, category: 'backend' },
        { name: 'REST APIs', icon: 'fas fa-exchange-alt', level: 85, category: 'backend' },
        { name: 'GraphQL', icon: 'fas fa-project-diagram', level: 70, category: 'backend' }
      ]
    },
    {
      name: 'Tools & Others',
      icon: 'fas fa-tools',
      skills: [
        { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 90, category: 'tools' },
        { name: 'VS Code', icon: 'fas fa-code', level: 95, category: 'tools' },
        { name: 'Figma', icon: 'fab fa-figma', level: 75, category: 'tools' },
        { name: 'Docker', icon: 'fab fa-docker', level: 65, category: 'tools' },
        { name: 'Linux', icon: 'fab fa-linux', level: 70, category: 'tools' },
        { name: 'AWS Basics', icon: 'fab fa-aws', level: 60, category: 'tools' }
      ]
    }
  ];

  ngOnInit() {
    this.setupScrollAnimation();
  }

  private setupScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            // Trigger progress bar animation after a delay
            setTimeout(() => {
              this.animateProgress = true;
            }, 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const skillsElement = document.getElementById('skills');
      if (skillsElement) {
        observer.observe(skillsElement);
      }
    }, 100);
  }

  // Get progress bar width based on skill level
  getProgressWidth(level: number): string {
    return this.animateProgress ? `${level}%` : '0%';
  }

  // Get skill level label
  getSkillLabel(level: number): string {
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Basic';
    return 'Beginner';
  }
}