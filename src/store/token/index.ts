import {defineStore} from "pinia";
import {ref} from "vue";

export const useTokenStore = defineStore("token", () => {
    const token = ref<string>("");
    const expire = ref<Date|null>(null);
    function getToken() {
        return token.value;
    }
    function setToken(newToken: string) {
        token.value = newToken;
        expire.value = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    }

    function isTokenExpired() {
        return expire.value < Date.now();
    }
    return { token, expire,setToken, getToken , isTokenExpired}
},{
    persist: true
})