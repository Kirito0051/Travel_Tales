<template>
    <div class="py-10 min-h-screen bg-gray-50 flex flex-col items-center">
        <!-- Hero Section with Image or Map -->
        <section
            class="w-full h-56 md:h-80 relative bg-cover bg-center flex items-center justify-center bg-[url('/images/japan.jpg')] rounded-3xl overflow-hidden">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
        </section>

        <!-- Contact Section -->
        <section class="w-full max-w-6xl py-8 px-4 md:px-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <!-- Contact Information -->
                <div class="bg-white shadow-lg rounded-2xl p-8 border-2">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                    <p class="text-gray-600 mb-6 text-base leading-relaxed">
                        We’d love to hear from you! Whether you have a question, feedback, or need support, feel free to
                        reach out.
                    </p>
                    <ul class="space-y-4 text-base">
                        <li class="flex items-center">
                            <span class="text-blue-500 mr-4">
                                <i class="fas fa-phone"></i>
                            </span>
                            <p class="text-gray-700">0123456789</p>
                        </li>
                        <li class="flex items-center">
                            <span class="text-blue-500 mr-4">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <p class="text-gray-700">contact@Travel_Tails.com</p>
                        </li>
                        <li class="flex items-center">
                            <span class="text-blue-500 mr-4">
                                <i class="fas fa-map-marker-alt"></i>
                            </span>
                            <p class="text-gray-700">Rrjc Entrance, L Napoo Road, Matunga, Mumbai, Maharashtra 400019
                            </p>
                        </li>
                    </ul>
                </div>

                <!-- Feedback Form -->
                <div class="bg-white shadow-lg rounded-2xl p-8 border-2">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                            <input type="text" id="name" v-model="form.name"
                                class="mt-2 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Enter your name" required />
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
                            <input type="email" id="email" v-model="form.email"
                                class="mt-2 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700">Your Message</label>
                            <textarea id="message" v-model="form.message" rows="4"
                                class="mt-2 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Write your message here..." required></textarea>
                        </div>
                        <div class="text-right">
                            <button type="submit"
                                class="inline-block w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Office Location Section -->
        <section class="w-full max-w-6xl py-8 px-4 md:px-12">
            <div class="bg-white shadow-lg rounded-2xl  p-10 border-2">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Our Office Location</h2>
                <div class="relative w-full h-72">
                    <iframe class="w-full h-full rounded-lg shadow-sm "
                        src="
                        https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482038.3064756847!2d72.56748881524913!3d19.285659248335083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf2892cdfbe1%3A0x3464d48f78846cf9!2sRamnarain%20Ruia%20Autonomous%20College!5e0!3m2!1sen!2sin!4v1738647350471!5m2!1sen!2sin"
                        style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
definePageMeta({
    layout: 'custom',  // Apply the 'default' layout here
});
export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: '',
            },
        };
    },
    methods: {
        submitForm() {
            // Handle form submission
            console.log('Form submitted:', this.form);
            alert('Your message has been sent successfully!');
            this.form = { name: '', email: '', message: '' }; // Reset form
        },
    },
};
</script>

<style></style>
