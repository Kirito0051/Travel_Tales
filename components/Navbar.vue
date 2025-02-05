<template>
    <nav class=" text-black">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <!-- Navigation Links (Left) -->
            <ul class="hidden md:flex space-x-8 flex-1 justify-end">
                <li>
                    <NuxtLink to="/"
                        class="border-b-2 border-blue-300 pb-1 hover:border-transparent hover:text-blue-300">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/flights"
                        class="border-b-2 border-blue-300 pb-1 hover:border-transparent hover:text-blue-300">
                        Flights
                    </NuxtLink>
                </li>
            </ul>

            <!-- Logo -->
            <div class="text-3xl font-bold mx-auto w-80 text-center font-sourGummy">
                <NuxtLink to="/" class="hover:text-blue-300">Travel Explorer</NuxtLink>
            </div>


            <!-- Navigation Links (Right) -->
            <ul class="hidden md:flex space-x-8 flex-1 justify-start">
                <li>
                    <NuxtLink to="/hotels"
                        class="border-b-2 border-blue-300 pb-1 hover:border-transparent hover:text-blue-300">
                        Hotels
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/car_rental"
                        class="border-b-2 border-blue-300 pb-1 hover:border-transparent hover:text-blue-300">
                        Car Rentals
                    </NuxtLink>
                </li>
            </ul>

            <!-- Mobile Menu Button -->
            <button @click="toggleMenu" class="block md:hidden text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Mobile Menu -->
            <ul v-show="isMenuOpen"
                class="absolute top-16 left-0 bg-blue-600 w-full text-center space-y-4 py-4 md:hidden">
                <li>
                    <NuxtLink to="/" class="block hover:text-blue-300">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/flights" class="block hover:text-blue-300">Flights</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/hotels" class="block hover:text-blue-300">Hotels</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/car_rental" class="block hover:text-blue-300">Car Rentals</NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}
</script>