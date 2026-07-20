export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ManageableContent {
  visible?: boolean;
  status?: ContentStatus | string;
  featured?: boolean;
  priority?: number;
  displayOrder?: number;
}

/**
 * Centralized content management rendering utility.
 * 
 * Responsibilities:
 * 1. Filter:
 *    - visible === true (visible !== false)
 *    - status === "PUBLISHED"
 * 2. Sort:
 *    - priority (descending)
 *    - displayOrder (ascending)
 * 3. Return renderable collection.
 */
export function getVisibleContent<T extends ManageableContent>(items: T[] | null | undefined): T[] {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => {
      if (!item) return false;
      const isVisible = item.visible !== false;
      const isPublished = item.status === undefined || item.status === 'PUBLISHED';
      return isVisible && isPublished;
    })
    .sort((a, b) => {
      const prioA = a.priority ?? 0;
      const prioB = b.priority ?? 0;
      if (prioA !== prioB) {
        return prioB - prioA; // Higher priority first
      }
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      return orderA - orderB; // Lower displayOrder first
    });
}
