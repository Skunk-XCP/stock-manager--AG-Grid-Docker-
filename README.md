# Stock Manager

Application Next.js pour decouvrir AG Grid et Docker avec un cas concret de
gestion de stock d'entreprise.

## Ce que l'app montre

- Tableau AG Grid avec tri, filtres, recherche rapide, pagination et edition de cellules.
- Calculs de disponibilite, valeur de stock et alertes de reassort.
- Simulateur de mouvement de stock pour voir la grille se mettre a jour.
- Build Docker de production via `Dockerfile` multi-stage.
- Demarrage conteneurise avec `docker compose`.

## Demarrage local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

## Docker

Construire et lancer l'application :

```bash
docker compose up --build
```

Arreter le conteneur :

```bash
docker compose down
```

L'app est exposee sur [http://localhost:3000](http://localhost:3000).

## Fichiers importants

- `src/app/page.tsx` : page principale et indicateurs de stock.
- `src/components/inventory-workspace.tsx` : composant client AG Grid.
- `src/lib/inventory-data.ts` : donnees de demonstration typees.
- `Dockerfile` : image de production Next.js.
- `docker-compose.yml` : execution locale en conteneur.
