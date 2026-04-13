import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
            <Head title="Admin Login | GR-DOU" />

            {/* --- ANIMATED MESH BACKGROUND --- */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#277cdd]/10 blur-[100px] mix-blend-multiply animate-[blob_7s_infinite]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-300/20 blur-[100px] mix-blend-multiply animate-[blob_7s_infinite_2s]"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-cyan-300/10 blur-[120px] mix-blend-multiply animate-[blob_7s_infinite_4s]"></div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            {/* --- LOGIN CARD --- */}
            <div className="relative z-10 w-full max-w-[420px]">
                
                {/* Logo Positioned Outside Card (Top) */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-lg shadow-xl shadow-blue-900/5 flex items-center justify-center p-3 transform hover:scale-105 transition-transform duration-500">
                        <img 
                            src="/assets/images/home/logo-grdou.png" 
                            alt="GR-DOU Logo" 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=GR&background=277cdd&color=fff&rounded=true"; }}
                        />
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white p-8 sm:p-10">
                    
                    {/* Header Texts */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            Silakan masuk untuk mengelola sistem <span className="font-bold text-[#277cdd]">GR-DOU</span>.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-green-50 rounded-lg text-sm font-semibold text-green-600 border border-green-100 text-center">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Email Input */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 capitalize tracking-widest mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiMail className="text-slate-400 group-focus-within:text-[#277cdd] transition-colors" size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-100/50 border border-slate-200 rounded-lg text-sm text-slate-700 font-semibold placeholder:text-slate-400 placeholder:font-medium focus:bg-white focus:border-[#277cdd] focus:ring-4 focus:ring-[#277cdd]/10 transition-all"
                                    placeholder="admin@grdou.com"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="block text-[11px] font-bold text-slate-500 capitalize tracking-widest">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link 
                                        href={route('password.request')} 
                                        className="text-[11px] font-bold text-[#277cdd] hover:text-blue-800 transition-colors"
                                    >
                                        Lupa Password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiLock className="text-slate-400 group-focus-within:text-[#277cdd] transition-colors" size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-100/50 border border-slate-200 rounded-lg text-sm text-slate-700 font-semibold placeholder:text-slate-400 placeholder:font-medium focus:bg-white focus:border-[#277cdd] focus:ring-4 focus:ring-[#277cdd]/10 transition-all"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center pt-2 ml-1">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-[#277cdd] focus:ring-[#277cdd]/30 transition-colors cursor-pointer"
                            />
                            <label htmlFor="remember_me" className="ml-2.5 block text-xs font-semibold text-slate-500 cursor-pointer select-none">
                                Ingat sesi saya
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-[#277cdd] hover:bg-[#1f63b3] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#277cdd]/30 hover:shadow-xl hover:shadow-[#277cdd]/40 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? 'Authenticating...' : 'Sign In'}
                                {!processing && <FiArrowRight size={18} />}
                            </button>
                        </div>
                    </form>

                </div>

                {/* Footer Copy */}
                <div className="text-center mt-8">
                    <p className="text-[11px] font-bold text-slate-400 capitalize tracking-widest">
                        &copy; {new Date().getFullYear()} GR-DOU System
                    </p>
                </div>
            </div>

            {/* Custom CSS for blob animation */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
            `}</style>
        </div>
    );
}