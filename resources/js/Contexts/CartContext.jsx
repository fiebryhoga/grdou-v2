import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load cart dari localStorage (tapi file tidak bisa di-load dari storage)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('grdou_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Kita simpan data teks ke localStorage
        // Note: File object akan hilang saat disimpan ke localStorage
        // Ini wajar untuk web app sederhana. Jika refresh, file harus upload ulang.
        const cartToSave = cart.map(item => {
            const { designFile, ...rest } = item; // Pisahkan file sebelum save
            return rest;
        });
        localStorage.setItem('grdou_cart', JSON.stringify(cartToSave));
    }, [cart]);

    // TAMBAHKAN PARAMETER designFile
    const addToCart = (product, quantity, variant, designFile = null) => {
        setCart((prevCart) => {
            return [...prevCart, { 
                ...product, 
                quantity, 
                variant, // Berisi { size: 'XL', addons: [...] }
                designFile: designFile, // Simpan File Object di memory
                
                // Harga yang disimpan adalah harga final (Base + Addons)
                finalPrice: calculateItemPrice(product.base_price, variant.addons),
                
                price: product.base_price, 
                name: product.name,
                thumbnail: product.thumbnail
            }];
        });
        alert("Produk berhasil masuk keranjang!");
    };

    // Helper hitung harga
    const calculateItemPrice = (base, addons = []) => {
        let total = parseFloat(base);
        addons.forEach(addon => {
            total += parseFloat(addon.price);
        });
        return total;
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Update fungsi total harga menggunakan finalPrice
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);