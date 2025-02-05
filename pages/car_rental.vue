<template>
    <div>
        <div class="flex flex-col items-center justify-center min-h-screen overflow-hidden relative"
            @mousedown="startDrawing" @mousemove="handleMouseMove" @mouseup="endDrawing">

            <!-- Navbar on top of the video -->
            <nav class="absolute top-0 left-0 w-full bg-transparent p-4 z-20">
                <div class="flex justify-between items-center">
                    <!-- Logo -->
                    <div id="logo" class="text-3xl font-sourGummy text-white ml-4 md:ml-10">
                        <NuxtLink to="/" class="hover:text-blue-500">Travel_Tails</NuxtLink>
                    </div>

                    <!-- Hamburger Button (Custom Gradient Icon) -->
                    <button id="hamburger-btn" @click="toggleSidebar"
                        class="text-white text-3xl md:hidden focus:outline-none mr-4">
                        <img src="/public/images/car_ham.png" alt="Hamburger Menu" class="w-10 h-10" />
                    </button>

                    <!-- Navbar Links (Visible on larger screens) -->
                    <div
                        class="hidden md:flex space-x-4 md:space-x-6 mr-4 md:mr-10 font-bob text-base md:text-xl gradient-text z-10">
                        <NuxtLink to="/flights"
                            class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-xl gradient-text">
                            Flights
                        </NuxtLink>
                        <NuxtLink to="/hotels"
                            class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-xl gradient-text">
                            Hotels
                        </NuxtLink>
                        <NuxtLink to="/car_rental"
                            class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-xl gradient-text">
                            Car Rentals</NuxtLink>
                        <NuxtLink to="/Connect"
                            class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-xl gradient-text">
                            Connect
                        </NuxtLink>

                    </div>
                </div>
                <div id="sidebar" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
                    class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-30">
                    <button id="close-btn" @click="toggleSidebar"
                        class="text-gray-600 text-2xl absolute top-4 right-4 focus:outline-none">
                        ✕
                    </button>
                    <div class="mt-16 space-y-6 px-6 font-bob text-xl">
                        <NuxtLink to="/flights" class="block text-[#4a4947] hover:text-blue-600">Flights</NuxtLink>
                        <NuxtLink to="/hotels" class="block text-[#4a4947] hover:text-blue-600">Hotels</NuxtLink>
                        <NuxtLink to="/car_rental" class="block text-[#4a4947] hover:text-blue-600">Car Rentals
                        </NuxtLink>
                        <NuxtLink to="/Connect" class="block text-[#4a4947] hover:text-blue-600">Connect</NuxtLink>
                    </div>
                </div>
            </nav>

            <!-- Video element, now responsive -->
            <video ref="videoRef" class="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="/video/Car_Slow.mp4" type="video/mp4" />
            </video>

            <!-- Circle, only visible when video is not playing -->
            <div v-if="!isPlaying" class="border-l-2 border-b-2 border-white rounded-full z-10 rotate-90 absolute top-[10%] left-1/2 transform -translate-x-1/2 overflow-hidden 
                    sm:w-[80vh] sm:h-[80vh] md:w-[100vh] md:h-[100vh] lg:w-[120vh] lg:h-[120vh] hidden sm:block">
            </div>

            <!-- Text moved to the right -->
            <div v-if="!isPlaying"
                class="absolute top-[66%] right-28 transform -translate-y-1/2 font-sourGummy z-20 opacity-90 animate-fadeIn gradient-text">
                <div class="md:text-base lg:text-xl text-xs sm:text-sm hidden xl:block">Begin The Experience
                </div>
                <div class="text-xs mt-1 md:text-sm md:mt-1 lg:mt-0 sm:text-sm sm:mt-2 hidden sm:block">Drag To Start
                </div>
            </div>
        </div>

        <div :class="{ 'min-h-screen': carData.length > 0, 'h-auto': carData.length === 0 }"
            class="bg-gradient-to-br from-neonBlue to-brightPink text-black font-futuristic p-6">
            <!-- Search Section -->

            <div
                class="bg-white flex m-10 px-6 py-4 border border-gray-300 focus-within:border-black overflow-hidden w-full max-w-3xl mx-auto font-[sans-serif] rounded-lg hover:shadow-lg focus-within:shadow-xl transition-shadow duration-200">
                <button @click="fetchCarData" class="mr-4 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="24px"
                        class="fill-gray-600">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                    </svg>
                </button>
                <input v-model="searchQuery" type="text" placeholder="Search for a car..."
                    class="w-full outline-none text-lg placeholder-gray-500" />
            </div>


            <!-- Display car data -->
            <div v-if="carData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="car in carData" :key="car.model"
                    class="relative p-4 rounded-lg bg-white hover:scale-105 transition-all duration-300 hover:h-[auto]">
                    <!-- Car Image -->
                    <img :src="car.img" alt="Car Image" class="w-full h-52 object-cover rounded-md mb-4" />

                    <!-- Basic Details -->
                    <p class="text-sm text-gray-600"><strong>Make:</strong> {{ car.make }}</p>
                    <p class="text-sm text-gray-600"><strong>Model:</strong> {{ car.model }}</p>
                    <p class="text-sm text-gray-600"><strong>Rental Price:</strong> {{ car.rental_price_per_day }}</p>

                    <!-- Full Details (Initially Hidden) -->
                    <div
                        class="full-details absolute top-0 left-0 right-0 bottom-0 bg-white p-4 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                        <img :src="car.img" alt="Car Image" class="w-full h-52 object-cover rounded-md mb-4" />
                        <p class="text-sm text-gray-600"><strong>Make:</strong> {{ car.make }}</p>
                        <p class="text-sm text-gray-600"><strong>Model:</strong> {{ car.model }}</p>
                        <p class="text-sm text-gray-600"><strong>Rental Price:</strong> {{ car.rental_price_per_day }}
                        </p>
                        <p class="text-sm text-gray-600"><strong>Year:</strong> {{ car.year }}</p>
                        <p class="text-sm text-gray-600"><strong>Fuel Type:</strong> {{ car.fuel_type }}</p>
                        <p class="text-sm text-gray-600"><strong>Drive:</strong> {{ car.drive }}</p>
                        <p class="text-sm text-gray-600"><strong>Class:</strong> {{ car.class }}</p>
                        <p class="text-sm text-gray-600"><strong>Availability:</strong> {{ car.availability }}</p>

                        <div class="flex justify-end mt-4">
                            <button @click="bookCar(car)"
                                class="px-4 py-2 bg-[#64748b] text-white font-medium rounded-lg hover:bg-blue-300 transition duration-200">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="showNoResults" class="text-center mt-6">
                <p class="text-lg font-semibold">No cars available.</p>
            </div>

        </div>
        <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <p>&copy; 2024 Travel Explorer. All rights reserved.</p>
                <div class="mt-2 flex justify-center space-x-4">
                    <a href="#" class="hover:text-blue-400">Instagram</a>
                    <a href="#" class="hover:text-blue-400">WhatsApp</a>
                    <a href="#" class="hover:text-blue-400">Facebook</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const points = ref([]);
const isPlaying = ref(false);
const isSidebarOpen = ref(false);
const videoRef = ref(null);
const lastPoint = ref(null);
const startPoint = ref(null);
const angleThreshold = ref(180);  // 1/2 circle = 180 degrees
const currentAngle = ref(0);  // Track the current angle

const router = useRouter();

// Function to toggle the sidebar's visibility
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Start drawing (mouse down)
const startDrawing = () => {
    points.value = []; // Clear points on new gesture
    lastPoint.value = null; // Reset the last point
    startPoint.value = null; // Reset the starting point
    currentAngle.value = 0; // Reset the angle
};

const searchQuery = ref('') // Store user input
const carData = ref([])
const showNoResults = ref(false) // Track if no cars are found after a search

// Handle mouse move and track the path
const handleMouseMove = (event) => {
    if (!startPoint.value) {
        // Set the start point when the mouse is first pressed
        startPoint.value = { x: event.clientX, y: event.clientY };
    }

    if (lastPoint.value) {
        // Calculate the angle between the current point and the start point
        const angle = calculateAngle(startPoint.value, { x: event.clientX, y: event.clientY });
        if (angle > angleThreshold.value && !isPlaying.value) {
            points.value.push({ x: event.clientX, y: event.clientY });
        }
    }

    lastPoint.value = { x: event.clientX, y: event.clientY };
};

// Handle mouse up (end the gesture)
const endDrawing = () => {
    if (currentAngle.value >= angleThreshold.value) {
        if (isPlaying.value) {
            videoRef.value.pause();
            isPlaying.value = false;
        } else {
            videoRef.value.play();
            isPlaying.value = true;
        }
    }
};

// Function to calculate the angle between the start point and the current mouse position
const calculateAngle = (start, current) => {
    const deltaX = current.x - start.x;
    const deltaY = current.y - start.y;
    const radians = Math.atan2(deltaY, deltaX); // Get angle in radians
    const degrees = (radians * 180) / Math.PI; // Convert radians to degrees
    const normalizedAngle = (degrees + 360) % 360; // Normalize angle to positive values
    currentAngle.value = normalizedAngle; // Update current angle
    return normalizedAngle;
};

// Handle video play
const handleVideoPlay = () => {
    isPlaying.value = true;
};

const fetchCarData = async () => {
    if (!searchQuery.value) {
        carData.value = []; // Clear results if empty search
        return;
    }

    try {
        const response = await fetch(`/api/Carapi?model=${searchQuery.value}`);
        if (response.ok) {
            const data = await response.json();
            carData.value = data;
            showNoResults.value = data.length === 0;
        } else {
            console.error("Error fetching car data:", response.status);
        }
    } catch (error) {
        console.error("Error during fetch:", error);
    }
};

const bookCar = (car) => {
    localStorage.setItem("selectedCar", JSON.stringify(car)); // Save car details
    router.push("/booking"); // Navigate to booking page
};


</script>

<style scoped>
@keyframes animate-gradient {
    to {
        background-position: 200%;
    }
}

.gradient-text {
    background: linear-gradient(to right, #fc72ff, #8f68ff, #487bff, #8f68ff, #fc72ff);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate-gradient 2.5s linear infinite;
}

@media (max-width: 765px) {
    #hamburger-btn {
        display: block;
    }
}
</style>