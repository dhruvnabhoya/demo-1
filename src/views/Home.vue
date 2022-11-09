<template>
    <div>
        <!-- <b-card title="Kick start your project 🚀">
        <b-card-text>All the best for your new project.</b-card-text>
        <b-card-text>Please make sure to read our <b-link
            href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
            target="_blank"
        >
            InteGreat Oversigt
        </b-link> to understand where to go from here and how to use our template.</b-card-text>
        </b-card> -->
    <!-- 
        <b-card title="Want to integrate JWT? 🔒">
        <b-card-text>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</b-card-text>
        <b-card-text>Please read our  JWT Documentation to get more out of JWT authentication.</b-card-text>
        </b-card> -->
    </div>
</template>

<script>
    import { BCard, BCardText, BLink } from 'bootstrap-vue'
    import axios from "axios";

    export default {
        props: {
            
        },
        components: {
            BCard,
            BCardText,
            BLink,
        },
        created(){
            this.mytoken = localStorage.getItem("token");
            if (this.mytoken == "" ) {
                localStorage.removeItem("token");
                this.$router.push({ name: "login" });
            }
            else{
                var config = {
                    method: "get",
                    url: "https://engine.netsupport.dk:8270/login/v1/checktoken/"+this.mytoken
                };
                axios(config)
                .then((response) => {
                    if(response.data.token.status == true){
                        console.log('Home');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    if(error.response.status == 404)
                    {
                        localStorage.setItem("token", '');
                        localStorage.removeItem("username");
                        localStorage.removeItem("days");
                        localStorage.removeItem("pagesize");
                        window.location.href = '/login';
                    }
                });
            }
        }
    }
</script>

<style>

</style>
