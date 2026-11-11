export type DietaryTag = "GF" | "NF" | "Veg" | "VG" | "V" | "NFO" | "VGO";

export interface IndianMenuItem {
  name: string;
  price: string;
  tags?: DietaryTag[];
  description?: string;
}

export interface IndianMenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  priceBadge?: string;
  items: IndianMenuItem[];
}

export const DIETARY_KEY: { code: DietaryTag; label: string }[] = [
  { code: "GF", label: "Gluten-Free" },
  { code: "NF", label: "Nut-Free" },
  { code: "Veg", label: "Vegetarian" },
  { code: "VG", label: "Vegan / Vegetarian" },
  { code: "V", label: "Vegan" },
  { code: "NFO", label: "Nut-Free Option" },
  { code: "VGO", label: "Vegan Option Available" },
];

export const INDIAN_MENU_CATEGORIES: IndianMenuCategory[] = [
  {
    id: "veg-starters",
    title: "Veg Starters",
    subtitle: "Crisp street-food favourites and spiced bites to begin your evening",
    items: [
      {
        name: "Samosas",
        tags: ["VG"],
        price: "$9.90",
        description:
          "Mashed potato and vegetables in pastry, served with mint-coriander chutney and tamarind chutney.",
      },
      {
        name: "Samosas Chaat",
        price: "$12.90",
        description:
          "Crispy vegetable samosas topped with raita, onions, chickpeas, chutneys and fresh coriander.",
      },
      {
        name: "Onion Bhaji",
        tags: ["GF", "VG"],
        price: "$11.00",
        description:
          "Thinly sliced onions with chickpea flour and herbs and spices, golden-fried. Served with mint chutney.",
      },
      {
        name: "Tikki Chaat",
        price: "$12.90",
        description:
          "Mashed potato patties topped with raita, chickpeas, onions, mint-coriander and tamarind chutneys.",
      },
      {
        name: "Aloo Tikki",
        tags: ["VG"],
        price: "$12.00",
        description:
          "Mashed potato patties cooked with chickpea flour and Indian spices, served with mint-coriander and tamarind chutneys.",
      },
      {
        name: "Dahi Puri",
        tags: ["Veg"],
        price: "$14.50",
        description: "Crisp puris filled with potatoes, yogurt, tamarind chutney and mint chutney.",
      },
      {
        name: "Gobi 65",
        tags: ["Veg", "GF", "NF"],
        price: "$17.50",
        description:
          "Batter-fried cauliflower tossed with fresh curry leaves, spices and homemade 65 sauce.",
      },
      {
        name: "Paneer 65",
        tags: ["Veg", "GF", "NF"],
        price: "$17.50",
        description:
          "Batter-fried cottage cheese tossed with fresh curry leaves, spices and homemade 65 sauce.",
      },
      {
        name: "Honey Chilli Cauliflower",
        tags: ["GF", "Veg"],
        price: "$19.50",
        description: "Crispy cauliflower tossed in honey, chilli and light spices.",
      },
    ],
  },
  {
    id: "non-veg-starters",
    title: "Non-Veg Starters",
    subtitle: "Charred tandoori classics and wok-tossed favourites",
    items: [
      {
        name: "Malai Chicken Tikka",
        tags: ["GF"],
        price: "$19.90",
        description: "Tandoori chicken marinated in cream, butter and mild spices.",
      },
      {
        name: "Chicken Tikka",
        tags: ["GF"],
        price: "$19.50",
        description:
          "Chicken marinated in a blend of yoghurt, select herbs and spices, cooked in the tandoor.",
      },
      {
        name: "Chilli Chicken",
        tags: ["GF"],
        price: "$20.50",
        description: "Chef's special chilli sauce tossed with fresh capsicum, onion and coriander.",
      },
      {
        name: "Chicken 65",
        tags: ["GF", "NF"],
        price: "$17.50",
        description:
          "Batter-fried chicken tossed with fresh curry leaves, spices, and homemade 65 sauce.",
      },
      {
        name: "Lamb Chops",
        tags: ["GF"],
        price: "$24.90",
        description: "Lamb cutlets marinated in tandoori spices and cooked in the tandoor.",
      },
    ],
  },
  {
    id: "chicken-mains",
    title: "Chicken Mains",
    priceBadge: "All Mains $21",
    subtitle: "Slow-simmered traditional curries cooked fresh to order",
    items: [
      {
        name: "Butter Chicken",
        tags: ["GF"],
        price: "$21",
        description:
          "A comforting favourite tandoori chicken in a rich tomato and cream sauce with cashews.",
      },
      {
        name: "Chicken Vindaloo",
        tags: ["GF"],
        price: "$21",
        description: "Chicken cooked in Goan-style curry, infused with vinegar, garlic and spices.",
      },
      {
        name: "Chicken Rogan Josh",
        tags: ["GF"],
        price: "$21",
        description:
          "Traditional Kashmiri curry cooked with fresh herbs, tomatoes and aromatic spices.",
      },
      {
        name: "Chicken Tikka Masala",
        tags: ["GF"],
        price: "$21",
        description:
          "Smoky tandoori chicken cooked in a creamy onion-tomato sauce with capsicum and onion.",
      },
      {
        name: "Chicken Saag",
        tags: ["GF"],
        price: "$21",
        description:
          "Chicken pieces cooked in mustard leaves and a house blend of spiced herbs and green chilli.",
      },
      {
        name: "Kadai Chicken",
        tags: ["GF"],
        price: "$21",
        description:
          "Chicken fillets cooked in a tomato-based gravy with onions, capsicum, tomatoes and fragrant spices.",
      },
      {
        name: "Chicken Korma",
        tags: ["GF"],
        price: "$21",
        description:
          "Mughlai-style chicken slow-cooked in a rich onion-based gravy with cashews and cream.",
      },
      {
        name: "Indian Home-Style Chicken Curry",
        tags: ["GF"],
        price: "$21",
        description:
          "Tender chicken slow-cooked with onion, tomato, fresh herbs and traditional spices.",
      },
      {
        name: "Chicken Madras",
        price: "Special Menu",
        description:
          "A South Indian-style chicken curry. Price and full description to be confirmed from the special menu.",
      },
    ],
  },
  {
    id: "beef-mains",
    title: "Beef Mains",
    priceBadge: "All Mains $21",
    subtitle: "Tender slow-cooked beef in rich regional sauces",
    items: [
      {
        name: "Beef Rogan Josh",
        tags: ["GF"],
        price: "$21",
        description:
          "A traditional Kashmiri curry cooked with fresh herbs, tomatoes and aromatic spices.",
      },
      {
        name: "Beef Vindaloo",
        tags: ["GF"],
        price: "$21",
        description:
          "Tender beef slow-cooked in Goan-style curry infused with vinegar, garlic and spices.",
      },
      {
        name: "Beef Korma",
        tags: ["GF"],
        price: "$21",
        description: "Tender beef pieces simmered in a Mughlai-style sauce with cashews and cream.",
      },
      {
        name: "Beef Saag",
        tags: ["GF"],
        price: "$21",
        description:
          "Tender beef pieces cooked with mustard leaves and our house blend of herbs and spices.",
      },
      {
        name: "Beef Madras",
        price: "$21",
        description: "A South Indian-style beef curry.",
      },
    ],
  },
  {
    id: "lamb-mains",
    title: "Lamb Mains",
    priceBadge: "All Mains $21",
    subtitle: "Aromatic lamb curries infused with whole spices",
    items: [
      {
        name: "Lamb Rogan Josh",
        tags: ["GF"],
        price: "$21",
        description:
          "Traditional Kashmiri lamb curry cooked with fresh herbs, tomatoes and aromatic spices.",
      },
      {
        name: "Lamb Vindaloo",
        tags: ["GF"],
        price: "$21",
        description:
          "Tender lamb slow-cooked in Goan-style curry infused with vinegar, garlic and spices.",
      },
      {
        name: "Lamb Korma",
        tags: ["GF"],
        price: "$21",
        description: "Tender lamb pieces simmered in a Mughlai-style sauce with cashews and cream.",
      },
      {
        name: "Lamb Saag",
        tags: ["GF"],
        price: "$21",
        description:
          "Tender lamb pieces cooked with mustard leaves and our house blend of herbs and spices.",
      },
      {
        name: "Lamb Madras",
        price: "$21",
        description: "Lamb pieces cooked in traditional South Indian curry with coconut cream.",
      },
    ],
  },
  {
    id: "vegetarian-mains",
    title: "Vegetarian Mains",
    priceBadge: "All Mains $21",
    subtitle: "Comforting paneer, lentil and kofta classics",
    items: [
      {
        name: "Shahi Paneer",
        tags: ["GF"],
        price: "$21",
        description:
          "Cubes of paneer cheese cooked in a rich, mildly spiced creamy tomato and cashew gravy.",
      },
      {
        name: "Daal Makhani",
        tags: ["GF", "VGO"],
        price: "$21",
        description: "Slow-cooked black lentils simmered with tomatoes, butter and cream.",
      },
      {
        name: "Daal Tadka",
        tags: ["GF", "V", "VGO"],
        price: "$21",
        description: "Yellow lentils cooked until soft and finished with garlic and coriander.",
      },
      {
        name: "Kadai Paneer",
        tags: ["GF"],
        price: "$21",
        description: "Cubes of paneer cheese cooked in a tomato-based onion and capsicum gravy.",
      },
      {
        name: "Palak Paneer",
        tags: ["VGO"],
        price: "$21",
        description:
          "Cubes of paneer cheese cooked with onions, ginger and garlic in a homemade spinach purée.",
      },
      {
        name: "Malai Kofta",
        tags: ["Veg", "GF", "NFO"],
        price: "$21",
        description: "Cottage cheese and potato dumplings cooked in a rich, creamy Indian gravy.",
      },
      {
        name: "Palak Kofta",
        tags: ["Veg", "GF", "NFO"],
        price: "$21",
        description: "Soft kofta dumplings served in a flavourful spinach-based Indian gravy.",
      },
    ],
  },
  {
    id: "biryani-specials",
    title: "Biryani Specials",
    subtitle:
      "Special Dinner Menu — fragrant basmati rice layered and served with raita & red onion",
    items: [
      {
        name: "Gobi 65 Biryani",
        tags: ["Veg", "GF", "NFO"],
        price: "$21.00",
        description:
          "Crispy fried cauliflower tossed in chef's special 65 sauce, served with basmati rice, raita and red onion.",
      },
      {
        name: "Paneer 65 Biryani",
        tags: ["Veg", "GF", "NFO"],
        price: "$21.00",
        description:
          "Batter-fried paneer tossed in chef's special 65 sauce, served with basmati rice, raita and red onion.",
      },
      {
        name: "Chicken 65 Biryani",
        tags: ["GF", "NFO"],
        price: "$21.50",
        description:
          "Batter-fried chicken tossed in chef's special 65 sauce, served with basmati rice, raita and red onion.",
      },
      {
        name: "Chicken Biryani",
        tags: ["GF"],
        price: "$22.50",
        description:
          "Saffron basmati rice layered with chicken, sealed and dum-cooked; served with raita and red onions.",
      },
      {
        name: "Lamb Biryani",
        tags: ["GF"],
        price: "$23.00",
        description:
          "Slow-cooked lamb layered through aromatic basmati rice; served with raita and red onions.",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Sweet finishes crafted with traditional flavours",
    items: [
      {
        name: "Mango Kulfi",
        price: "$8",
        description: "Creamy mango kulfi with a rich, tropical mango flavour.",
      },
      {
        name: "Pista Kulfi",
        price: "$8",
        description: "Traditional kulfi infused with pistachio and delicate cardamom.",
      },
      {
        name: "Carrot Pudding",
        price: "$9",
        description: "Slow-cooked carrot pudding with milk, ghee and warming spices.",
      },
      {
        name: "Rice Pudding",
        price: "$9",
        description: "Silky rice pudding gently simmered with milk and a hint of cardamom.",
      },
      {
        name: "Gulab Jamun",
        price: "$6.50",
        description: "Soft, melt-in-the-mouth dumplings in a fragrant sugar syrup.",
      },
    ],
  },
];

export const RICE_OPTIONS: IndianMenuItem[] = [
  { name: "Plain Rice", price: "$7.50" },
  { name: "Jeera Rice", price: "$7.90" },
  { name: "Saffron Rice", price: "$8.50" },
  { name: "Coconut & Lemon Rice", price: "$8.90" },
  { name: "Corn and Coriander Rice", price: "$8.00" },
  { name: "Pea and Onion Rice", price: "$8.00" },
];

export const BREAD_OPTIONS: IndianMenuItem[] = [
  { name: "Roti", price: "$3.50" },
  { name: "Butter Naan", price: "$4.00" },
  { name: "Garlic Naan", price: "$4.50" },
  { name: "Chilli Garlic Naan", price: "$5.50" },
  { name: "Cheese Naan", price: "$6.90" },
  { name: "Chicken Naan", price: "$7.50" },
  { name: "Chicken & Cheese Naan", price: "$7.50" },
  { name: "Nutella Naan", price: "$8.00" },
];
