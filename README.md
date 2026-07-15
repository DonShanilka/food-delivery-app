# Food Delivery App

React Native (Expo) + TypeScript + NativeWind (Tailwind CSS for React Native).

## Features
- Home: browse/search restaurants
- Restaurant detail: view menu, add items to cart
- Cart: adjust quantities, view subtotal
- Checkout: address, payment method, order summary, place order
- Orders: track order status (preparing / on the way / delivered)
- Profile: account menu

## Tech Stack
- Expo (React Native 0.74)
- TypeScript
- NativeWind v2 (Tailwind utility classes via `className`)
- React Navigation (bottom tabs + native stack)
- React Context for cart/order state (swap for Redux/Zustand or a backend API later)

## Getting Started

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app on your phone.

## Project Structure
```
App.tsx                     # entry point, providers, nav container
global.css                  # tailwind directives
tailwind.config.js          # design tokens (primary/secondary colors etc.)
src/
  components/                # RestaurantCard, MenuItemRow
  context/CartContext.tsx    # cart + orders global state
  data/restaurants.ts        # mock data (replace with API calls)
  navigation/                # MainTabs (bottom tabs), RootNavigator (stack)
  screens/                   # Home, Restaurant, Cart, Checkout, Orders, Profile
  types/index.ts              # shared TS types
```

## Next Steps / Suggestions
- Replace `src/data/restaurants.ts` with real API calls (e.g. React Query)
- Add authentication (login/signup screens)
- Persist cart with AsyncStorage so it survives app restarts
- Add real-time order tracking (websockets or polling) + a map view
- Add restaurant search filters (cuisine, rating, price)
- Hook up real payment provider (Stripe, etc.) on Checkout
