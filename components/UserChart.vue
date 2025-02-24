<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto"; // Auto-registers everything

const chartCanvas = ref(null);
const chartInstance = ref(null);
const userStats = ref([]);

// Fetch real user data from API
const fetchUserStats = async () => {
    try {
        const res = await fetch("/api/clerk/users");
        const data = await res.json();

        if (data.error) {
            console.error("Error fetching users:", data.error);
            return;
        }

        // Convert API response into chart data
        userStats.value = Object.entries(data.userStats)
            .sort((a, b) => new Date(`1 ${a[0]} 2024`) - new Date(`1 ${b[0]} 2024`)) // Sort by month
            .map(([month, count]) => ({ month, count }));

        renderChart();
    } catch (error) {
        console.error("Error fetching user stats:", error);
    }
};

// Render Doughnut Chart
const renderChart = () => {
    if (chartInstance.value) {
        chartInstance.value.destroy(); // Destroy previous chart
    }

    const labels = userStats.value.map((item) => item.month);
    const data = userStats.value.map((item) => item.count);
    const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4CAF50",
        "#9966FF",
        "#FF9F40",
    ]; // Different colors for each section

    chartInstance.value = new Chart(chartCanvas.value, {
        type: "doughnut",
        data: {
            labels,
            datasets: [
                {
                    label: "Users per Month",
                    data,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderColor: "#fff",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        },
    });
};

onMounted(fetchUserStats);
</script>

<template>
    <div class="p-4 bg-white rounded-lg w-64 h-64">
        <h2 class="text-lg font-bold mb-2">User Growth</h2>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
