<template>
    <div class="flex justify-center items-center shadow-2xl">
        <div class="relative w-[100vw] h-[70vh] rounded-3xl">
            <!-- Video -->
            <video ref="video" class="w-full h-full object-cover rounded-3xl" muted loop @ended="onVideoEnded">
                <source src="/public/video/hotel.mov" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <!-- Play Button -->
            <button id="playButton"
                class="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center transition hover:scale-110"
                @click="togglePlay">
                <img src="/public/images/Play.png" alt="Play" class="w-6 h-6" />
            </button>

            <!-- Half Div Above Video (Out of Container) with Rounded Corners -->
            <div class="relative w-[65vw] min-h-32 bg-white rounded-3xl p-4 shadow-2xl mt-[-4rem] mx-auto">
                <!-- Dropdown and Search Bar Section -->
                <div class="flex justify-center items-start space-x-8 w-full py-5 px-5">
                    <!-- Location Text Bar -->
                    <div class="flex flex-col items-start w-1/3">
                        <input v-model="location" type="text" placeholder="Location"
                            class="w-full p-2 bg-gray-100 rounded-lg focus:outline-none" />
                        <p class="text-left text-sm mt-2 text-gray-600 px-3">Select Your Destination</p>
                    </div>

                    <div class="h-16 border-l border-gray-300"></div>

                    <!-- Star Rating Dropdown -->
                    <div class="flex flex-col items-start w-1/3">
                        <select v-model="stars" class="w-full p-2 bg-gray-100 rounded-lg focus:outline-none">
                            <option value="" disabled selected class="text-gray-100">Rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                        <p class="text-left text-sm mt-2 text-gray-600 px-3">Choose Minimum Star Rating</p>
                    </div>

                    <div class="h-16 border-l border-gray-300"></div>

                    <!-- Search Button -->
                    <div class="w-1/3">
                        <button @click="searchHotels"
                            class="w-[80%] py-6 px-4 bg-[#2c2c2c] text-white rounded-xl">Search</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <!-- Display Hotels -->
    <div v-if="loading" class="text-center mt-24">
        <p class="text-lg font-semibold text-gray-700">Loading hotels...</p>
    </div>

    <div v-if="hotels.length > 0" class="mt-32 space-y-6">
        <h2 class="text-2xl font-bold text-center text-gray-800">Available Hotels</h2>

        <div v-for="hotel in hotels" :key="hotel.id"
            class="mb-8 p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex space-x-4 mb-4 group">
                <img :src="hotel.img" :alt="hotel.name"
                    class="w-1/2 h-48 object-cover rounded-lg transition-all duration-300 group-hover:h-96  " />
                <img :src="hotel.img2" :alt="hotel.name"
                    class="w-1/2 h-48 object-cover rounded-lg transition-all duration-300 group-hover:h-96" />
            </div>
            <div class="space-y-2">
                <h3 class="font-semibold text-xl text-gray-900">{{ hotel.name }}</h3>
                <p class="text-gray-700">{{ hotel.city }}</p>
                <p class="font-medium text-gray-800">Rates: ${{ hotel.price }}</p>
                <p class="text-gray-500">{{ hotel.rating }} stars</p>
            </div>
            <div class="flex justify-end mt-4">
                <button @click="bookhotel(hotel)"
                    class="px-4 py-2 bg-[#64748b] text-white font-medium rounded-lg hover:bg-blue-300 transition duration-200">
                    Book Now
                </button>
            </div>
        </div>



        <!-- No Hotels Found Message -->
        <div v-if="hotels.length === 0 && !loading" class="mt-8 text-center text-gray-600">
            <p class="text-lg font-semibold">No hotels found for <span class="font-bold text-gray-800">{{ location
                    }}</span>
            </p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 mt-4 text-center">
            <p class="text-lg font-semibold">{{ error }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // <-- Import this

const router = useRouter(); // <-- Initialize the router

const location = ref('');
const stars = ref('');
const hotels = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Define the custom layout for this page
definePageMeta({
    layout: 'custom',
})

const video = ref<HTMLVideoElement | null>(null)

const togglePlay = () => {
    if (video.value) {
        const playButton = document.getElementById('playButton') as HTMLElement
        if (video.value.paused) {
            video.value.play()
            playButton.classList.add('hidden')
        } else {
            video.value.pause()
            playButton.classList.remove('hidden')
        }
    }
}

const onVideoEnded = () => {
    if (video.value) {
        video.value.currentTime = 0
        const playButton = document.getElementById('playButton') as HTMLElement
        playButton.classList.remove('hidden')
    }
}

const searchHotels = async () => {
    loading.value = true;
    error.value = null;

    try {
        const queryParams = new URLSearchParams();
        queryParams.append('location', location.value);
        if (stars.value > 0) {
            queryParams.append('stars', stars.value.toString());
        }

        const response = await fetch(`/api/Hotel?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        hotels.value = data;
    } catch (err) {
        error.value = 'Failed to load hotels';
    } finally {
        loading.value = false;
    }
};

// Function to save selected hotel details and navigate to the booking page
const bookhotel = (hotel: any) => {
    localStorage.setItem("selectedHotel", JSON.stringify(hotel)); // Save hotel details
    router.push("/booking"); // Navigate to booking page
};

</script>

<style scoped>
/* No extra styles are necessary because Tailwind handles everything. */
</style>
