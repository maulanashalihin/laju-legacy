<script>
  import { inertia,router } from '@inertiajs/svelte' 
    import { password_generator } from '../../Components/helper';
    import DripformIcon from '../../Components/DripformIcon.svelte';

  let form = {
    email: '',
    password: '',
    name : '',
    phone : '',
    password_confirmation: '', 
  }

  export let error;
  function submitForm()
  {
    if(form.password != form.password_confirmation)
    {
      alert("Password and konfirmasi password haru sama")
      return false;
    }
 
    form.phone = form.phone.toString()
    router.post("/register", form)
  }

  function generatePassword()
  { 
    const retVal = password_generator(10); 
    form.password = retVal
    form.password_confirmation = retVal
  }

  

</script>

<section class="bg-gray-50  ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div  class="flex items-center mb-6 text-2xl font-semibold text-gray-900  ">
          <DripformIcon></DripformIcon>
      </div>
      <div class="w-full bg-white rounded-lg shadow   md:mt-0 sm:max-w-md xl:p-0  ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                  Create and account
              </h1>
              
              {#if error}
              <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  " role="alert">
                 {error}
              </div>
              {/if}
              <form class="space-y-4 md:space-y-6" on:submit|preventDefault={submitForm}>
                  <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900  ">Nama</label>
                    <input bind:value={form.name} required type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 placeholder:text-gray-300" placeholder="Maulana Ibrahim" >
                </div>
                
                 
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900  ">Email</label>
                  <input bind:value={form.email} required type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 placeholder:text-gray-300" placeholder="maulanaibrahim@gmail.com" >
              </div> 
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900  ">Password</label>
                      <input bind:value={form.password} required type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 placeholder:text-gray-300" >
                      <button type="button" on:click="{generatePassword}" class="text-xs text-gray-500">Buat Password</button>
                    </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900  ">Konfirmasi password</label>
                      <input bind:value={form.password_confirmation} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5 placeholder:text-gray-300" >
                  </div>
               
                  <button type="submit" class="w-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">Buat Akun Baru</button>
                  <p class="text-sm font-light text-gray-500  ">
                      Sudah punya akun? <a href="/login" use:inertia class="font-medium text-fuchsia-600 hover:underline  ">Login disini</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>