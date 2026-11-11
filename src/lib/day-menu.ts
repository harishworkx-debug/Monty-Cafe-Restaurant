import { BAGELS } from "./site";

export type DayDietaryTag = "GF" | "GFO" | "V" | "VO" | "VG" | "VGO";

export interface DayMenuItem {
  name: string;
  price: string;
  tags?: DayDietaryTag[];
  description?: string;
}

export interface DayMenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  priceBadge?: string;
  note?: string;
  items: DayMenuItem[];
}

export interface ExtrasGroup {
  price: string;
  label: string;
  items: string[];
}

export interface GrabAndGoSection {
  id: "bagels" | "focaccias" | "toasties" | "burritos";
  title: string;
  shortTagline: string;
  description: string;
  items: DayMenuItem[];
  emptyNote?: string;
}

export const DAY_DIETARY_KEY: { code: DayDietaryTag; label: string }[] = [
  { code: "GF", label: "Gluten-Free" },
  { code: "GFO", label: "Gluten-Free Option" },
  { code: "V", label: "Vegetarian" },
  { code: "VO", label: "Vegetarian Option" },
  { code: "VG", label: "Vegan" },
  { code: "VGO", label: "Vegan Option" },
];

export const ALLERGY_NOTICE =
  "It is important that you inform us of any allergies. We do our best to accommodate dietary requirements.";

export const EXTRAS_GROUPS: ExtrasGroup[] = [
  {
    price: "$1.00",
    label: "Sauces & Relish",
    items: ["Aioli", "Spicy Mayo", "Tomato Relish"],
  },
  {
    price: "$2.00",
    label: "Extra Toast",
    items: ["Gluten-Free Toast", "Multi-Grain Toast", "Sourdough Toast"],
  },
  {
    price: "$3.00",
    label: "Sides & Eggs",
    items: [
      "Extra Poached Egg",
      "Spinach",
      "Hash Brown",
      "Roasted Tomato",
      "Spiced Beans",
      "Hollandaise Sauce",
    ],
  },
  {
    price: "$5.00",
    label: "Proteins",
    items: ["Bacon", "Chorizo", "Chicken", "Ham"],
  },
];

export const GRAB_AND_GO_SECTIONS: GrabAndGoSection[] = [
  {
    id: "bagels",
    title: "Bagels",
    shortTagline: "8 Fresh Counter Favourites",
    description:
      "Baked fresh and filled generously — savoury brekky bagels, gourmet chicken fillings and sweet finishes.",
    items: BAGELS.map((b) => ({
      name: b.name,
      price: `$${b.price.toFixed(2)}`,
      description: b.description,
    })),
  },
  {
    id: "focaccias",
    title: "Focaccias",
    shortTagline: "Toasted & Counter-Ready",
    description:
      "Crisp golden focaccias loaded with fresh fillings — enjoy seated with chips or ready from the counter.",
    items: [
      {
        name: "BLT Focaccia",
        tags: ["GFO"],
        price: "$19.50",
        description: "Bacon, cos lettuce, tomato and aioli, served with seasoned chips.",
      },
    ],
    emptyNote:
      "More daily Grab & Go counter focaccia varieties are available in-store and will be added once the counter board is finalised.",
  },
  {
    id: "toasties",
    title: "Toasties",
    shortTagline: "Hot Off the Grill",
    description:
      "Golden toasted sandwiches and melts — great for quick morning coffee pairings or easy lunches.",
    items: [
      {
        name: "Cheesy Toastie",
        tags: ["GFO"],
        price: "$7.90",
        description: "Thick white toasty with melted tasty cheese.",
      },
      {
        name: "Choice of Toast",
        price: "$7.90",
        description: "Choice of bread with butter, Vegemite, strawberry jam or peanut butter.",
      },
    ],
    emptyNote:
      "Additional Grab & Go toastie combinations from our cabinet are available at the counter — full list coming soon.",
  },
  {
    id: "burritos",
    title: "Burritos",
    shortTagline: "Rolled Fresh Daily",
    description:
      "Hearty handheld burritos made fresh at Monty Cafe — ask our counter team or message us on WhatsApp for today's flavours.",
    items: [],
    emptyNote:
      "Our full Grab & Go burrito flavours and pricing are prepared fresh daily at the counter and will be published here next.",
  },
];

export const DAY_FOOD_CATEGORIES: DayMenuCategory[] = [
  {
    id: "breakfast",
    title: "All-Day Breakfast",
    priceBadge: "Served All Day",
    subtitle: "Morning classics, poached egg plates and generous brekky platters",
    items: [
      {
        name: "Choice of Toast",
        price: "$7.90",
        description: "Choice of bread with butter, Vegemite, strawberry jam or peanut butter.",
      },
      {
        name: "Eggs in a Hurry",
        tags: ["V", "GFO"],
        price: "$13.00",
        description: "Poached, fried or scrambled eggs served with toasted sourdough.",
      },
      {
        name: "Bite-Sized Bruschetta",
        tags: ["V"],
        price: "$13.50",
        description: "Tomatoes, red onion and pesto on toasted sourdough.",
      },
      {
        name: "Brekky Burger",
        tags: ["GFO"],
        price: "$15.00",
        description:
          "Brioche bun, bacon, egg, avocado, spinach, tasty cheese, tomato relish & hash brown.",
      },
      {
        name: "Buttermilk Pancakes",
        tags: ["V"],
        price: "From $16.90",
        description:
          "With seasonal fruits & vanilla ice cream — Maple Syrup $16.90 · Nutella $18.90 · Berry Compote $19.90.",
      },
      {
        name: "Chilli Eggs Fusion",
        tags: ["V", "GFO"],
        price: "$20.50",
        description:
          "Scrambled eggs, sambal, spinach, feta and fried shallots on toasted sourdough.",
      },
      {
        name: "Omelette",
        price: "$20.50",
        description:
          "Selection of 4 fillings (1 meat & 3 veg): smoked ham, bacon, cheese, tomato, mushrooms, onion, spinach, roasted red capsicum, Kalamata olives, feta & semi-dried tomatoes with toasted sourdough.",
      },
      {
        name: "French Toast",
        tags: ["V", "GFO"],
        price: "$20.50",
        description: "Banana, maple syrup, icing sugar and vanilla ice cream.",
      },
      {
        name: "Avocado Crush",
        tags: ["V", "VGO", "GFO"],
        price: "$20.50",
        description:
          "Avocado, sunflower seeds, sourdough bread, cherry tomatoes, feta, beetroot hummus and poached egg. (Add Extra Poached Egg $3.00)",
      },
      {
        name: "Corn Fritters",
        tags: ["V"],
        price: "$20.90",
        description:
          "Corn fritters served with creamy avocado, vibrant beetroot hummus & poached egg. (Add Extra Poached Egg $3.00)",
      },
      {
        name: "Eggs Benedict",
        tags: ["GFO"],
        price: "$21.50",
        description: "Poached eggs, smoked ham or bacon and hollandaise on toasted sourdough.",
      },
      {
        name: "Pork Benedict",
        tags: ["GFO"],
        price: "$22.90",
        description:
          "Slow-cooked smokey BBQ pork, spinach, poached eggs, hollandaise, fried shallots and julienne green apple on toasted sourdough.",
      },
      {
        name: "Veggie Tower Plate",
        tags: ["V", "GFO"],
        price: "$25.90",
        description:
          "Poached eggs, mushrooms, onion, tomato, spinach, beans, hash brown and avocado on toasted sourdough.",
      },
      {
        name: "Pig Out Platter",
        tags: ["GFO"],
        price: "$28.90",
        description:
          "Poached eggs, bacon, chorizo, onion, spinach, tomato, mushrooms and hash brown on toasted sourdough.",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    subtitle: "Gourmet sandwiches, schnitzels, parmas, curries and shareable bowls",
    items: [
      {
        name: "BLT Focaccia",
        tags: ["GFO"],
        price: "$19.50",
        description: "Bacon, cos lettuce, tomato, aioli and seasoned chips.",
      },
      {
        name: "Butter Chicken with Rice & Flat Bread",
        price: "$20.50",
        description: "Rich butter chicken served with rice and warm flat bread.",
      },
      {
        name: "Fish & Chips",
        price: "$20.90",
        description: "Three flathead fillets served with coleslaw & chips.",
      },
      {
        name: "Club Sandwich",
        tags: ["GFO"],
        price: "$22.50",
        description:
          "Triple-layered roasted chicken, bacon, fried egg, mixed lettuce, tomato and aioli on white bread, served with chips.",
      },
      {
        name: "Chicken Schnitzel",
        price: "$22.50",
        description: "Crumbed chicken served with coleslaw & chips.",
      },
      {
        name: "Steak Sandwich",
        tags: ["GFO"],
        price: "$23.90",
        description:
          "Rosemary & garlic marinated scotch fillet, bacon, tasty cheese, tomato, spinach, onion and tomato relish on Turkish bread with seasoned chips.",
      },
      {
        name: "Chicken Parma",
        price: "$24.50",
        description:
          "Crumbed chicken breast topped with Napoli, ham, mozzarella & parmesan, served with coleslaw and chips.",
      },
      {
        name: "Bowl of Chips",
        price: "Full $12.00 / Half $6.00",
        description: "Lightly seasoned crispy chips served with tomato sauce.",
      },
      {
        name: "Bowl of Wedges",
        price: "$12.90",
        description: "Served with sour cream & sweet chilli sauce.",
      },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    subtitle: "Handcrafted gourmet burgers served with hot crispy chips",
    items: [
      {
        name: "Classic Beef Burger",
        tags: ["GFO"],
        price: "$21.00",
        description:
          "Beef pattie, cos lettuce, tomato, cheese, pickle & tomato sauce served with chips.",
      },
      {
        name: "Veggie Burger",
        tags: ["V"],
        price: "$21.00",
        description:
          "Veg pattie, mixed salad, beetroot, tomato, onion, cheese & tomato relish served with chips.",
      },
      {
        name: "Fried Chicken Burger",
        price: "$21.50",
        description:
          "Fried chicken, bacon, tomato, tasty cheese, cos lettuce, dill pickles, smokey BBQ sauce & aioli on brioche, served with chips.",
      },
      {
        name: "Grilled Beef & Bacon",
        tags: ["GFO"],
        price: "$22.50",
        description:
          "Beef pattie, bacon, cheese, smokey BBQ sauce, cos lettuce, tomato & aioli on brioche, served with chips.",
      },
      {
        name: "The Lot",
        price: "$23.00",
        description:
          "Beef pattie, bacon, egg, beetroot, cos lettuce, tomato, cheese & BBQ sauce served with chips.",
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    priceBadge: "GF Penne Available",
    subtitle: "Hearty Italian-inspired classics made to order",
    note: "All gluten-free pasta is available in penne.",
    items: [
      {
        name: "Fettuccine Carbonara",
        tags: ["GFO"],
        price: "$20.50",
        description: "Bacon, spring onion, cream, parmesan & parsley.",
      },
      {
        name: "Spaghetti Bolognese",
        tags: ["GFO"],
        price: "$20.50",
        description: "Traditional Bolognese, Napoli sauce & parmesan.",
      },
      {
        name: "Chicken Mushroom",
        tags: ["GFO"],
        price: "$21.50",
        description:
          "Chicken and mushroom tossed in a creamy garlic sauce and parmesan cheese with fettuccine pasta.",
      },
      {
        name: "Pumpkin Spinach Gnocchi",
        tags: ["V"],
        price: "$22.50",
        description:
          "Pumpkin and spinach gnocchi delicately cooked in a rich and creamy sauce, offering a comforting blend of flavours and a velvety texture.",
      },
      {
        name: "Chicken Pesto Gnocchi",
        price: "$22.50",
        description:
          "Soft potato gnocchi tossed with chicken in a rich basil pesto cream sauce with parmesan cheese.",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    subtitle: "Light, vibrant bowls tossed with fresh house dressings",
    items: [
      {
        name: "Classic Greek Salad",
        tags: ["V"],
        price: "$18.50",
        description:
          "Cucumber, cherry tomatoes, olives, feta cheese and cos lettuce with Greek salad dressing.",
      },
      {
        name: "Classic Caesar Salad",
        price: "$18.90",
        description:
          "Bacon, parmesan, croutons & cos lettuce with Caesar dressing and poached egg. (Add Grilled Chicken Tenderloins $5.00)",
      },
      {
        name: "Grilled Chicken Salad",
        price: "$20.50",
        description:
          "Grilled chicken tenderloins, red onion, avocado, mixed lettuce, cucumber & cherry tomatoes with house-made mint dressing.",
      },
    ],
  },
  {
    id: "kids",
    title: "Kids Menu",
    subtitle: "Tasty kid-sized favourites made for young appetites",
    items: [
      {
        name: "Cheesy Toastie",
        tags: ["GFO"],
        price: "$7.90",
        description: "Thick white toasty with tasty cheese.",
      },
      {
        name: "Brekky Burger",
        tags: ["GFO"],
        price: "$10.50",
        description: "Brioche bun, fried egg and bacon served with chips.",
      },
      {
        name: "Kids Brekky",
        price: "$11.50",
        description: "Choice of scrambled, fried or poached eggs with bacon served on white bread.",
      },
      {
        name: "Pancakes Stack",
        tags: ["V"],
        price: "$11.50",
        description: "Double stack pancakes with maple syrup, icing sugar & vanilla ice cream.",
      },
      {
        name: "Chicken Nuggets",
        price: "$12.00",
        description: "Chicken nuggets served with chips.",
      },
      {
        name: "Chicken Burger with Chips",
        price: "$12.90",
        description: "Chicken pattie, tasty cheese, lettuce & tomato sauce served with chips.",
      },
      {
        name: "Kids Beef Burger",
        price: "$13.90",
        description: "Beef pattie, cheese, mix lettuce & tomato sauce served with chips.",
      },
      {
        name: "Chicken Parma & Chips",
        price: "$14.90",
        description: "Crumbed chicken breast, Napoli, mozzarella, chips & tomato sauce.",
      },
      {
        name: "Fish & Chips",
        price: "$14.90",
        description: "Two flathead fillets served with crispy chips & tomato sauce.",
      },
      {
        name: "Kids Spaghetti Bolognese",
        price: "$14.90",
        description: "Traditional mild Bolognese with parmesan for kids.",
      },
    ],
  },
];

export const BARISTA_COFFEE = {
  regularCoffees: [
    "Long Black",
    "Hot Choc",
    "Matcha / Turmeric Latte",
    "Chai Latte",
    "Cappuccino",
    "Latte",
    "Flat White",
    "Loose Sticky Chai",
  ],
  regularPrices: {
    small: "$4.90",
    mediumMug: "$5.70",
    large: "$6.50",
  },
  shortCoffees: [
    { name: "Macchiato", price: "$5.00" },
    { name: "Piccolo", price: "$5.00" },
    { name: "Magic", price: "$5.00" },
  ],
  milkAlternatives: ["Soy", "Almond", "Coconut", "Oat", "Lactose Free"],
  milkPrices: {
    small: "+$0.50",
    mediumMug: "+$0.70",
    large: "+$0.90",
  },
  extraShotAndSyrups: {
    price: "+$0.60",
    options: ["Extra Shot", "Caramel", "Vanilla", "Hazelnut", "Honey"],
  },
} as const;

export const COLD_DRINKS_AND_TEA = {
  icedDrinks: {
    title: "Iced Drinks",
    priceLabel: "From $7.20",
    items: [
      { name: "Iced Long Black", price: "$7.20" },
      { name: "Iced Latte", price: "Ask at counter" },
      { name: "Iced Mocha", price: "Ask at counter" },
      { name: "Iced Coffee", price: "Ask at counter" },
      { name: "Iced Chai", price: "Ask at counter" },
    ],
  },
  milkshakes: {
    title: "Milk Shakes / Thick Shakes",
    priceLabel: "$6.99 / $8.50",
    flavours: ["Chocolate", "Strawberry", "Mango", "Vanilla", "Caramel", "Blue Heaven", "Coffee"],
  },
  smoothies: {
    title: "Smoothies",
    priceLabel: "$8.90 – $9.90",
    flavours: ["Mango", "Mix Berries", "Banana", "Green"],
  },
  herbTea: {
    title: "Herb Tea",
    priceLabel: "$5.00",
    varieties: ["English Breakfast", "Peppermint", "Chamomile", "Green", "Malabar", "Earl Grey"],
  },
  bottledAndCans: [
    { name: "Can Soft Drinks", price: "$3.50" },
    { name: "Water", price: "$3.00" },
    { name: "Glass Bottle Drinks", price: "$4.50" },
  ],
} as const;
