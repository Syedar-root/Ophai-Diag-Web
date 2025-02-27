<template>
    <div class="container">
        <div class="header">
            <div class="wrap">
                <div class="logoPos"></div>
                <div class="menuPos"></div>
                <div class="userPos"></div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header {
    width: 100%;
    flex-grow: 1;
    background-color: #000;
}

.main {
    width: 100%;
    flex-grow: 15;
    background-color: #fff;
}
</style>

<script setup>

</script>
