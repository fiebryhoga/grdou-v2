import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load cart dari localStorage (Note: File object akan hilang saat refresh)
        const savedCart = localStorage.getItem('grdou_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // STATE BARU: Untuk menyimpan data item yang sedang diedit
    const [editItemData, setEditItemData] = useState(null);

    useEffect(() => {
        // Simpan ke localStorage (kecuali File objects)
        const cartToSave = cart.map(item => {
            const { designFiles, ...rest } = item; 
            return rest;
        });
        localStorage.setItem('grdou_cart', JSON.stringify(cartToSave));
    }, [cart]);

    // UPDATE: designFiles sekarang Array, dan ada parameter index (untuk mode edit)
    const addToCart = (product, quantity, variant, designFiles = [], editIndex = -1) => {
        setCart((prevCart) => {
            const newItem = {
                ...product,
                quantity,
                variant, // { sizes: {...}, addons: [...] }
                designFiles, // Array File Objects
                
                // Hitung ulang harga final
                finalPrice: calculateItemPrice(product.base_price, variant.addons),
                
                price: product.base_price, 
                name: product.name,
                thumbnail: product.thumbnail
            };

            // LOGIKA EDIT: Jika editIndex >= 0, kita replace item lama
            if (editIndex >= 0) {
                const newCart = [...prevCart];
                newCart[editIndex] = newItem;
                return newCart;
            } 
            
            // LOGIKA BARU: Tambah ke bawah
            return [...prevCart, newItem];
        });

        // Clear data edit setelah berhasil disimpan
        if (editIndex >= 0) setEditItemData(null);
        
        // Opsional: Hilangkan alert jika ingin UX lebih smooth
        // alert("Keranjang berhasil diperbarui!"); 
    };

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

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
    };

    // Fungsi untuk memicu mode edit
    const setItemToEdit = (item, index) => {
        setEditItemData({ ...item, indexInCart: index });
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            getTotalPrice,
            // Expose state edit
            editItemData, 
            setItemToEdit 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);