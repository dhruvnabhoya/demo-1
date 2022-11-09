<template>
<section class="invoice-add-wrapper">
    <b-alert variant="danger" :show="ordernumber === undefined">
        <h4 class="alert-heading">
            {{ $t('Error fetching order') }}
        </h4>
        <div class="alert-body">
            {{ $t('Please select an order to print') }}
            <b-link class="alert-link" :to="{ name: 'shipments'}">
                {{ $t('Shipment List') }}.
            </b-link>
        </div>
    </b-alert>
    <b-row class="invoice-add" v-if="ordernumber">
        <!-- Col: Left (Invoice Container) -->
        <b-col cols="12" xl="12" md="12">
            <validation-observer ref="transportValidation">
                <b-form @submit.prevent>
                    <b-card no-body class="invoice-preview-card">
                        <!-- Header -->
                        <b-card-body class="pb-0">
                            <div class="flex-column invoice-spacing mt-0">
                                <b-row class="mb-2">
                                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                                        <b-pagination v-model="currentPage" :total-rows="totalPrintRecords" per-page="1" first-number last-number class="mb-0 mt-1 float-right mr-1" prev-class="prev-item" next-class="next-item">
                                            <template #prev-text>
                                                <feather-icon icon="ChevronLeftIcon" size="18" />
                                            </template>
                                            <template #next-text>
                                                <feather-icon icon="ChevronRightIcon" size="18" />
                                            </template>
                                        </b-pagination>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <!-- Header: Left Content -->
                                    <b-col cols="6" class="d-flex">
                                        <b-row class='flex-grow-1 custom_pd'>
                                            <b-col cols="8">
                                                <div class="">
                                                    <b-card-text class="mb-25">
                                                        <b-form-input v-model="orderdata.deliverName" id="invoice-data-id" :placeholder="$t('Name')" disabled />
                                                    </b-card-text>
                                                    <b-card-text class="mb-25">
                                                        <b-form-input v-model="orderdata.deliverAddress" id="invoice-data-id" :placeholder="$t('Address')" disabled />
                                                    </b-card-text>
                                                    <b-card-text class="mb-25">
                                                        <b-row>
                                                            <b-col cols="3" class="pr-0">
                                                                <b-form-input v-model="orderdata.deliverZip" id="invoice-data-id" :placeholder="$t('Zip')" disabled />
                                                            </b-col>
                                                            <b-col cols="6" class="ml-0">
                                                                <b-form-input v-model="orderdata.deliverCity" id="invoice-data-id" :placeholder="$t('City')" disabled />
                                                            </b-col>
                                                            <b-col cols="3" class="pl-0">
                                                                <b-form-input v-model="orderdata.deliverCountry" id="invoice-data-id" :placeholder="$t('Country')" disabled />
                                                            </b-col>
                                                        </b-row>
                                                    </b-card-text>
                                                    <b-card-text class="mb-25">
                                                        <b-row>
                                                            <b-col cols="4" class="pr-0">
                                                                <b-form-input v-model="orderdata.deliverPhone" id="invoice-data-id" :placeholder="$t('Phone')" disabled />
                                                            </b-col>
                                                            <b-col cols="8">
                                                                <b-form-input v-model="orderdata.deliverMail" id="invoice-data-id" :placeholder="$t('Email')" disabled />
                                                            </b-col>
                                                        </b-row>
                                                    </b-card-text>
                                                    <b-card-text class="mb-25">
                                                        <b-form-textarea v-model="orderdata.remark" class="mb-2 mb-lg-0 remark-height" disabled />
                                                    </b-card-text>
                                                </div>
                                            </b-col>
                                            <b-col cols="4">
                                                <div class="">
                                                    <b-card-text class="mb-25">
                                                        <b-form-input v-model="ordernumber" id="invoice-data-id" :placeholder="$t('Order')" disabled />
                                                    </b-card-text>
                                                    <b-card-text class="mb-25">
                                                        <b-form-input v-model="shop" id="invoice-data-id" :placeholder="$t('Chain')" disabled />
                                                    </b-card-text>
                                                    <div class="mt-2">
                                                        <b-card-text class="mb-25">
                                                            <span class="title">
                                                                {{ $t('Requested Date') }}:
                                                            </span>
                                                            <b-form-input type="date" class="" v-model="orderdata.deliveryDate" id="invoice-data-id" :placeholder="$t('Requested Date')" disabled />
                                                        </b-card-text>
                                                        <b-card-text class="mb-25">
                                                            <span class="title">
                                                                {{ $t('Delivery Date') }}:
                                                            </span>
                                                            <b-form-input type="date" class="" v-model="deliveryDate" id="invoice-data-id" :placeholder="$t('Delivery Date')" />
                                                        </b-card-text>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-col>

                                    <b-col cols="6" class="d-flex justify-content-end">
                                        <div class="mb-0 custom_area">
                                            <span class="title">
                                                {{ $t('Area') }}:
                                            </span>
                                            <validation-provider #default="{ errors }" name="Area" rules="required">
                                                <v-select v-model="filterArea" dir="ltr" :options="areaOptions" class="invoice-filter-select mr-50" :placeholder="$t('Area')" :state="errors.length > 0 ? false : null" label="text" @input="getConsignorFields($event.value)">
                                                    <template #selected-option="{ text }">
                                                        <span class="text-truncate overflow-hidden">
                                                            {{ text }}
                                                        </span>
                                                    </template>
                                                </v-select>
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                            &nbsp;
                                        </div>
                                        <!-- Header: Right Content -->
                                        <div class="invoice-number-date mt-md-0 mt-2">
                                            <b-row>
                                                <b-col cols="6">
                                                    <div class="mb-0">
                                                        <span class="title">
                                                            {{ $t('Carrier') }}:
                                                        </span>
                                                        <validation-provider #default="{ errors }" name="Carrier" rules="required">
                                                            <v-select v-model="filterCarrier" dir="ltr" :options="carrierOptions" class="invoice-filter-select mr-50" :placeholder="$t('Carrier')" :state="errors.length > 0 ? false : null" label="text" @input="getProduct($event)">
                                                                <template #selected-option="{ text }">
                                                                    <span class="text-truncate overflow-hidden">
                                                                        {{ text }}
                                                                    </span>
                                                                </template>
                                                            </v-select>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </validation-provider>
                                                        &nbsp;
                                                    </div>
                                                    <div class="mb-0">
                                                        <span class="title">
                                                            {{ $t('Product') }}:
                                                        </span>
                                                        <validation-provider #default="{ errors }" name="Product" rules="required">
                                                            <v-select v-model="filterProduct" dir="ltr" :options="productOptions" class="invoice-filter-select mr-50" :placeholder="$t('Product')" :state="errors.length > 0 ? false : null" :disabled="productActive" label="text" @input="getServiceGoods($event)">
                                                                <template #selected-option="{ text }">
                                                                    <span class="text-truncate overflow-hidden">
                                                                        {{ text }}
                                                                    </span>
                                                                </template>
                                                            </v-select>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </validation-provider>
                                                        &nbsp;
                                                    </div>
                                                </b-col>

                                                <b-col cols="6">
                                                    <div class="mb-0">
                                                        <span class="title">
                                                            {{ $t('Goods Type') }}:
                                                        </span>
                                                        <validation-provider #default="{ errors }" name="Goods Type" rules="required">
                                                            <v-select v-model="filterGoodstype" dir="ltr" :options="goodstypeOptions" class="invoice-filter-select mr-50" :placeholder="$t('Goods Type')" :state="errors.length > 0 ? false : null" :disabled="activation" label="text">
                                                                <template #selected-option="{ text }">
                                                                    <span class="text-truncate overflow-hidden">
                                                                        {{ text }}
                                                                    </span>
                                                                </template>
                                                            </v-select>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </validation-provider>
                                                        &nbsp;
                                                    </div>

                                                    <div class="mb-0">
                                                        <span class="title">
                                                            {{ $t('Service') }}:
                                                        </span>
                                                        <v-select v-model="filterService" dir="ltr" :options="serviceOptions" class="invoice-filter-select mr-50" :placeholder="$t('Service')" :disabled="activation" label="text">
                                                            <template #selected-option="{ text }">
                                                                <span class="text-truncate overflow-hidden">
                                                                    {{ text }}
                                                                </span>
                                                            </template>
                                                        </v-select>
                                                        &nbsp;
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1 flex-grow-1 p-0">
                                    <b-col cols="4" class="d-flex justify-content-start">
                                    </b-col>
                                    <b-col cols="8" class="d-flex justify-content-start shift-msg-div">
                                        <div class="mb-0 custom-width-div">
                                            <span class="title">
                                                {{ $t('Freight Message') }}:
                                            </span>
                                            <v-select v-model="filterFreightmsg" dir="ltr" :options="freightmsgOptions" class="invoice-filter-select mr-50" label="text" :placeholder="$t('Freight Message')">
                                                <template #selected-option="{ text }">
                                                    <span class="text-truncate overflow-hidden">
                                                        {{ $t(text) }}
                                                    </span>
                                                </template>
                                                <template #option="{ text }">
                                                    <span class="text-truncate overflow-hidden">
                                                        {{ $t(text) }}
                                                    </span>
                                                </template>
                                            </v-select>
                                            &nbsp;
                                        </div>
                                        <div class="mb-0 ml-1 w-100">
                                            <span class="title">
                                                {{ $t('Message') }}:
                                            </span>
                                            <b-form-textarea v-model="message" id="invoice-data-id" maxlength="50" class="height-40-textarea" />
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-card-body>

                        <!-- Spacer -->
                        <hr class="invoice-spacing">
                        <!-- Invoice Client & Payment Details -->
                        <b-card-body class="invoice-padding pt-0 ">
                            <b-row>
                                <b-col cols="12" md="8" class="d-flex justify-content-start p-0 mb-1 mt-1">
                                    <!-- <h4 class="mr-1 mt-0">
                                            {{ $t('Labels') }}: 
                                        </h4>
                                        <b-form-input
                                            v-model="totalLabels"
                                            id="invoice-data-id"
                                            type="number"
                                            :placeholder="$t('Totallabels')"
                                            class="custom-labelnumber mr-1"
                                            @change="changeLabelsize"
                                        />
                                        <b-button
                                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                            size="sm"
                                            variant="primary"
                                            class="addbtn"
                                            @click="addNewItemInItemForm"
                                        >
                                            {{ $t("Add Label") }}
                                        </b-button>

                                        <h6 
                                            v-if="totalOrderlinedata.length > 5 && totalLabels == 5"
                                            class="ml-1"
                                        >
                                            {{ $t('showing only ') }} {{ totalLabels }} {{('labels') }}
                                        </h6> -->
                                </b-col>
                                <b-col cols="12" md="4" class="d-flex justify-content-end p-0 mb-1">
                                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="w-50" @click="sendOrderLine()">
                                        {{ $t('Print') }}
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-row>
                                <!-- Col: Invoice To -->
                                <b-col cols="12" xl="12" class="p-0">
                                    <b-table ref="refInvoiceListTable" :items="this.orderlinedata" responsive :fields="tableColumns" primary-key="id" show-empty empty-text="No matching records found" class="position-relative">
                                        <template #cell(GTIN)="data">
                                            <div>
                                                <span> {{ data.item.description1 }} {{ data.item.description2 }} </span><br>
                                                <span> {{ data.item.GTIN }} {{ data.item.SKU }} </span>
                                            </div>
                                        </template>

                                        <template #cell(qty)="data">
                                            <span> {{ data.item.qty }} </span>
                                        </template>

                                        <template #cell(line)="data">
                                            <div>
                                                <b-form-input v-model="data.item.qty" :id="'main'+data.item.line" :placeholder="$t('Labels')" class="w-50" @click="cellChangeFun(data.item.line)" />
                                            </div>
                                            <div>
                                                <b-form-input v-model="data.item.labelcount" :id="'custom'+data.item.line" style="display:none" :placeholder="$t('Labels')" class="w-50" />
                                            </div>
                                        </template>

                                        <template #cell(weight)="data">
                                            <div>
                                                <b-form-input v-model="data.item.weight" id="invoice-data-id" :placeholder="$t('Weight')" class="w-50" />
                                            </div>
                                        </template>

                                    </b-table>

                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-form>
            </validation-observer>
        </b-col>
    </b-row>
</section>
</template>

<script>
import axios from "axios";
import i18n from '@/libs/i18n/index';
import Logo from '@core/layouts/components/Logo.vue';
import Ripple from 'vue-ripple-directive';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import {
    BRow,
    BCol,
    BCard,
    BTable,
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
    BFormRadio,
    BPagination,
    VBToggle,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import flatPickr from 'vue-flatpickr-component';
import {
    ValidationProvider,
    ValidationObserver
} from "vee-validate";
import {
    required
} from "@validations";

export default {
    props: {
        arrayData: Array
    },
    components: {
        BRow,
        BCol,
        BCard,
        BCardBody,
        BButton,
        BCardText,
        BForm,
        BTable,
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
        BFormRadio,
        BPagination,
        flatPickr,
        vSelect,
        Logo,
        VueSlickCarousel,
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle,
    },
    data() {
        return {
            slickOptions: {
                slidesToShow: 3
            },
            required,
            currentPage: 1,
            totalPrintRecords: this.arrayData.length,
            cellChange: true,
            activation: true,
            productActive: true,
            filterArea: "",
            filterTransport: "",
            filterCarrier: "",
            filterSubcarrier: "",
            filterProduct: "",
            filterService: "",
            filterGoodstype: "",
            filterFreightmsg: "",
            totalLabels: 0,
            totalrecords: 0,
            freightmsg: "",
            message: "",
            deliveryDate: "",
            //arrayData : this.$route.params.arrayData,
            // ordernumber : this.$route.params.order,
            // shop : this.$route.params.shop,
            // provider : this.$route.params.provider,
            ordernumber: "",
            shop: "",
            provider: "",

            actor: '',
            areaOptions: [],
            transportOptions: [],
            carrierOptions: [],
            subcarrierOptions: [],
            productOptions: [],
            serviceOptions: [],
            goodstypeOptions: [],
            freightmsgOptions: [{
                    text: "Not Sent",
                    value: "0"
                },
                {
                    text: "Sent to Driver",
                    value: "1"
                },
                {
                    text: "Sent to Carrier",
                    value: "2"
                },
                {
                    text: "Sent to Recipient",
                    value: "3"
                },
            ],
            orderdata: [],
            totalOrderlinedata: [],
            orderlinedata: [],
            itemFormBlankItem: {
                line: "",
                GTIN: "",
                SKU: "",
                qty: "",
                description1: "",
                description2: "",
                internalText: ""
            },
            activeView: false,
            pdfLabels: [],
            carriersdata: [],
            productsdata: [],
            tableColumns: [{
                    key: "GTIN",
                    label: i18n.t('Description'),
                    sortable: true
                },
                {
                    key: "qty",
                    label: i18n.t('Qty'),
                    sortable: true
                },
                {
                    key: "line",
                    label: i18n.t('labels'),
                    sortable: true
                },
                {
                    key: "weight",
                    label: i18n.t('Weight'),
                    sortable: true
                }
            ],
        }
    },
    watch: {
        currentPage: function (val) {
            this.currentPage = val;
            this.getOrderdata(this.actor);
            this.getCarrierdata();
            this.getorderlinedata();
        },
        totalPrintRecords: function (val) {
            this.totalPrintRecords = val;
            this.getOrderdata(this.actor);
            this.getCarrierdata();
            this.getorderlinedata();
        },
    },
    created() {
        console.log("arrayData", this.arrayData);
        console.log("only for testing");
        console.log("only for testing");
        this.mytoken = localStorage.getItem("token");
        if (this.mytoken == "") {
            localStorage.removeItem("token");
            this.$router.push({
                name: "login"
            });
        } else {
            var config = {
                method: "get",
                url: "https://engine.netsupport.dk:8270/login/v1/checktoken/" + this.mytoken
            };
            axios(config)
                .then((response) => {
                    if (response.data.token.status == true) {
                        console.log(this.arrayData[0].selectedArea);
                        localStorage.setItem('areaCode', this.arrayData[0].selectedArea);
                        this.getOrderdata(this.actor);
                        this.getCarrierdata();
                        this.getorderlinedata();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    // window.location.href = '/login';
                    if (error.response.status == 404) {
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
        cellChangeFun(line) {
            document.getElementById('main' + line).style.display = "none";
            document.getElementById('custom' + line).style.display = "";
        },

        getorderlinedata() {
            this.mytoken = localStorage.getItem("token");
            this.ordernumber = this.arrayData[this.currentPage - 1].orderNumber,
                this.shop = this.arrayData[this.currentPage - 1].shop,

                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/orderlines/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.shop
                )
                .then((responseorderline) => {
                    this.totalOrderlinedata = JSON.parse(
                        JSON.stringify(responseorderline.data.articles)
                    );
                    //console.log(this.totalOrderlinedata);
                    this.totalrecords = this.totalOrderlinedata.length;
                    this.orderlinedata = this.totalOrderlinedata.slice(0, 5);
                    this.totalLabels = this.orderlinedata.length;

                    this.itemFormBlankItem.description1 = this.orderlinedata[this.totalLabels - 1].description1;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getOrderdata(checkActor) {
            this.mytoken = localStorage.getItem("token");

            this.ordernumber = this.arrayData[this.currentPage - 1].orderNumber,
                this.shop = this.arrayData[this.currentPage - 1].shop,

                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/order/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.shop
                )
                .then((responseorder) => {
                    console.log("responseorder",responseorder);
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.deliverOrder[0])
                    );
                    //console.log(this.orderdata);
                    var area = "";
                    if (this.orderdata.deliverZip < 5000) {
                        this.filterArea = "sjælland";
                        area = "5482";
                    } else {
                        this.filterArea = "jylland";
                        area = "5481";
                    }

                    this.getConsignorFields(area);

                    // if(localStorage.getItem("areaCode") != area){
                    //     localStorage.setItem('areaCode',area);
                    //     this.getConsignorFields(area);    
                    // }else{
                    //     this.productActive = false;
                    //     this.activation = false;
                    //     this.filterCarrier = localStorage.getItem("selectCarrier");
                    //     this.filterProduct = localStorage.getItem("selectProduct");
                    //     this.filterService = localStorage.getItem("selectService");
                    //     this.filterGoodstype = localStorage.getItem("selectGoodstype");
                    // }

                    // if(checkActor != area){
                    //     this.getConsignorFields(area);
                    // }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getCarrierdata() {
            this.transportOptions = [];
            this.mytoken = localStorage.getItem("token");
            this.provider = this.arrayData[this.currentPage - 1].provider,
                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/carriers/" + this.mytoken +
                    "?provider=" + this.provider
                )
                .then((responsecarrier) => {
                    //console.log(responsecarrier);
                    var carrierdata = responsecarrier.data.carriers;

                    var Area = [];
                    carrierdata.forEach(element => {
                        Area.push({
                            text: element.Carrier.trim(),
                            value: element.Consignor
                        });
                    });

                    const key = 'text';
                    this.areaOptions = [...new Map(Area.map(item => [item[key], item])).values()];
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getConsignorFields(event) {
            this.actor = event;

            if (this.actor) {

                if (localStorage.getItem("areaCode") != this.actor) {

                    localStorage.setItem('areaCode', this.actor);
                    this.filterCarrier = "";
                    this.filterProduct = "";
                    this.filterService = "";
                    this.filterGoodstype = "";
                    this.carriersdata = [];
                    this.carrierOptions = [];
                    this.productOptions = [];
                    this.serviceOptions = [];
                    this.goodstypeOptions = [];
                    this.productActive = true;
                    this.activation = true;
                } else {
                    this.productActive = false;
                    this.activation = false;
                    this.filterCarrier = localStorage.getItem("selectCarrier");
                    this.filterCarrier = JSON.parse(this.filterCarrier)
                    this.filterProduct = localStorage.getItem("selectProduct");
                    this.filterProduct = JSON.parse(this.filterProduct)
                    this.filterService = localStorage.getItem("selectService");
                    this.filterService = JSON.parse(this.filterService)
                    this.filterGoodstype = localStorage.getItem("selectGoodstype");
                    this.filterGoodstype = JSON.parse(this.filterGoodstype)
                }
                this.mytoken = localStorage.getItem("token");
                axios(
                        "https://engine.netsupport.dk:8270/transport/v1/getconsignor/" + this.mytoken +
                        "?account=" + this.actor
                    )
                    .then((responsecarriers) => {

                        this.carriersdata = responsecarriers.data.Carriers;
                        var carrier = [];

                        this.carriersdata.forEach(element => {
                            carrier.push({
                                text: element.CarrierShortName.trim(),
                                value: element.CarrierCSID
                            });
                        });
                        const key = 'text';
                        this.carrierOptions = [...new Map(carrier.map(item => [item[key], item])).values()];

                    })
                    .catch(function (error) {
                        console.log(error);
                        if (error.response.status == 403) {
                            localStorage.setItem("token", "");
                            window.location.href = '/login';
                        }
                    });
            }
        },
        changeLabelsize() {

            this.orderlinedata = this.totalOrderlinedata.slice(0, this.totalLabels);
        },

        addNewItemInItemForm() {
            this.orderlinedata.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)));
            this.totalLabels = this.orderlinedata.length;
        },

        deleteOrderline(index) {
            if (confirm("Are you sure you want to delete this orderline?")) {
                this.orderlinedata.splice(index, 1);
                this.totalLabels = this.orderlinedata.length;
            } else {
                alert("Your Data is Safe");
            }
        },

        sendOrderLine() {
            this.$refs.transportValidation.validate().then((success) => {
                console.log("success", success)
                if (success) {

                    localStorage.setItem('selectCarrier', JSON.stringify(this.filterCarrier));
                    localStorage.setItem('selectProduct', JSON.stringify(this.filterProduct));
                    localStorage.setItem('selectGoodstype', JSON.stringify(this.filterGoodstype));
                    localStorage.setItem('selectService', JSON.stringify(this.filterService));

                    var packagedata = [];
                    this.orderlinedata.forEach(element => {

                        packagedata.push({
                            weight: element.weight,
                            goods: this.filterGoodstype.value,
                            description: element.description1,
                            count: (!element.labelcount) ? element.qty.toString() : element.labelcount.toString()
                        });

                        // if(element.labelcount && element.labelcount > 1){
                        //     //for (let i = 1; i <= element.labelcount; i++) {
                        //         packagedata.push({
                        //             // labelnumber : index + 1,
                        //             count : (!element.labelcount) ? element.qty.toString() : element.labelcount.toString(),
                        //             weight : element.weight,
                        //             volume : element.volume,
                        //             goods : this.filterGoodstype.value,
                        //             service : this.filterService.value,
                        //             description : element.description1
                        //         });
                        //     //}

                        // }else{
                        //     packagedata.push({
                        //         // labelnumber : index + 1,
                        //         // labelcount : (!element.labelcount) ? element.qty : element.labelcount,
                        //         weight : element.weight,
                        //         volume : element.volume,
                        //         goods : this.filterGoodstype.value,
                        //         service : this.filterService.value,
                        //         description : element.description1
                        //     });
                        // }

                    });
console.log("here")
                    var senddata = {

                        shop: this.shop,
                        order: this.ordernumber,
                        actor: this.actor,
                        deliveryDate: this.deliveryDate + 'T12:00:00',
                        prodcsid: this.filterProduct.value.toString(),

                        lines: packagedata,

                        message: this.message,
                        messageto: this.filterFreightmsg.value
                    };
                    console.log(senddata,"-----------------senddata");

                    var config = {
                        method: "post",
                        url: "https://engine.netsupport.dk:8270/transport/v1/shipconsignor/" + this.mytoken,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: senddata
                    };
                    axios(config)
                        .then((response) => {
                            alert(response.data.consignor);
                            this.arrayData.splice(this.currentPage - 1, 1);
                            this.totalPrintRecords = this.arrayData.length;
                            // if(response.data.labelStatus == "ok"){
                            //     this.activeView = true;

                            //     response.data.pdfLabels.forEach((element,index) => {
                            //         element.labelline = index+1;
                            //     });

                            //     this.pdfLabels = response.data.pdfLabels;
                            // }
                        })
                        .catch(function (error) {
                            console.log(error.message);
                            alert("order detail not updated");
                        });
                }
            });
        },

        viewPDF(index) {
            //console.log("index",index);
            window.open(this.pdfLabels.find(e => e.labelline == index)?.packageURL, '_blank');
        },
        getProduct(event) {
            // console.log('event', event);
            // this.productOptions = [];
            // this.productsdata = [];

            var singleCarrier = this.carriersdata.filter(function (el) {
                return el.CarrierCSID == event.value;
            });
            this.productsdata = singleCarrier[0].Subcarriers[0].Products;
            var product = [];

            this.productsdata.forEach(element => {
                product.push({
                    text: element.ProdName.trim(),
                    value: element.ProdCSID
                });
            });
            const key = 'text';
            this.productOptions = [...new Map(product.map(item => [item[key], item])).values()];

            this.productActive = false;
        },
        getServiceGoods(event) {
            // console.log('event', event);
            // this.serviceOptions = [];
            // this.goodstypeOptions = [];
            var servicegoods = this.productsdata.filter(function (el) {
                return el.ProdCSID == event.value;
            });
            var service = [];
            var goodstype = [];
            servicegoods[0].GoodTypes.forEach(element => {
                goodstype.push({
                    text: element.GoodTypeKeyword.trim(),
                    value: element.GoodTypeKey1
                });
            });
            servicegoods[0].Services.forEach(em => {
                service.push({
                    text: em.ServiceName.trim(),
                    value: em.ServiceID
                });
            });
            const key = 'text';

            this.goodstypeOptions = [...new Map(goodstype.map(item => [item[key], item])).values()];

            this.serviceOptions = [...new Map(service.map(item => [item[key], item])).values()];

            this.activation = false;
        }
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style><style scoped>
::v-deep .slick-prev::before,
::v-deep .slick-next::before {
    font-family: 'slick';
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #767676 !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style><style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";

.form-item-section {
    background-color: $product-details-bg;
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

    .trasport_head_span {
        background-color: #283046;
    }
}

.form-item-section .row .border {
    background-color: white;
}

.deletebtn {
    margin-top: 6px;
    margin-left: 15px;
}

.invoice-filter-select {
    width: 100%;
}

.trasport_head_txt {
    position: relative;
    margin-bottom: 2em;
    width: 100%;
}

.trasport_head_span {
    position: absolute;
    bottom: 115px;
    left: 20px;
    padding: 10px 20px;
    background-color: #fff;
    font-size: 16px;
}

.linebtn {
    padding: 12px;
    font-size: 15px;
}

.custom-labelnumber {
    width: 12%;
    margin-top: -10px;
}

.addbtn {
    margin-top: -10px;
    padding: 12px;
}

.span_lbl_mr {
    width: 85px;
}

.span_lbl_mr_2 {
    width: 65px;
}

.height-40-textarea {
    height: 40px;
}

.custom-width {
    width: 28% !important;
}

.custom_pd {
    padding: 1rem 1rem 1rem 0;
}

.custom_area {
    width: 40%;
    margin-right: 10px;
}

.invoice-number-date {
    width: 100%;
}

.custom-width-div {
    width: 40%;
}

.remark-height {
    height: 200px;
}

.shift-msg-div {
    margin-top: -6.4em;
    margin-left: 0 !important;
    padding-left: 4px !important;
}
</style>
