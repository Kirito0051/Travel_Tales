export default defineNuxtRouteMiddleware((to, from) => {
  const { isSignedIn } = useAuth(); // Clerk's auth function

  if (!isSignedIn.value) {
    return navigateTo("/"); // Redirect to home page if not authenticated
  }
});
