<template>
<div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

        <!-- Brand logo-->
        <b-link class="brand-logo">
                <b-img 
                    fluid 
                    :src="loginUrl" 
                    alt="Login V2" 
                    class="login_logo_img"
                />
                <!-- <h2 
                    class="brand-text text-primary ml-1"
                >
                    {{ $t('InteGreat') }}
                </h2> -->
            </b-link>
        <!-- /Brand logo-->

        <!-- Left Text-->
        <b-col lg="8" class="d-none d-lg-flex align-items-center justify-content-center p-5 flex-column">
            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5 mb-5">
                <b-img fluid :src="imgUrl" alt="Vector" />
            </div>
            <!-- <div class="align-items-center justify-content-center custom-width text-block">
                    <p>{{ info_help_text }}</p> 
                </div> -->
        </b-col>
        <!-- /Left Text-->

        <!-- Register-->
        <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
            <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                <b-card-title title-tag="h2" class="font-weight-bold mb-1">
                    {{ $t('Welcome to InteGreat') }}!
                    <div style="width: 50%;">
                        <locale style="list-style: none;" />
                    </div>
                </b-card-title>
                <b-card-text class="mb-2">
                    {{ $t('Please sign-up') }}
                </b-card-text>

                <!-- form -->
                <validation-observer ref="registerForm">
                    <b-form autocomplete="off" class="auth-register-form mt-2" @submit.prevent>
                        <div class="custom_fieldset">

                            <!-- CVR -->
                            <b-form-group label="CVR" label-for="CVR">
                                <validation-provider #default="{ errors }" name="CVR" rules="required|length:8">
                                    <b-form-input id="CVR" v-model="CVR" name="CVR" @keyup="getCVR()" :state="errors.length > 0 ? false:null" />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>

                            <!-- username -->
                            <b-form-group :label="$t('cvr-name')" label-for="cvr-name">
                                <b-form-input id="cvr-name" v-model="cvrdata.name" name="cvr-name" placeholder="johndoe" readonly />
                            </b-form-group>

                            <!-- address -->
                            <b-form-group :label="$t('cvr-adr')" label-for="cvr-adr">
                                <b-form-textarea v-model="cvrdata.address" class="mb-2 mb-lg-0" readonly />
                            </b-form-group>
                            <b-row>
                                <b-col lg="6" class="d-none d-lg-flex align-items-center">
                                    <b-form-group :label="$t('cvr-zip')" label-for="cvr-zip">
                                        <b-form-input id="cvr-zip" v-model="cvrdata.zipcode" name="cvr-zip" readonly />
                                    </b-form-group>
                                </b-col>
                                <b-col lg="6" class="d-none d-lg-flex align-items-center">
                                    <b-form-group :label="$t('cvr-city')" label-for="cvr-city">
                                        <b-form-input id="cvr-city" v-model="cvrdata.city" name="cvr-city" readonly />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <span class="fieldset_label">{{ $t('Company Info') }}</span>

                        </div>
                        <br>

                        <div class="custom_fieldset">

                            <!-- name -->
                            <b-form-group :label="$t('Name')" label-for="Name">
                                <validation-provider #default="{ errors }" name="Username" rules="required">
                                    <b-form-input id="Name" v-model="userdata.name" name="Name" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>

                            <!-- email -->
                            <b-form-group :label="$t('Email')" label-for="Email">
                                <validation-provider #default="{ errors }" name="Email" rules="required|email">
                                    <b-form-input id="Email" v-model="userdata.email" name="Email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>

                            <!-- telephone -->
                            <b-form-group :label="$t('Telephone')" label-for="Telephone">
                                <validation-provider #default="{ errors }" name="telephone" rules="required">
                                    <b-form-input id="Telephone" v-model="userdata.phone" name="Telephone" :state="errors.length > 0 ? false:null" />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                            <span class="fieldset_label">{{ $t('Personal Info') }}</span>
                        </div>
                        <br>
                        <b-button variant="primary" block type="submit" @click="registrationForm">
                            {{ $t('Next') }}
                            <feather-icon icon="ArrowRightIcon" class="align-middle" />
                        </b-button>
                    </b-form>
                </validation-observer>

                <p class="text-center mt-2 custom-text">
                    <span>{{ $t('Already have an account') }}?</span>
                    <b-link :to="{name:'login'}">
                        <span>&nbsp;{{ $t('Sign in instead') }}</span>
                    </b-link>
                </p>
            </b-col>
        </b-col>
    </b-row>
</div>
</template>

<script>
/* eslint-disable global-require */
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Locale from "@core/layouts/components/app-navbar/components/Locale.vue";
import {
    BRow,
    BCol,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText,
    BFormTextarea,
} from 'bootstrap-vue'
import {
    required,
    email
} from '@validations'
import {
    togglePasswordVisibility
} from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'
import axios from "axios";

export default {
    components: {
        VuexyLogo,
        BRow,
        BImg,
        BCol,
        BLink,
        BButton,
        BForm,
        BCardText,
        BCardTitle,
        BFormCheckbox,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend,
        BFormTextarea,
        // validations
        ValidationProvider,
        ValidationObserver,
        Locale
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            info_help_text: "",
            sideImg: require("@/assets/images/pages/forIG5_light.png"),
            loginImg: require("@/assets/images/logo/NewLogo.svg"),
            // validation
            required,
            email,
            CVR: "",
            userdata: {
                name: "",
                phone: "",
                email: "",
            },
            cvrdata: []
        }
    },
    created() {
        this.infohelpText();
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === 'dark') {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require("@/assets/images/pages/forIG5_dark.png");
                return this.sideImg
            }
            return this.sideImg
        },
        loginUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.loginImg = require("@/assets/images/pages/new_login.png");
                return this.loginImg;
            }
            return this.loginImg;
        }
    },
    methods: {
        // infohelpText(){
        //     var config = {
        //         method: "get",
        //         url: "https://engine.netsupport.dk:7080/account/v1/getinfotext?article=welcome"
        //     };
        //     axios(config)
        //     .then((response) => {
        //         if(response.data.memo){
        //             this.info_help_text = response.data.memo;
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // },
        getCVR() {
            if (this.CVR.length == 8) {
                axios(
                        "https://engine.netsupport.dk:7080/account/v1/getcvrinfo?cvr=" + this.CVR
                    )
                    .then((responseCVR) => {
                        //console.log(responseCVR.data.cvrdata);
                        var cvrinfo = responseCVR.data.cvrdata;
                        this.cvrdata = {
                            name: cvrinfo.name,
                            address: cvrinfo.address,
                            zipcode: cvrinfo.zipcode,
                            city: cvrinfo.city,
                            CVR: cvrinfo.vat
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        registrationForm() {
            if (confirm("I agree to receive personalized emails regarding the InteGreat product and configuration.") == true) {
                this.$refs.registerForm.validate().then(success => {
                if (success) {
                    // axios(
                    //     "https://engine.netsupport.dk:7080/account/v1/economicaccess?cvr=" + this.CVR +
                    //     "&name=" + this.userdata.name +
                    //     "&email=" + this.userdata.email +
                    //     "&mobile=" + this.userdata.phone
                    // )
                    // .then((response) => {
                    //     //console.log(response.data.ecoURL);
                    //     if(response.data.ecoURL){
                    //         this.$toast({
                    //             component: ToastificationContent,
                    //             props: {
                    //                 title: 'Please Accept a Login to the Economic System.',
                    //                 icon: 'EditIcon',
                    //                 variant: 'success',
                    //             },
                    //         });
                    //         this.$router.push({
                    //             name: "acceptance-page",
                    //             params: { 
                    //                 ecoURL: response.data.ecoURL,
                    //                 cookie:response.data.cookie,
                    //                 userdata : this.userdata,
                    //                 CVR : this.CVR
                    //             }
                    //             // params: { 
                    //             //     ecoURL: "https://www.google.com",
                    //             //     cookie:"LNk4Ma5WWchYiG8fmATtM5Mne",
                    //             //     userdata : this.userdata
                    //             // }
                    //         });
                    //     }else{
                    //         alert('Registration Failed..Please Try again Later');
                    //     }
                    // })
                    // .catch(function (error) {
                    //     console.log(error);
                    // });

                    //============new code for new endpoint============//

                    var registerdata = JSON.stringify({
                        cvr: this.CVR,
                        name: this.userdata.name,
                        email: this.userdata.email,
                        telephone: this.userdata.phone
                    });
                    console.log(registerdata);
                    var config = {
                        method: "post",
                        url: "https://engine.netsupport.dk:8270/login/v1/createdemo",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: registerdata,
                    };
                    axios(config)
                    .then((response) => {
                        // localStorage.setItem("token", response.data.token);
                        // localStorage.setItem("username", this.userEmail);
                        // this.$router.push({ name: "home" });
                        console.log(response.data)
                        if(response.data.result.status == true){
                            alert("please check your mail");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("User Not Found");
                    });
                }
            });
            }
            // this.$refs.registerForm.validate().then(success => {
            //     if (success) {
                    // axios(
                    //     "https://engine.netsupport.dk:7080/account/v1/economicaccess?cvr=" + this.CVR +
                    //     "&name=" + this.userdata.name +
                    //     "&email=" + this.userdata.email +
                    //     "&mobile=" + this.userdata.phone
                    // )
                    // .then((response) => {
                    //     //console.log(response.data.ecoURL);
                    //     if(response.data.ecoURL){
                    //         this.$toast({
                    //             component: ToastificationContent,
                    //             props: {
                    //                 title: 'Please Accept a Login to the Economic System.',
                    //                 icon: 'EditIcon',
                    //                 variant: 'success',
                    //             },
                    //         });
                    //         this.$router.push({
                    //             name: "acceptance-page",
                    //             params: { 
                    //                 ecoURL: response.data.ecoURL,
                    //                 cookie:response.data.cookie,
                    //                 userdata : this.userdata,
                    //                 CVR : this.CVR
                    //             }
                    //             // params: { 
                    //             //     ecoURL: "https://www.google.com",
                    //             //     cookie:"LNk4Ma5WWchYiG8fmATtM5Mne",
                    //             //     userdata : this.userdata
                    //             // }
                    //         });
                    //     }else{
                    //         alert('Registration Failed..Please Try again Later');
                    //     }
                    // })
                    // .catch(function (error) {
                    //     console.log(error);
                    // });

                    //============new code for new endpoint============//

                    // var registerdata = JSON.stringify({
                    //     CVR: this.CVR,
                    //     name: this.userdata.name,
                    //     email: this.userdata.email,
                    //     mobile: this.userdata.phone
                    // });

                    // var config = {
                    //     method: "post",
                    //     url: "https://engine.netsupport.dk:8270/login/v1/retrievetoken",
                    //     headers: {
                    //         "Content-Type": "application/json",
                    //     },
                    //     data: registerdata,
                    // };
                    // axios(config)
                    // .then((response) => {
                    //     localStorage.setItem("token", response.data.token);
                    //     localStorage.setItem("username", this.userEmail);
                    //     this.$router.push({ name: "home" });
                    // })
                    // .catch(function (error) {
                    //     console.log(error);
                    //     alert("User Not Found");
                    // });
                // }
            // });
        },
    },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
<style scoped>

    
    .login_logo_img{
        width: 100%;
        max-width: 150px;
    }
    .brand-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }


.custom_fieldset {
    position: relative;
    border: 1px solid #575c68;
    padding: 20px;
}

.fieldset_label {
    position: absolute;
    color: #fff;
    /* bottom: 370px; */
    top: -13px;
    background: #fff;
    color: #283046;
    padding: 3px 20px;
}

.custom-width {
    width: 85%;
}

.custom-text {
    font-weight: bold;
    font-size: medium;
}

.text-block {
    white-space: pre;
}


.brand-logo {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style><style lang="scss" scoped>
.dark-layout {
    .fieldset_label {
        background: #283046;
        color: #fff;
    }
}
</style>
