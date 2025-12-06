import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// Supprimer les imports de path et url pour simplifier le fichier unique.

import cryptoRoutes from './routes/cryptoRoutes';
import { errorHandler } from './middleware/errorHandler';


// Contenu HTML de la documentation.
// Style "Readme GitHub" : épuré, centré, tableaux propres, pas d'images inutiles.
const documentationHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation API - Kryptonite</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            color: #24292f; /* Couleur texte GitHub standard */
            line-height: 1.6;
        }
        .container {
            max-width: 896px; /* Largeur lecture confortable */
            margin: 0 auto;
            padding: 40px 20px;
        }
        h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #d0d7de;
            text-align: center;
        }
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.3rem;
            border-bottom: 1px solid #d0d7de;
        }
        h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #0969da; /* Bleu lien GitHub pour les endpoints */
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }
        p, li {
            margin-bottom: 1rem;
        }
        code {
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-size: 85%;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            margin-bottom: 1rem;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: 100%;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        th, td {
            border: 1px solid #d0d7de;
            padding: 6px 13px;
        }
        th {
            background-color: #f6f8fa;
            font-weight: 600;
            text-align: left;
        }
        tr:nth-child(2n) {
        }
        /* Dark Mode Support (Automatique) */
        @media (prefers-color-scheme: dark) {
            body { background-color: #0d1117; color: #c9d1d9; }
            h1, h2 { border-bottom-color: #30363d; }
            h3 { color: #58a6ff; }
            code, pre { background-color: #161b22; }
            th, td { border-color: #30363d; }
            th { background-color: #161b22; }
        }
        .center-text { text-align: center; }
    </style>
</head>
<body>

    <div class="container">
        
        <h1>Documentation API Complète - Kryptonite</h1>
        
        <p class="center-text">Voici la liste exhaustive de tous les endpoints disponibles sur l'API Kryptonite.<br>
        URL de base : <code>http://localhost:3000/api</code></p>

        <!-- 1. ROT13 -->
        <h2>1. ROT13</h2>
        <p>Le chiffrement le plus simple (et le moins sûr). Il est reversible (appliquer 2 fois ROT13 redonne le texte original).</p>

        <h3>POST /api/rot13/encrypt</h3>
        <p><strong>Description</strong> : Chiffre (ou déchiffre) un texte avec l'algorithme ROT13.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte à transformer.</td>
                </tr>
            </tbody>
        </table>
        
        <p><strong>Exemple</strong> :</p>
<pre><code>{
  "text": "Hello"
}</code></pre>

        <!-- 2. Code César -->
        <h2>2. Code César</h2>

        <h3>POST /api/caesar/encrypt</h3>
        <p><strong>Description</strong> : Chiffre un texte avec un décalage alphabétique.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte à chiffrer.</td>
                </tr>
                <tr>
                    <td><code>shift</code></td>
                    <td><code>number</code></td>
                    <td><em>NON</em></td>
                    <td>Le décalage (ex: 3). Si omis, <strong>une clé aléatoire est générée</strong>.</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Réponse</strong> : Renvoie le résultat et la clé utilisée (<code>key</code>).</p>

        <h3>POST /api/caesar/decrypt</h3>
        <p><strong>Description</strong> : Déchiffre un texte codé avec César.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte chiffré.</td>
                </tr>
                <tr>
                    <td><code>shift</code></td>
                    <td><code>number</code></td>
                    <td><strong>OUI</strong></td>
                    <td>La clé de décalage pour déchiffrer.</td>
                </tr>
            </tbody>
        </table>

        <!-- 3. Chiffre de Vigenère -->
        <h2>3. Chiffre de Vigenère</h2>
        <p>Le chiffrement polyalphabétique (plus robuste que César).</p>

        <h3>POST /api/vigenere/encrypt</h3>
        <p><strong>Description</strong> : Chiffre un texte en utilisant un mot-clé.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte à chiffrer.</td>
                </tr>
                <tr>
                    <td><code>key</code></td>
                    <td><code>string</code></td>
                    <td><em>NON</em></td>
                    <td>Le mot de passe. Si omis, <strong>une clé aléatoire est générée</strong>.</td>
                </tr>
            </tbody>
        </table>

        <h3>POST /api/vigenere/decrypt</h3>
        <p><strong>Description</strong> : Déchiffre un texte Vigenère.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte chiffré.</td>
                </tr>
                <tr>
                    <td><code>key</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>La clé secrète utilisée pour le chiffrement.</td>
                </tr>
            </tbody>
        </table>

        <!-- 4. Carré de Polybe -->
        <h2>4. Carré de Polybe</h2>
        <p>Chiffrement par substitution qui remplace chaque lettre par ses coordonnées dans une grille.</p>

        <h3>POST /api/polybe/encrypt</h3>
        <p><strong>Description</strong> : Chiffre un texte en coordonnées numériques.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Le texte à chiffrer.</td>
                </tr>
                <tr>
                    <td><code>alphabet</code></td>
                    <td><code>string</code></td>
                    <td><em>NON</em></td>
                    <td>Une grille personnalisée (25 caractères uniques).</td>
                </tr>
                <tr>
                    <td><code>random</code></td>
                    <td><code>boolean</code></td>
                    <td><em>NON</em></td>
                    <td>Si <code>true</code>, génère une grille totalement <strong>aléatoire</strong>.</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Réponse</strong> : Si une grille aléatoire est utilisée, elle est renvoyée dans le champ <code>alphabet</code>.</p>

        <h3>POST /api/polybe/decrypt</h3>
        <p><strong>Description</strong> : Retrouve le texte original à partir des coordonnées.</p>
        <p><strong>Body (JSON)</strong> :</p>
        <table>
            <thead>
                <tr>
                    <th>Champ</th>
                    <th>Type</th>
                    <th>Obligatoire</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>text</code></td>
                    <td><code>string</code></td>
                    <td><strong>OUI</strong></td>
                    <td>Les coordonnées (ex: "11 15 23").</td>
                </tr>
                <tr>
                    <td><code>alphabet</code></td>
                    <td><code>string</code></td>
                    <td><em>NON</em></td>
                    <td>La grille utilisée (doit être la même que pour le chiffrement).</td>
                </tr>
            </tbody>
        </table>

        <!-- Codes d'erreur -->
        <h2>Codes d'erreur</h2>
        <p>L'API renvoie des codes HTTP standards :</p>
        <ul>
            <li><strong>200 OK</strong> : Tout s'est bien passé.</li>
            <li><strong>400 Bad Request</strong> : Paramètres manquants ou invalides (ex: texte vide, clé manquante pour le déchiffrement).</li>
            <li><strong>500 Internal Server Error</strong> : Oups, j'ai cassé un truc (ça n'arrive jamais, promis !).</li>
        </ul>

        <br>
        <hr style="border: 0; border-top: 1px solid #d0d7de;">
        <p class="center-text" style="color: #656d76; font-size: 0.85rem; margin-top: 20px;">
            <em>Par NightFury pour Kryptonite.</em>
        </p>

    </div>

</body>
</html>
`;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', cryptoRoutes);

// Route pour la documentation
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(documentationHtml);
});

app.use(errorHandler);

export default app;

/**

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░   ░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ░░░░░░░░░░░░░
▒   ▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒
▒   ▒   ▒▒▒▒▒  ▒    ▒   ▒▒▒   ▒  ▒   ▒▒▒    ▒  ▒▒▒▒   ▒▒▒▒▒   ▒   ▒▒▒▒▒▒▒    ▒  ▒▒▒▒   ▒▒▒▒
▓  ▓  ▓▓▓▓▓▓▓▓   ▓▓▓▓▓   ▓   ▓▓  ▓▓   ▓▓▓▓   ▓▓▓▓   ▓▓   ▓▓▓   ▓▓   ▓   ▓▓▓   ▓▓▓▓  ▓▓▓   ▓
▓   ▓▓   ▓▓▓▓▓   ▓▓▓▓▓▓▓    ▓▓▓  ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓▓   ▓▓   ▓▓   ▓   ▓▓▓   ▓▓▓         ▓
▓   ▓▓▓   ▓▓▓▓   ▓▓▓▓▓▓▓▓   ▓▓▓   ▓   ▓▓▓▓   ▓ ▓▓   ▓▓   ▓▓▓   ▓▓   ▓   ▓▓▓   ▓ ▓  ▓▓▓▓▓▓▓▓
█   █████   █    ███████   ████   █████████   █████   █████    ██   █   ████   ████     ███
███████████████████████   █████   █████████████████████████████████████████████████████████

 */