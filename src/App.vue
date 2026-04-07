<template>
  <div id="app">
    <div v-if="userData !== null">
      <Header
          :userDataProps="this.userData"
        />
          <router-view></router-view>
    </div>

    <div v-else>
      <Loginpage/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loginpage from '@/views/Loginpage.vue';
import axios from 'axios';

export default {
  name:"App",
  components:{
    Header,
    Loginpage
  },
  data() {
    return {
      userData:null,
    }
  },
  created() {
    this.checkSessionOnStartup();
  },
  mounted() {
    
  },
  methods: {
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return JSON.parse(getUserData);
    },
    
    checkSessionOnStartup(){
      const proxy = this;
      
      // ตรวจสอบ session จาก backend ก่อน
      axios.post(this.getUrl() + 'intsys/rao/rao_backend/api/checksession', {})
        .then(res => {
          console.log('checksession response:', res.data);
          
          if (res.data.hasSession && res.data.userData) {
            // มี session ใน backend - ใช้ข้อมูลจาก backend
            const userData = res.data.userData;
            
            // บันทึกลง localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Update Vuex store
            this.$store.commit('setUserData', userData);
            
            // Set data
            proxy.userData = userData;
            console.log('Using backend session');
          } else {
            // ไม่มี session ใน backend - ตรวจสอบ localStorage
            const localUserData = proxy.getSessionStorage();
            
            if (localUserData) {
              // ตรวจสอบว่า session หมดอายุหรือไม่
              const currentTime = Math.floor(Date.now() / 1000);
              
              if (localUserData.loginexpire && localUserData.loginexpire > currentTime) {
                // Session ยังไม่หมดอายุ
                proxy.userData = localUserData;
                this.$store.commit('setUserData', localUserData);
                console.log('Using localStorage session');
              } else {
                // Session หมดอายุ
                localStorage.removeItem('userData');
                proxy.userData = null;
                this.$store.commit('clearUserData');
                console.log('Session expired, cleared localStorage');
              }
            } else {
              // ไม่มี session ทั้ง backend และ localStorage
              proxy.userData = null;
              console.log('No session found');
            }
          }
        })
        .catch(err => {
          console.error('checksession error:', err);
          
          // ถ้า API error - ใช้ localStorage แทน
          const localUserData = proxy.getSessionStorage();
          
          if (localUserData) {
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (localUserData.loginexpire && localUserData.loginexpire > currentTime) {
              proxy.userData = localUserData;
              this.$store.commit('setUserData', localUserData);
            } else {
              localStorage.removeItem('userData');
              proxy.userData = null;
              this.$store.commit('clearUserData');
            }
          } else {
            proxy.userData = null;
          }
        });
    },
  },
}
</script>

<style>

</style>