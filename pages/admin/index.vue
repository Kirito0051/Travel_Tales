<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Admin Dashboard</h2>

            <!-- Show Loading -->
            <div v-if="loadingUsers || loadingActive" class="text-gray-600">Loading user data...</div>

            <!-- Show Error -->
            <div v-if="errorUsers || errorActive" class="text-red-600 bg-red-100 p-4 rounded-lg">
                Failed to load user data.
            </div>

            <!-- Layout: Active Users (Left) & Graph (Right) -->
            <div v-if="activeUsersData || userStatsData" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <!-- Left: Active Users -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">Top 5 Active Users</h3>
                    <ul v-if="activeUsersData?.activeUsers?.length">
                        <li v-for="user in activeUsersData.activeUsers" :key="user.id"
                            class="p-2 border-b last:border-b-0 flex justify-between items-center">
                            <div>
                                <span class="font-medium">{{ user.first_name }} {{ user.last_name }}</span>
                                <p class="text-gray-500 text-sm">
                                    Last Active: {{ new Date(user.last_active_at * 1000).toLocaleString() }}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-gray-500">No active users available.</p>
                </div>

                <!-- Right: Circular Graph -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-md flex justify-center items-center">
                    <div v-if="userStatsData" class="w-80 h-80">
                        <canvas ref="doughnutChartCanvas"></canvas>
                    </div>
                    <p v-else class="text-gray-500">No user data available.</p>
                </div>

            </div>

            <!-- Show No Data Message -->
            <div v-else class="text-gray-600 text-center mt-6">
                No user data available.
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, useFetch, watchEffect } from "#imports";
import { useAuth, useUser, useRouter } from "#imports";
import Chart from "chart.js/auto"; // Import Chart.js

const router = useRouter();
const { isSignedIn } = useAuth();
const { user } = useUser();

// Redirect if the user is not an admin
watchEffect(() => {
    console.log("User Data:", user.value);

    if (isSignedIn.value && user.value) {
        const isAdmin = user.value.publicMetadata?.role === "admin" || user.value.publicMetadata?.isAdmin === true;

        if (!isAdmin) {
            console.log("Not an admin! Redirecting...");
            router.push("/");
        } else {
            console.log("Admin access granted!");
        }
    }
});

// Fetch Total Users Data (for Graph)
const { data: userStatsData, pending: loadingUsers, error: errorUsers } = useFetch("/api/clerk/users");

// Fetch Active Users Data (for Left Side)
const { data: activeUsersData, pending: loadingActive, error: errorActive } = useFetch("/api/clerk/ActiveUsers");

// Create a reference for the doughnut chart
const doughnutChartCanvas = ref(null);

// Function to render the circular (doughnut) chart
const renderDoughnutChart = () => {
    if (!userStatsData.value || !doughnutChartCanvas.value) return;

    const ctx = doughnutChartCanvas.value.getContext("2d");

    // Destroy previous chart instance if it exists
    if (doughnutChartCanvas.value.chartInstance) {
        doughnutChartCanvas.value.chartInstance.destroy();
    }

    // Create new chart
    doughnutChartCanvas.value.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(userStatsData.value.userStats), // Months
            datasets: [
                {
                    label: "Users per Month",
                    data: Object.values(userStatsData.value.userStats), // User count
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#10B981", "#6366F1", "#F59E0B"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
};

// Watch for data changes and render the chart
watchEffect(() => {
    if (userStatsData.value) {
        renderDoughnutChart();
    }
});
</script>
