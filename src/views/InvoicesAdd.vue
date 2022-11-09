<template>
    <section class="invoice-add-wrapper">
        <b-row class="invoice-add">

            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="9"
                md="8"
            >
                <b-form>
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
                                        <b-img fluid :src="imgUrl" alt="Login V2" style="max-width: 35px;"/>
                                        <h3 class="text-primary invoice-logo">
                                            {{ $t('InteGreat') }}
                                        </h3>
                                    </div>
                                </div>

                                <!-- Header: Right Content -->
                                <div class="invoice-number-date mt-md-0 mt-2">
                                    <div class="d-flex align-items-center justify-content-md-end mb-1">
                                        <h4 class="invoice-title">
                                            {{$t('Invoice') }}
                                        </h4>
                                        <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                                            <b-input-group-prepend is-text>
                                                <feather-icon icon="HashIcon" />
                                            </b-input-group-prepend>
                                            <b-form-input
                                                id="invoice-data-id"
                                                v-model="invoiceData.invoice"
                                            />
                                        </b-input-group>
                                    </div>
                                    <div class="d-flex align-items-center mb-1">
                                        <span class="title">
                                            {{ $t('Date') }}:
                                        </span>
                                        <flat-pickr
                                            v-model="invoiceData.issuedDate"
                                            class="form-control invoice-edit-input"
                                        />
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="title">
                                            {{ $t('Due Date') }} :
                                        </span>
                                        <flat-pickr
                                            v-model="invoiceData.dueDate"
                                            class="form-control invoice-edit-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                        <!-- Spacer -->
                        <hr class="invoice-spacing">
                        <!-- Invoice Client & Payment Details -->
                        <b-card-body
                            class="invoice-padding pt-0"
                        >
                            <b-row class="invoice-spacing">

                                <!-- Col: Invoice To -->
                                <b-col
                                    cols="12"
                                    xl="12"
                                    class="mb-lg-1"
                                >
                                    <b-row>
                                        <b-col cols="4" >  
                                            <h6 class="mb-2">
                                                Invoice To:
                                            </h6>

                                            <!-- Select Client -->
                                            <v-select
                                                v-model="invoiceData.client"
                                                dir="ltr"
                                                :options="['priyanka','kartik']"
                                                label="company"
                                                input-id="invoice-data-client"
                                                :clearable="false"
                                            >
                                                <template #list-header>
                                                <li
                                                    v-b-toggle.sidebar-invoice-add-new-customer
                                                    class="add-new-client-header d-flex align-items-center my-50"
                                                >
                                                    <feather-icon
                                                    icon="PlusIcon"
                                                    size="16"
                                                    />
                                                    <span class="align-middle ml-25">Add New Customer</span>
                                                </li>
                                                </template>
                                            </v-select>
                                        </b-col>  
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-card-body>

                        <!-- Items Section -->
                        <b-card-body class="invoice-padding form-item-section">
                        <div
                            ref="form"
                            class="repeater-form"
                        >
                            <b-row
                                v-for="(item, index) in invoicelinedata"
                                :key="index"
                                ref="row"
                                class="pb-2"
                            >
                                <!-- Item Form -->
                                <!-- ? This will be in loop => So consider below markup for single item -->
                                <b-col cols="12">

                                    <div class="d-none d-lg-flex">
                                    <b-row class="flex-grow-1 px-1">
                                        <!-- Single Item Form Headers -->
                                        <b-col
                                            cols="12"
                                            lg="5"
                                        >
                                            {{ $t('Item') }}
                                        </b-col>
                                        <b-col
                                            cols="12"
                                            lg="3"
                                        >
                                            {{ $t('Cost') }}
                                        </b-col>
                                        <b-col
                                            cols="12"
                                            lg="2"
                                        >
                                            {{ $t('Qty') }}
                                        </b-col>
                                        <b-col
                                            cols="12"
                                            lg="2"
                                        >
                                            {{ $t('Price') }}
                                        </b-col>
                                    </b-row>
                                    <div class="form-item-action-col" />
                                    </div>

                                    <!-- Form Input Fields OR content inside bordered area  -->
                                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                                    <div class="d-flex border rounded">
                                        <b-row class="flex-grow-1 p-2">
                                            <!-- Single Item Form Headers -->
                                            <b-col
                                                cols="12"
                                                lg="5"
                                            >
                                            <label class="d-inline d-lg-none">{{ $t('Item') }}</label>
                                            <b-form-input
                                                v-model="item.descript1"
                                                type="text"
                                                class="mb-2"
                                            />
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="3"
                                            >
                                            <label class="d-inline d-lg-none">{{ $t('Cost') }}</label>
                                            <b-form-input
                                                v-model="item.price"
                                                type="number"
                                                class="mb-2"
                                            />
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="2"
                                            >
                                            <label class="d-inline d-lg-none">{{ $t('Qty') }}</label>
                                            <b-form-input
                                                v-model="item.quantity"
                                                type="number"
                                                class="mb-2"
                                            />
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="2"
                                            >
                                            <label class="d-inline d-lg-none">{{ $t('Price') }}</label>
                                            <p class="mb-1">
                                                ${{ item.price * item.quantity }}
                                            </p>
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="5"
                                            >
                                            <label class="d-inline d-lg-none"> {{ $t('Description') }}</label>
                                            <b-form-textarea
                                                v-model="item.descript2"
                                                class="mb-2 mb-lg-0"
                                            />
                                            </b-col>
                                        </b-row>
                                        <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                                            <feather-icon
                                                size="16"
                                                icon="XIcon"
                                                class="cursor-pointer"
                                                @click="removeItem(index)"
                                            />
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            size="sm"
                            variant="primary"
                            @click="addNewItemInItemForm"
                        >
                            Add Item
                        </b-button>
                        </b-card-body>
                        <!-- Invoice Description: Total -->
                        <b-card-body class="invoice-padding pb-0">
                            <b-row>

                                <!-- Col: Sales Persion -->
                                <b-col
                                    cols="12"
                                    md="6"
                                    class="mt-md-0 mt-3 d-flex align-items-center"
                                    order="2"
                                    order-md="1"
                                >
                                    <!-- <label
                                        for="invoice-data-sales-person"
                                        class="text-nowrap mr-50"
                                    >Sales Person:</label>
                                    <b-form-input
                                        id="invoice-data-sales-person"
                                        v-model="invoiceData.salesPerson"
                                        placeholder="Edward Crowley"
                                    /> -->
                                </b-col>

                                <!-- Col: Total -->
                                <b-col
                                cols="12"
                                md="6"
                                class="mt-md-6 d-flex justify-content-end"
                                order="1"
                                order-md="2"
                                >
                                    <div class="invoice-total-wrapper">
                                        <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                            {{ $t('Subtotal') }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            
                                        </p>
                                        </div>
                                        <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                            {{ $t('Discount') }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            
                                        </p>
                                        </div>
                                        <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                            {{ $t('VAT') }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            
                                        </p>
                                        </div>
                                        <hr class="my-50">
                                        <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                            {{ $t('Total') }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            
                                        </p>
                                        </div>
                                    </div>  
                                </b-col>
                            </b-row>
                        </b-card-body>
                        <!-- Spacer -->
                        <hr class="invoice-spacing">
                        <b-card-body class="invoice-padding pt-0">
                            <span class="font-weight-bold">{{ $t('Note') }}: </span>
                            <b-form-textarea v-model="invoiceData.note" />
                        </b-card-body>
                    </b-card>
                </b-form>
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
                    @click="addInvoice()"
                >
                    {{ $t('Save') }}
                </b-button>
                </b-card>

                <!-- Payment Method -->
                <div class="mt-2">
                    <b-form-group
                        label="Accept Payment Via"
                        label-for="payment-method"
                    >
                        <v-select
                        v-model="invoiceData.paymentMethod"
                        dir="ltr"
                        :options="paymentMethods"
                        input-id="payment-method"
                        class="payment-selector"
                        :clearable="false"
                        />
                    </b-form-group>

                    <!-- ? Below values are not adding invoiceData to keep invoiceData more generic and less confusing  -->

                    <!-- Payment Terms -->
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="patymentTerms">{{ $t('Payment Terms') }}</label>
                        <b-form-checkbox
                        id="patymentTerms"
                        :checked="true"
                        switch
                        />
                    </div>

                    <!-- Client Notes -->
                    <div class="d-flex justify-content-between align-items-center my-1">
                        <label for="clientNotes">{{ $t('Client Notes') }}</label>
                        <b-form-checkbox
                        id="clientNotes"
                        :checked="true"
                        switch
                        />
                    </div>

                    <!-- Payment Stub -->
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="paymentStub">{{ $t('Payment Stub') }}</label>
                        <b-form-checkbox
                        id="paymentStub"
                        switch
                        />
                    </div>
                </div>
            </b-col>
        </b-row>
        <invoice-sidebar-add-new-customer />
    </section>
</template>
<script>
import axios from "axios";
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import {
  BRow, BCol, BCard, BCardBody, BButton, BCardText, BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BFormTextarea, BFormCheckbox, BPopover, VBToggle,BImg,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import InvoiceSidebarAddNewCustomer from './InvoiceSidebarAddNewCustomer.vue'

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
        InvoiceSidebarAddNewCustomer,
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle,

    },
    data() {
        return{
            invoiceData:{
                invoice:'',
                client:'',
                issuedDate:'',
                dueDate:'',
                salesPerson:'',
                note:'',
                paymentMethod:''
            },
            invoicelinedata: [],
            
            itemFormBlankItem:{
                item: null,
                price: 0,
                quantity: 0,
                descript1: '',
                descript2: '',
            },
            itemsOptions : [
               
            ],
            paymentMethods : [
                'Bank Account',
                'PayPal',
                'UPI Transfer',
            ],
        }
    },
    computed: {
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.sideImg = require("@/assets/images/pages/new_login.png");
                return this.sideImg;
            }
            return this.sideImg;
        },
    },
    mounted() {
        this.initTrHeight()
    },
    created() {
        // this.invoicelinedata.push([])
        window.addEventListener('resize', this.initTrHeight)
    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
        addNewItemInItemForm() {
            this.$refs.form.style.overflow = 'hidden'
            this.invoicelinedata.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

            this.$nextTick(() => {
                //this.trAddHeight(this.$refs.row[0].offsetHeight)
                setTimeout(() => {
                this.$refs.form.style.overflow = null
                }, 350)
            })
        },
        removeItem(index) {
            this.invoicelinedata.splice(index, 1)
            //this.trTrimHeight(this.$refs.row[0].offsetHeight)
        },
        initTrHeight() {
            // this.trSetHeight(null)
            this.$nextTick(() => {
                // this.trSetHeight(this.$refs.form.scrollHeight)
            })
        },
        addInvoice(){
            // alert(JSON.stringify(this.invoiceData))
            //alert(JSON.stringify(this.invoicelinedata))
            console.log(this.invoiceData);
            console.log(this.invoicelinedata);
            // var invoicedata = this.invoiceData;
            // var invoicelinedata = this.invoicelinedata;

            // var config = {
            //     method: "post",
            //     url: "",
            //     headers: {
            //     "Content-Type": "application/json",
            //     },
            //     data: invoicedata,
            //     linedata: invoicelinedata,
            // };
            // axios(config)
            // .then((response) => {
            
            // })
            // .catch(function (error) {
            //     alert(error);
            // });
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
</style>