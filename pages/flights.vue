<template>
    <section class="container mx-auto py-4">
        <!-- Attention-Grabbing Image -->
        <div class="relative mb-8 h-[30rem]">
            <img src="/images/plane_bg.jpg" alt="Scenic view from a plane during flight"
                class="w-full h-full object-cover rounded-3xl" />
        </div>

        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
            Find Your Flights
        </h2>

        <!-- Search Form -->
        <form @submit.prevent="searchFlights" class="bg-gray-100 p-10 rounded shadow-md space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" v-model="departureCity" placeholder="Departure City" class="p-4 border rounded"
                    required autofocus />
                <input type="text" v-model="destinationCity" placeholder="Destination City" class="p-4 border rounded"
                    required />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select v-model="selectedClass" class="p-4 border rounded" required>
                    <option value="" disabled>Select Class</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first class">First Class</option>
                </select>
                <input type="number" v-model.number="passengers" placeholder="Passengers" class="p-4 border rounded"
                    min="1" required />
            </div>
            <div class="flex justify-center">
                <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded w-48">
                    Search Flights
                </button>
            </div>
        </form>

        <!-- Flight Results -->
        <div v-if="flights.length > 0" class="mt-8">
            <h3 class="text-xl font-bold text-center mb-4 text-black">Available Flights</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="flight in flights" :key="flight._id"
                    class="border rounded p-6 shadow-lg bg-white hover:bg-blue-50 transition duration-300 flex flex-col justify-between">
                    <div>
                        <h4 class="font-bold text-xl text-black">{{ flight.airline }}</h4>
                        <p class="text-gray-600">Flight Number: <span class="font-medium">{{ flight.flightNumber
                                }}</span></p>
                        <p class="text-gray-600">{{ flight.origin }} → {{ flight.destination }}</p>
                        <p class="font-bold text-sm text-green-600">Price: ${{ flight.price }}</p>
                        <p class="text-sm text-gray-500">Class: {{ flight.class }}</p>
                        <p class="text-sm text-gray-500">Seats Available: {{ flight.availableSeats[selectedClass] ||
                            'N/A' }}</p>
                    </div>
                    <div class="py-2 px-4 flex justify-end">
                        <nuxt-link :to="'/booking'" @click="selectFlight(flight)"
                            class="px-6 py-2 bg-blue-600 text-white font-bold text-center rounded hover:bg-blue-800 transition duration-300">
                            Book Now
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results Found Message -->
        <div v-else-if="searchTriggered && !loading" class="text-center mt-6 text-gray-500">
            <p>No flights found. Try adjusting your search criteria.</p>
        </div>

        <!-- Loading Spinner -->
        <div v-if="loading" class="text-center mt-6">
            <p>Loading flights...</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFlight } from '~/composables/useFlight';
import { useFetch, useRuntimeConfig } from "#app";
import { useRouter } from "vue-router";

definePageMeta({
    layout: 'custom'
});

const router = useRouter(); // Initialize Vue Router

// Get API URL from Nuxt runtime config
const config = useRuntimeConfig();
const apiUrl = config.public.apiBase || "http://localhost:3000";

// State variables
const departureCity = ref("");
const destinationCity = ref("");
const selectedClass = ref("");
const passengers = ref(1);
const searchTriggered = ref(false);

// Shared state for selected flight
const selectedFlight = useFlight();

// Fetch flights dynamically
const { data: flights, pending: loading } = useFetch(`${apiUrl}/api/flights`, {
    query: {
        departure: departureCity,
        arrival: destinationCity,
        passengers,
        class: selectedClass
    }
});

const selectFlight = (flight: any) => {
    selectedFlight.value = flight; // Store in composable
    localStorage.setItem("selectedFlight", JSON.stringify(flight)); // Store in localStorage
    router.push("/booking"); // Redirect to booking page 
};

</script>
