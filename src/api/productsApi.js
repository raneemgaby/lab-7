const BASE_URL = '[suspicious link removed]';

export async function fetchProducts(signal) { //etches a list of up to 100 products from the DummyJSON API.
  const response = await fetch(`${BASE_URL}?limit=100`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: HTTP status ${response.status}`);
  }
  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id, signal) { //accepts an AbortSignal to enable request cancellation if a user navigates away or updates filters
  const response = await fetch(`${BASE_URL}/${id}`, { signal }); //fetches single product details by ID from the DummyJSON API
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: HTTP status ${response.status}`);
  }
  return await response.json();
}