<template>
    <div class="flex flex-col min-h-screen">
        <!-- Navbar -->
        <Navbar />

        <!-- Main Content -->
        <main class="flex-grow pb-[8rem]"> <!-- Add padding-bottom -->
            <div class="container mx-auto p-4">
                <slot />
            </div>
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>
