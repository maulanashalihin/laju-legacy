<script>
    import { inertia,router } from '@inertiajs/svelte' 
    import DripformIcon from '../../Components/DripformIcon.svelte';
  
    let form = {
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
    }
    export let error;
    function submitForm()
    {
      
      router.post("/login", {email:form.email,password:form.password})
    }
  </script>
  
  <section class="bg-gray-50  ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div  class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <DripformIcon></DripformIcon>
        </div>
        <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              
                {#if error}
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
                   {error}
                </div>
                {/if}
             

            

               
                <form class="space-y-4 md:space-y-6" on:submit|preventDefault={submitForm}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input bind:value={form.email} required type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 " placeholder="maulanaibrahim@gmail.com" >
                     
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input bind:value={form.password} required type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 " >
                    </div>  
                    <button type="submit" class="w-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">Login</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Belum punya akun?   <a href="/register" use:inertia class="font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-500">Buat disini</a>
                    </p>
                    
                </form>
            </div>
        </div>
    </div>
  </section>