import {defineStore} from "pinia";
import {ref} from "vue";

export const  useUserStore = defineStore("user", ()=>{
    const user = ref({
        username: null,
    });

	// 测试
	// const user = ref(null)
	function getUser(){
		return user.value;
	}

	function setUser(newUser:any){
		user.value = newUser;
	}
	return{user,setUser,getUser}
});