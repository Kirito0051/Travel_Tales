<script setup>
import { ref, onMounted } from "vue";

const activeUsers = ref([]);

const fetchActiveUsers = async () => {
    try {
        const res = await fetch("/api/clerk/ActiveUsers");
        const data = await res.json();

        if (data.error) {
            console.error("Error fetching active users:", data.error);
            return;
        }

        activeUsers.value = data.activeUsers;
    } catch (error) {
        console.error("Error fetching active users:", error);
    }
};

onMounted(fetchActiveUsers);
</script>

<template>
    <div class="p-4 bg-white shadow-md rounded-lg w-full max-w-md">

        <ul v-if="activeUsers.length">
            <li v-for="(user, index) in activeUsers" :key="user.id" class="flex items-center space-x-3 p-2">
                <span class="text-lg font-bold">{{ index + 1 }}.</span>
                <img :src="user.image_url" class="w-10 h-10 rounded-full" />
                <div>
                    <p class="font-semibold">{{ user.username || user.email }}</p>
                    <p class="text-sm text-gray-500">
                        Last Active: {{ new Date(user.last_active_at * 1000).toLocaleString() }}
                    </p>
                </div>
            </li>
        </ul>
        <p v-else class="text-gray-500">Loading...</p>
    </div>
</template>
