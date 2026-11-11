## File organization:first implemented the api folder files (prodcutsApi.js & autApi.js) since These files establish the core network and authentication methods,then the components files such as (ProductCard.jsx & NavBar.jsx & Layout.jsx & ProtectedRoute.jsx) ,then page folder files which are (Home.jsx & ProductList.jsx & ProductDetail.jsx & Cart.jsx & Login.jsx & NotFound.jsx) ,eventually implemented App.jsx and main.jsx because with all pages and layout components fully created, wires up client-side navigation using React Router v6 inside,defining public routes,nested layouts,and guards.mounts to the DOM.
## Challenges getting used to useContext sintax and how to use ReactRouter to handle client-side routing and turn a single-view app into a multi-page structure,and to resolve the dependencies between the files spread across different folders.
## Reasoning Questions Answers:
Q1: Where does each piece of state live, and why?
User Sign-In (): Lives in React Context because logging in or out happens rarely, and almost every page or navigation bar needs to know if a user is signed in.AuthContext
Shopping Cart (): Lives in a Zustand store because adding items or changing quantities happens all the time. Putting it in Context would force the whole layout to re-render every time someone clicks "Add to Cart".cartStore
Filter Values (): Lives right in the browser URL bar using URL Query StringuseSearchParams. This lets users bookmark, copy/paste, or refresh the page without losing their search text or category filter.
Product List (: Lives inside  local state because catalogue data is only needed when viewing that specific page.useFetch / local state)ProductList
Theme (): Lives in top-level layout state synced with  so light/dark mode choices stay saved even after closing the browser.useLocalStoragelocalStorage
Q2: Why put user login in Context and the cart in Zustand? What if we swapped them?
Logging in happens once per session, so having Context re-render the app on login is fine. But cart updates happen constantly. If the cart was in Context, every single item quantity change would force the entire navigation bar and page layout to re-render. Swapping them would make the cart slow and laggy, while putting authentication in Zustand adds unnecessary setup for a simple login status.
Q3: Does  share state data between components?useFetch
No!  shares the logic (like tracking loading spinners, error messages, and canceling requests), but not the actual datauseFetch. Every time a component calls , it gets its own private, isolated state.useFetch
Q4: What data type is  from ?iduseParams()
It is always a string! Even if the URL looks like ,  will be  (string), not /products/5id"5"5 (number). You have to be careful when matching item IDs (like ) or converting strings to numbers.id === product.id
Q5: Is client-side route protection () actually secure?ProtectedRoute
No! Client-side protection is just a UI convenience so regular users don't wander onto private pages. Anyone who opens browser developer tools can inspect or bypass it. Real security has to happen on the backend server by validating security tokens before sending sensitive data.
Q6: Why does refreshing  work on Vite but break on a standard web server?/products/3
On a basic static file server (like Apache or Nginx), the server looks for an actual file named /products/3.html. When it can't find that file, it returns a 404 Not Found error. The Vite dev server intercepts requests and redirects them back to index.html so React Router can handle the path inside the browser.
## Self-Study:
1.Keeping Search & Category Filters in the URL at the Same Time
What I figured out: Using  directly can accidentally wipe out your search bar text when you pick a category from the dropdown menu.setSearchParams
How I solved it: I researched how to clone active URL parameters using new URLSearchParams(searchParams) before updating key-value pairs, so both search queries and category filters stay intact together in the URL bar.
2.Safely Reading from localStorage Without Crashing
What I figured out: Reading directly from localStorage on initial page load can crash the application if stored data is corrupted or if the browser blocks storage access.
How I solved it: I wrapped localStorage.getItem inside  blocks and used a lazy state initializer in try...catchuseLocalStorage so the application falls back safely to default values if something goes wrong.
3.Saving Zustand Cart Items to localStorage in the Background
What I figured out: Putting  save functions inside component localStorageuseEffect hooks for a global cart felt messy and created unnecessary re-renders.
How I solved it: I learned about Zustand’s built-in subscribe() API, which lets you automatically listen for cart changes and save them to localStorage in the background outside of the React component lifecycle. 