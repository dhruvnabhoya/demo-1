<template>
    <section class="invoice-add-wrapper">
        <b-row
            class="invoice-add"
        >

            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="9"
                md="8"
            >
                <b-form @submit.prevent>
                    <b-card
                        no-body
                        class="invoice-preview-card"
                    >
                        <!-- Header -->
                        <b-card-body class="invoice-padding pb-0">
                            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                                <!-- Header: Left Content -->
                                <div class="Header_left_content">
                                    <div class="logo-wrapper">
                                        <!-- <b-img fluid :src="imgUrl" alt="Login V2" style="max-width: 35px;"/>
                                        <h3 class="text-primary invoice-logo">
                                            InteGreat
                                        </h3>     -->
                                    </div>
                                    <b-card-text class="mb-25">
                                        <b-form-input
                                            id="invoice-data-id"
                                            v-model="orderdata.customerName"
                                            :placeholder="$t('Customer Name')"
                                        /> 
                                    </b-card-text>
                                    <b-card-text class="mb-25">
                                        <b-form-input
                                            id="invoice-data-id"
                                            v-model="orderdata.customerEmail"
                                            :placeholder="$t('Customer Email')"
                                        />
                                    </b-card-text>
                                    <b-card-text class="mb-0">
                                        <b-form-input
                                            id="invoice-data-id"
                                            v-model="orderdata.customerPhone"
                                            :placeholder="$t('Customer Phone')"
                                        />
                                    </b-card-text>
                                </div>
                                <!-- Header: Right Content -->
                                <div class="invoice-number-date mt-md-0 mt-2">
                                    <div class="d-flex align-items-center justify-content-md-end mb-1">
                                        <h4 class="invoice-title">
                                        {{ $t('Invoice') }}
                                        </h4>
                                        <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                                        <b-input-group-prepend is-text>
                                            <feather-icon icon="HashIcon" />
                                        </b-input-group-prepend>
                                        <b-form-input
                                            id="invoice-data-id"
                                            v-model="invoiceData.invoice"
                                            disabled
                                        />
                                        </b-input-group>
                                    </div>
                                    <div class="d-flex align-items-center mb-1">
                                        <span class="title">
                                        {{ $t('Date') }}:
                                        </span>
                                        <flat-pickr
                                            v-model="invoiceData.Invoicedate"
                                            class="form-control invoice-edit-input"
                                        />
                                    </div>
                                    <!-- <div class="d-flex align-items-center">
                                        <span class="title">
                                        Due Date:
                                        </span>
                                        <flat-pickr
                                        v-model="invoiceData.dueDate"
                                        class="form-control invoice-edit-input"
                                        />
                                    </div> -->
                                    <div class="d-flex align-items-center mb-1">
                                        <span class="title">
                                        {{ $t('OrderNumber') }}:
                                        </span>
                                        <b-form-input
                                            v-model="invoiceData.orderNumber"
                                            class="form-control invoice-edit-input"
                                            disabled
                                        />
                                    </div>
                                    <div class="d-flex align-items-center mb-1">
                                        <span class="title">
                                        {{ $t('Shop') }}:
                                        </span>
                                        <b-form-input
                                            v-model="invoiceData.shop"
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
                                <b-col cols="12" xl="12" class="p-0">
                                    <b-row> 
                                        <b-col cols="4" >  
                                            <h6 class="mb-2">
                                            {{ $t('Invoice Address') }}:
                                            </h6>
                                            <h6 class="mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.invoiceName"
                                                    :placeholder="$t('Name')"
                                                />
                                            </h6>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.invoiceAddress"
                                                    :placeholder="$t('Address')"
                                                />
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-row>
                                                    <b-col cols="4" class="Padding_remove">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.invoiceZip"
                                                            :placeholder="$t('Zip')"
                                                        />  
                                                    </b-col>
                                                    <b-col cols="8">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.invoiceCity"
                                                            :placeholder="$t('City')"
                                                        />   
                                                    </b-col>
                                                </b-row>
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.invoiceCountry"
                                                    :placeholder="$t('Country')"
                                                />
                                            </p>
                                            <!-- <p class="card-text mb-0">
                                            {{ orderdata.invoicePhone }}
                                            </p> -->
                                        </b-col> 
                                        <b-col cols="4"> 
                                            <h6 class="mb-2">
                                            {{ $t('Delivery Address') }}:
                                            </h6>
                                            <h6 class="mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.deliverName"
                                                    :placeholder="$t('Name')"
                                                />
                                            </h6>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.deliverAddress"
                                                    :placeholder="$t('Address')"
                                                />
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-row>
                                                    <b-col cols="4" class="Padding_remove">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.deliverZip"
                                                            :placeholder="$t('Zip')"
                                                        />   
                                                    </b-col>
                                                    <b-col cols="8">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.deliverCity"
                                                            :placeholder="$t('City')"
                                                        />
                                                    </b-col>
                                                </b-row>
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.deliverCountry"
                                                    :placeholder="$t('Country')"
                                                />
                                            </p>
                                    
                                        </b-col>
                                        <b-col cols="4">

                                            <h6 class="mb-2">
                                            {{ $t('Buyer Address') }}:
                                            </h6>
                                            <h6 class="mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.buyerName"
                                                    :placeholder="$t('Name')"
                                                />
                                            </h6>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.buyerAddress"
                                                    :placeholder="$t('Address')"
                                                />
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-row>
                                                    <b-col cols="4" class="Padding_remove">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.buyerZip"
                                                            :placeholder="$t('Zip')"
                                                        />
                                                    </b-col>
                                                    <b-col cols="8">
                                                        <b-form-input
                                                            id="invoice-data-id"
                                                            v-model="orderdata.buyerCity"
                                                            :placeholder="$t('City')"
                                                        />  
                                                    </b-col>
                                                </b-row>
                                            </p>
                                            <p class="card-text mb-25">
                                                <b-form-input
                                                    id="invoice-data-id"
                                                    v-model="orderdata.buyerCountry"
                                                    :placeholder="$t('Country')"
                                                />
                                            </p>

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

                                        <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                                        <div class="d-none d-lg-flex">
                                            <b-row class="flex-grow-1 px-1">
                                                <!-- Single Item Form Headers -->
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                    {{ $t('Barcode') }}
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                    {{ $t('ItemType') }}
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                    {{ $t('Number') }}
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
                                                    lg="4"
                                                >
                                                <label class="d-inline d-lg-none">
                                                    {{ $t('Barcode') }}
                                                </label>
                                                
                                                <b-form-input
                                                    v-model="item.barCode"
                                                    type="text"
                                                    class="mb-2"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline d-lg-none">
                                                    {{ $t('ItemType') }}
                                                </label>
                                                
                                                <b-form-input
                                                    v-model="item.itemType"
                                                    type="text"
                                                    class="mb-2"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline d-lg-none">
                                                    {{ $t('Number') }}
                                                </label>
                                                
                                                <b-form-input
                                                    v-model="item.itemNumber"
                                                    type="text"
                                                    class="mb-2"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline">
                                                    {{ $t('Cost') }}
                                                </label>
                                                <b-form-input
                                                    v-model="item.nettoPrice"
                                                    type="number"
                                                    class="mb-2"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline">
                                                    {{ $t('Qty') }}
                                                </label>
                                                <b-form-input
                                                    v-model="item.itemQTY"
                                                    type="number"
                                                    class="mb-2"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline">
                                                    {{ $t('Price') }}
                                                </label>
                                                <p class="mb-1">
                                                    {{ item.nettoPrice * item.itemQTY }}
                                                </p>
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="6"
                                                >
                                                <label class="d-inline">
                                                    {{ $t('Description') }} 1
                                                </label>
                                                
                                                <b-form-textarea
                                                    v-model="item.description1"
                                                    class="mb-2 mb-lg-0"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="6"
                                                >
                                                <label class="d-inline">
                                                    {{ $t('Description') }} 2
                                                </label>
                                                <b-form-textarea
                                                    v-model="item.description2"
                                                    class="mb-2 mb-lg-0"
                                                />
                                                </b-col>

                                                <b-button
                                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                    size="sm"
                                                    variant="primary"
                                                    class="deletebtn"
                                                    @click="deleteInvoiceline(index)"
                                                >
                                                    {{ $t('delete') }}
                                                </b-button>
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
                                {{ $t('Add Item') }}
                            </b-button>
                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                size="sm"
                                variant="primary"
                                class="linebtn"
                                @click="editInvoiceLine()"
                            >
                                {{ $t('Save Invoiceline') }}
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
                                            <p class="invoice-total-title">{{ $t('Subtotal') }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }}
                                                {{ subtotal }}
                                            </p>
                                        </div>
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t('Discount') }}:</p>
                                            <p class="invoice-total-amount">-</p>
                                        </div>
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t('VAT') }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }}
                                                {{ invoiceData.VAT }}
                                            </p>
                                        </div>
                                        <hr class="my-50" />
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t('Total') }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }}
                                                {{ total }}
                                            </p>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card-body>

                        <!-- Spacer -->
                        <hr class="invoice-spacing">

                        <!-- Note -->
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
                class="invoice-actions"
            >

                <!-- Action Buttons -->
                <b-card>

                <!-- Button: Send Invoice -->
                <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-toggle.sidebar-send-invoice
                    variant="outline-primary"
                    class="mb-75"
                    block
                >
                    {{ $t('Send to Economy') }}
                </b-button>
                <!-- Button: Send Invoice -->
                <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-toggle.sidebar-send-invoice
                    variant="outline-primary"
                    class="mb-75"
                    block
                >
                    {{ $t('Send to Customer') }}
                </b-button>

                <!-- Button: DOwnload -->
                <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    class="mb-75"
                    block
                    :to="'/invoice-preview/'+ invoicenumber + '/' + ordernumber + '/' + ordershop"
                >
                    {{ $t('Preview') }}
                </b-button>

                <!-- Button: Print -->
                <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="success"
                    block
                    @click="editInvoice()"
                >
                    {{ $t('Save') }}
                </b-button>

                <!-- Button: Add Payment -->
                <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="danger"
                    class="mb-75"
                    block
                >
                    {{ $t('Cancel Invoice') }}
                </b-button>
                </b-card>

                <!-- Payment Method -->
                <!-- <div class="mt-2">
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
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="patymentTerms">Payment Terms</label>
                        <b-form-checkbox
                        id="patymentTerms"
                        :checked="true"
                        switch
                        />
                    </div>
                    <div class="d-flex justify-content-between align-items-center my-1">
                        <label for="clientNotes">Client Notes</label>
                        <b-form-checkbox
                        id="clientNotes"
                        :checked="true"
                        switch
                        />
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="paymentStub">Payment Stub</label>
                        <b-form-checkbox
                        id="paymentStub"
                        switch
                        />
                    </div>
                </div> -->
            </b-col>
        </b-row>
        <invoice-sidebar-send-invoice />
        <invoice-sidebar-add-payment />
    </section>
</template>
<script>
    import axios from "axios";
    import Logo from '@core/layouts/components/Logo.vue'
    import { ref, onUnmounted } from '@vue/composition-api'
    import { heightTransition } from '@core/mixins/ui/transition'
    import Ripple from 'vue-ripple-directive'
    import store from '@/store'
    import router from '@/router'
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
        BAlert, 
        BLink,
        BImg,
        VBToggle,
    } from 'bootstrap-vue'
    import vSelect from 'vue-select'
    import flatPickr from 'vue-flatpickr-component'
    import InvoiceSidebarSendInvoice from './InvoiceSidebarSendInvoice.vue'
    import InvoiceSidebarAddPayment from './InvoiceSidebarAddPayment.vue'

export default {
    props: {
        
    },
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
        BAlert,
        BLink,
        BImg,
        flatPickr,
        vSelect,
        Logo,
        InvoiceSidebarSendInvoice,
        InvoiceSidebarAddPayment,
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle,
    },
    data(){
        return{
            paymentMethods : [
                'Bank Account',
                'PayPal',
                'UPI Transfer',
            ],
            total : 0,
            subtotal : 0,
            invoicedate : '',
            orderdata:[],
            invoiceData: [],
            invoicelinedata: [],
            deleteinvoiceline: {},
            invoicenumber: this.$route.params.invoice,
            ordernumber: this.$route.params.order,
            ordershop: this.$route.params.shop,

            itemFormBlankItem:{
                lineNumber:'',
                lnsid:"0",
                shop:this.$route.params.shop,
                orderNumber:this.$route.params.order,
                invoice:this.$route.params.invoice,
                itemType:"EN",
                barCode: '',
                itemNumber: '',
                nettoPrice: 0,
                itemQTY: 0,
                description1: '',
                description2: '',
                totalPrice:0
            },
        }
    },
    computed: {
    
        imgUrl() {
            this.sideImg = require("@/assets/images/pages/new_login.png");
            return this.sideImg;
        },
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
                    this.getinvoicedata();
                    this.getinvoicelinedata();
                    this.getorderdata();
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
            //this.trSetHeight(null)
            this.$nextTick(() => {
                //this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0)
            })
        },
        getinvoicedata() {
            this.mytoken = localStorage.getItem("token");

            axios(
                "https://engine.netsupport.dk:8270/invoices/v1/headers/" + this.mytoken +
                "?offset=0&pagesize=10&days=365"+
                "&invoice=" + this.invoicenumber +
                "&order=" + this.ordernumber
            )
            .then((responseorder) => {
                var data = JSON.stringify(responseorder.data.invoices.recordset[0]);
                this.invoiceData=JSON.parse(data);
                this.date_d = this.invoiceData.Invoicedate;
                this.invoiceData.Invoicedate = new Date(this.date_d).getFullYear()+'-'+(new Date(this.date_d).getMonth()+1)+'-'+new Date(this.date_d).getDate();

                this.subtotal = Number(this.invoiceData.Netto).toFixed(2);
                this.total = Number(this.invoiceData.Total).toFixed(2);
            })
            .catch(function (error) {
                if(error.response.status == 403)
                {
                    localStorage.setItem("token", "");
                    window.location.reload();
                }
            });
        },

        getinvoicelinedata(){
            this.mytoken = localStorage.getItem("token");

            axios(
                "https://engine.netsupport.dk:8270/invoices/v1/lines/" + this.mytoken +
                "?offset=0&pagesize=10" +
                "&invoice=" + this.invoicenumber +
                "&order=" + this.ordernumber
            )
            .then((responseorder) => {
                //console.log(responseorder.data.lines);
                this.invoicelinedata = JSON.parse(
                    JSON.stringify(responseorder.data.lines.recordset)
                );
                //console.log(this.invoicelinedata);
            })
            .catch(function (error) {
                if(error.response.status == 403)
                {
                    localStorage.setItem("token", "");
                    window.location.reload();
                }
            });
        },

        getorderdata() {
            this.mytoken = localStorage.getItem("token");

            axios(
                "https://engine.netsupport.dk:8270/orders/v1/header/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.ordershop
            )
            .then((responseorder) => { 
                //console.log(responseorder.data.order);
                this.orderdata = JSON.parse(
                JSON.stringify(responseorder.data.order)
                );
            })
            .catch(function (error) {
                if(error.response.status == 403)
                {
                    localStorage.setItem("token", "");
                    window.location.reload();
                }
            });
        },

        editInvoiceLine(){
            this.mytoken = localStorage.getItem("token");
            for(let i=0;i<this.invoicelinedata.length;i++){
                if(this.invoicelinedata[i].lineNumber ==""){
                    var j = parseInt(i)-parseInt(1);
                    if(j < 0){
                        this.invoicelinedata[i].lineNumber = "1";
                    }
                    else{
                        this.invoicelinedata[i].lineNumber = parseInt(this.invoicelinedata[j].lineNumber) + parseInt(1);
                    this.invoicelinedata[i].lineNumber =  this.invoicelinedata[i].lineNumber.toString();  
                    }
                }
                this.invoicelinedata[i].totalPrice = parseFloat(this.invoicelinedata[i].nettoPrice) * parseFloat(this.invoicelinedata[i].itemQTY);
                //this.subtotal += Number(this.invoicelinedata[i].totalPrice).toFixed(2);
            }
            var invoicelinedata = JSON.parse(JSON.stringify(this.invoicelinedata));
            console.log(invoicelinedata);

            var config = {
                method: "post",
                url: "https://engine.netsupport.dk:8270/invoices/v1/updinvline/" +this.mytoken,
                headers: {
                "Content-Type": "application/json",
                },
                data: invoicelinedata
            };
            axios(config)
            .then((response) => {
                //console.log(response.data);
                alert(response.data.status);
                this.getinvoicelinedata();
                this.getinvoicedata();
            })
            .catch(function (error) {
                console.log(error);
                alert("invoice detail not updated");
            });
        },

        editInvoice(){
            this.mytoken = localStorage.getItem("token");

            this.invoiceData.Netto = this.subtotal;
            var finalTotal = parseFloat(this.invoiceData.Netto) + parseFloat(this.invoiceData.VAT);
            this.invoiceData.Total = Number(finalTotal).toFixed(2);
            //console.log(JSON.parse(JSON.stringify(this.invoiceData)));

            var invoiceData = this.invoiceData;

            var config = {
                method: "post",
                url: "https://engine.netsupport.dk:8270/invoices/v1/updinvoice/" +this.mytoken,
                headers: {
                "Content-Type": "application/json",
                },
                data: invoiceData
            };
            axios(config)
            .then((response) => {
                //alert(response);
                alert(response.data.status);
                //alert(response.data.status);
                //location.reload();
            })
            .catch(function (error) {
                alert("order detail not updated");
            });
        },

        deleteInvoiceline(index){
            if (confirm("Are you sure you want to delete this orderline?")) {
                this.mytoken = localStorage.getItem("token");

                this.deleteinvoiceline = {
                    lnsid:this.invoicelinedata[index].lnsid,
                    shop:this.invoicelinedata[index].shop,
                    orderNumber:this.invoicelinedata[index].orderNumber,
                    barCode : this.invoicelinedata[index].barCode,
                    itemNumber:this.invoicelinedata[index].itemNumber,
                    invoiceNumber:this.invoicelinedata[index].invoice
                   
                };
                //console.log(this.deleteinvoiceline);
                var config = {
                    method: "delete",
                    url: "https://engine.netsupport.dk:8270/invoices/v1/deleteline/" +this.mytoken,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: this.deleteinvoiceline
                };
                axios(config)
                .then((response) => {
                    alert(response.data.status);
                    this.getinvoicelinedata();
                    this.getinvoicedata();
                })
                .catch(function (error) {
                    console.log(error);
                    alert("invoice detail not deleted.");
                });   
            }else{
                alert("Your Data is Safe");  
            }
        }
    },
}
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style>
    .Header_left_content {
    width: 31%;
}
.Padding_remove {
        padding-right: 0px !important;
    }
</style>
<style lang="scss" scoped>
    @import "~@core/scss/base/pages/app-invoice.scss";

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

    .form-item-section .row .border {
        background-color: white;
    }

    .linebtn{
        float: right;
    }

    .deletebtn{
        margin-top: 15px;
        margin-left: 15px;
    }
</style>
