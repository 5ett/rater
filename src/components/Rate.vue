<script setup>
    import { ref, watchEffect } from 'vue';
    import axios from "axios";
    import {uid} from 'uid'
    import { useRouter, useRoute } from 'vue-router';
    // import calls from '../API/calls'
    
    const router = useRouter()
    const route = useRoute()
    const comment = ref(null)
    const stars = ref(0)
    const userBearer = JSON.parse(localStorage.getItem('userBearerToken'))
    
    const submitRating = async () =>{
        const itemId = uid(6)
        try{
            const response = await axios.post('https://dbeb-45-222-192-146.ngrok.io/Ratings',
                {
                    "ItemId": itemId,
                    "Comment": comment.value,
                    "Stars": stars.value
                }, 
                {
                    headers: {
                        'Authorization': userBearer
                    }
                }
            )

            router.push({name:'ratings'})
            alert('rating added')

        } catch(err){
            alert('failed to add ratings')
        }
        

    }

    watchEffect(()=>{
        if(comment.value != null){
            
        }
    })

</script>

<template>
    <div class="mb-15 text-gray-700 font-semibold text-left"><h2>Add new rating</h2></div>
    <router-link :to="{name: 'rating'}" class="text-sm underline text-left">
        <p class="my-8">Back</p>
    </router-link>

    <form @submit.prevent="submitRating" class="w-96 shadow-lg bg-zinc-50 max-w-lg h-54 px-5 py-4 rounded-xl text-left">
        <span class="w-full text-left text-sm px-0">Comment</span>
        <input type="text" v-model="comment" class="block w-full rounded-md px-3 py-2 my-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
        <label class="flex-col align-left pb-5 my-8">
            <span class="block text-sm font-medium text-slate-700">Rating</span>
            <input type="number" v-model="stars" min="0" max="5" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
        </label>
        <button type="submit" :disabled="!comment" class="w-full disabled:bg-zinc-200 disabled:text-gray-600 text-white bg-blue-400 rounded-2xl font-medium text-medium text-sm py-1.5 px-4 my-5 focus:outline-0 focus:ring-0 hover:ring-0">Add comment</button>
    </form>  
</template>

<style>

</style>