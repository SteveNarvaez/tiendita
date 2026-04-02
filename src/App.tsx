import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, X, MapPin, Phone, User, CheckCircle2, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from './constants';
import { Product, CartItem, OrderDetails } from './types';
import { cn, formatCurrency } from './lib/utils';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryFee] = useState(25);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  [cart]);

  const finalTotal = useMemo(() => cartTotal + deliveryFee, [cartTotal, deliveryFee]);

  const cartCount = useMemo(() => 
    cart.reduce((count, item) => count + item.quantity, 0),
  [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => setCart([]);

const handleConfirmOrder = (details: OrderDetails) => {
    // 1. AQUÍ PON TU NÚMERO DE WHATSAPP (Con el 52 de México al inicio)
    const numeroWhatsApp = "525624396341"; 

    // 2. Armamos el mensaje de texto con formato
    let mensaje = `*¡Nuevo Pedido de Tiendita Local!* 🛵\n\n`;
    
    mensaje += `*📍 Datos del Cliente:*\n`;
    mensaje += `Nombre: ${details.name}\n`;
    mensaje += `Dirección: ${details.address}\n`;
    if (details.references) {
      mensaje += `Referencias: ${details.references}\n`;
    }
    mensaje += `Teléfono de contacto: ${details.whatsapp}\n\n`;
    
    mensaje += `*🛒 Detalles de la Orden:*\n`;
    cart.forEach(item => {
      mensaje += `- ${item.quantity}x ${item.name} (${formatCurrency(item.price)})\n`;
    });

    mensaje += `\n*💳 Resumen de Pago (Efectivo):*\n`;
    mensaje += `Subtotal: ${formatCurrency(cartTotal)}\n`;
    mensaje += `Envío: ${formatCurrency(deliveryFee)}\n`;
    mensaje += `*TOTAL A PAGAR: ${formatCurrency(finalTotal)}*\n\n`;
    mensaje += `Por favor, confirmen mi pedido.`;

    // 3. Convertimos el texto para que se pueda enviar por internet
    const textoCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    // 4. Abrimos WhatsApp en una pestaña nueva
    window.open(urlWhatsApp, '_blank');

    // 5. Mostramos la pantalla de éxito en la página
    setOrderSuccess(true);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    clearCart();
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-green" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-8">
          Tu pedido está en camino. Prepárate para recibirlo en la puerta de tu casa.
        </p>
        <div className="bg-brand-yellow/20 p-4 rounded-xl mb-8 w-full max-w-sm">
          <p className="font-bold text-brand-orange">Pago en Efectivo a la Entrega</p>
        </div>
        <button 
          onClick={() => setOrderSuccess(false)}
          className="w-full max-w-sm bg-brand-orange text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-orange/30 active:scale-95 transition-transform"
        >
          Volver a la Tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-orange/20">
            T
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">El Mexicano</h1>
            <p className="text-xs text-brand-green font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
              Abierto ahora
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 bg-gray-100 rounded-full"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Hero / Promo */}
      <section className="px-4 py-6">
        <div className="bg-gradient-to-br from-brand-orange to-brand-red rounded-3xl p-6 text-white shadow-xl shadow-brand-orange/20 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">¿Antojo de algo?</h2>
            <p className="text-white/80 text-sm mb-4">Entrega rápida en menos de 20 min.</p>
            <div className="inline-flex bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
              🚚 Envío en tu zona
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
            <ShoppingCart size={120} />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 mt-4">
        <div className="relative">
          <input 
            type="text"
            placeholder="¿Qué se te antoja hoy?"
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-gray-100 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 mb-8">
        <h3 className="font-bold mb-4 text-gray-400 uppercase tracking-widest text-[10px]">Categorías</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all",
              !activeCategory ? "bg-brand-dark text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100"
            )}
          >
            Todos
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex-shrink-0 px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all",
                activeCategory === cat.id ? "bg-brand-dark text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100"
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={() => addToCart(product)}
              quantity={Number(cart.find(item => item.id === product.id)?.quantity || 0)}
              onRemove={() => removeFromCart(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Sticky Cart Bar */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && !isCheckoutOpen && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-4 right-4 z-40"
          >
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-brand-dark text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-black/30 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Tu Carrito</p>
                  <p className="font-bold">{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Total</p>
                <p className="text-lg font-bold">{formatCurrency(cartTotal)}</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold">Resumen de Compra</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-brand-orange font-bold">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Envío</span>
                  <span className="font-bold text-brand-dark">
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-brand-orange">{formatCurrency(finalTotal)}</span>
                </div>
                
                <button 
                  disabled={cart.length === 0}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-orange/30 active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
                >
                  Continuar al Pago
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Finalizar Pedido</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-brand-yellow/20 p-4 rounded-2xl mb-8 flex items-start gap-3">
                <div className="bg-brand-yellow p-2 rounded-lg text-brand-orange">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-brand-orange text-sm">Pago en Efectivo</p>
                  <p className="text-xs text-brand-orange/80">Pagarás al recibir tus productos en la puerta de tu casa.</p>
                </div>
              </div>

              <CheckoutForm 
                onConfirm={handleConfirmOrder} 
                total={cartTotal} 
                deliveryFee={deliveryFee}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
  quantity: number;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAdd, 
  quantity, 
  onRemove 
}) => {
  return (
    <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm flex flex-col">
      <div className="relative mb-3 aspect-square rounded-2xl overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
            {quantity}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm mb-1 line-clamp-2 leading-tight">{product.name}</h4>
        <p className="text-brand-orange font-bold text-lg mb-3">{formatCurrency(product.price)}</p>
      </div>
      
      {quantity === 0 ? (
        <button 
          onClick={onAdd}
          className="w-full bg-brand-yellow text-brand-orange py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1">
          <button 
            onClick={onRemove}
            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm">{quantity}</span>
          <button 
            onClick={onAdd}
            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ 
  onConfirm, 
  total,
  deliveryFee
}: { 
  onConfirm: (details: OrderDetails) => void;
  total: number;
  deliveryFee: number;
}) {
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    address: '',
    references: '',
    whatsapp: ''
  });

  const isFormValid = formData.name && formData.address && formData.whatsapp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onConfirm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <User className="w-3 h-3" /> Nombre Completo
          </label>
          <input 
            type="text"
            required
            placeholder="Ej. Juan Pérez"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-3 h-3" /> Dirección de Entrega
          </label>
          <input 
            type="text"
            required
            placeholder="Calle, número y colonia"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            value={formData.address}
            onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Referencias (Opcional)
          </label>
          <textarea 
            placeholder="Ej. Casa portón blanco, frente al parque"
            rows={2}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
            value={formData.references}
            onChange={e => setFormData(prev => ({ ...prev, references: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-3 h-3" /> WhatsApp
          </label>
          <input 
            type="tel"
            required
            placeholder="10 dígitos"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            value={formData.whatsapp}
            onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Envío Local</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-lg font-bold">Total a Pagar</span>
            <span className="text-2xl font-bold text-brand-orange">{formatCurrency(total + deliveryFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-lg font-bold">⚠️ IMPORTANTE: No olvides presionar "Enviar" en tu WhatsApp para que recibamos y preparemos tu pedido.</span>
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-black/20 active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
        >
          Confirmar Pedido
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
          Pago en Efectivo a la Entrega
        </p>
      </div>
    </form>
  );
}
