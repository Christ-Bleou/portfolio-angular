import { Component, inject } from '@angular/core';
import {Header} from '../shared/components/header/header';
import {Preloader} from '../shared/components/preloader/preloader';
import {Introduction} from './components/introduction/introduction';
import {About} from './components/about/about';
import {Facts} from './components/facts/facts';
import {Services} from './components/services/services';
import {Movie} from './components/movie/movie';
import {Portfolio} from './components/portfolio/portfolio';
import {Projet} from './components/projet/projet';
import {Resume} from './components/resume/resume';
import {Testimonial} from './components/testimonial/testimonial';
import {Blog} from './components/blog/blog';
import {Contact} from './components/contact/contact';

import { CommonModule } from '@angular/common';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Preloader, About,
    Facts, Services, Movie, Portfolio, Projet, Resume, Testimonial,
    Blog, Contact, CommonModule
  ], //Introduction
  templateUrl: './home.html'
})
export class Home {
  // Injection du service
  profileService = inject(ProfileService);
}
