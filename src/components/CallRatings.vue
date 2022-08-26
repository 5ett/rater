<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
    
    const router = useRouter()
    const ratings = ref([])
    const limit = ref(null)
    const current = ref(1)

    const getRatings = async() => {
        try{
            response = await axios.get("https://dbeb-45-222-192-146.ngrok.io/Ratings?Page="+current.value, 
            {
                headers: {
                    'Authorization': import.meta.env.VITE_PRIVATE_KEY, 
                    'Content-type' : 'application/json'
                }
            })

            response.data.data.results.forEach(rating=>{
                ratings.value.push(rating)
            })

            if (current.value = response.data.data.totalPages){
                limit.value = true
                return
            } 
        }catch(err){
            alert('failed to fetch ratings')
        }
    }

    getRatings()

    const nextPage = () => {
        current.value++
        getRatings()
    }

    const backPage = () => {
        if (current.value > 1){
            current.value--
            getRatings()
        }
    }

    const removeUserAndToken = () => {
       let userCred = localStorage.getItem('userBearerToken')
       if (userCred){
            localStorage.setItem('userBearerToken', null)
            router.push({name: 'login'})
       }
    }

</script>

<template>
    <div class="mb-20 text-gray-700 flex justify-between">
        <h2 class="font-semibold">Ratings</h2>
        <button class="text-sm underline border-0" @click="removeUserAndToken">logout</button>
    </div>

    <table class="table-auto rounded-lg shadow-lg text-left border-collapse text-sm w-full">
        <thead class="h-12 px-6 bg-zinc-100 rounded-t-lg">
            <tr class="rounded-t-lg">
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left ">Created by</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Comment</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Stars</th>
            </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800 rounded-b-lg" v-if="ratings.length>0">
            <tr v-for="(rating, index) in ratings" :key="index" class="odd:bg-white even:bg-slate-50">
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">rating.createdBy</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">rating.comment</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">rating.stars</td>
            </tr>
            <tr class="w-full">
                <div class="inline-flex w-full h-12 align-end justify-end py-2">
                    <button @click="backPage" :disabled="current<=1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-sm py-2 px-3 rounded-r focus:outline-0 disabled:opacity-2.5 disabled:bg-gray-100 disabled:hover:ring-0 focus:outline-0">
                        Prev
                    </button>
                    <button @click="nextPage" :disabled="limit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded-l disabled:opacity-2.5 disabled:bg-gray-100 disabled:hover:ring-0 focus:outline-0">
                        Next
                    </button>
                </div>
            </tr>
        </tbody>

        <tbody v-else class="bg-white dark:bg-slate-800 rounded-b-lg">
            <tr>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">ratings will appear here</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">ratings will appear here</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">ratings will appear here</td>
            </tr>
        </tbody>
    </table>

    <router-link :to="{name: 'rater'}" class="text-sm underline text-left">
        <button class="my-8 bg-blue-400 text-white text-sm px-5 py-1.5 rounded-2xl disabled:bg-zinc-200 disabled:text-gray-600" :disabled="ratings.length<1">New rating</button>
    </router-link>
</template>

<style>

</style>

