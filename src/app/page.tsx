import {
  Activity,
  Boxes,
  CircleAlert,
  PackageCheck,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";
import { InventoryWorkspace } from "@/components/inventory-workspace";
import { inventoryItems, stockMovements } from "@/lib/inventory-data";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const totalValue = inventoryItems.reduce(
    (total, item) => total + item.quantity * item.unitCost,
    0,
  );
  const lowStockCount = inventoryItems.filter(
    (item) => item.quantity <= item.reorderPoint,
  ).length;
  const pendingInbound = stockMovements
    .filter((movement) => movement.type === "Entrée")
    .reduce((total, movement) => total + movement.quantity, 0);
  const activeSites = new Set(inventoryItems.map((item) => item.location)).size;

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#172026]">
      <header className="border-b border-[#d9dde3] bg-white">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-6 px-3 py-6 sm:px-4 lg:px-5">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#007a5a]">
                Stock Manager
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#172026] sm:text-4xl">
                Pilotage des stocks multi-entrepôts
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#5f6b76]">
                Une application d&apos;introduction à AG Grid et Docker avec
                inventaire éditable, filtres, tri, alertes de réassort et
                suivi des mouvements.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#inventory"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#172026] px-4 text-sm font-semibold text-white transition hover:bg-[#2f3b45]"
              >
                <Boxes size={18} />
                Inventaire
              </a>
              <a
                href="#docker"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-[#bdc5cf] bg-white px-4 text-sm font-semibold text-[#172026] transition hover:bg-[#eef1f4]"
              >
                <Truck size={18} />
                Docker
              </a>
            </div>
          </div>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              icon={<PackageCheck size={20} />}
              label="Valeur immobilisée"
              value={currencyFormatter.format(totalValue)}
              tone="green"
            />
            <Metric
              icon={<CircleAlert size={20} />}
              label="Articles à réassortir"
              value={String(lowStockCount)}
              tone="red"
            />
            <Metric
              icon={<Activity size={20} />}
              label="Entrées planifiées"
              value={`${pendingInbound} unités`}
              tone="blue"
            />
            <Metric
              icon={<Truck size={20} />}
              label="Sites actifs"
              value={String(activeSites)}
              tone="amber"
            />
          </section>
        </div>
      </header>

      <InventoryWorkspace
        initialItems={inventoryItems}
        initialMovements={stockMovements}
      />

      <section
        id="docker"
        className="mx-auto grid w-full max-w-[1920px] gap-4 px-3 pb-10 sm:px-4 lg:grid-cols-[1fr_1fr] lg:px-5"
      >
        <div className="rounded-md border border-[#d9dde3] bg-white p-5">
          <h2 className="text-lg font-semibold text-[#172026]">
            Objectif Docker
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5f6b76]">
            Le dépôt contient un `Dockerfile`, un `docker-compose.yml` et un
            `.dockerignore`. Tu peux construire une image de production Next.js
            et démarrer l&apos;app dans un conteneur local.
          </p>
        </div>
        <div className="rounded-md border border-[#d9dde3] bg-white p-5">
          <h2 className="text-lg font-semibold text-[#172026]">
            Commandes utiles
          </h2>
          <pre className="mt-3 overflow-x-auto rounded-md bg-[#172026] p-4 text-sm leading-6 text-white">
            <code>{`docker compose up --build
docker compose down
npm run dev`}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "green" | "red" | "blue" | "amber";
}) {
  const tones = {
    green: "bg-[#e7f6ef] text-[#007a5a]",
    red: "bg-[#fdecec] text-[#b42318]",
    blue: "bg-[#e9f2ff] text-[#175cd3]",
    amber: "bg-[#fff4db] text-[#9a6700]",
  };

  return (
    <article className="rounded-md border border-[#d9dde3] bg-white p-4">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${tones[tone]}`}
        >
          {icon}
        </span>
        <div>
          <p className="text-sm text-[#5f6b76]">{label}</p>
          <p className="mt-1 text-xl font-semibold text-[#172026]">{value}</p>
        </div>
      </div>
    </article>
  );
}
