
type ColorClasses = {
  [key: string]: {
    text: string;
    bg: string;
    ring: string;
    dot?: string;
  };
};


export const provinceClasses: ColorClasses = {
  "Aurora": { text: "text-rose-500", bg: "bg-rose-50", ring: "ring-rose-500", dot: "bg-rose-500" },
  "Bataan": { text: "text-emerald-500", bg: "bg-emerald-50", ring: "ring-emerald-500", dot: "bg-emerald-500" },
  "Bulacan": { text: "text-blue-500", bg: "bg-sky-50", ring: "ring-sky-500", dot: "bg-sky-500" },
  "Nueva Ecija": { text: "text-indigo-500", bg: "bg-indigo-50", ring: "ring-indigo-500", dot: "bg-indigo-500" },
  "Pampanga": { text: "text-purple-500", bg: "bg-purple-50", ring: "ring-purple-500", dot: "bg-purple-500" },
  "Tarlac": { text: "text-yellow-500", bg: "bg-yellow-50", ring: "ring-yellow-500", dot: "bg-yellow-500" },
  "Zambales": { text: "text-orange-500", bg: "bg-orange-50", ring: "ring-orange-500", dot: "bg-orange-500" },
};

export const stockClasses: ColorClasses = {
  "vegetable": { text: "text-green-500", bg: "bg-green-500", ring: "ring-green-500"},
  "fruit": { text: "text-amber-500", bg: "bg-amber-500", ring: "ring-amber-500"},
}
export const statusClasses: ColorClasses = {
  "pending": { text: "text-amber-500", bg: "bg-amber-500", ring: "ring-amber-500"},
  "approved": { text: "text-green-500", bg: "bg-green-500", ring: "ring-green-500"},
  "active": { text: "text-green-500", bg: "bg-green-500", ring: "ring-green-500"},
  "declined": { text: "text-red-500", bg: "bg-red-500", ring: "ring-red-500"},
  "cancelled": { text: "text-rose-500", bg: "bg-rose-500", ring: "ring-rose-500"},
  "disabled": { text: "text-gray-500", bg: "bg-gray-500", ring: "ring-gray-500"},
}

