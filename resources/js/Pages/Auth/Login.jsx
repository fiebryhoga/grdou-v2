import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// Hapus import Checkbox, InputError, PrimaryButton, TextInput bawaan Breeze
// Kita buat element-nya langsung di sini agar tidak ketergantungan file lain

export default function Login({ status, canResetPassword }) {
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
        <div className="flex min-h-screen bg-white selection:bg-blue-600 selection:text-white">
            <Head title="Admin Login | GR - DOU" />

            {/* SISI KIRI: Visual & Branding */}
            <div className="relative hidden w-0 flex-1 lg:block bg-slate-900">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-600/80 to-slate-900/90" />
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1558600095-0e82f807badc?q=80&w=2000" 
                    alt="Konveksi Background"
                />
                <div className="relative z-20 flex h-full flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-3">
                        <img src="/assets/images/layout/logo.png" alt="Logo" className="h-12 w-auto brightness-0 invert" />
                        <span className="text-xl font-black tracking-widest uppercase italic">GR - DOU</span>
                    </div>
                    
                    <div>
                        <blockquote className="space-y-2">
                            <p className="text-4xl font-bold leading-tight tracking-tight italic">
                                "Kualitas sablon terbaik dimulai dari manajemen yang presisi."
                            </p>
                            <footer className="text-lg text-blue-200 font-medium">— Admin Control Panel</footer>
                        </blockquote>
                    </div>

                    <div className="text-sm text-blue-200/60 font-bold uppercase tracking-widest">
                        © 2026 GR - DOU KONVEKSI DAN SABLON
                    </div>
                </div>
            </div>

            {/* SISI KANAN: Form Login */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-24 xl:px-32 bg-slate-50">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-10 lg:hidden text-center">
                        <img src="/assets/images/layout/logo.png" alt="Logo" className="h-16 mx-auto mb-4" />
                        <h2 className="text-2xl font-black text-slate-900 italic">GR - DOU</h2>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Sign In</h2>
                        <p className="mt-3 text-sm font-bold text-slate-400 uppercase tracking-tight">
                            Selamat datang kembali, Admin.
                        </p>
                    </div>

                    <div className="mt-10">
                        <form onSubmit={submit} className="space-y-6">
                            {status && <div className="mb-4 text-sm font-bold text-green-600">{status}</div>}

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        value={data.email}
                                        className="block w-full rounded-2xl border-slate-200 bg-white py-4 px-5 shadow-sm focus:border-blue-600 focus:ring-blue-600 font-bold text-slate-700 transition-all placeholder:text-slate-300"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@grdou.com"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-xs font-bold text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between ml-1">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-[10px] font-black text-blue-600 hover:text-blue-500 uppercase tracking-widest">
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        value={data.password}
                                        className="block w-full rounded-2xl border-slate-200 bg-white py-4 px-5 shadow-sm focus:border-blue-600 focus:ring-blue-600 font-bold text-slate-700 transition-all placeholder:text-slate-300"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password && <p className="mt-2 text-xs font-bold text-red-500">{errors.password}</p>}
                            </div>

                            {/* CUSTOM CHECKBOX (Murni HTML & Tailwind) */}
                            <div className="flex items-center ml-1">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-5 w-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer transition-all"
                                    />
                                </div>
                                <label className="ml-3 block text-[11px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">
                                    Ingat sesi saya
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-2xl bg-slate-900 px-4 py-5 text-xs font-black text-white shadow-xl shadow-slate-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all active:scale-[0.97] uppercase tracking-[0.2em]"
                                    disabled={processing}
                                >
                                    {processing ? 'Authenticating...' : 'Sign In to Dashboard'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-black italic">
                            GR - DOU System V2.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}