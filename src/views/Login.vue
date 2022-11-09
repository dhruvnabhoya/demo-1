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
                <h2 
                    class="brand-text text-primary ml-1"
                >
                    {{ $t('InteGreat') }}
                </h2>
            </b-link>
            <!-- /Brand logo-->

            <!-- Left Text-->
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div
                    class="w-100 d-lg-flex align-items-center justify-content-center px-5"
                >
                    <b-img 
                        fluid 
                        :src="imgUrl" 
                        alt="Login V2" 
                        width="700px"
                    />
                </div>
            </b-col>
            <!-- /Left Text-->

            <!-- Login-->
            <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title title-tag="h2" class="font-weight-bold mb-1">
                        {{ $t('Welcome to InteGreat') }}! 👋
                        <div style="width: 50%;">
                            <locale  style="list-style: none;"/>
                        </div>
                    </b-card-title>
                    <b-card-text class="mb-2">
                        {{ $t('Please sign-in to your account') }}
                    </b-card-text>

                    <!-- form -->
                    <validation-observer ref="loginValidation">
                        <b-form 
                            class="auth-login-form mt-2" 
                            @submit.prevent
                        >
                            <!-- email -->
                            <b-form-group 
                                :label="$t('Email or Username')" 
                                label-for="login-email"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Email"
                                    rules="required"
                                >
                                    <b-form-input
                                        id="login-email"
                                        v-model="userEmail"
                                        :state="errors.length > 0 ? false : null"
                                        name="login-email"
                                        placeholder="john@example.com"
                                    />
                                    <small 
                                        class="text-danger"
                                    >
                                        {{ errors[0] }}
                                    </small>
                                </validation-provider>
                            </b-form-group>

                            <!-- forgot password -->
                            <b-form-group>
                                <validation-provider
                                    #default="{ errors }"
                                    name="Password"
                                    rules="required"
                                >
                                    <b-input-group
                                        class="input-group-merge"
                                        :class="errors.length > 0 ? 'is-invalid' : null"
                                    >
                                        <b-form-input
                                            id="login-password"
                                            v-model="password"
                                            :state="errors.length > 0 ? false : null"
                                            class="form-control-merge"
                                            :type="passwordFieldType"
                                            name="login-password"
                                            placeholder="············"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon
                                                class="cursor-pointer"
                                                :icon="passwordToggleIcon"
                                                @click="togglePasswordVisibility"
                                            />
                                        </b-input-group-append>
                                    </b-input-group>
                                    <small 
                                        class="text-danger"
                                    >
                                        {{ errors[0] }}
                                    </small>
                                </validation-provider>
                            </b-form-group>
                            <b-button
                                type="submit"
                                variant="primary"
                                block
                                @click="validationForm"
                            >
                                {{ $t('Sign in') }}
                            </b-button>
                        </b-form>
                    </validation-observer>
                    <b-card-text class="text-center mt-2 custom-text">
                        <span>{{ $t('New on our platform') }} ? </span>
                        <b-link :to="{ name: 'registration' }">
                        <span>&nbsp;{{ $t('Create an account') }}</span>
                        </b-link>
                    </b-card-text>
                </b-col>
            </b-col>
            <!-- /Login-->
        </b-row>
    </div>
</template>

<script>
    /* eslint-disable global-require */
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import VuexyLogo from "@core/layouts/components/Logo.vue";
    import Locale from "@core/layouts/components/app-navbar/components/Locale.vue";
    import {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
    } from "bootstrap-vue";
    import { required, email } from "@validations";
    import { togglePasswordVisibility } from "@core/mixins/ui/forms";
    import store from "@/store/index";
    import axios from "axios";
    export default {
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver,
        Locale
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            status: "",
            password: "",
            userEmail: "",
            sideImg: require("@/assets/images/pages/forIG5_light.png"),
            loginImg: require("@/assets/images/pages/new_login.png"),
            // validation rulesimport store from '@/store/index'
            required,
            email,
        };
    },
    beforeCreate() {
        localStorage.setItem("token", '');
    },

    created(){
        localStorage.setItem("token", '');
        localStorage.removeItem("username");
        localStorage.removeItem("days");
        localStorage.removeItem("pagesize");
        localStorage.removeItem("consignor");
        localStorage.removeItem("labels");
        localStorage.removeItem("consignorpallets");
        localStorage.removeItem("labelTransport");
        localStorage.removeItem("labelService");
        localStorage.removeItem("areaCode");
        localStorage.removeItem("selectCarrier");
        localStorage.removeItem("selectProduct");
        localStorage.removeItem("selectService");
        localStorage.removeItem("selectGoodstype");
    },
    
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.sideImg = require("@/assets/images/pages/forIG5_dark.png");
                return this.sideImg;
            }
            return this.sideImg;
        },
        loginUrl(){
            if (store.state.appConfig.layout.skin === "dark") {
                this.loginImg = require("@/assets/images/pages/new_login.png");
                return this.loginImg;
            }
            return this.loginImg;  
        }
    },
    methods: {
        validationForm() {
            this.$refs.loginValidation.validate().then((success) => {
                if (success) {
                    var logindata = JSON.stringify({
                        login: this.userEmail,
                        pass: this.password,
                        app: "vue",
                    });
                    var config = {
                        method: "post",
                        url: "https://engine.netsupport.dk:8270/login/v1/retrievetoken",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: logindata,
                    };
                    axios(config)
                    .then((response) => {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("username", this.userEmail);
                        this.$router.push({ name: "home" });
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("User Not Found");
                    });
                }
            });
        },
    },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/pages/page-auth.scss";
</style>

<style scoped>
    
    .login_logo_img{
        width: 100%;
        max-width: 55px;
    }
    .brand-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
