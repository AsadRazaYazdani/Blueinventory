import type {NextApiRequest, NextApiResponse} from "next";
import {addInventoryItem, getInventoryItems} from "@/lib/inventory/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return res.status(200).json({items: getInventoryItems()});
	}

	if (req.method === "POST") {
		const itemName = String(req.body?.itemName || "").trim();
		if (!itemName) {
			return res.status(400).json({error: "Item name is required"});
		}

		const item = addInventoryItem({
			itemName,
			category: String(req.body?.category || "General"),
			description: String(req.body?.description || ""),
			quantity: String(req.body?.quantity || "0"),
			value: String(req.body?.value || "0"),
		});

		return res.status(201).json({item, items: getInventoryItems()});
	}

	res.setHeader("Allow", "GET, POST");
	return res.status(405).json({error: "Method not allowed"});
}
