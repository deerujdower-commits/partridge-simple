import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EnquiryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  image: string;
  description?: string;
  size?: string;
  color?: string;
  hireDate?: Date;
}

interface EnquiryContextType {
  items: EnquiryItem[];
  addItem: (item: Omit<EnquiryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearEnquiry: () => void;
  getTotalItems: () => number;
  getSuggestedItems: () => { name: string; reason: string; image: string }[];
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};

interface EnquiryProviderProps {
  children: ReactNode;
}

export const EnquiryProvider: React.FC<EnquiryProviderProps> = ({ children }) => {
  // Use localStorage to persist items
  const [items, setItems] = useState<EnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('enquiry-items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('enquiry-items', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<EnquiryItem, 'id'>) => {
    const id = Date.now().toString();
    const existingItem = items.find(
      item => item.name === newItem.name && 
              item.category === newItem.category &&
              item.size === newItem.size &&
              item.color === newItem.color
    );

    console.log('Adding item to enquiry:', newItem);
    console.log('Current items before adding:', items);

    if (existingItem) {
      console.log('Found existing item, updating quantity');
      updateQuantity(existingItem.id, existingItem.quantity + newItem.quantity);
    } else {
      console.log('Adding new item with id:', id);
      setItems(prev => {
        const newItems = [...prev, { ...newItem, id }];
        console.log('New items array:', newItems);
        return newItems;
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearEnquiry = () => {
    setItems([]);
    localStorage.removeItem('enquiry-items');
  };

  const getTotalItems = () => {
    return items.length;
  };

  const getSuggestedItems = () => {
    const suggestions: { name: string; reason: string; image: string; color?: string }[] = [];
    const itemNames = items.map(item => item.name.toLowerCase());

    // Helper to get color from items
    const hasWhite = items.some(item => item.color?.toLowerCase().includes('white'));
    const hasBlack = items.some(item => item.color?.toLowerCase().includes('black'));
    const hasIvory = items.some(item => item.color?.toLowerCase().includes('ivory'));
    const hasGold = items.some(item => item.color?.toLowerCase().includes('gold'));
    const hasSilver = items.some(item => item.color?.toLowerCase().includes('silver'));

    // Napkin images from collection page (using src/assets paths)
    const napkinImages = {
      white: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-white-napkins.jpg',
      black: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-black-napkins.jpg',
      ivory: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-ivory-napkins.jpg'
    };

    // Round tablecloth images from collection page
    const roundTableclothImages = {
      white: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-white-round-tablecloth.jpg',
      black: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-black-round-tablecloth.jpg',
      ivory: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-ivory-round-tablecloth.jpg'
    };

    // Damask images from collection page
    const damaskImages = {
      white: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-white-damask.jpg',
      gold: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-gold-damask.jpg',
      silver: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/studio-fitted-silver-damask.jpg'
    };

    // Tablecloth images from collection page
    const tableclothImages = {
      white: '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png',
      black: '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png',
      ivory: '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png'
    };

    // Tablecloth suggestions - suggest napkins in matching color
    if (itemNames.some(name => name.includes('tablecloth') && !name.includes('round'))) {
      if (!itemNames.some(name => name.includes('napkin'))) {
        if (hasWhite) {
          suggestions.push({ 
            name: 'Napkins', 
            reason: 'Matches your white tablecloths',
            image: napkinImages.white,
            color: 'White'
          });
        }
        if (hasBlack) {
          suggestions.push({ 
            name: 'Napkins', 
            reason: 'Matches your black tablecloths',
            image: napkinImages.black,
            color: 'Black'
          });
        }
        if (hasIvory) {
          suggestions.push({ 
            name: 'Napkins', 
            reason: 'Matches your ivory tablecloths',
            image: napkinImages.ivory,
            color: 'Ivory'
          });
        }
      }
      // Also suggest round tablecloths
      if (!itemNames.some(name => name.includes('round'))) {
        if (hasWhite) {
          suggestions.push({ 
            name: 'Round Tablecloths', 
            reason: 'Complete your setup with round tables',
            image: roundTableclothImages.white,
            color: 'White'
          });
        }
        if (hasBlack) {
          suggestions.push({ 
            name: 'Round Tablecloths', 
            reason: 'Complete your setup with round tables',
            image: roundTableclothImages.black,
            color: 'Black'
          });
        }
        if (hasIvory) {
          suggestions.push({ 
            name: 'Round Tablecloths', 
            reason: 'Complete your setup with round tables',
            image: roundTableclothImages.ivory,
            color: 'Ivory'
          });
        }
      }
    }

    // Napkins suggestions - suggest tablecloth in matching color
    if (itemNames.some(name => name.includes('napkin'))) {
      if (!itemNames.some(name => name.includes('tablecloth'))) {
        if (hasWhite) {
          suggestions.push({ 
            name: 'Tablecloths', 
            reason: 'Matches your white napkins',
            image: tableclothImages.white,
            color: 'White'
          });
        }
        if (hasBlack) {
          suggestions.push({ 
            name: 'Tablecloths', 
            reason: 'Matches your black napkins',
            image: tableclothImages.black,
            color: 'Black'
          });
        }
        if (hasIvory) {
          suggestions.push({ 
            name: 'Tablecloths', 
            reason: 'Matches your ivory napkins',
            image: tableclothImages.ivory,
            color: 'Ivory'
          });
        }
      }
    }

    // Chef jacket suggestions - suggest trousers
    if (itemNames.some(name => name.includes('chef jacket') || name.includes('work wear'))) {
      if (!itemNames.some(name => name.includes('trousers'))) {
        suggestions.push({ 
          name: 'Chef Trousers', 
          reason: 'Complete your professional uniform',
          image: '/lovable-uploads/005231c4-59e0-4684-9317-0f2b0a3f6c5a.png'
        });
      }
    }

    // Chef trousers suggestions - suggest jacket
    if (itemNames.some(name => name.includes('chef trousers'))) {
      if (!itemNames.some(name => name.includes('jacket'))) {
        suggestions.push({ 
          name: 'Chef Jacket', 
          reason: 'Complete your professional uniform',
          image: '/lovable-uploads/d6d4a833-19ec-475e-bc4c-d85c2ba88188.png'
        });
      }
    }

    // Bed linen suggestions - suggest towels
    if (itemNames.some(name => name.includes('bed linen'))) {
      if (!itemNames.some(name => name.includes('towel'))) {
        suggestions.push({ 
          name: 'Towels', 
          reason: 'Complete your hospitality collection',
          image: 'https://adgmfhjpdoxemvjnozci.supabase.co/storage/v1/object/public/images/towel-clean.jpg'
        });
      }
    }
    
    // Damask suggestions - suggest matching damask items
    if (itemNames.some(name => name.includes('damask'))) {
      if (!itemNames.some(name => name.includes('napkin'))) {
        if (hasWhite) {
          suggestions.push({ 
            name: 'Damask', 
            reason: 'Upgrade to luxury white damask',
            image: damaskImages.white,
            color: 'White'
          });
        }
        if (hasGold) {
          suggestions.push({ 
            name: 'Damask', 
            reason: 'Upgrade to luxury gold damask',
            image: damaskImages.gold,
            color: 'Gold'
          });
        }
        if (hasSilver) {
          suggestions.push({ 
            name: 'Damask', 
            reason: 'Upgrade to luxury silver damask',
            image: damaskImages.silver,
            color: 'Silver'
          });
        }
      }
    }

    return suggestions;
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearEnquiry,
        getTotalItems,
        getSuggestedItems
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};