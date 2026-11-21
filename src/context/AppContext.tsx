import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_ADDRESSES,
  INITIAL_CLIPS,
  INITIAL_ORDERS,
  INITIAL_SERVICE_REQUESTS,
} from '../data/mockData';
import type {
  CartItem,
  Currency,
  DigitalService,
  ElectronicsOrder,
  Product,
  SavedAddress,
  ServiceApplicationPayload,
  ServiceRequestRecord,
  VideoClip,
} from '../types';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  ghanaCard: string;
  loggedIn: boolean;
}

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountGHS: number) => string;

  cart: CartItem[];
  addProductToCart: (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedStorage?: string
  ) => void;
  addServiceToCart: (
    service: DigitalService,
    application: ServiceApplicationPayload
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateProductQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotalGHS: number;
  cartElectronicsCount: number;
  cartServicesCount: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;

  compareIds: string[];
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  orders: ElectronicsOrder[];
  serviceRequests: ServiceRequestRecord[];
  placeHybridOrder: (params: {
    paymentMethod: string;
    shippingAddress: string;
    itemsToCheckout?: CartItem[];
  }) => { newOrderId?: string; newTrackingIds: string[] };

  sendServiceMessage: (trackingId: string, text: string, attachmentName?: string) => void;

  addresses: SavedAddress[];
  addAddress: (addr: Omit<SavedAddress, 'id'>) => void;
  setDefaultAddress: (id: string) => void;

  user: UserProfile;
  updateUserProfile: (patch: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  toast: string | null;
  showToast: (msg: string) => void;

  clips: VideoClip[];
  registerClipView: (clipId: string) => void;
  toggleClipLike: (clipId: string, forceLike?: boolean) => void;
  toggleClipSave: (clipId: string) => void;
  addClipComment: (clipId: string, text: string) => void;
  addUploadedClip: (clip: Omit<VideoClip, 'id' | 'views' | 'likes' | 'comments'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USD_RATE = 15.2;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('GHS');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>(['samsung-s24-ultra', 'lg-oled-65-c4']);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [orders, setOrders] = useState<ElectronicsOrder[]>(INITIAL_ORDERS);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestRecord[]>(
    INITIAL_SERVICE_REQUESTS
  );
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);

  const [user, setUser] = useState<UserProfile>({
    name: 'Kofi Asante',
    email: 'kofi.asante@shemacustomer.gh',
    phone: '+233 24 555 0192',
    ghanaCard: 'GHA-728491023-4',
    loggedIn: true,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const [clips, setClips] = useState<VideoClip[]>(INITIAL_CLIPS);

  const registerClipView = (clipId: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === clipId ? { ...c, views: c.views + 1 } : c))
    );
  };

  const toggleClipLike = (clipId: string, forceLike?: boolean) => {
    setClips((prev) =>
      prev.map((c) => {
        if (c.id !== clipId) return c;
        const nextLiked = forceLike !== undefined ? forceLike : !c.isLiked;
        if (nextLiked === Boolean(c.isLiked)) return c;
        return {
          ...c,
          isLiked: nextLiked,
          likes: nextLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
        };
      })
    );
  };

  const toggleClipSave = (clipId: string) => {
    setClips((prev) =>
      prev.map((c) => {
        if (c.id !== clipId) return c;
        const nextSaved = !c.isSaved;
        showToast(nextSaved ? 'Saved clip to bookmarks' : 'Removed from bookmarks');
        return { ...c, isSaved: nextSaved };
      })
    );
  };

  const addClipComment = (clipId: string, text: string) => {
    setClips((prev) =>
      prev.map((c) =>
        c.id === clipId
          ? {
              ...c,
              comments: [
                ...c.comments,
                {
                  id: `cc-${Date.now()}`,
                  author: user.name,
                  text,
                  timestamp: 'Just now',
                },
              ],
            }
          : c
      )
    );
  };

  const addUploadedClip = (
    clip: Omit<VideoClip, 'id' | 'views' | 'likes' | 'comments'>
  ) => {
    const newClip: VideoClip = {
      ...clip,
      id: `clip-${Date.now()}`,
      views: 1,
      likes: 0,
      comments: [],
    };
    setClips((prev) => [newClip, ...prev]);
    showToast('Video published with auto-captured default thumbnail!');
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const formatPrice = (amountGHS: number) => {
    if (currency === 'GHS') {
      return `₵${amountGHS.toLocaleString('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    const usd = amountGHS / USD_RATE;
    return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const addProductToCart = (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedStorage?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.type === 'product' &&
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        if (existing.type === 'product') {
          updated[existingIndex] = { ...existing, quantity: existing.quantity + quantity };
        }
        return updated;
      }
      return [
        ...prev,
        {
          type: 'product',
          cartItemId: `prod-${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedColor,
          selectedStorage,
        },
      ];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const addServiceToCart = (
    service: DigitalService,
    application: ServiceApplicationPayload
  ) => {
    setCart((prev) => [
      ...prev,
      {
        type: 'service',
        cartItemId: `srv-${service.id}-${Date.now()}`,
        service,
        application,
      },
    ]);
    showToast(`Added ${service.title} to your hybrid cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateProductQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId && item.type === 'product'
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartElectronicsCount = cart
    .filter((i) => i.type === 'product')
    .reduce((acc, i) => acc + (i.type === 'product' ? i.quantity : 0), 0);

  const cartServicesCount = cart.filter((i) => i.type === 'service').length;

  const cartTotalGHS = cart.reduce((sum, item) => {
    if (item.type === 'product') {
      return sum + item.product.priceGHS * item.quantity;
    }
    return sum + item.service.serviceFeeGHS + item.service.govtFeeGHS;
  }, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 products at once');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareIds([]);

  const placeHybridOrder = ({
    paymentMethod,
    shippingAddress,
    itemsToCheckout,
  }: {
    paymentMethod: string;
    shippingAddress: string;
    itemsToCheckout?: CartItem[];
  }) => {
    const targetItems = itemsToCheckout ?? cart;
    const productItems = targetItems.filter(
      (i): i is Extract<CartItem, { type: 'product' }> => i.type === 'product'
    );
    const serviceItems = targetItems.filter(
      (i): i is Extract<CartItem, { type: 'service' }> => i.type === 'service'
    );

    let newOrderId: string | undefined;
    if (productItems.length > 0) {
      newOrderId = `SHM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const total = productItems.reduce(
        (sum, i) => sum + i.product.priceGHS * i.quantity,
        0
      );
      const newOrder: ElectronicsOrder = {
        id: newOrderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Confirmed',
        paymentMethod,
        totalGHS: total,
        shippingAddress,
        estimatedDelivery: 'Within 24–48 Hours',
        items: productItems.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          image: i.product.images[0],
          variant: [i.selectedColor, i.selectedStorage].filter(Boolean).join(' · '),
          quantity: i.quantity,
          priceGHS: i.product.priceGHS,
        })),
      };
      setOrders((prev) => [newOrder, ...prev]);
    }

    const newTrackingIds: string[] = [];
    if (serviceItems.length > 0) {
      const createdRequests: ServiceRequestRecord[] = serviceItems.map((s) => {
        const trackingId = `SHM-SRV-${Math.floor(10000 + Math.random() * 89999)}`;
        newTrackingIds.push(trackingId);
        return {
          trackingId,
          serviceId: s.service.id,
          serviceTitle: s.service.title,
          category: s.service.category,
          submittedDate: new Date().toISOString().split('T')[0],
          estimatedCompletion: s.service.processingTime,
          status: 'Submitted',
          totalPaidGHS: s.service.serviceFeeGHS + s.service.govtFeeGHS,
          paymentMethod,
          applicantName: s.application.fullName,
          ghanaCardNumber: s.application.ghanaCardNumber,
          documents: s.application.documents,
          messages: [
            {
              id: `sys-${Date.now()}`,
              sender: 'admin',
              senderName: 'Shema Digital Desk',
              text: `Application received for ${s.service.title}. Our specialist is reviewing your uploaded documents now.`,
              timestamp: 'Just now',
            },
          ],
        };
      });
      setServiceRequests((prev) => [...createdRequests, ...prev]);
    }

    const checkedIds = new Set(targetItems.map((i) => i.cartItemId));
    setCart((prev) => prev.filter((i) => !checkedIds.has(i.cartItemId)));

    return { newOrderId, newTrackingIds };
  };

  const sendServiceMessage = (
    trackingId: string,
    text: string,
    attachmentName?: string
  ) => {
    setServiceRequests((prev) =>
      prev.map((req) => {
        if (req.trackingId !== trackingId) return req;
        const userMsg = {
          id: `u-${Date.now()}`,
          sender: 'user' as const,
          senderName: user.name,
          text,
          timestamp: 'Just now',
          attachmentName,
        };
        return {
          ...req,
          messages: [...req.messages, userMsg],
        };
      })
    );

    // Simulated specialist auto-reply
    setTimeout(() => {
      setServiceRequests((prev) =>
        prev.map((req) => {
          if (req.trackingId !== trackingId) return req;
          return {
            ...req,
            messages: [
              ...req.messages,
              {
                id: `a-${Date.now()}`,
                sender: 'admin',
                senderName: 'Ama (Shema Specialist)',
                text: attachmentName
                  ? `Thanks! We received your updated file (${attachmentName}) and attached it to ${trackingId}.`
                  : `Message received on ${trackingId}. Our desk has noted this and will update your status shortly.`,
                timestamp: 'Just now',
              },
            ],
          };
        })
      );
    }, 900);
  };

  const addAddress = (addr: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = { ...addr, id: `addr-${Date.now()}` };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
      }
      return [...prev, newAddr];
    });
    showToast('Delivery address saved');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated');
  };

  const updateUserProfile = (patch: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...patch }));
    showToast('Profile updated');
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addProductToCart,
        addServiceToCart,
        removeFromCart,
        updateProductQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotalGHS,
        cartElectronicsCount,
        cartServicesCount,
        wishlist,
        toggleWishlist,
        quickViewProduct,
        setQuickViewProduct,
        compareIds,
        toggleCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        orders,
        serviceRequests,
        placeHybridOrder,
        sendServiceMessage,
        addresses,
        addAddress,
        setDefaultAddress,
        user,
        updateUserProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast,
        clips,
        registerClipView,
        toggleClipLike,
        toggleClipSave,
        addClipComment,
        addUploadedClip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
