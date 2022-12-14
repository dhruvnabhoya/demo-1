<template>
    <section class="invoice-add-wrapper">
        <b-row
            class="invoice-add"
        >

            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="12"
                md="12"
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
                                            {{ $t("Order") }} :
                                        </h4>
                                        <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                                            <b-input-group-prepend is-text>
                                                <feather-icon icon="HashIcon" />
                                            </b-input-group-prepend>
                                            <b-form-input
                                                id="invoice-data-id"
                                                v-model="orderdata.orderNumber"
                                                disabled
                                            />
                                        </b-input-group>
                                    </div>
                                    <div class="d-flex align-items-center mb-1">
                                        <span class="title">
                                            {{ $t("Delivery Date") }} :
                                        </span>
                                        <flat-pickr
                                            v-model="orderdata.deliveryDate"
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
                                <b-col cols="13" xl="12" class="p-0">
                                    <b-row> 
                                        <b-col cols="4">  
                                            <h6 class="mb-2">
                                                {{ $t("Invoice Address") }}:
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
                                        </b-col> 
                                        <b-col cols="4"> 
                                            <h6 class="mb-2">
                                                {{ $t("Delivery Address") }}:
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
                                            {{ $t("Buyer Address") }}:
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
                                        <b-row class="d-flex justify-content-end p-1">

                                            <b-button
                                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="primary"
                        block
                        class=" col-2 linebtn"
                        @click="editOrder()"
                        >
                        {{ $t("Save") }}
                    </b-button>
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
                                    v-for="(item, index) in orderlinedata"
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
                                                    {{ $t("Barcode") }}
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                    {{ $t("ItemType") }}
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                    {{ $t("Number") }}
                                                </b-col>
                                            </b-row>
                                        <div class="form-item-action-col" />
                                        </div>

                                        <div class="d-flex border rounded">
                                            <b-row class="flex-grow-1 p-2">
                                                <!-- Single Item Form Headers -->
                                                <b-col
                                                    cols="12"
                                                    lg="4"
                                                >
                                                <label class="d-inline d-lg-none">{{ $t("Barcode") }}</label>
                                                
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
                                                <label class="d-inline d-lg-none">{{ $t("ItemType") }}</label>
                                                
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
                                                <label class="d-inline d-lg-none">{{ $t("Number") }}</label>
                                                
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
                                                <label class="d-inline">{{ $t("Cost") }}</label>
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
                                                <label class="d-inline">{{ $t("Qty") }}</label>
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
                                                <label class="d-inline">{{ $t("Price") }}</label>
                                                <p class="mb-1">
                                                    {{ item.nettoPrice * item.itemQTY }}
                                                </p>
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="6"
                                                >
                                                <label class="d-inline">{{ $t("Description") }} 1</label>
                                                
                                                <b-form-textarea
                                                    v-model="item.description1"
                                                    class="mb-2 mb-lg-0"
                                                />
                                                </b-col>
                                                <b-col
                                                    cols="12"
                                                    lg="6"
                                                >
                                                <label class="d-inline">{{ $t("Description") }} 2</label>
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
                                                    @click="deleteOrderline(index)"
                                                >
                                                    {{ $t("delete") }}
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
                                {{ $t("Add Item") }}
                            </b-button>

                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                size="sm"
                                variant="primary"
                                class="linebtn"
                                @click="editOrderLine()"
                            >
                                {{ $t("Save Orderline") }}
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
                                            <p class="invoice-total-title">{{ $t("Subtotal") }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }}
                                                {{ subtotal }}
                                            </p>
                                        </div>
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t("Discount") }}:</p>
                                            <p class="invoice-total-amount">-</p>
                                        </div>
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t("VAT") }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }} {{ orderdata.VAT }}
                                            </p>
                                        </div>
                                        <hr class="my-50" />
                                        <div class="invoice-total-item">
                                            <p class="invoice-total-title">{{ $t("Total") }}:</p>
                                            <p class="invoice-total-amount">
                                                {{ orderdata.valuta }} {{ total }}
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
                            <span class="font-weight-bold">{{ $t("Note") }}: </span>
                            <b-form-textarea v-model="orderdata.note" />
                        </b-card-body>
                    </b-card>
                </b-form>
            </b-col>
            <!-- Right Col: Card -->
            <!-- <b-col
                cols="12"
                md="4"
                xl="3"
                class="invoice-actions"
            > -->

                <!-- Action Buttons -->
                <!-- <b-card> -->

                    <!-- Button: Send Invoice -->
                    <!-- <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        v-b-toggle.sidebar-send-invoice
                        variant="outline-primary"
                        class="mb-75"
                        block
                    >
                        {{ $t("Send to Economy") }}
                    </b-button> -->
                    <!-- Button: Send Invoice -->
                    <!-- <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        v-b-toggle.sidebar-send-invoice
                        variant="outline-primary"
                        class="mb-75"
                        block
                    >
                        {{ $t("Send to Customer") }}
                    </b-button> -->

                    <!-- Button: DOwnload -->
                    <!-- <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        class="mb-75"
                        block
                        :to="'/order-preview/'+ ordernumber +'/'+ shop"
                    >
                        {{ $t("Preview") }}
                    </b-button> -->

                    <!-- Button: Print -->
                    

                    <!-- Button: Add Payment -->
                    <!-- <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="mb-75"
                        block
                    >
                        {{ $t("cancel order") }}
                    </b-button> -->
                <!-- </b-card>
            </b-col> -->
        </b-row>
    </section>
</template>
<script>
    
</script>
<script>
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
        BAlert, 
        BLink,
        BImg,
        VBToggle,
    } from 'bootstrap-vue'
    import vSelect from 'vue-select'
    import flatPickr from 'vue-flatpickr-component'

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
        BAlert,
        BLink,
        BImg,
        flatPickr,
        vSelect,
        Logo,
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
            orderdata: [],
            orderlinedata: [],
            deleteorderline: {},
            ordernumber : this.$route.params.id,
            shop : this.$route.params.shop,
            dirty_form: true,

            itemFormBlankItem:{
                lineNumber:'',
                lnsid:0,
                shop:this.$route.params.shop,
                orderNumber:this.$route.params.id,
                itemType:'EN',
                barCode: '',
                itemNumber: '',
                nettoPrice: 0,
                itemQTY: 0,
                description1: '',
                description2: '',
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
        this.getorderdata();
        this.getorderlinedata();

    
        window.addEventListener('beforeunload', this.confirm_leaving)

        console.log(location.href)
    },
//     beforeDestroy() {
//   window.removeEventListener('beforeunload', this.handleRemove)
// },
    methods: {
        // handler(e) {
        //     // console.log('e',e)
            // debugger;
        //     if(false) {
        //         e.preventDefault();
        //         const data = 'Are you sure you want to reload page?'
        //         e.returnValue =  data
        //         return data
        //     }
        //     // e?.preventDefault(); 
        //     // e?.returnValue = '';
        // },
        confirm_leaving (evt) {
            if (this.dirty_form) {
                const unsaved_changes_warning = "You have unsaved changes. Are you sure you wish to leave?";
                evt.returnValue = unsaved_changes_warning; 
                return unsaved_changes_warning;
            };
        },
    // },
        // handleRemove(){
        //     this.CheckSaveBtn = true
        // },
        addNewItemInItemForm() {
            this.$refs.form.style.overflow = 'hidden'
            this.orderlinedata.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

            this.$nextTick(() => {
                //this.trAddHeight(this.$refs.row[0].offsetHeight)
                setTimeout(() => {
                this.$refs.form.style.overflow = null
                }, 350)
            })
        },
        removeItem(index) {
            this.orderlinedata.splice(index, 1)
            //this.trTrimHeight(this.$refs.row[0].offsetHeight)
        },
        initTrHeight() {
            //this.trSetHeight(null)
            this.$nextTick(() => {
                //this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0)
            })
        },
        getorderlinedata(){
            this.mytoken = localStorage.getItem("token");

            axios(
                "https://engine.netsupport.dk:8270/orders/v1/lines/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.shop
            )
            .then((responseorder) => { 
                //console.log(responseorder.data.lines);
                this.orderlinedata = JSON.parse(
                    JSON.stringify(responseorder.data.lines.recordset)
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

        getorderdata() {
            this.mytoken = localStorage.getItem("token");

            axios(
                "https://engine.netsupport.dk:8270/orders/v1/header/" + this.mytoken +
                "?order=" + this.ordernumber +
                "&shop=" + this.shop
            )
            .then((responseorder) => {
                this.orderdata = JSON.parse(
                    JSON.stringify(responseorder.data.order)
                );
                console.log("this.orderdata",this.orderdata);
                this.subtotal = Number(this.orderdata.nettoPrice).toFixed(2);
                this.total = Number(this.orderdata.totalPrice).toFixed(2);
            })
            .catch(function (error) {
                if(error.response.status == 403)
                {
                    localStorage.setItem("token", "");
                    window.location.reload();
                }
            });

           
        },

        editOrder(){
            this.mytoken = localStorage.getItem("token");
            this.orderdata.nettoPrice = this.subtotal;
            var finalTotal = parseFloat(this.orderdata.nettoPrice) + parseFloat(this.orderdata.VAT);
            this.orderdata.totalPrice = Number(finalTotal).toFixed(2);
            //console.log(this.orderdata);
            var orderdata = this.orderdata
            var config = {
                method: "post",
                url: "https://engine.netsupport.dk:8270/orders/v1/updorder/" +this.mytoken,
                headers: {
                "Content-Type": "application/json",
                },
                data: orderdata
            };
            axios(config)
            .then((response) => {
                alert(response.data.status);
            })
            .catch(function (error) {
                console.log(error.message);
                alert("order detail not updated");
            });
        },

        editOrderLine(){
            this.mytoken = localStorage.getItem("token");
            for(let i=0;i<this.orderlinedata.length;i++){
                if(this.orderlinedata[i].lineNumber ==""){
                    var j = parseInt(i)-parseInt(1);
                    if(j < 0){
                        this.orderlinedata[i].lineNumber = "1";
                    }
                    else{
                        this.orderlinedata[i].lineNumber = parseInt(this.orderlinedata[j].lineNumber) + parseInt(1);
                        this.orderlinedata[i].lineNumber =  this.orderlinedata[i].lineNumber.toString(); 
                    }
                }
                this.orderlinedata[i].totalPrice = parseFloat(this.orderlinedata[i].nettoPrice) * parseFloat(this.orderlinedata[i].itemQTY);
                //this.subtotal += this.orderlinedata[i].totalPrice;
            }
            var orderlinedata = JSON.parse(JSON.stringify(this.orderlinedata));

            var config = {
                method: "post",
                url: "https://engine.netsupport.dk:8270/orders/v1/updordline/" +this.mytoken,
                headers: {
                "Content-Type": "application/json",
                },
                data: orderlinedata
            };
            axios(config)
            .then((response) => {
                alert(response.data.status);
                this.getorderlinedata();
                this.getorderdata();
            })
            .catch(function (error) {
                alert("invoice detail not updated");
            });
        },

        deleteOrderline(index){
            if (confirm("Are you sure you want to delete this orderline?")) {
                this.mytoken = localStorage.getItem("token");

                this.deleteorderline = {
                    lnsid:this.orderlinedata[index].lnsid,
                    shop:this.orderlinedata[index].shop,
                    orderNumber:this.orderlinedata[index].orderNumber,
                    barCode : this.orderlinedata[index].barCode,
                    itemNumber:this.orderlinedata[index].itemNumber
                };
                console.log(this.deleteorderline);
                // var config = {
                //     method: "delete",
                //     url: "https://engine.netsupport.dk:8270/orders/v1/deleteline/" +this.mytoken,
                //     headers: {
                //     "Content-Type": "application/json",
                //     },
                //     data: this.deleteorderline
                // };
                // axios(config)
                // .then((response) => {
                //     alert(response.data.status);
                //     this.getorderlinedata();
                //     this.getorderdata();
                // })
                // .catch(function (error) {
                //     alert("invoice detail not updated");
                // });

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

<style lang="scss" scoped>
    @import "~@core/scss/base/pages/app-invoice.scss";

    .Padding_remove {
        padding-right: 0px !important;
    }
        .Header_left_content{
            width: 31%;
        }

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
