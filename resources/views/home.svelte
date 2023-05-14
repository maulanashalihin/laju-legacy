<script> 
    let form = {
        id : "1",
        title : "Form Saya"
    }

    let data = [1,2,3,4];
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    halo perbaiki

    {#each data as item}
        {item}
    {/each}

    <div id="form" data="{JSON.stringify(form)}">

    </div>
    <script>
    //    const props = document.querySelector("#form").getAttrib;
       const data = document.querySelector("#form").getAttribute("data");
       console.log(JSON.parse(data))    
    </script>
</body>
</html>