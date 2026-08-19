"use client";

import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Filter,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import type { InventoryItem, StockMovement } from "@/lib/inventory-data";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type InventoryWorkspaceProps = {
  initialItems: InventoryItem[];
  initialMovements: StockMovement[];
};

export function InventoryWorkspace({
  initialItems,
  initialMovements,
}: InventoryWorkspaceProps) {
  const [items, setItems] = useState(initialItems);
  const [movements, setMovements] = useState(initialMovements);
  const [quickFilter, setQuickFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const filteredItems = useMemo(() => {
    if (statusFilter === "Tous") {
      return items;
    }

    return items.filter((item) => item.status === statusFilter);
  }, [items, statusFilter]);

  const columnDefs = useMemo<ColDef<InventoryItem>[]>(
    () => [
      {
        field: "sku",
        headerName: "SKU",
        pinned: "left",
        minWidth: 130,
      },
      {
        field: "name",
        headerName: "Article",
        minWidth: 230,
        flex: 1.4,
      },
      { field: "category", headerName: "Categorie", minWidth: 145 },
      { field: "location", headerName: "Entrepot", minWidth: 150 },
      {
        field: "quantity",
        headerName: "Stock",
        editable: true,
        minWidth: 110,
        type: "numericColumn",
      },
      {
        field: "reserved",
        headerName: "Reserve",
        editable: true,
        minWidth: 115,
        type: "numericColumn",
      },
      {
        headerName: "Disponible",
        minWidth: 125,
        type: "numericColumn",
        valueGetter: ({ data }: ValueGetterParams<InventoryItem>) =>
          data ? data.quantity - data.reserved : 0,
      },
      {
        field: "reorderPoint",
        headerName: "Seuil",
        editable: true,
        minWidth: 110,
        type: "numericColumn",
      },
      {
        field: "unitCost",
        headerName: "Cout unitaire",
        minWidth: 140,
        type: "numericColumn",
        valueFormatter: ({ value }: ValueFormatterParams<InventoryItem>) =>
          currencyFormatter.format(Number(value ?? 0)),
      },
      {
        headerName: "Valeur",
        minWidth: 135,
        type: "numericColumn",
        valueGetter: ({ data }: ValueGetterParams<InventoryItem>) =>
          data ? data.quantity * data.unitCost : 0,
        valueFormatter: ({ value }: ValueFormatterParams<InventoryItem>) =>
          currencyFormatter.format(Number(value ?? 0)),
      },
      {
        field: "leadTimeDays",
        headerName: "Delai",
        minWidth: 110,
        valueFormatter: ({ value }: ValueFormatterParams<InventoryItem>) =>
          `${value} j`,
      },
      {
        field: "status",
        headerName: "Statut",
        minWidth: 135,
        cellRenderer: ({ value }: { value: InventoryItem["status"] }) => (
          <StatusBadge status={value} />
        ),
      },
      { field: "supplier", headerName: "Fournisseur", minWidth: 170 },
      { field: "lastUpdated", headerName: "MAJ", minWidth: 120 },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<InventoryItem>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    }),
    [],
  );

  const rowSelection = useMemo(
    () => ({
      mode: "multiRow" as const,
    }),
    [],
  );

  function onCellValueChanged() {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.quantity <= 0) {
          return { ...item, status: "Rupture" };
        }

        if (item.quantity <= item.reorderPoint) {
          return { ...item, status: "A surveiller" };
        }

        return { ...item, status: "En stock" };
      }),
    );
  }

  function simulateInbound() {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.status === "A surveiller" || item.status === "Rupture"
          ? {
              ...item,
              quantity: item.quantity + Math.max(item.reorderPoint * 2, 12),
              status: "En stock",
              lastUpdated: "2026-08-11",
            }
          : item,
      ),
    );
    setMovements((currentMovements) => [
      {
        id: `MOV-${1500 + currentMovements.length}`,
        date: "2026-08-11 10:45",
        sku: "MULTI-RESTOCK",
        itemName: "Reassort automatique",
        type: "Entrée",
        quantity: items
          .filter(
            (item) => item.status === "A surveiller" || item.status === "Rupture",
          )
          .reduce(
            (total, item) => total + Math.max(item.reorderPoint * 2, 12),
            0,
          ),
        operator: "Systeme",
        note: "Simulation pour decouvrir les mises a jour de grille",
      },
      ...currentMovements,
    ]);
  }

  function resetDemo() {
    setItems(initialItems);
    setMovements(initialMovements);
    setQuickFilter("");
    setStatusFilter("Tous");
  }

  return (
    <section
      id="inventory"
      className="mx-auto grid w-full max-w-[1920px] gap-4 px-3 py-5 sm:px-4 lg:px-5"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-md border border-[#d9dde3] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#d9dde3] p-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#172026]">
                Inventaire AG Grid
              </h2>
              <p className="mt-1 text-sm text-[#5f6b76]">
                Trie, filtre, redimensionne et modifie les colonnes Stock,
                Reserve et Seuil directement dans la grille.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6b76]"
                  size={17}
                />
                <input
                  value={quickFilter}
                  onChange={(event) => setQuickFilter(event.target.value)}
                  className="h-10 w-64 rounded-md border border-[#bdc5cf] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#175cd3] focus:ring-2 focus:ring-[#d8e7ff]"
                  placeholder="Recherche rapide"
                />
              </label>
              <label className="inline-flex h-10 items-center gap-2 rounded-md border border-[#bdc5cf] bg-white px-3 text-sm text-[#172026]">
                <Filter size={17} />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="bg-transparent text-sm outline-none"
                >
                  <option>Tous</option>
                  <option>En stock</option>
                  <option>A surveiller</option>
                  <option>Rupture</option>
                </select>
              </label>
            </div>
          </div>

          <div className="h-[640px] w-full p-2 sm:p-3">
            <div className="ag-theme-quartz stock-grid h-full w-full">
              <AgGridReact<InventoryItem>
                rowData={filteredItems}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                quickFilterText={quickFilter}
                pagination
                paginationPageSize={8}
                rowSelection={rowSelection}
                animateRows
                onCellValueChanged={onCellValueChanged}
                getRowStyle={({ data }) => {
                  if (!data) {
                    return undefined;
                  }

                  if (data.status === "Rupture") {
                    return { background: "#fff1f1" };
                  }

                  if (data.status === "A surveiller") {
                    return { background: "#fff9e8" };
                  }

                  return undefined;
                }}
              />
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-md border border-[#d9dde3] bg-white p-4">
            <h2 className="text-lg font-semibold text-[#172026]">Actions</h2>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={simulateInbound}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#007a5a] px-4 text-sm font-semibold text-white transition hover:bg-[#006247]"
              >
                <Plus size={18} />
                Simuler un reassort
              </button>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#bdc5cf] bg-white px-4 text-sm font-semibold text-[#172026] transition hover:bg-[#eef1f4]"
              >
                <RotateCcw size={18} />
                Reinitialiser
              </button>
            </div>
          </div>

          <div className="rounded-md border border-[#d9dde3] bg-white p-4">
            <h2 className="text-lg font-semibold text-[#172026]">
              Mouvements recents
            </h2>
            <div className="mt-4 grid gap-3">
              {movements.slice(0, 5).map((movement) => (
                <article
                  key={movement.id}
                  className="border-b border-[#e6e9ee] pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md ${
                        movement.type === "Entrée"
                          ? "bg-[#e7f6ef] text-[#007a5a]"
                          : "bg-[#e9f2ff] text-[#175cd3]"
                      }`}
                    >
                      {movement.type === "Entrée" ? (
                        <ArrowDownToLine size={17} />
                      ) : (
                        <ArrowUpFromLine size={17} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#172026]">
                        {movement.type} de {movement.quantity} unites
                      </p>
                      <p className="truncate text-sm text-[#5f6b76]">
                        {movement.itemName}
                      </p>
                      <p className="mt-1 text-xs text-[#7a8694]">
                        {movement.date} par {movement.operator}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: InventoryItem["status"] }) {
  const styles = {
    "En stock": "bg-[#e7f6ef] text-[#007a5a]",
    "A surveiller": "bg-[#fff4db] text-[#9a6700]",
    Rupture: "bg-[#fdecec] text-[#b42318]",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
