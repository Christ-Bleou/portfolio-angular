const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n=== CONFIGURATION ULTIME DU PORTFOLIO ===");

const data = {};

// On enchaîne les questions
rl.question('1. Votre Prénom : ', (p) => {
    data.firstName = p;
    rl.question('2. Votre Nom : ', (n) => {
        data.lastName = n;
        rl.question('3. Votre Job (ex: Student CS, Angular Developper) : ', (j) => {
            data.jobTitle = j;
            rl.question('4. Votre Email : ', (e) => {
                data.email = e;
                rl.question('5. Votre Téléphone : ', (t) => {
                    data.phone = t;
                    rl.question('6. Ta Bio (courte phrase) : ', (b) => {
                        data.aboutMe = b;
                        rl.question('7. Votre Adresse : ', (a) => {
                            data.address = a;
                            console.log("\n--- LES CHIFFRES CLÉS (FACTS) ---");
                            rl.question('8. Années d\'expérience (ex: 3) : ', (y) => {
                                data.expYears = y;
                                rl.question('9. Clients satisfaits (ex: 10) : ', (c) => {
                                    data.happyClients = c;
                                    rl.question('10. Projets terminés (ex: 15) : ', (pr) => {
                                        data.projectsDone = pr;
                                        rl.question('11. Lignes de code/Cafés (ex: 5000) : ', (d) => {
                                            data.downloads = d;
                                            rl.question('11. Lien LinkedIn : ', (link) => {
                                                data.socialLinkedin = link;
                                                rl.question('12. Lien GitHub : ', (git) => {
                                                    data.socialGithub = git;

                        // Sauvegarde
                        const dir = path.join(__dirname, 'src', 'assets', 'data');
                        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                        fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(data, null, 2));
                        
                        console.log("\n✅ Configuration terminée !\n✅ TOUT EST ENREGISTRÉ ! 🎉");
                        console.log("📂 Données sauvegardées dans src/assets/data/config.json");
                        console.log("🚀 Lance 'ng serve' maintenant !");
                        rl.close();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});