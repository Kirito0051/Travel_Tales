<template>
    <div class="fixed bottom-24 right-6 z-50">
        <!-- Chat Toggle Button -->
        <button @click="toggleChat" class="bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition">
            <img src="/public/images/Chatbot.gif" alt="Chat" class="w-6 h-auto">
        </button>

        <!-- Chat Window -->
        <div v-if="isOpen"
            class="absolute bottom-16 right-0 w-[30rem] bg-white rounded-lg shadow-xl border border-gray-300">
            <div class="flex justify-between items-center bg-gray-700 p-3 rounded-t-lg border-b border-gray-600">
                <h3 class="text-gray-100 font-semibold">Travel Assistant</h3>
                <button @click="toggleChat" class="text-white hover:text-red-400 transition">&times;</button>
            </div>

            <div class="h-96 overflow-y-auto p-4 bg-gray-100 text-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
                ref="chatContainer">
                <div v-for="(message, index) in messages" :key="index"
                    :class="message.isUser ? 'text-right' : 'text-left'">
                    <div :class="[
                        message.isUser ? 'bg-gray-400 text-black ml-auto' : 'bg-gray-300 text-gray-800',
                        'inline-block p-4 rounded-lg mb-4 max-w-[90%] shadow-md'
                    ]">
                        <div v-if="!message.isUser" class="prose">
                            <div v-html="formatMessage(message.text)" class="space-y-4 
                                [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-gray-600 [&>h2]:mb-2
                                [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-2
                                [&>ul>li]:text-gray-700 [&>strong]:text-blue-600 [&>em]:text-gray-600">
                            </div>
                        </div>
                        <div v-else class="text-black">{{ message.text }}</div>
                    </div>
                </div>
                <div v-if="isLoading" class="text-gray-600 text-sm text-center mt-2">
                    <span class="inline-block animate-pulse">Searching...</span>
                </div>
            </div>

            <div class="border-t border-gray-300 p-3 bg-gray-100">
                <form @submit.prevent="sendMessage" class="flex gap-2">
                    <input v-model="userInput" type="text" placeholder="Ask about travel..."
                        class="flex-1 p-2 border border-gray-600 bg-white text-gray-700 rounded-lg text-sm ">
                    <button type="submit"
                        class="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-400 border border-gray-600 transition">
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { marked } from 'marked'

const genAI = new GoogleGenerativeAI('AIzaSyAEZrAKeii139--_Kfp3NOgbj9suXdv234')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([])
const chatContainer = ref(null)
const isLoading = ref(false)

function formatMessage(text) {
    return marked(text, {
        gfm: true,
        breaks: true
    })
}


function toggleChat() {
    isOpen.value = !isOpen.value
    if (isOpen.value && messages.value.length === 0) {
        // Add welcome message
        messages.value.push({
            text: "Hello! I'm your travel assistant. How can I help you today?",
            isUser: false
        })
    }
}

watch(messages, () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}, { deep: true })

async function sendMessage() {
    if (!userInput.value.trim()) return;

    const userMessage = userInput.value;
    messages.value.push({
        text: userMessage,
        isUser: true
    });
    userInput.value = "";
    isLoading.value = true;

    try {
        const prompt = `
        Respond to the user's question in a helpful way while following these Markdown formatting rules:
        - Use ## for section headings in blue.
        - Use bullet points for lists.
        - Use **bold** for important locations.
        - Use *italics* for descriptions.
        - Keep responses concise and well-structured.
        
        User's question: ${userMessage}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const botMessage = response.text(); // Ensure this correctly extracts the message

        messages.value.push({
            text: botMessage,
            isUser: false
        });
    } catch (error) {
        console.error("Error:", error);
        messages.value.push({
            text: "Sorry, I encountered an error. Please try again.",
            isUser: false
        });
    } finally {
        isLoading.value = false;
    }
}

</script>
