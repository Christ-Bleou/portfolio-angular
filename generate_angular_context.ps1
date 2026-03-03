# generate_angular_context.ps1
# Script pour exporter tout le code important de ton projet Angular dans un fichier texte
# À exécuter à la racine du projet (où se trouve angular.json)

$outputFile = "projet_angular_context.txt"

# En-tête
Set-Content -Path $outputFile -Value "CONTEXTE PROJET PORTFOLIO ANGULAR - RECTCV"
Add-Content -Path $outputFile -Value "Date: $(Get-Date)"
Add-Content -Path $outputFile -Value "Auteur: Christ Bleou"
Add-Content -Path $outputFile -Value "============================================`n"

# 1. Fichiers de configuration importants à la racine
$rootFiles = @(
    "angular.json",
    "package.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "vite.config.ts",      # au cas où tu aurais migré
    ".gitignore",
    "README.md"
)

foreach ($file in $rootFiles) {
    if (Test-Path $file) {
        Add-Content -Path $outputFile -Value "============================================"
        Add-Content -Path $outputFile -Value "FICHIER RACINE: $file"
        Add-Content -Path $outputFile -Value "============================================"
        Get-Content -Path $file | Add-Content -Path $outputFile
        Add-Content -Path $outputFile -Value "`n`n"
    }
}

# 2. Tous les fichiers source dans src/ (ts, tsx, html, scss, css, json) - on exclut les binaires
Add-Content -Path $outputFile -Value "============================================"
Add-Content -Path $outputFile -Value "DOSSIER SRC/"
Add-Content -Path $outputFile -Value "============================================"

$extensions = "*.ts", "*.tsx", "*.html", "*.scss", "*.css", "*.json", "*.js", "*.jsx"
$files = Get-ChildItem -Path "src" -Recurse -Include $extensions -Exclude "*.spec.ts"

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($PWD.Path.Length + 1)
    
    Add-Content -Path $outputFile -Value "----------------------------------------"
    Add-Content -Path $outputFile -Value "FICHIER: $relativePath"
    Add-Content -Path $outputFile -Value "----------------------------------------"
    
    Get-Content -Path $file.FullName | Add-Content -Path $outputFile
    Add-Content -Path $outputFile -Value "`n`n"
}

Write-Host "✅ Terminé ! Tout le code de ton projet Angular a été exporté dans :"
Write-Host "   $outputFile"
Write-Host "👉 Tu peux maintenant glisser ce fichier dans la conversation Grok pour que je l'analyse."