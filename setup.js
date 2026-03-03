const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n=== 📸 CONFIGURATION FINALE DU PORTFOLIO 📸 ===");

const data = {};

// Fonction pour copier l'image
function copierPhoto(sourcePath, callback) {
    // Enlève les guillemets si l'utilisateur a fait "Copier le chemin"
    const cleanPath = sourcePath.replace(/"/g, '').trim();
    
    // Chemin de destination dans Angular
    const assetsDir = path.join(__dirname, 'src', 'assets', 'img');
    const destPath = path.join(assetsDir, 'profile_pic.jpg');

    try {
        if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
        
        // Copie du fichier
        fs.copyFileSync(cleanPath, destPath);
        console.log(`✅ Photo copiée avec succès vers : src/assets/img/profile_pic.jpg`);
        data.photoPath = 'assets/img/profile_pic.jpg'; // Chemin pour Angular
    } catch (e) {
        console.log("⚠️ Erreur lors de la copie de l'image (chemin incorrect ?). On utilisera une image par défaut.");
        data.photoPath = null;
    }
    callback();
}

// LE QUESTIONNAIRE
rl.question('1. Prénom : ', (p) => {
    data.firstName = p;
    rl.question('2. Nom : ', (n) => {
        data.lastName = n;
        rl.question('3. Job : ', (j) => {
            data.jobTitle = j;
            rl.question('4. Email : ', (e) => {
                data.email = e;
                rl.question('5. Téléphone : ', (t) => {
                    data.phone = t;
                    rl.question('6. Adresse : ', (a) => {
                        data.address = a;

                        console.log("\n--- RÉSEAUX SOCIAUX ---");
                        rl.question('7. Lien LinkedIn (Entrée pour ignorer) : ', (lk) => {
                            data.socialLinkedin = lk;
                            rl.question('8. Lien GitHub : ', (gh) => {
                                data.socialGithub = gh;
                                rl.question('9. Lien Facebook : ', (fb) => {
                                    data.socialFacebook = fb;
                                    rl.question('10. Lien Pinterest : ', (pin) => {
                                        data.socialPinterest = pin;
                                        rl.question('11. Lien Twitter/X : ', (tw) => {
                                            data.socialTwitter = tw;

                                            console.log("\n--- STATISTIQUES ---");
                                            rl.question('12. Années d\'expérience : ', (y) => {
                                                data.expYears = y;
                                                rl.question('13. Clients satisfaits : ', (c) => {
                                                    data.happyClients = c;
                                                    rl.question('14. Projets finis : ', (pr) => {
                                                        data.projectsDone = pr;
                                                        rl.question('15. Lignes de code : ', (d) => {
                                                            data.downloads = d;

                                                            console.log("\n--- 📷 LA PHOTO ---");
                                                            console.log("Fais un clic droit sur ta photo -> 'Copier en tant que chemin d'accès' (ou glisse le fichier ici)");
                                                            rl.question('16. Colle le chemin de ta photo ici : ', (photoInput) => {
                                                                
                                                                // On traite la photo et on sauvegarde
                                                                copierPhoto(photoInput, () => {
                                                                    const configDir = path.join(__dirname, 'src', 'assets', 'data');
                                                                    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
                                                                    fs.writeFileSync(path.join(configDir, 'config.json'), JSON.stringify(data, null, 2));
                                                                    
                                                                    console.log("\n🎉 TOUT EST PRÊT ! Lance 'ng serve'.");
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
            });
        });
    });
});