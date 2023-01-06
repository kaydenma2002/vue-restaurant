<template>
    About me
</template>
<script>
export default {
    mounted(){
        console.log(localStorage.getItem("jwtToken"))
        localStorage.removeItem("jwtToken")
    }
}
</script>