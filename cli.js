#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Couleurs pour la console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    blue: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function log(text, color = 'reset') {
    console.log(`${colors[color] || colors.reset}${text}${colors.reset}`);
}

function prompt(question) {
    return new Promise((resolve) => {
        rl.question(`${colors.bright}${question}${colors.reset}`, resolve);
    });
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    log('\n┌─────────────────────────────────────┐', 'magenta');
    log('│  🎨 PORTFOLIO GENERATOR CLI 🎨      │', 'magenta');
    log('│  v1.0.0                             │', 'magenta');
    log('└─────────────────────────────────────┘', 'magenta');

    if (command === 'init' || command === 'setup' || !command) {
        await setupPortfolio();
    } else if (command === 'help' || command === '--help') {
        showHelp();
    } else if (command === 'version' || command === '--version') {
        log('Portfolio Generator v1.0.0', 'blue');
    } else {
        log(`\n❌ Commande inconnue: ${command}`, 'red');
        showHelp();
    }

    rl.close();
}

async function copyProfilePhoto(sourcePath) {
    const cleanPath = sourcePath.replace(/"/g, '').trim();

    if (!cleanPath) {
        log(`⚠️ Pas de photo fournie. On utilisera une image par défaut.`, 'yellow');
        return false;
    }

    try {
        const assetsDir = path.join(__dirname, 'src', 'assets', 'img');
        const destPath = path.join(assetsDir, 'profile_pic.jpg');

        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        if (!fs.existsSync(cleanPath)) {
            throw new Error('Fichier source non trouvé');
        }

        // Copier le fichier
        fs.copyFileSync(cleanPath, destPath);
        log(`✅ Photo copiée avec succès: src/assets/img/profile_pic.jpg`, 'green');
        return true;
    } catch (error) {
        log(`❌ Erreur lors de la copie: ${error.message}`, 'red');
        return false;
    }
}

async function setupPortfolio() {
    log('\n📋 CONFIGURATION DE VOTRE PORTFOLIO PERSONNEL\n', 'blue');

    const portfolio = {
        firstName: await prompt('📝 Prénom: '),
        lastName: await prompt('📝 Nom: '),
        jobTitle: await prompt('👨‍💼 Titre professionnel: '),
        email: await prompt('📧 Email: '),
        phone: await prompt('📱 Téléphone: '),
        address: await prompt('🏠 Adresse: '),
        aboutMe: await prompt('💡 À propos de vous (optionnel): ') || 'Développeur passionné',
    };

    log('\n--- RÉSEAUX SOCIAUX ---\n', 'bright');
    portfolio.socialLinkedin = await prompt('💼 LinkedIn (optionnel): ') || '';
    portfolio.socialGithub = await prompt('🐙 GitHub (optionnel): ') || '';
    portfolio.socialFacebook = await prompt('👥 Facebook (optionnel): ') || '';
    portfolio.socialPinterest = await prompt('📌 Pinterest (optionnel): ') || '';
    portfolio.socialTwitter = await prompt('🐦 Twitter/X (optionnel): ') || '';

    log('\n--- STATISTIQUES ---\n', 'bright');
    portfolio.expYears = await prompt('📅 Années d\'expérience [5]: ') || '5';
    portfolio.happyClients = await prompt('😊 Clients satisfaits [50]: ') || '50';
    portfolio.projectsDone = await prompt('🎯 Projets réalisés [25]: ') || '25';
    portfolio.downloads = await prompt('💾 Lignes de code [10000]: ') || '10000';

    log('\n--- 📷 VOTRE PHOTO ---\n', 'bright');
    log('Chemin complet du fichier (ex: C:\\\\Users\\\\John\\\\photo.jpg)', 'yellow');
    const photoPath = await prompt('📸 Chemin de votre photo (optionnel): ');

    portfolio.photoPath = null;
    if (photoPath && photoPath.trim()) {
        const photoSuccess = await copyProfilePhoto(photoPath.trim());
        if (photoSuccess) {
            portfolio.photoPath = 'assets/img/profile_pic.jpg';
        }
    } else {
        log('⚠️ Pas de photo fournie. On utilisera une image par défaut.', 'yellow');
    }

    // 🔥 SAUVEGARDER LA CONFIGURATION
    const configDir = path.join(__dirname, 'src', 'assets', 'data');
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(configDir, 'config.json'),
        JSON.stringify(portfolio, null, 2)
    );

    log('\n┌─────────────────────────────────────┐', 'green');
    log('│  ✅ PORTFOLIO CONFIGURÉ ! 🎉       │', 'green');
    log('└─────────────────────────────────────┘', 'green');
    log('\n📝 Configuration sauvegardée dans : src/assets/data/config.json', 'green');
    log('\n🚀 Commandes disponibles:', 'bright');
    log('   npm start     → Lancer le serveur de développement', 'blue');
    log('   npm run build → Construire pour la production\n', 'blue');
}

function showHelp() {
    log('\n📚 UTILISATION:', 'bright');
    log('   npm run cli init       - Initialiser un nouveau portfolio', 'blue');
    log('   npm run cli setup      - Configuration de portfolio (alias)', 'blue');
    log('   npm run cli help       - Afficher cette aide', 'blue');
    log('   npm run cli version    - Afficher la version\n', 'blue');

    log('🚀 DÉMARRAGE RAPIDE:', 'bright');
    log('   1. npm install                  # Installer les dépendances', 'yellow');
    log('   2. npm run cli init             # Configurer votre portfolio', 'yellow');
    log('   3. npm start                    # Lancer le serveur\n', 'yellow');
}

main().catch((error) => {
    log(`\n❌ Erreur: ${error.message}`, 'red');
    process.exit(1);
});
