<template>
    <section class="invoice-add-wrapper">
        <b-row class="invoice-add">

            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="12"
                md="12"
            >
                <validation-observer ref="inventoryValidation">
                    <b-form @submit.prevent>
                        <b-card
                            no-body
                            class="invoice-preview-card"
                        >
                            <!-- Header -->
                            <b-card-body class="invoice-padding pb-0">
                                <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                                    <!-- Header: Left Content -->
                                    <div>
                                        <div class="logo-wrapper">
                                            <b-img 
                                                fluid 
                                                :src="imgUrl" 
                                                alt="Login V2" 
                                                style="max-width: 55px;"
                                            />
                                            <h3 class="text-primary invoice-logo ml-0">
                                                {{ $t('InteGreat') }}
                                            </h3>
                                        </div>
                                    </div>
                                    <!-- Header: Right Content -->
                                    <div class="invoice-number-date mt-md-0 mt-2">
                                        <div class="d-flex align-items-center justify-content-md-end mb-1">
                                            <h4 class="invoice-title">
                                            {{ $t("HDRID") }} :
                                            </h4>
                                            <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="HashIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="inventorydata.hdrId"
                                                    disabled
                                                />
                                            </b-input-group>
                                        </div>
                                    </div>
                                </div>
                            </b-card-body>
                            <!-- Spacer -->
                            <hr class="invoice-spacing">
                            <!-- Header -->
                            <b-card-body class="invoice-padding pb-0">
                                <div class="d-flex justify-content-between flex-column invoice-spacing mt-0">

                                    <!-- Header: Left Content -->
                                    <div>
                                        <b-row>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <label class="d-inline">
                                                    {{ $t('GTIN') }}
                                                </label> 
                                                <b-card-text class="mb-25">
                                                    <validation-provider
                                                        #default="{ errors }"
                                                        name="GTIN"
                                                        rules="length:13"
                                                    >
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="inventorydata.gtin"
                                                        />
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider> 
                                                </b-card-text>
                                                &nbsp;
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <label class="d-inline">
                                                    {{ $t('SKU') }}
                                                </label> 
                                                <b-card-text class="mb-0">
                                                    <validation-provider
                                                        #default="{ errors }"
                                                        name="SKU"
                                                        rules="required"
                                                    >
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="inventorydata.SKU"
                                                        />
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider> 
                                                </b-card-text>
                                                 &nbsp;   
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <label class="d-inline">
                                                    {{ $t('Qty') }}
                                                </label> 
                                                <b-card-text class="mb-0">
                                                    <b-form-input
                                                        v-model="inventorydata.QTY"
                                                        type="text"
                                                    />
                                                </b-card-text>
                                                &nbsp;
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <label class="d-inline">
                                                    {{ $t('Price') }}
                                                </label> 
                                                <b-card-text class="mb-0">
                                                    <validation-provider
                                                        #default="{ errors }"
                                                        name="Price"
                                                        rules="required"
                                                    >
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="inventorydata.nettoPrice"
                                                        />
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>  
                                                </b-card-text>
                                                &nbsp;    
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <b-card-text class="mb-0">
                                                    <b-form-textarea
                                                        v-model="inventorydata.description"
                                                        class="mb-2 mb-lg-0"
                                                        :placeholder="$t('Description')"
                                                    />
                                                </b-card-text>
                                                &nbsp;
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <b-card-text class="mb-0">
                                                    <b-form-textarea
                                                        v-model="inventorydata.internText"
                                                        class="mb-2 mb-lg-0"
                                                        :placeholder="$t('internText')"
                                                    />
                                                </b-card-text>
                                                &nbsp;
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <v-select
                                                    v-model="inventorydata.shop"
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
                                                &nbsp;
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="6"
                                            >
                                                <b-row>
                                                    <b-col
                                                        cols="12"
                                                        lg="4"
                                                    >
                                                        <label class="d-inline">
                                                            {{ $t('Update Y/N') }}
                                                        </label> 
                                                        <div class="demo-inline-spacing">
                                                            <b-form-radio
                                                                v-model="inventorydata.updYN"
                                                                name="updYN"
                                                                value="Y"
                                                            >
                                                            {{ $t('Yes') }}
                                                            </b-form-radio>
                                                            <b-form-radio
                                                                v-model="inventorydata.updYN"
                                                                name="updYN"
                                                                value="N"
                                                            >
                                                            {{ $t('No') }}
                                                            </b-form-radio> 
                                                        </div>
                                                        &nbsp;
                                                    </b-col>
                                                </b-row>
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
                                                    @click="editInventory()"
                                                >
                                                    {{ $t('Save') }}
                                                </b-button>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </b-card-body> 
                        </b-card>
                    </b-form>
                </validation-observer>
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
  BFormRadio
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
        BFormRadio,
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
    props: {
        loggedIn: {
            type: Boolean, 
            default: false 
        }
    },
    data() {
        return{
            required,
            hdrid: this.$route.params.hdrid,
            inventorydata:[],
            shopOptions:[]
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
        this.mytoken = localStorage.getItem("token");
        if (this.mytoken == "" ) {
            localStorage.removeItem("token");
            this.loggedIn = false;
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
                    this.getinventorydata();
                    this.getshops();
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

        getinventorydata(){
            this.mytoken = localStorage.getItem("token");
            axios(
                "https://engine.netsupport.dk:8270/inventory/v1/header/" + this.mytoken +
                "?hdrid=" + this.hdrid
            )
            .then((responsedata) => {
                this.inventorydata = responsedata.data.record;

                if(this.inventorydata.updYN == null){
                    this.inventorydata.updYN = "N"
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
        },

        editInventory(){
            //console.log(this.inventorydata);
            this.$refs.inventoryValidation.validate().then((success) => {
                if (success) {
                    this.mytoken = localStorage.getItem("token");

                    var updinventorydata = {
                        "hdrid":this.inventorydata.hdrId,
                        "shop":this.inventorydata.shop,
                        "sku":this.inventorydata.SKU,
                        "gtin":this.inventorydata.gtin,
                        "price":Number(this.inventorydata.nettoPrice).toFixed(2),
                        "qty":this.inventorydata.QTY,
                        "description":this.inventorydata.description,
                        "intern":this.inventorydata.internText,
                        "updyn":this.inventorydata.updYN,
                        "updchn":this.inventorydata.updchain,
                    };

                    console.log(updinventorydata);

                    var config = {
                        method: "post",
                        url: "https://engine.netsupport.dk:8270/inventory/v1/updinventory/" +this.mytoken,
                        headers: {
                        "Content-Type": "application/json",
                        },
                        data: updinventorydata
                    };
                    axios(config)
                    .then((response) => {
                        alert(response.data.status);
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Inventory detail not updated");
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

.invoice-filter-select {
    min-width: 170px;
    //max-width: 170px;

    ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
        width: 100px;
    }
}
</style>