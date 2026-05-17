<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        
        // Rentang waktu: 1 Februari 2026 - 24 April 2026
        $startDate = Carbon::create(2026, 2, 1, 0, 0, 0);
        $endDate = Carbon::create(2026, 4, 24, 23, 59, 59);

        // Status yang diperbanyak (agar lebih banyak yang sukses/completed)
        $statuses = ['paid', 'processing', 'finishing', 'packaging', 'ready', 'shipped', 'completed', 'completed', 'completed', 'completed', 'cancel'];

        for ($i = 0; $i < 150; $i++) {
            // Generate tanggal acak di antara startDate dan endDate
            $randomDate = Carbon::createFromTimestamp(rand($startDate->timestamp, $endDate->timestamp));
            
            Order::create([
                'user_id' => null, // Anggap guest atau ganti jika perlu relasi user
                'order_number' => 'ORD-' . $randomDate->format('Ymd') . '-' . strtoupper(Str::random(5)),
                'total_price' => $faker->numberBetween(150000, 3500000), // Random total dari 150rb - 3.5jt
                'status' => $faker->randomElement($statuses),
                'customer_name' => $faker->name,
                'customer_email' => $faker->safeEmail,
                'customer_phone' => $faker->phoneNumber,
                'shipping_address' => $faker->address,
                'shipping_courier' => $faker->randomElement(['JNE', 'JNT', 'SICEPAT']),
                'shipping_service' => 'REG',
                'shipping_cost' => $faker->numberBetween(15000, 75000),
                'created_at' => $randomDate,
                'updated_at' => $randomDate,
            ]);
        }
    }
}