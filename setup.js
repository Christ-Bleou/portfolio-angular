// Fichier : setup.js
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n=== CONFIGURATION DU PORTFOLIO ===");

rl.question('Entrez votre PRÉNOM : ', (prenom) => {
  rl.question('Entrez votre NOM : ', (nom) => {
    rl.question('Entrez votre JOB (ex: Développeur Angular) : ', (job) => {
        
        const data = { firstName: prenom, lastName: nom, jobTitle: job };
        // On crée le dossier s'il n'existe pas
        const dir = path.join(__dirname, 'src', 'assets', 'data');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        // On écrit le fichier JSON
        fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(data));
        
        console.log("\n✅ Configuration terminée !");
        console.log("📂 Données sauvegardées dans src/assets/data/config.json");
        console.log("🚀 Lancez maintenant : ng serve");
        rl.close();
    });
  });
});