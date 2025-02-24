<template>

    <nav class=" text-black">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center ">
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

    <section class="container mx-auto py-8">
        <!-- Flight Booking Details -->
        <div class="bg-gray-100 p-10 rounded shadow-md flex flex-col items-center space-y-6 ml-20  mr-20">
            <div class="flex space-x-28">
                <!-- Image Section -->
                <div class="flex-shrink-0 w-1/3">
                    <img src="/images/booking.jpg" alt="Flight Image" class="w-full h-[80vh] object-cover rounded-md">
                </div>
                <!-- Heading and Flight Details Section -->
                <div class="w-2/3 space-y-20">
                    <div>
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-left">BOOK YOUR</h2>
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-left">RESERVATION</h2>
                    </div>
                    <div class="space-y-4" v-if="flightDetails && flightDetails.airline">
                        <h3 class="text-xl font-bold text-black">Your Flight:</h3>
                        <div class="space-y-4">
                            <p><strong>Airline:</strong> {{ flightDetails.airline }}</p>
                            <p><strong>Flight Number:</strong> {{ flightDetails.flightNumber }}</p>
                            <p><strong>Origin:</strong> {{ flightDetails.origin }} → {{ flightDetails.destination }}</p>
                            <p><strong>Class:</strong> {{ flightDetails.class }}</p>
                            <p><strong>Price:</strong> ${{ flightDetails.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-h-screen p-10 bg-gray-100 flex space-x-8 ml-28  mr-10 items-start space-y-0 mt-10">
            <!-- Car Booking Details -->
            <div v-if="car"
                class="max-w-md bg-white shadow-lg rounded-lg overflow-hidden relative group transition-transform transform scale-95 hover:scale-100 duration-300 w-1/2 max-h-100">
                <!-- <img :src="car.img" alt="Car Image"
                    class="w-full h-48 object-cover rounded-md mb-4 transition-all duration-300 group-hover:h-56" /> -->
                <div class="p-6 relative z-10">
                    <p class="text-2xl font-bold mb-4"> {{ car.model }}</p>
                    <img :src="car.img" alt="Car Image"
                        class="w-full h-40 object-cover rounded-md mb-4 transition-all duration-300 group-hover:h-56" />
                    <p class="text-lg"><strong>Rental Price:</strong> {{ car.rental_price_per_day }}</p>
                    <p class="text-lg"><strong>Availability:</strong> {{ car.availability }}</p>
                </div>
                <div
                    class="absolute inset-0 bg-gray-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
            </div>
            <div v-else class="text-center text-xl w-1/2">No car selected.</div>

            <!-- Hotel Booking Details -->
            <div v-if="hotel"
                class="p-6 max-w-md mx-auto border rounded-lg shadow-lg w-1/2 max-h-100 group transition-transform transform scale-95 hover:scale-100 duration-300">
                <h2 class="text-2xl font-bold mb-4">{{ hotel.name }}</h2>
                <img :src="hotel.img" alt="Hotel Image"
                    class="w-full h-32 object-cover rounded-lg mb-4 transition-all duration-300 group-hover:h-48 " />
                <p class="text-lg"><strong>City:</strong> {{ hotel.city }}</p>
                <p class="text-lg"><strong>Price:</strong> {{ hotel.price }}</p>
                <p class="text-lg"><strong>Rating:</strong> {{ hotel.rating }} stars</p>
                <div
                    class="absolute inset-0 bg-gray-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
            </div>
            <div v-else class="text-center text-gray-600 text-xl w-1/2">No hotel selected.</div>
        </div>

        <!-- Booking Form -->
        <form @submit.prevent="submitBooking" class="bg-gray-100 p-10 rounded shadow-md space-y-4 mt-[-15rem]">
            <h3 class="text-xl font-bold text-black">Enter Your Details</h3>
            <div class="space-y-4">
                <input type="text" v-model="name" placeholder="Full Name" class="p-4 border rounded w-full" required
                    pattern="[A-Za-z\s]+" title="Only letters and spaces are allowed" />
                <input type="email" v-model="email" placeholder="Email Address" class="p-4 border rounded w-full"
                    required />
                <input type="tel" v-model="phone" placeholder="Phone Number" class="p-4 border rounded w-full" required
                    pattern="\d*" />
            </div>
            <div class="flex justify-center">
                <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded w-48">
                    Complete Booking
                </button>
            </div>
        </form>

        <div v-if="bookingConfirmed" class="bg-white text-black border-2 p-6 rounded-lg shadow-lg text-center">
            <p class="text-lg font-semibold">Your booking was successful!</p>
            <p class="text-gray-600 mt-2">A confirmation email will be sent shortly.</p>
        </div>
    </section>


</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFlight } from "@/composables/useFlight";
import axios from 'axios';

const selectedFlight = useFlight();
const route = useRoute();

// Keep only ONE declaration for `flightDetails`
const flightDetails = computed(() => selectedFlight.value || {
    airline: "",
    flightNumber: "",
    origin: "",
    price: 0,
    class: ""
});

const name = ref("");
const email = ref("");
const phone = ref("");
const bookingConfirmed = ref(false);
const storedCar = ref(null);
const hotel = ref(null);

const isMenuOpen = ref(false);

const isCarBooking = computed(() => route.query.type === 'car');
const car = computed(() => {
    if (!isCarBooking.value) return storedCar.value;
    return {
        id: Number(route.query.id),
        name: route.query.name,
        make: route.query.make,
        model: route.query.model,
        rental_price_per_day: route.query.rental_price_per_day,
        img: route.query.img
    };
});

const submitBooking = async () => {
    if (!name.value || !email.value || !phone.value) {
        alert("Please fill in all required fields.");
        return;
    }

    const bookingData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        flight: selectedFlight.value ? {
            airline: selectedFlight.value.airline,
            flightNumber: selectedFlight.value.flightNumber,
            origin: selectedFlight.value.origin,
            destination: selectedFlight.value.destination,
            price: selectedFlight.value.price,
            class: selectedFlight.value.class
        } : null,
        car: car.value || null,
        hotel: hotel.value || null
    };

    console.log(" Submitting Booking Data:", bookingData);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/bookings",
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(" Server Response:", response.data);

        if (response.data.message) {
            bookingConfirmed.value = true;
            resetForm();
            alert("Booking successful!");
        }
    } catch (error) {
        console.error("API Error:", error.response?.data || error);
        alert("Booking failed. Please try again.");
    }
};



const resetForm = () => {
    name.value = "";
    email.value = "";
    phone.value = "";
    selectedFlight.value = null;
};

onMounted(() => {
    const savedFlight = localStorage.getItem("selectedFlight");
    if (savedFlight) {
        selectedFlight.value = JSON.parse(savedFlight);
        console.log("Loaded Flight from LocalStorage:", selectedFlight.value);
    }

    const savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
        storedCar.value = JSON.parse(savedCar);
        console.log("Loaded Car from LocalStorage:", storedCar.value);
    }

    const savedHotel = localStorage.getItem("selectedHotel");
    if (savedHotel) {
        hotel.value = JSON.parse(savedHotel);
        console.log("Loaded Hotel from LocalStorage:", hotel.value);
    }
});

</script>


<style scoped></style>
