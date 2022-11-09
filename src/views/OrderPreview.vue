<template>
    <section class="invoice-preview-wrapper">
        <b-alert
            variant="danger"
            :show="ordernumber === undefined"
        >
        <h4 class="alert-heading">
            {{ $t('Error fetching order data') }}
        </h4>
        <div class="alert-body">
            {{ $t('No order found with this id. Check') }}
            <b-link
                class="alert-link"
                :to="{ name: 'second-page'}"
            >
                {{ $t('Order List') }}
            </b-link>
                {{ $t('for other Orders') }}.
        </div>
        </b-alert>

        <b-row 
            class="invoice-preview" 
            v-if="ordernumber"
        >
            <!-- Col: Left (Invoice Container) -->
            <!-- <b-col
                cols="12"
                xl="9"
                md="8"
            > -->
            <b-col
                cols="12"
            >
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
                                <!-- <b-img fluid :src="imgUrl" alt="Login V2" style="max-width: 35px;"/>
                                <h3 class="text-primary invoice-logo">
                                    InteGreat
                                </h3> -->
                            </div>
                            <h6 class="mb-25">
                                {{ orderdata.supplierName }}
                            </h6>
                            <p class="card-text mb-25">
                                {{ orderdata.supplierAddress }}
                            </p>
                            <p class="card-text mb-25">
                                {{ orderdata.supplierZip }},{{ orderdata.supplierCity }}
                            </p>
                            <p class="card-text mb-25">
                                {{ orderdata.supplierCountry }}
                            </p>
                        </div>

                        <!-- Header: Right Content -->
                        <div class="mt-md-0 mt-2">
                            <h4 class="invoice-title">
                            {{ $t("Order") }} : 
                            <span class="invoice-number"># {{ orderdata.orderNumber }}</span>
                            </h4>
                            <div class="invoice-date-wrapper">
                            <p class="invoice-date-title">
                                {{ $t("Date Issued") }}:
                            </p>
                            <p class="invoice-date">
                                -
                            </p>
                            </div>
                            <div class="invoice-date-wrapper">
                            <p class="invoice-date-title">
                                {{ $t("Delivery Date") }}:
                            </p>
                            <p class="invoice-date">
                                {{ orderdata.deliveryDate }}
                            </p>
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
                                class="p-0"
                            >
                                <b-row> 
                                    <b-col cols="4" >
                                        <h6 class="mb-2">
                                            {{ $t("Buyer Address") }}:
                                        </h6>
                                        <h6 class="mb-25">
                                            {{ orderdata.buyerName }}
                                        </h6>
                                        <p class="card-text mb-25">
                                            {{ orderdata.buyerAddress }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.buyerZip }},{{ orderdata.buyerCity }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.buyerCountry }}
                                        </p>
                                    </b-col> 
                                    <b-col cols="4"> 

                                        <h6 class="mb-2">
                                            {{ $t("Delivery Address") }}:
                                        </h6>
                                        <h6 class="mb-25">
                                            {{ orderdata.deliverName }}
                                        </h6>
                                        <p class="card-text mb-25">
                                            {{ orderdata.deliverAddress }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.deliverZip }},{{ orderdata.deliverCity }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.deliverCountry }}
                                        </p>
                                
                                    </b-col>
                                    <b-col cols="4">

                                        <h6 class="mb-2">
                                            {{ $t("Supplier Address") }}:
                                        </h6>
                                        <h6 class="mb-25">
                                            {{ orderdata.supplierName }}
                                        </h6>
                                        <p class="card-text mb-25">
                                            {{ orderdata.supplierAddress }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.supplierZip }},{{ orderdata.supplierCity }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.supplierCountry }}
                                        </p>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card-body>
                    <!-- Invoice Description: Table -->
                    <b-table-lite
                        responsive
                        :items="orderlinedata"
                        :fields="['taskDescription', 'rate', 'QTY', 'total']"
                    >
                        <template #cell(taskDescription)="data">
                            <b-card-text class="font-weight-bold mb-25">
                                {{ data.item.description1 }}  
                            </b-card-text>
                            <b-card-text class="text-nowrap">
                                {{ data.item.internText }}
                            </b-card-text>
                            <b-card-text class="text-nowrap">
                                {{ data.item.description2 }}
                            </b-card-text>
                        </template>
                        <template #cell(rate)="data">
                            <b-card-text class="font-weight-bold mb-25">
                            {{ data.item.nettoPrice }}
                            </b-card-text>
                        </template>
                        <template #cell(QTY)="data">
                            <b-card-text class="font-weight-bold mb-25">
                            {{ data.item.itemQTY }}
                            </b-card-text>
                        </template>
                        <template #cell(total)="data">
                            <b-card-text class="font-weight-bold mb-25">
                            {{ data.item.totalPrice }}
                            </b-card-text>
                        </template>
                    </b-table-lite>

                    <hr class="invoice-spacing">
                    
                    <!-- Invoice Description: Total -->
                    <b-card-body class="invoice-padding pb-0">
                        <b-row>

                            <!-- Col: Sales Persion -->
                            <b-col
                                cols="12"
                                md="6"
                                class="mt-md-0 mt-3"
                                order="2"
                                order-md="1"
                            >
                                <b-card-text class="mb-0">
                                <!-- <span class="font-weight-bold">Salesperson:</span>
                                <span class="ml-75">Alfie Solomons</span> -->
                                </b-card-text>
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
                                        {{ $t("Subtotal") }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                        {{ orderdata.valuta }} {{ subtotal }}
                                        </p>
                                    </div>
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                        {{ $t("Discount") }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            -
                                        </p>
                                    </div>
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                        {{ $t("VAT") }}:
                                        </p>
                                        <p class="invoice-total-amount">
                                            {{ orderdata.valuta }} {{ orderdata.VAT }}
                                        </p>
                                    </div>
                                    <hr class="my-50">
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">
                                        {{ $t("Total") }}:
                                        </p>
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
                        <!-- <span class="font-weight-bold">Note: </span>
                        <span>It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                        projects. Thank You!</span> -->
                    </b-card-body>
                    <div class="mb-2">
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls"
                            :to="'/order-edit/'+ orderdata.orderNumber +'/'+ orderdata.shop"
                        >
                            {{ $t("Edit Order") }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls copy_btn"
                            @click="CopyOrder()" 
                        >
                            {{ $t("Copy Order") }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls copy_btn" 
                        >
                            {{ $t("Download") }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls copy_btn"
                            @click="printInvoice"
                        >
                            {{ $t("Print") }}
                        </b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </section>
</template>
<script>
    import axios from "axios";
    import {
    
        BRow, 
        BCol, 
        BCard, 
        BCardBody, 
        BTableLite, 
        BCardText, 
        BButton, 
        BAlert, 
        BLink, 
        VBToggle,
        BImg,
    } from 'bootstrap-vue'
    import Logo from '@core/layouts/components/Logo.vue'
    import Ripple from 'vue-ripple-directive'
    import InvoiceSidebarSendInvoice from './InvoiceSidebarSendInvoice.vue'
    import InvoiceSidebarAddPayment from './InvoiceSidebarAddPayment.vue'

    export default {
        directives: {
            Ripple,
            'b-toggle': VBToggle,
        },
        components: {
            BRow,
            BCol,
            BCard,
            BCardBody,
            BTableLite,
            BCardText,
            BButton,
            BAlert,
            BLink,
            BImg,

            Logo,
            InvoiceSidebarAddPayment,
            InvoiceSidebarSendInvoice,
        },
        data() {
            return{
                
                printInvoice : () => {
                    window.print()
                },
                
                mytoken: "",
                orderdata: [],
                orderlinedata: [],
                ordernumber : this.$route.params.id,
                shop : this.$route.params.shop,
                total:'',
                subtotal : '',
                create_order : {
                    hdrId:"",
                    orderNumber: this.$route.params.id,
                    shop: this.$route.params.shop
                }
            }
        },
        computed: {
            imgUrl() {
                this.sideImg = require("@/assets/images/pages/new_login.png");
                return this.sideImg;
            },
        },

        created() {
            this.getorderlinedata();
            this.getorderdata();
        },

        methods: {
            getorderlinedata(){
                this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/orders/v1/lines/" + this.mytoken +
                        "?order=" + this.ordernumber +
                        "&shop=" + this.shop
                )
                .then((responseorder) => { 
                    this.orderlinedata = JSON.parse(
                        JSON.stringify(responseorder.data.lines.recordset)
                    );

                    this.getorderdata();
                })
                .catch(function (error) {
                    console.log(error);
                    localStorage.setItem("token", "");
                    this.$router.push({ name: "login" });
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
                    //console.log(responseorder.data.order);
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.order)
                    );
                    this.subtotal = Number(this.orderdata.nettoPrice).toFixed(2);
                    this.total = Number(this.orderdata.totalPrice).toFixed(2);
                    this.create_order.hdrId = this.orderdata.hdrid;
                })
                .catch(function (error) {
                    if(error.response.status == 403)
                    {
                        localStorage.setItem("token", "");
                        window.location.reload();
                    }
                });
            },
            CopyOrder(){
                //console.log(this.create_order);
                this.mytoken = localStorage.getItem("token");
                //console.log(JSON.parse(JSON.stringify(this.create_order)));

                var create_order = this.create_order;
                var config = {
                    method: "post",
                    url: "https://engine.netsupport.dk:8270/orders/v1/copyorder/" +this.mytoken,
                    headers: {
                    "Content-Type": "application/json",
                    },
                    data: create_order
                };
                axios(config)
                .then((response) => {
                    //alert(response);
                    console.log(JSON.parse(JSON.stringify(response.data)));
                    this.$router.push({ name: "second-page" });
                })
                .catch(function (error) {
                    console.log(error);
                    // localStorage.setItem("token", "");
                    // this.$router.push({ name: "login" });
                    alert("order detail not copied");
                });
            }
        },
    }

</script>

<style lang="scss" scoped>
    @import "~@core/scss/base/pages/app-invoice.scss";

    .btn_cls{
        width: 20% !important;
    }
</style>

<style lang="scss">
    @media print {

        // Global Styles
        body {
            background-color: transparent !important;
        }
        nav.header-navbar {
            display: none;
        }
        .main-menu {
            display: none;
        }
        .header-navbar-shadow {
            display: none !important;
        }
        .content.app-content {
            margin-left: 0;
            padding-top: 2rem !important;
        }
        footer.footer {
            display: none;
        }
        .card {
            background-color: transparent;
            box-shadow: none;
        }
        .customizer-toggle {
            display: none !important;
        }
        .edit_btn{
            display: none !important;   
        }
        .copy_btn{
            display: none !important; 
        }
        // Invoice Specific Styles
        .invoice-preview-wrapper {
            .row.invoice-preview {
            .col-md-8 {
                max-width: 100%;
                flex-grow: 1;
            }

            .invoice-preview-card {
                .card-body:nth-of-type(2) {
                .row {
                    > .col-12 {
                        max-width: 50% !important;
                    }

                    .col-12:nth-child(2) {
                        display: flex;
                        align-items: flex-start;
                        justify-content: flex-end;
                        margin-top: 0 !important;
                    }
                }
                }
            }
            }

            // Action Right Col
            .invoice-actions {
                display: none;
            }
        }
    }
</style>
