import fs from "fs";
import path from "path";
import {v4 as uuid} from "uuid";
import {INewCreatedItem} from "@/types/firebase";

const FILE = path.join(process.cwd(), "data", "inventory", "items.json");

export type InventoryItem = INewCreatedItem & {
	id: string;
	createdAt: string;
};

const SAMPLE_ITEMS: InventoryItem[] = [
	{
		id: "item-pallet-jack",
		itemName: "Pallet jack",
		category: "Warehouse",
		description: "Manual pallet jack for the main loading bay.",
		quantity: "4",
		value: "320",
		createdAt: "2026-09-01T09:00:00.000Z",
	},
	{
		id: "item-barcode-scanner",
		itemName: "Barcode scanner",
		category: "Equipment",
		description: "Handheld scanner used on the packing line.",
		quantity: "12",
		value: "85",
		createdAt: "2026-09-04T11:30:00.000Z",
	},
	{
		id: "item-safety-vest",
		itemName: "High-visibility vest",
		category: "Safety",
		description: "Warehouse safety vest, one size.",
		quantity: "40",
		value: "12",
		createdAt: "2026-09-08T14:15:00.000Z",
	},
];

const ensureFile = () => {
	const folder = path.dirname(FILE);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, {recursive: true});
	}
	if (!fs.existsSync(FILE)) {
		fs.writeFileSync(FILE, JSON.stringify(SAMPLE_ITEMS, null, 2));
	}
};

export const getInventoryItems = (): InventoryItem[] => {
	ensureFile();
	try {
		return JSON.parse(fs.readFileSync(FILE, "utf8"));
	} catch {
		return SAMPLE_ITEMS;
	}
};

export const saveInventoryItems = (items: InventoryItem[]) => {
	ensureFile();
	fs.writeFileSync(FILE, JSON.stringify(items, null, 2));
};

export const addInventoryItem = (item: INewCreatedItem): InventoryItem => {
	const created: InventoryItem = {
		id: uuid(),
		itemName: item.itemName,
		category: item.category,
		description: item.description,
		quantity: String(item.quantity || "0"),
		value: String(item.value || "0"),
		createdAt: new Date().toISOString(),
	};
	const items = getInventoryItems();
	items.unshift(created);
	saveInventoryItems(items);
	return created;
};
