import { Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Barn",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    cuisine: "American · Burgers",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    menu: [
      {
        id: "m1",
        name: "Classic Cheeseburger",
        description: "Beef patty, cheddar, lettuce, tomato, house sauce",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
        category: "Burgers",
      },
      {
        id: "m2",
        name: "Crispy Fries",
        description: "Golden fries with sea salt",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300",
        category: "Sides",
      },
    ],
  },
  {
    id: "2",
    name: "Sushi Spot",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    cuisine: "Japanese · Sushi",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    menu: [
      {
        id: "m3",
        name: "Salmon Roll",
        description: "Fresh salmon, avocado, cucumber",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300",
        category: "Rolls",
      },
      {
        id: "m4",
        name: "Miso Soup",
        description: "Traditional soybean soup",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1606491956689-19cbb35e0b80?w=300",
        category: "Soup",
      },
    ],
  },
  {
    id: "3",
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    cuisine: "Italian · Pizza",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: 0,
    menu: [
      {
        id: "m5",
        name: "Margherita Pizza",
        description: "Tomato, mozzarella, fresh basil",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
        category: "Pizza",
      },
    ],
  },
];
