<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Activity; // Pastikan Model Activity diimport
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ManageAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ManageAdmin/Index', [
            'admins' => User::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Simpan ke Database Activity Log
        Activity::create([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name,
            'message' => "Menambahkan admin baru: {$request->name}",
            'type' => 'create',
            'path' => route('admin.manage.index')
        ]);

        return redirect()->back();
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        // Simpan ke Database Activity Log
        Activity::create([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name,
            'message' => "Memperbarui data admin: {$user->name}",
            'type' => 'edit',
            'path' => route('admin.manage.index')
        ]);

        return redirect()->back();
    }

    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'Tidak bisa menghapus diri sendiri!');
        }

        $userName = $user->name;
        $user->delete();

        // Simpan ke Database Activity Log
        Activity::create([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name,
            'message' => "Menghapus admin: {$userName}",
            'type' => 'delete',
            'path' => null
        ]);

        return redirect()->back();
    }
}