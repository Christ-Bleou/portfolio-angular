import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserConfig {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  aboutMe?: string;
  
  // Stats
  expYears: string;
  happyClients: string;
  projectsDone: string;
  downloads: string;

  // Socials
  socialLinkedin: string;
  socialGithub: string;
  socialFacebook: string;  // Nouveau
  socialPinterest: string; // Nouveau
  socialTwitter: string;   // Nouveau

  // Photo
  photoPath: string;       // Nouveau
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  config = signal<UserConfig | null>(null);

  constructor(private http: HttpClient) {
    this.http.get<UserConfig>('assets/data/config.json').subscribe({
      next: (data) => this.config.set(data),
      error: () => console.log("⚠️ Lance 'node setup.js' !")
    });
  }
}