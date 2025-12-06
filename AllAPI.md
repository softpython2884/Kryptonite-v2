# Documentation API Complète - Kryptonite

Voici la liste exhaustive de tous les endpoints disponibles sur l'API Kryptonite.
URL de base : `http://localhost:3000/api`

---

## 1. ROT13

Le chiffrement le plus simple (et le moins sûr). Il est reversible (appliquer 2 fois ROT13 redonne le texte original).

### `POST /api/rot13`
**Description** : Chiffre (ou déchiffre) un texte avec l'algorithme ROT13.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte à transformer. |

**Exemple** :
```json
{
  "text": "Hello"
}
```

---

## 2. Code César

### `POST /api/caesar/encrypt`
**Description** : Chiffre un texte avec un décalage alphabétique.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte à chiffrer. |
| `shift` | `number` | *NON* | Le décalage (ex: 3). Si omis, **une clé aléatoire est générée**. |

**Réponse** :
Renvoie le résultat et la clé utilisée (`key`).

### `POST /api/caesar/decrypt`
**Description** : Déchiffre un texte codé avec César.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte chiffré. |
| `shift` | `number` | **OUI** | La clé de décalage pour déchiffrer. |

---

## 3. Chiffre de Vigenère

Le chiffrement polyalphabétique (plus robuste que César).

### `POST /api/vigenere/encrypt`
**Description** : Chiffre un texte en utilisant un mot-clé.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte à chiffrer. |
| `key` | `string` | *NON* | Le mot de passe. Si omis, **une clé aléatoire est générée**. |

### `POST /api/vigenere/decrypt`
**Description** : Déchiffre un texte Vigenère.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte chiffré. |
| `key` | `string` | **OUI** | La clé secrète utilisée pour le chiffrement. |

---

## 4. Carré de Polybe

Chiffrement par substitution qui remplace chaque lettre par ses coordonnées dans une grille.

### `POST /api/polybe/encrypt`
**Description** : Chiffre un texte en coordonnées numériques.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Le texte à chiffrer. |
| `alphabet` | `string` | *NON* | Une grille personnalisée (25 caractères uniques). |
| `random` | `boolean` | *NON* | Si `true`, génère une grille totalement **aléatoire**. |

**Réponse** :
Si une grille aléatoire est utilisée, elle est renvoyée dans le champ `alphabet`.

### `POST /api/polybe/decrypt`
**Description** : Retrouve le texte original à partir des coordonnées.

**Body (JSON)** :
| Champ | Type | Obligatoire | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **OUI** | Les coordonnées (ex: "11 15 23"). |
| `alphabet` | `string` | *NON* | La grille utilisée (doit être la même que pour le chiffrement). |

---

## Codes d'erreur

L'API renvoie des codes HTTP standards :
*   **200 OK** : Tout s'est bien passé.
*   **400 Bad Request** : Paramètres manquants ou invalides (ex: texte vide, clé manquante pour le déchiffrement).
*   **500 Internal Server Error** : Oups, j'ai cassé un truc (ça n'arrive jamais, promis !).

---
*Généré automatiquement par NightFury pour Kryptonite.*
