<template>
    <section class="invoice-preview-wrapper">
        <!-- Alert: No item found -->
        <b-alert
            variant="danger"
            :show="invoicenumber === undefined"
        >
        <h4 class="alert-heading">
            {{ $t('Error fetching invoice data') }}
        </h4>
        <div
            class="alert-body"
        >
            {{ $t('No invoice found with this invoice id. Check') }}
            <b-link
                class="alert-link"
                :to="{ name: 'invoices-page'}"
            >
                {{ $t('Invoice List') }}
            </b-link>
                {{ $t('for other invoices') }}.
        </div>
        </b-alert>
        <b-row
            v-if="invoicenumber"
            class="invoice-preview"
        >
        <!-- Col: Left (Invoice Container) -->
            <b-col cols="12">
                <b-card no-body class="invoice-preview-card">
                    <!-- Header -->
                    <b-card-body class="invoice-padding pb-0">
                        <div
                            class="
                                d-flex
                                justify-content-between
                                flex-md-row flex-column
                                invoice-spacing
                                mt-0
                            "
                        >
                            <!-- Header: Left Content -->
                            <div>
                                <div class="logo-wrapper">
                                <!-- <b-img
                                    fluid
                                    :src="imgUrl"
                                    alt="Login V2"
                                    style="max-width: 35px"
                                />
                                <h3 class="text-primary invoice-logo">InteGreat</h3> -->
                                </div>
                                <b-card-text class="mb-25">
                                    {{ orderdata.customerName }}
                                </b-card-text>
                                <b-card-text class="mb-25">
                                    {{ orderdata.customerEmail }}
                                </b-card-text>
                                <b-card-text class="mb-0">
                                    {{ orderdata.customerPhone }}
                                </b-card-text>
                            </div>

                            <!-- Header: Right Content -->
                            <div class="mt-md-0 mt-2">
                                <h4 class="invoice-title">
                                    {{ $t('Invoice') }}:
                                    <span 
                                        class="invoice-number"
                                    >
                                        # {{ invoiceData.invoice }}
                                    </span>
                                </h4>
                                <div class="invoice-date-wrapper">
                                    <p class="invoice-date-title">{{ $t('Date Issued') }}:</p>
                                    <p class="invoice-date">{{ invoicedate }}</p>
                                </div>
                                <div class="invoice-date-wrapper">
                                    <p class="invoice-date-title">{{ $t('Due Date') }}:</p>
                                    <p class="invoice-date">-</p>
                                </div>
                            </div>
                        </div>
                    </b-card-body>

                    <!-- Spacer -->
                    <hr class="invoice-spacing" />

                    <!-- Invoice Client & Payment Details -->
                    <b-card-body class="invoice-padding pt-0">
                        <b-row class="invoice-spacing">
                            <!-- Col: Invoice To -->
                            <b-col cols="12" xl="12" class="p-0">
                                <b-row> 
                                    <b-col cols="4" >  
                                        <h6 class="mb-2">
                                            {{ $t('Invoice Address') }}:
                                        </h6>
                                        <h6 class="mb-25">
                                            {{ orderdata.invoiceName }}
                                        </h6>
                                        <p class="card-text mb-25">
                                            {{ orderdata.invoiceAddress }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.invoiceZip }},{{ orderdata.invoiceCity }}
                                        </p>
                                        <p class="card-text mb-25">
                                            {{ orderdata.invoiceCountry }}
                                        </p>
                                        <p class="card-text mb-0">
                                            {{ orderdata.invoicePhone }}
                                        </p>
                                    </b-col> 
                                    <b-col cols="4"> 
                                        <h6 class="mb-2">
                                            {{ $t('Delivery Address') }}:
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
                                            {{ $t('Buyer Address') }}:
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
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card-body>
                    <!-- Invoice Description: Table -->
                    <b-table-lite
                        responsive
                        :items="invoicelinedata"
                        :fields="['taskDescription', 'rate', 'QTY', 'total']"
                    >
                    
                        <template #cell(taskDescription)="data">
                            <b-card-text class="font-weight-bold mb-25">
                                {{ data.item.description1 }}  
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
                                        <p class="invoice-total-amount"> {{ orderdata.valuta }} {{ subtotal }} </p>
                                    </div>
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">{{ $t('Discount') }}:</p>
                                        <p class="invoice-total-amount">-</p>
                                    </div>
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">{{ $t('VAT') }}:</p>
                                        <p class="invoice-total-amount"> {{ orderdata.valuta }} {{ invoiceData.VAT }} </p>
                                    </div>
                                    <hr class="my-50" />
                                    <div class="invoice-total-item">
                                        <p class="invoice-total-title">{{ $t('Total') }}:</p>
                                        <p class="invoice-total-amount">{{ orderdata.valuta }} {{ total }}</p>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card-body>
                    <!-- Spacer -->
                    <hr class="invoice-spacing" />
                    <!-- Button: Edit -->
                    <div class="mb-2">
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls"
                            :to="'/invoice-edit/'+ invoiceData.invoice +'/'+ invoiceData.orderNumber + '/' + invoiceData.shop"
                        >
                            {{ $t('Edit Invoice') }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls"
                            @click="CopyInvoice()" 
                        >
                            {{ $t('Copy Invoice') }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls"
                        >
                            {{ $t('Download') }}
                        </b-button>

                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            class="mb-75 ml-2 mr-2 btn_cls"
                            @click="printInvoice"
                        >
                            {{ $t('Print') }}
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
    } from "bootstrap-vue";
    import Logo from "@core/layouts/components/Logo.vue";
    import Ripple from "vue-ripple-directive";
    export default {
        directives: {
            Ripple,
            "b-toggle": VBToggle,
        },
        props: {
            
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
            Logo
        },
        data() {
            return {
                invoiceData: [],
                invoicelinedata: [],
                orderdata:[],
                printInvoice: () => {
                    window.print();
                },
                invoicedate : '',
                invoicenumber: this.$route.params.invoice,
                ordernumber: this.$route.params.order,
                ordershop: this.$route.params.shop,
                date_d: Date,
                subtotal:0,
                total:0,
                create_invoice : {
                    hdrId:"",
                    invoiceNumber: this.$route.params.invoice,
                    orderNumber: this.$route.params.order,
                    shop: this.$route.params.shop,
                }
            };
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
                        this.getinvoicelinedata();
                        this.getorderdata();
                        this.getinvoicedata();
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
            getinvoicedata() {
                this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/invoices/v1/headers/" + this.mytoken +
                    "?offset=0&pagesize=10&days=365" +
                    "&invoice=" + this.invoicenumber +
                    "&order=" + this.ordernumber
                )
                .then((responseorder) => {
                    var data = JSON.stringify(responseorder.data.invoices.recordset[0]);
                    this.invoiceData = JSON.parse(data);
                    //console.log(this.invoiceData);
                    this.date_d = this.invoiceData.Invoicedate;
                    this.invoicedate = new Date(this.date_d).getDate()+'-'+(new Date(this.date_d).getMonth()+1)+'-'+new Date(this.date_d).getFullYear();
                    this.create_invoice.hdrId = this.invoiceData.hdrId;
                    
                    this.subtotal = Number(this.invoiceData.Netto).toFixed(2);
                    this.total = Number(this.invoiceData.Total).toFixed(2);
                })
                .catch(function (error) {
                    console.log(error);
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
                    console.log(error);
                    // if(error.response.status == 403)
                    // {
                    //     localStorage.setItem("token", "");
                    //     window.location.reload();
                    // }
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
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.order)
                    );
                    //console.log(this.orderdata);
                })
                .catch(function (error) {
                    if(error.response.status == 403)
                    {
                        localStorage.setItem("token", "");
                        window.location.reload();
                    }else{
                        alert('orderdata not found');
                    }
                });
            },
            CopyInvoice(){
                this.mytoken = localStorage.getItem("token");
                console.log(JSON.parse(JSON.stringify(this.create_invoice)));

                var create_invoice = this.create_invoice;
                var config = {
                    method: "post",
                    url: "https://engine.netsupport.dk:8270/invoices/v1/createinvoice/" +this.mytoken,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: create_invoice
                };
                axios(config)
                .then((response) => {
                    console.log(JSON.parse(JSON.stringify(response.data)));
                    this.$router.push({ name: "invoices-page" });
                })
                .catch(function (error) {
                    console.log(error);
                    alert("order detail not updated");
                });
            }
        },
    };
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