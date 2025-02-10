<template>
    <div>
        <!-- Hero Section -->
        <section class="relative bg-cover bg-center h-[50rem] text-center text-white overflow-hidden"
            style="background-image: url('/images/herobg.jpg')">
            <!-- Navbar -->
            <nav class="absolute top-0 left-0 w-full bg-transparent p-4 z-20">
                <div class="flex justify-between items-center">
                    <!-- Logo -->
                    <div id="logo" class="text-3xl font-sourGummy text-white ml-4 md:ml-10">
                        <NuxtLink to="/" class="hover:text-blue-500">Travel_Tails</NuxtLink>
                    </div>

                    <!-- Hamburger Button (Custom Icon) -->
                    <button id="hamburger-btn" @click="toggleSidebar"
                        class="text-white text-3xl md:hidden focus:outline-none mr-4">
                        <img src="/public/images/hamburger.png" alt="Hamburger Menu" class="w-8 h-8" />
                    </button>

                    <!-- Navbar Links (Visible on larger screens) -->
                    <div class="hidden md:flex space-x-4 md:space-x-6 font-bob text-base md:text-2xl">
                        <SignedIn>
                            <NuxtLink to="/flights"
                                class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-2xl text-[#4a4947]">
                                Flights
                            </NuxtLink>
                            <NuxtLink to="/hotels"
                                class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-2xl text-[#4a4947]">
                                Hotels
                            </NuxtLink>
                            <NuxtLink to="/car_rental"
                                class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-2xl text-[#4a4947]">
                                Car Rentals
                            </NuxtLink>
                        </SignedIn>
                        <SignedOut>
                            <a @click.prevent="showAuthAlert" class="text-[#4a4947] cursor-pointer hover:text-2xl">
                                Flights
                            </a>
                            <a @click.prevent="showAuthAlert" class="text-[#4a4947] cursor-pointer hover:text-2xl">
                                Hotels
                            </a>
                            <a @click.prevent="showAuthAlert" class="text-[#4a4947] cursor-pointer hover:text-2xl">
                                Car Rentals
                            </a>
                        </SignedOut>
                        <NuxtLink to="/connect"
                            class="transition-all duration-300 ease-in-out hover:scale-105 hover:text-2xl text-[#4a4947]">
                            Connect
                        </NuxtLink>
                    </div>
                </div>

                <!-- Sign-in Modal -->
                <div v-if="isModalOpen"
                    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div class="bg-white p-10 rounded-lg">
                        <p class="text-xl font-bold mb-4">Sign in to continue</p>
                        <SignInButton />
                        <button @click="closeModal" class="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
                    </div>
                </div>

                <!-- Sidebar (Hidden by default) -->
                <div id="sidebar" :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }"
                    class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-30">

                    <button id="close-btn" @click="closeSidebar"
                        class="text-gray-600 text-2xl absolute top-4 right-4 focus:outline-none">
                        ✕
                    </button>
                    <div class="mt-16 space-y-6 px-6 font-bob text-xl">
                        <SignedIn>
                            <NuxtLink to="/flights" class="block text-[#4a4947] hover:text-blue-600">Flights</NuxtLink>
                            <NuxtLink to="/hotels" class="block text-[#4a4947] hover:text-blue-600">Hotels</NuxtLink>
                            <NuxtLink to="/car_rental" class="block text-[#4a4947] hover:text-blue-600">Car Rentals
                            </NuxtLink>
                        </SignedIn>
                        <SignedOut>
                            <NuxtLink to="/" class="block text-gray-500 cursor-not-allowed">Flights</NuxtLink>
                            <NuxtLink to="/" class="block text-gray-500 cursor-not-allowed">Hotels</NuxtLink>
                            <NuxtLink to="/" class="block text-gray-500 cursor-not-allowed">Car Rentals</NuxtLink>
                        </SignedOut>
                        <NuxtLink to="/connect" class="block text-[#4a4947] hover:text-blue-600">Connect</NuxtLink>
                        <!-- <SignInButton class="bg-white text-[#4a4947] rounded-lg z-50" /> -->
                    </div>
                </div>
            </nav>


            <!-- Hero Content (Title, Subtitle, Button) -->
            <div class="absolute top-1/3 left-5 md:left-10 w-full px-4 md:px-10 text-left">
                <h1
                    class="text-3xl sm:text-4xl md:text-6xl font-sourGummy mb-4 transform transition duration-500 hover:scale-105">
                    Discover Your Next Adventure
                </h1>
                <p class="text-base sm:text-lg md:text-xl mb-4 md:mb-6 font-sourGummy">
                    Book flights, hotels, and car rentals effortlessly.
                </p>
                <NuxtLink to="/flights"
                    class="inline-block bg-blue-600 px-6 py-3 text-base text-white rounded-md hover:bg-blue-700 transition transform duration-300 hover:scale-105">
                    Get Started
                </NuxtLink>
            </div>

            <!-- Wave Effect -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 left-0 w-full"
                style="bottom: -10px;">
                <path fill="#ffffff" fill-opacity="1"
                    d="M0,96L48,117.3C96,139,192,181,288,186.7C384,192,480,160,576,165.3C672,171,768,213,864,240C960,267,1056,277,1152,261.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
        </section>
        <!-- Popup Modal -->
        <!-- <div id="popup-modal" v-show="isModalOpen"
            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 max-w-sm w-70 relative">
                <button @click="closeModal" class="absolute top-2 right-2 text-2xl text-gray-600">✕</button>

                 
                <div class="space-y-4">
                    
                    <div>
                        <form @submit.prevent="redirectToLogin">
                            <button type="submit"
                                class="w-60 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition transform duration-300 hover:scale-105">
                                Login
                            </button>
                        </form>
                    </div>

                    
                    <div>
                        <form @submit.prevent="redirectToSignUp">
                            <button type="submit"
                                class="w-60 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition transform duration-300 hover:scale-105">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> -->


        <div>
            <!-- Trigger Button for Popup -->
            <div class="fixed bottom-6 right-6">
                <SignedOut>
                    <!-- No SignInButton here; it will only appear in signin.vue -->
                    <button @click="openModal"
                        class="bg-gray-300 p-4 rounded-full shadow-lg hover:bg-gray-500 transition transform duration-300 hover:scale-105">
                        <img src="/public/images/login_icon.png" alt="login_icon" class="w-6 h-auto">
                    </button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            <!-- Modal Content -->
            <div v-if="isModalOpen"
                class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white p-10 rounded-lg shadow-xl">
                    <div class="text-center">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Sign in to continue</h3>
                        <!-- Add a wrapper div with specific styling for SignInButton -->
                        <div class="signin-button-wrapper">
                            <SignInButton :class="{ 'bg-transparent': true }" />
                        </div>
                        <button @click="closeModal"
                            class="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="w-full p-4 py-20 flex flex-wrap gap-12 justify-center items-center">
            <!-- Feature Cards -->
            <div class="flex items-center gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <img src="/images/fast-booking.gif" alt="Fast Booking" class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <div class="text-left">
                    <p class="text-lg md:text-2xl font-bob">Fast Booking</p>
                    <p class="text-sm md:text-base text-gray-600">Book flights, hotels, and car rentals quickly and
                        easily</p>
                </div>
            </div>
            <div class="flex items-center gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <img src="/images/hotel.gif" alt="Luxury Hotels" class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <div class="text-left">
                    <p class="text-lg md:text-2xl font-bob">Luxury Hotels</p>
                    <p class="text-sm md:text-base text-gray-600">Stay at the most luxurious hotels worldwide</p>
                </div>
            </div>
            <div class="flex items-center gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <img src="/images/trip.gif" alt="Transportation" class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <div class="text-left">
                    <p class="text-lg md:text-2xl font-bob">Convenient Transportation</p>
                    <p class="text-sm md:text-base text-gray-600">Easily book cabs, buses, and other modes of transport
                    </p>
                </div>
            </div>
        </div>
        <div class="w-full px-6 py-12 md:px-10 md:py-28 flex flex-wrap justify-center items-center bg-gray-100">
            <!-- Left Section -->
            <div class="w-full md:w-1/2 flex justify-center items-center relative mb-6 md:mb-0">
                <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg z-10">
                    <img src="/images/girl.jpg" alt="Hotel View" class="w-full h-full object-cover">
                </div>
                <!-- Paper Plane Icon -->
                <img src="/public/images/paper-plane.png" alt="Paper Plane"
                    class="absolute top-0 left-[160px] w-[20vw] md:w-[70px] h-auto p-2 bg-transparent custom-hide">
                <img src="/public/images/sun-hat.png" alt="Sun Hat"
                    class="absolute bottom-0 right-[130px] w-[20vw] md:w-[90px] h-auto p-2 bg-transparent custom-hide">
            </div>

            <!-- Right Section (Text) -->
            <div class="w-full md:w-1/2 text-center md:text-left px-6 md:px-4 relative">
                <h2 class="text-2xl md:text-3xl font-bob text-gray-800 mb-3">Luxury Hotels for Every Traveler</h2>
                <p class="text-gray-600 text-xs md:text-sm mb-3 leading-relaxed">
                    Discover unparalleled comfort and elegance with our handpicked selection of luxury hotels worldwide.
                    Whether for business or leisure, we have the perfect stay tailored for you.
                </p>
                <NuxtLink to="/hotels"
                    class="inline-block bg-blue-600 px-5 py-2 text-sm text-white rounded-full hover:bg-blue-700 transition transform duration-300 hover:scale-105">
                    Explore Hotels
                </NuxtLink>
                <img src="/public/images/random-star.png" alt="Paper Plane"
                    class="absolute top-[-100px] right-10 w-[20vw] md:w-[70px] h-auto p-2 bg-transparent custom-hide">
            </div>

        </div>
        <img src="/images/star-ani.gif" alt="Star Icon" class="w-16 h-auto absolute right-[450px] z-10 custom-hide">
        <div class="w-full px-6 py-12 md:px-10 md:py-20 flex flex-col items-center bg-gray-100">
            <!-- Header -->
            <!-- Paragraph with Star Icon -->
            <p class="text-lg text-gray-800 font-atma flex items-center space-x-2">
                <img src="/public/images/stars.png" alt="Star Icon" class="w-6 h-6">
                <!-- Replace with your star image path -->
                Discover World-Renowned Tourist Destinations
            </p>

            <!-- Header -->
            <h2 class="text-4xl font-bob mb-6 text-gray-800">
                Featured Tourist Spots You Can't Miss
            </h2>


            <!-- Images Container (One line, even spacing) -->
            <div class="flex justify-evenly items-center w-full max-w-6xl mx-auto gap-x-8 py-10">
                <!-- First Image (Hidden at 800px or below) -->
                <div class="w-1/5 hidden md:block">
                    <img src="/images/eiffel.jpg" alt="Eiffel Tower"
                        class="w-full h-80 object-cover rounded-full shadow-lg">
                    <p class="text-center mt-4 text-2xl font-bob text-gray-800">Eiffel Tower</p>
                </div>

                <!-- Second Image -->
                <div class="w-1/4 md:w-1/5">
                    <img src="/images/Taj.jpg" alt="Taj Mahal" class="w-full h-80 object-cover rounded-full shadow-lg">
                    <p class="text-center mt-4 text-2xl font-bob text-gray-800">Taj Mahal</p>
                </div>

                <!-- Third Image -->
                <div class="w-1/4 md:w-1/5">
                    <img src="/images/Burj.jpg" alt="Burj Khalifa"
                        class="w-full h-80 object-cover rounded-full shadow-lg">
                    <p class="text-center mt-4 text-2xl font-bob text-gray-800">Burj Khalifa</p>
                </div>

                <!-- Fourth Image -->
                <div class="w-1/4 md:w-1/5">
                    <img src="/images/japan.jpg" alt="Mount Fuji"
                        class="w-full h-80 object-cover rounded-full shadow-lg">
                    <p class="text-center mt-4 text-2xl font-bob text-gray-800">Mount Fuji</p>
                </div>

                <!-- Fifth Image (Hidden at 800px or below) -->
                <div class="w-1/5 hidden md:block">
                    <img src="/images/statue.jpg" alt="Statue of Liberty"
                        class="w-full h-80 object-cover rounded-full shadow-lg">
                    <p class="text-center mt-4 text-2xl font-bob text-gray-800">Statue of Liberty</p>
                </div>
            </div>

        </div>
        <!-- Add this before the closing </div> in your template -->
        <!-- Auth Required Popup -->
        <div v-if="showAuthPopup" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-center">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Authentication Required</h3>
                    <p class="text-gray-600 mb-6">Please sign in to access this feature.</p>
                    <div class="space-y-4">
                        <SignInButton />
                        <button @click="closeAuthPopup"
                            class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
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
        <Chatbot />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chatbot from '~/components/Chatbot.vue'

const isModalOpen = ref(false)
const isSidebarOpen = ref(false)
const showAuthPopup = ref(false)


const showAuthAlert = () => {
    showAuthPopup.value = true
}

const closeAuthPopup = () => {
    showAuthPopup.value = false
}

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}

const handleOutsideClick = (event) => {
    const sidebar = document.getElementById("sidebar")
    const hamburgerBtn = document.getElementById("hamburger-btn")

    if (sidebar && hamburgerBtn && !sidebar.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        closeSidebar()
    }
}

onMounted(() => {
    document.addEventListener("click", handleOutsideClick)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleOutsideClick)
})
</script>



<style scoped>
@media (max-width: 1375px) {
    .custom-hide {
        display: none !important;
    }
}
</style>