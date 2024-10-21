import { z } from 'zod';

// Common schema for stock level items
const StockLevelItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().gt(0, { message: "Quantity must be greater than 0." }),
  price: z.number().gt(0, { message: "Price must be greater than 0." }),
  type: z.string(),
});

const StockLevelSchema = z.object({
  _id: z.string().optional(),
  stockLevelNotes: z.string().optional(),
  stockLevelDate: z.date({ message: "Please enter a valid date." }),
  stockLevelVegetables: z.array(StockLevelItemSchema),
  stockLevelFruits: z.array(StockLevelItemSchema),
}).refine(data => data.stockLevelVegetables.length > 0 || data.stockLevelFruits.length > 0, {
  message: "At least one item must be present in either stockLevelVegtables or stockLevelFruits.",
  path: ["stockLevelVegtables", "stockLevelFruits"],
});

export { StockLevelItemSchema, StockLevelSchema };