<template>
  <div>
    <header>
      <SignedOut>
        <!-- No SignInButton here; it will only appear in signin.vue -->
      </SignedOut>
      <!-- <SignedIn>
        <UserButton />
      </SignedIn> -->
    </header>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
