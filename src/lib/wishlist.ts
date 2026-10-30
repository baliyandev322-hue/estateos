/**
 * Persistent Client-Side Shortlist / Wishlist Manager
 * Syncs seamlessly across Property Cards, Property Detail Page,
 * and the Buyer Dashboard.
 */

const STORAGE_KEY = 'estateos_saved_properties';

export function getSavedProperties(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Error reading saved properties from localStorage:', e);
    return [];
  }
}

export function isPropertySaved(idOrSlug: string): boolean {
  if (typeof window === 'undefined') return false;
  const list = getSavedProperties();
  return list.some((item) => item.id === idOrSlug || item.slug === idOrSlug);
}

export function toggleSavedProperty(property: any): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getSavedProperties();
    const index = list.findIndex(
      (item) => item.id === property.id || item.slug === property.slug
    );

    let nextState = false;
    let updatedList: any[] = [];

    if (index >= 0) {
      // Remove
      updatedList = list.filter((_, i) => i !== index);
      nextState = false;
    } else {
      // Add simplified snapshot
      const snapshot = {
        id: property.id,
        slug: property.slug,
        title: property.title,
        price: property.price,
        city: property.city,
        localityName: property.localityName,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        carpetAreaSqFt: property.carpetAreaSqFt,
        propertyType: property.propertyType,
        listingType: property.listingType,
        truthScore: property.truthScore,
        isVerified: property.isVerified,
        images: property.images,
        savedAt: new Date().toISOString(),
      };
      updatedList = [snapshot, ...list];
      nextState = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    // Dispatch global custom event for reactive UI updates
    window.dispatchEvent(
      new CustomEvent('estateos_wishlist_updated', {
        detail: { propertyId: property.id, isSaved: nextState },
      })
    );

    return nextState;
  } catch (e) {
    console.warn('Error toggling saved property:', e);
    return false;
  }
}

export function removeSavedProperty(idOrSlug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedProperties();
    const updated = list.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('estateos_wishlist_updated', {
        detail: { propertyId: idOrSlug, isSaved: false },
      })
    );
  } catch (e) {
    console.warn('Error removing property from wishlist:', e);
  }
}
