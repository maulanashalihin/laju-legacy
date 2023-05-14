<script> 
    let form = {
        id : "1",
        title : "Form Saya"
    }

    export let user;

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
    hai nama saya  {user.name}
    <div id="form" data="{JSON.stringify(form)}">

    </div> 
</body>
</html>