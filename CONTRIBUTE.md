# 🎨 Guide de contribution et personnalisation

Comment étendre et personnaliser votre portfolio generator.

---

## 📋 Table des matières

1. [Ajouter une section](#ajouter-une-section)
2. [Modifier les styles](#modifier-les-styles)
3. [Ajouter des données dynamiques](#ajouter-des-données-dynamiques)
4. [Créer un composant](#créer-un-composant)
5. [Bonnes pratiques](#bonnes-pratiques)

---

## 🆕 Ajouter une nouvelle section

### Étape 1 : Créer le composant

```bash
ng generate component home/components/mon-composant
```

Cela crée :
```
src/app/home/components/mon-composant/
├── mon-composant.ts          # Logique
├── mon-composant.html        # Template
├── mon-composant.scss        # Styles
└── mon-composant.spec.ts     # Tests
```

### Étape 2 : Ajouter le contenu

**mon-composant.ts :**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-composant',
  templateUrl: './mon-composant.html',
  styleUrl: './mon-composant.scss',
})
export class MonComposant {
  // Votre logique ici
}
```

**mon-composant.html :**
```html
<section class="ma-section" id="ma-section">
  <div class="container">
    <h2>Ma nouvelle section</h2>
    <!-- Contenu -->
  </div>
</section>
```

**mon-composant.scss :**
```scss
.ma-section {
  padding: 50px 0;
  background: #f5f5f5;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
}
```

### Étape 3 : Intégrer au portfolio

Modifiez `src/app/home/home.ts` :

```typescript
import { MonComposant } from './components/mon-composant/mon-composant';

@Component({
  // ...
  imports: [
    // ... autres composants
    MonComposant,  // ← Ajouter ceci
  ]
})
export class Home {
  // ...
}
```

Modifiez `src/app/home/home.html` :

```html
<app-mon-composant />  <!-- ← Ajouter ceci -->
```

✨ Voilà ! Votre nouvelle section est live !

---

## 🎨 Modifier les styles

### 1. Styles globaux

**Fichier :** `src/styles.scss`

```scss
// Variables globales
$primary-color: #007bff;
$secondary-color: #6c757d;

// Mixins réutilisables
@mixin button-style {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

// Styles généraux
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 2. Variables SCSS

Créez `src/assets/scss/variables.scss` :

```scss
// Couleurs
$primary: #007bff;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;

// Espacements
$spacing-xs: 5px;
$spacing-sm: 10px;
$spacing-md: 15px;
$spacing-lg: 20px;

// Typefaces
$font-primary: 'Segoe UI', sans-serif;
$font-secondary: 'Georgia', serif;
```

Utilisez dans vos composants :

```scss
@import '../../assets/scss/variables.scss';

.button {
  background: $primary;
  padding: $spacing-md;
  font-family: $font-primary;
}
```

### 3. Changer le thème

**Fichier :** `angular.json`

```json
"styles": [
  "src/styles.scss",
  "src/assets/css/bootstrap.min.css",
  "src/assets/css/blue.css",    // ← Changez ceci pour un autre thème
  // ...
]
```

Thèmes disponibles :
- `blue.css`
- `green.css`
- `pink.css`
- `red.css`
- `violet.css`
- `mono.css`
- `dark.theme.css`

Redémarrez le serveur :
```bash
npm start
```

---

## 📊 Ajouter des données dynamiques

### 1. Modifier la configuration

**Fichier :** `src/assets/data/config.json`

Ajoutez vos données :

```json
{
  // Données existantes...
  "expertise": [
    { "skill": "Angular", "level": 90 },
    { "skill": "TypeScript", "level": 85 },
    { "skill": "SCSS", "level": 80 }
  ],
  "languages": ["Français", "Anglais"],
  "certifications": [
    { "name": "Angular Developer", "date": "2024" }
  ]
}
```

### 2. Mettre à jour l'interface

**Fichier :** `src/app/profile.service.ts`

```typescript
export interface UserConfig {
  // ... données existantes
  expertise?: Array<{ skill: string; level: number }>;
  languages?: string[];
  certifications?: Array<{ name: string; date: string }>;
}
```

### 3. Utiliser dans le composant

**Fichier :** `src/app/home/components/mon-composant/mon-composant.ts`

```typescript
import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../profile.service';

@Component({
  // ...
})
export class MonComposant {
  profileService = inject(ProfileService);

  get skills() {
    return this.profileService.config()?.expertise || [];
  }
}
```

**Fichier :** `src/app/home/components/mon-composant/mon-composant.html`

```html
<section class="skills">
  @for (skill of skills; track skill.skill) {
    <div class="skill">
      <span>{{ skill.skill }}</span>
      <div class="progress">
        <div class="progress-bar" 
             [style.width.%]="skill.level">
        </div>
      </div>
    </div>
  }
</section>
```

---

## 🏗️ Créer un composant personnalisé

### Template complet d'un composant

**Fichier :** `src/app/home/components/testimoniaux/testimoniaux.ts`

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../profile.service';

interface Testimonial {
  name: string;
  text: string;
  author: string;
}

@Component({
  selector: 'app-testimoniaux',
  templateUrl: './testimoniaux.html',
  styleUrl: './testimoniaux.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Testimoniaux {
  profileService = inject(ProfileService);
  
  // État local
  currentIndex = signal(0);
  
  // Données (exemple)
  testimonials = signal<Testimonial[]>([
    {
      name: 'Client 1',
      text: 'Excellent travail !',
      author: 'Jean Dupont'
    },
    {
      name: 'Client 2',
      text: 'Très professionnel',
      author: 'Marie Martin'
    }
  ]);

  // Méthodes
  nextTestimonial() {
    const count = this.testimonials().length;
    this.currentIndex.update(i => (i + 1) % count);
  }

  previousTestimonial() {
    const count = this.testimonials().length;
    this.currentIndex.update(i => (i - 1 + count) % count);
  }

  getCurrentTestimonial() {
    return this.testimonials()[this.currentIndex()];
  }
}
```

**Fichier :** `src/app/home/components/testimoniaux/testimoniaux.html`

```html
<section class="testimonials" id="testimonials">
  <div class="container">
    <h2 class="section-title">Témoignages</h2>
    
    @if (getCurrentTestimonial() as testimonial) {
      <div class="testimonial-card">
        <p class="testimonial-text">{{ testimonial.text }}</p>
        <p class="testimonial-author">- {{ testimonial.author }}</p>
      </div>
    }
    
    <div class="navigation">
      <button (click)="previousTestimonial()" class="btn-prev">❮</button>
      <button (click)="nextTestimonial()" class="btn-next">❯</button>
    </div>
  </div>
</section>
```

**Fichier :** `src/app/home/components/testimoniaux/testimoniaux.scss`

```scss
.testimonials {
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  .section-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .testimonial-card {
    max-width: 600px;
    margin: 0 auto 30px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);

    .testimonial-text {
      font-size: 1.2rem;
      font-style: italic;
      margin-bottom: 15px;
    }

    .testimonial-author {
      text-align: right;
      font-size: 0.9rem;
    }
  }

  .navigation {
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
      padding: 10px 15px;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
```

---

## ✅ Bonnes pratiques Angular

### 1. Utiliser `input()` et `output()`

```typescript
import { input, output } from '@angular/core';

@Component({
  // ...
})
export class MonComposant {
  // Input
  message = input('Bonjour');
  
  // Output
  clicked = output<void>();
  
  onButtonClick() {
    this.clicked.emit();
  }
}
```

### 2. Utiliser les signaux pour l'état

```typescript
import { signal, computed } from '@angular/core';

export class MonComposant {
  count = signal(0);
  
  // Valeur dérivée
  doubled = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(c => c + 1);
  }
}
```

### 3. Injection de services

```typescript
import { inject } from '@angular/core';

export class MonComposant {
  private profileService = inject(ProfileService);
  private http = inject(HttpClient);
}
```

### 4. ChangeDetectionStrategy.OnPush

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonComposant {
  // ...
}
```

### 5. Utiliser le control flow natif

```html
<!-- ✅ BON -->
@if (condition) {
  <div>Contenu</div>
}

<!-- ❌ MAUVAIS -->
<div *ngIf="condition">Contenu</div>
```

---

## 🧪 Tester votre composant

**Fichier :** `src/app/home/components/mon-composant/mon-composant.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonComposant } from './mon-composant';

describe('MonComposant', () => {
  let component: MonComposant;
  let fixture: ComponentFixture<MonComposant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonComposant]
    }).compileComponents();

    fixture = TestBed.createComponent(MonComposant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

Exécutez les tests :

```bash
npm test
```

---

## 🔗 Cas d'usage courants

### Ajouter un formulaire de contact

1. Utilisez `ReactiveFormsModule`
2. Créez un FormGroup
3. Validez les entrées
4. Envoyez via HttpClient

### Ajouter une galerie d'images

1. Créez un composant avec `CommonModule`
2. Utilisez `NgOptimizedImage` pour les images
3. Implémentez la navigation

### Ajouter un compteur

1. Utilisez les signaux
2. `count = signal(0)`
3. `computed(() => this.count() * 2)`

### Ajouter des animations

```scss
.element {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
}
```

---

## 📦 Structure recommandée

```
src/app/
├── home/
│   ├── components/
│   │   ├── about/          # À propos
│   │   ├── contact/        # Contact
│   │   ├── portfolio/      # Galerie
│   │   ├── resume/         # CV
│   │   ├── services/       # Services
│   │   ├── skills/         # Compétences (nouveau)
│   │   └── testimonials/   # Témoignages (nouveau)
│   ├── home.ts
│   └── home.html
├── shared/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── preloader/
│   ├── models/             # Interfaces
│   └── services/           # Services partagés
└── profile.service.ts
```

---

## 🚀 Déployer les changements

```bash
# 1. Développer localement
npm start

# 2. Tester
npm test

# 3. Builder
npm run build

# 4. Déployer
# Vercel, Netlify, GitHub Pages, etc.
```

---

## 📚 Ressources

- [Angular Docs](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [SCSS Guide](https://sass-lang.com/guide)
- [Bootstrap Components](https://getbootstrap.com/docs/)

---

**Happy coding ! 🚀✨**
