<template>
    <section class="invoice-add-wrapper">
        <b-row class="invoice-add">

            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="9"
                md="8"
            >
                <validation-observer ref="loginValidation">
                    <b-form @submit.prevent>
                        <b-card
                            no-body
                            class="invoice-preview-card"
                        >
                            <!-- Header -->
                            <b-card-body class="invoice-padding pb-0 card_cls">
                                <div class="d-flex justify-content-between flex-column invoice-spacing mt-0">

                                    <!-- Header: Left Content -->
                                    <div>
                                        <div class="logo-wrapper">
                                            <!-- <b-img fluid :src="imgUrl" alt="Login V2" style="max-width: 35px;"/>
                                            <h3 class="text-primary invoice-logo">
                                                InteGreat
                                            </h3> -->
                                        </div>
                                        <div>
                                            <b-row>
                                                <b-col
                                                    cols="12"
                                                    lg="3"
                                                >
                                                    <validation-provider
                                                        #default="{ errors }"
                                                        name="orderNumber"
                                                        rules="required"
                                                    >
                                                        <b-card-text class="mb-25">
                                                            <b-form-input
                                                                id="invoice-data-id"
                                                                v-model="orderdata.orderNumber"
                                                                :state="errors.length > 0 ? false : null"
                                                                :placeholder="$t('Order Number')"
                                                            />   
                                                        </b-card-text>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="3"
                                                >
                                                    <b-card-text class="mb-25">
                                                        <validation-provider
                                                            #default="{ errors }"
                                                            name="shop"
                                                            rules="required"
                                                        >
                                                            <v-select
                                                                v-model="orderdata.shop"
                                                                :state="errors.length > 0 ? false : null"
                                                                dir="ltr"
                                                                :options="shopOptions"            
                                                                class="invoice-filter-select"
                                                                :placeholder="$t('Shop')"
                                                            >
                                                                <template #selected-option="{ label }">
                                                                    <span class="text-truncate overflow-hidden">
                                                                        {{ label }}
                                                                    </span>
                                                                </template> 
                                                            </v-select>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </validation-provider>
                                                    </b-card-text>
                                                    &nbsp;
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="6"
                                                >
                                                    <validation-provider
                                                        #default="{ errors }"
                                                        name="postal"
                                                        rules="required"
                                                    >
                                                        <b-card-text class="mb-0">
                                                            <b-form-input
                                                                id="invoice-data-id"
                                                                v-model="postal"
                                                                :state="errors.length > 0 ? false : null"
                                                                :placeholder="$t('Postal')"
                                                                v-on:keyup="getAddress()"
                                                            />  
                                                        </b-card-text>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                        <div v-if="postal.length >= 4">
                                                            <div v-if="shopAdd.length <= 0">
                                                                <p>{{ $t('No Shop Found in This Area') }}</p>
                                                            </div>
                                                            
                                                            <validation-provider
                                                                #default="{ errors }"
                                                                name="shopAddress"
                                                                rules="required"
                                                            >
                                                                <ul class="inteGreat_check_mn ul_cls">
                                                                    <li v-for="item in shopAdd" :key="item.id">
                                                                        <input 
                                                                            class="btn-check" 
                                                                            id="success-outlined" 
                                                                            type="radio" 
                                                                            v-model="orderdata.shopAddress"
                                                                            :state="errors.length > 0 ? false : null"
                                                                            :value="item"
                                                                        >
                                                                            {{ item }}
                                                                    </li>
                                                                </ul>
                                                                <small class="text-danger">{{ errors[0] }}</small>
                                                            </validation-provider>
                                                        </div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <div>
                                            <b-row>
                                                <b-col
                                                    cols="12"
                                                    lg="2"
                                                >
                                                    <b-button
                                                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                                        variant="outline-primary"
                                                        block
                                                        @click="addOrder()"
                                                    >
                                                        {{ $t('Create') }}
                                                    </b-button>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </div> 
                                </div>
                            </b-card-body> 
                        </b-card>
                    </b-form>
                </validation-observer>
            </b-col>
            <!-- Right Col: Card -->
            <b-col
                cols="12"
                md="4"
                xl="3"
                class="invoice-actions mt-md-0 mt-2"
            >

                <!-- Action Buttons -->
                <b-card>

                    <!-- Button: Send Invoice -->
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mb-75"
                        block
                        disabled
                    >
                        {{ $t('Send Invoice') }}
                    </b-button>

                    <!-- Button: DOwnload -->
                    <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        class="mb-75"
                        block
                    >
                        {{ $t('Preview') }}
                    </b-button>

                    <!-- Button: Print -->
                    <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        block
                        @click="addOrder()"
                    >
                        {{ $t('Save') }}
                    </b-button>
                </b-card> 
            </b-col>
        </b-row>
    </section>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import {
  BRow, 
  BCol, 
  BCard, 
  BCardBody, 
  BButton, 
  BCardText, 
  BForm, 
  BFormGroup, 
  BFormInput, 
  BInputGroup, 
  BInputGroupPrepend, 
  BFormTextarea, 
  BFormCheckbox, 
  BPopover, 
  VBToggle,
  BImg,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { required } from "@validations";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardBody,
        BButton,
        BCardText,
        BForm,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupPrepend,
        BFormTextarea,
        BFormCheckbox,
        BPopover,
        BImg,
        flatPickr,
        vSelect,
        Logo,
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle,
    },
    data() {
        return{
            required,
            orderdata:{
                orderNumber:'',
                shop:'',
                shopAddress:''
            },
            postal:'',
            AddressList:[],
            shopOptions:[],
            shopAdd:[],
            // shopNm:[],
            paymentMethods : [
                'Bank Account',
                'PayPal',
                'UPI Transfer',
            ],
        }
    },
    
    computed: {
        imgUrl() { 
            this.sideImg = require("@/assets/images/pages/new_login.png");
            return this.sideImg;  
        },
        opendirect(){
            console.log('hello');
        }
    },

    created() {
        this.getshops();
    },  
   
    methods: {

        getshops(){
            this.mytoken = localStorage.getItem("token");
            axios(
                "https://engine.netsupport.dk:8270/orders/v1/shops/" + this.mytoken   
            )
            .then((responseshop) => {
                this.shopOptions = JSON.parse(
                    JSON.stringify(responseshop.data.shops)
                );
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        getAddress(){
            this.shopAdd = [];
            // this.shopNm = [];

            var postal = this.postal

            if(postal.length >= 4){
               console.log(this.postal);
               this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/orders/v1/postal/" + this.mytoken +
                    "/" + this.orderdata.shop + "/" + this.postal
                )
                .then((responseAddress) => {
                    //console.log(responseAddress.data.shops.recordset);
                    var addressList = JSON.parse(
                        JSON.stringify(responseAddress.data.shops.recordset)
                    );

                    this.AddressList = addressList;

                    //console.log(addressList);
                    
                    for(let i=0;i<addressList.length;i++){
                        this.shopAdd[i] = addressList[i].shopCombined;
                    }
                    
                    this.shopAdd = [...new Set(this.shopAdd)];
                    //this.shopAdd = this.shopAdd;
                    console.log(this.shopAdd);
                    // console.log(this.shopNm);
                })
                
                .catch(function (error) {
                    console.log(error);
                });
            }
        },

        addOrder(){
            this.$refs.loginValidation.validate().then((success) => {
                if (success) {
                    console.log(this.orderdata);
                    var orderdata = this.orderdata;

                    var config = {
                        method: "post",
                        url: "https://engine.netsupport.dk:8270/orders/v1/createorder/" +this.mytoken,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: orderdata,
                    };
                    axios(config)
                    .then((responseorder) => {
                        console.log(responseorder);
                    })
                    .catch(function (error) {
                        alert(error);
                    });
                }
            });
        }
    }, 
}
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';
    .invoice-add-wrapper {
        .add-new-client-header {
            padding: $options-padding-y $options-padding-x;
            color: $success;

            &:hover {
                background-color: rgba($success, 0.12);
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "~@core/scss/base/pages/app-invoice.scss";
    @import '~@core/scss/base/components/variables-dark';

    .form-item-section {
        background-color:$product-details-bg;
    }

    .form-item-action-col {
        width: 27px;
    }

    .repeater-form {
        // overflow: hidden;
        transition: .35s height;
    }

    .v-select {
        &.item-selector-title,
        &.payment-selector {
            background-color: #fff;

            .dark-layout & {
                background-color: unset;
            }
        }
    }

    .dark-layout {
        .form-item-section {
            background-color: $theme-dark-body-bg;

            .row .border {
                background-color: $theme-dark-card-bg;
            }

        }
    }

    .card_cls{
        margin-bottom: 20%;
    }
    .inteGreat_check_mn {
        height: 200px;
        overflow: auto;
    }
    .inteGreat_check_mn li {
        white-space: nowrap;
        margin: 10px 0;
    }
    .inteGreat_check_mn li input{
        margin-right: 6px;
    }
    .ul_cls{
        list-style-type: none;
        padding: 0px;
    }
</style>