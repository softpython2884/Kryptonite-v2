# Rapport Final - Projet Kryptonite

## Introduction

Pour mon projet de développement, j'ai choisi de réaliser **Kryptonite**, un microservice de cryptographie accessible via une API REST.

Pourquoi ce choix ?
J'avais envie de travailler sur une API backend propre et robuste. La cryptographie "historique" (César, Vigenère, etc.) est un excellent terrain de jeu : c'est la base de la sécurité informatique (Bien que peut performante a mon avis, je pref les signature numérique tel que HMAC), les algorithmes sont logiques et "faciles" à debugger pas à pas, et cela permet de se concentrer sur l'architecture et la qualité du code plutôt que sur la complexité métier. De plus, c'est un projet qui se réalise rapidement, ce qui m'a laissé du temps pour soigner les détails (tests, validation, documentation).

Ce rapport se découpera en trois parties :
1.  **Définition du projet** (ce que je voulais faire et comment).
2.  **Première phase** (les problèmes rencontrés et solutions).
3.  **Résultats et analyse** (bilan technique et personnel).

---

## Partie 1 – Définition du projet

### Ce que je voulais faire
L'objectif était de créer une api cryptographique sous forme de microservice. Je voulais que n'importe quelle autre application puisse interroger mon API pour chiffrer ou déchiffrer du texte, sans avoir à réimplémenter les algorithmes. Je voulais couvrir :
*   Le ROT13 (simple et classique).
*   Le Code César (avec décalage variable sinon trop faible).
*   Le Chiffre de Vigenère (polyalphabétique).
*   Le Carré de Polybe (avec génération de grilles aléatoires).

### Ce que j'ai mis en œuvre
J'ai respecté le cahier des charges initial. L'API est fonctionnelle, documentée, et chaque algorithme a son propre endpoint dédié.

### Les outils choisis
J'ai opté pour une stack moderne et typée :
*   **TypeScript** : Pour la rigueur. Le ts évite énormément d'erreurs et rend le code beaucoup plus lisible.
*   **Node.js & Express** : C'est le standard de l'industrie pour les API légères et performantes. La communauté est immense et la documentation abondante.
*   **Zod** : Pour la validation des données entrantes. C'est une librairie incroyable qui permet de définir des "schémas" stricts. Si l'utilisateur envoie n'importe quoi, Zod le bloque avant même que mon code ne s'exécute.
*   **Jest & Supertest** : Pour les tests unitaires et d'intégration. Pour ne pas vérifier manuellement chaque URL à chaque modification.

### Moyens que je me suis donnés
J'ai adopté une approche professionnelle :
*   **Planification** : J'ai découpé le travail en tâches claires (Services d'abord, puis Contrôleurs, puis Routes).
*   **TDD (Test Driven Development)** : Pour certains algos complexes comme Vigenère, j'ai d'abord écrit les tests avant le code pour être sûr de couvrir les cas limites.

### Critères d'évaluation
Je considère le projet réussi si :
1.  Toutes les fonctionnalités cryptographiques sont présentes.
2.  Tous les tests sont verts (100% de réussite).
3.  Le code est propre, commenté et bien indenté.

---

## Partie 2 – Première phase du projet

### Début du projet / Mise en route
Le démarrage s'est fait sans accroc majeur grâce à l'initialisation du projet avec `npm init` et la configuration de TypeScript. La structure des dossiers (`src/controllers`, `src/services`, etc.) m'a permis de ranger chaque bout de code dès le départ.

### Premiers problèmes et solutions
Tout n'a pas été rose. J'ai rencontré quelques soucis logiques :
*   **Le bouclage de l'alphabet** : Pour ROT13 et César, quand on décale 'Z' de 1, on doit retomber sur 'A'. J'ai utiliser l'opérateur modulo `%` (`(index + shift) % 26`).
*   **Les caractères spéciaux** : Au début, mon code plantait s'il y avait des espaces ou des points. J'ai ajouté des conditions pour ignorer (ne pas chiffrer) tout ce qui n'est pas une lettre de A à Z.

### Exemple concret d'un problème résolu : Vigenère
Le problème le plus intéressant a été la gestion de la clé dans Vigenère. Si le texte fait 100 caractères et la clé ("CLE") n'en fait que 3, il faut répéter la clé.
*   *Mon erreur initiale* : J'essayais de créer une string "CLECLECLE..." de la même taille que le texte. C'était lourd en mémoire.
*   *Ma solution* : J'ai utilisé un index séparé pour la clé (`keyIndex`) que j'incrémente à chaque fois que je chiffre une lettre, et je récupère la lettre de la clé avec un modulo : `key[keyIndex % key.length]`. C'est beaucoup plus optimisé !

---

## Partie 3 – Résultats et analyse

### Description finale du programme
**Kryptonite** est un serveur web qui écoute sur le port 3000. Il expose des routes comme `/api/caesar/encrypt` qui acceptent du JSON et renvoient du JSON. Il gère les erreurs proprement (renvoie un code 400 si la requête est mauvaise, pas un crash serveur).

### Analyse : Ce qui fonctionne / Ce qui pourrait être amélioré
*   ✅ **Fonctionne** : Tous les algos cryptent et décryptent correctement. La validation Zod est très efficace.
*   🚧 **Améliorations** : Actuellement, l'API est publique. N'importe qui peut l'utiliser. Dans une version 2, il faudrait ajouter une authentification (JWT ou API Key [Token]) pour sécuriser l'accès. On pourrait aussi ajouter des algos plus modernes comme AES.

### Apprentissages
*   **Technique** : J'ai vraiment bien aimée **Zod** que je ne connaisais pas avant, il m'aurais était utile bien nombre de fois.
*   **Méthodologique** : J'ai continué à utiliser les tests automatiques. Quand j'ai refactorisé mon code à la fin pour le rendre plus propre, j'avais juste à lancer `npm test` pour être sûr de n'avoir rien cassé. C'est un confort inestimable par rapport a un npm run build & small test mais pas infaillible.

---

## Conclusion

Ce projet n'a pas été très enrichissant a part pour Zod. Mais ça permet toujour de consolidée ses base en TypeScript et en Backend.
Pour mes futurs projets, je compte creuser le côté DevOps (toujours utile de connaître les meilleurs processus à utiliser pour X ou Y situations) et ajouter une couche de sécurité. (Pour des raisons personnelles, mais certaines de mes VM se sont fait attaquer récemment et des cryptojacking ont été ajouté dessus...)
---

## Sources D'aide

*   **dCode** (pour vérifier mes résultats de chiffrement si vous avez besoin) : [dcode.fr](https://www.dcode.fr/)
*   **Mon GitHub** : [github.com/softpython2884](https://github.com/softpython2884)
*   **Node.js Documentation** : [nodejs.org/docs](https://nodejs.org/en/docs/)
*   **Express.js Guide** : [expressjs.com](https://expressjs.com/)
*   **Zod (Validation)** : [zod.dev](https://zod.dev/)
*   **Jest (Testing)** : [jestjs.io](https://jestjs.io/)
*   **Portfolio** [NightProject's](https://nightproject.nationquest.fr)