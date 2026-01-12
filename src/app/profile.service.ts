import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserConfig {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;   
  phone: string;   
  aboutMe: string; 
  address: string;     
  expYears: string;    
  happyClients: string;
  projectsDone: string;
  downloads: string;
  socialLinkedin: string; 
  socialGithub: string;      
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // On utilise un Signal (nouveauté Angular 17) pour stocker la config
  config = signal<UserConfig | null>(null);

  constructor(private http: HttpClient) {
    this.chargerConfig();
  }

  private chargerConfig() {
    this.http.get<UserConfig>('assets/data/config.json').subscribe({
      next: (data) => this.config.set(data),
      error: () => console.log("⚠️ Pense à lancer 'node setup.js' pour configurer ton nom !")
    });
  }
}