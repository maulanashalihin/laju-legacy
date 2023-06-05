<script> 
    export let user = {}; 
    import {router} from "@inertiajs/svelte"
    
    function Logout()
    {
        router.post('/logout')
    }
</script> 
Nama : {user.email} 

<button on:click={Logout}>Logout</button>   