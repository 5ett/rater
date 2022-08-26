<script setup>
    import { ref } from 'vue';
    import axios from "axios";
    import { useRouter } from "vue-router";
    
    const router = useRouter()
    const userPhoneNumber = ref(null)
    
    const login = async () =>{
    
        try{
            const response = await axios.post('https://dbeb-45-222-192-146.ngrok.io/Auth', {'PhoneNumber': userPhoneNumber.value}, { headers:{'Authorization': import.meta.env.VITE_AUTH_TOKEN,}})

            localStorage.setItem('userBearerToken', JSON.stringify(response.data.data.token))
            console.log(localStorage.getItem('userBearerToken'))
            router.push({name: 'rating'})

        } catch(err){
            alert('failed to log in')
        }
    }

</script>

<template>
    <div class="mb-20 text-gray-700 font-semibold text-left"><h2>Log in</h2></div>
    <form class="flex-col justify-center align-center shadow-lg bg-zinc-50 max-w-sm px-10 py-5 rounded-xl" @submit.prevent="login()">
        <p class="text-sm mb-3 font-medium text-left w-full">Enter phone number</p>
        <input type="text" v-model="userPhoneNumber" placeholder="Eg: 0233344453" class="w-full mt-1 px-4 rounded-lg py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
        <button type="submit" :disabled="!userPhoneNumber" class="w-full rounded-full my-3 px-4 py-1 bg-blue-400 text-white disabled:bg-zinc-300 disabled:text-gray-600 font-medium focus:bg-blue-500 focus:ring-0 focus:outline-0">
            login
        </button>
    </form>
    
</template>

<style>

</style>