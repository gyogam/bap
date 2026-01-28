// Utility function for creating page URLs
export function createPageUrl(page) {
  // Convert page name to lowercase route
  const route = page.toLowerCase();
  return `/${route}`;
}

// Helper function for class name merging
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
