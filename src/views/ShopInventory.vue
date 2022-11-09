<template>
    <div>
        <b-card no-body>
            <div class="m-2">
                <b-row>
                    <b-col
                        cols="12"
                        md="6"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <div>
                            <h2>{{ $t('Business Central') }}</h2>
                        </div>
                    </b-col>
                    <b-col
                        cols="12"
                        md="4"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                                v-model="Searchgtin"
                                class="d-inline-block mr-1"
                                :placeholder="$t('Search GTIN')"
                            />
                        </div>
                    </b-col>
                    <b-col
                        cols="12"
                        md="2"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            @click="getInventBC()"
                            >
                            {{ $t("Search") }}
                        </b-button>
                    </b-col>
                </b-row>
            </div>
            <b-table
                ref="refInvoiceListTablenew"
                :items="this.bussinessdata"
                responsive
                :fields="tableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
                class="position-relative"
            >
                <template #head(invoiceStatus)>
                    <feather-icon icon="TrendingUpIcon" class="mx-auto" />
                </template>

                <template #cell(GTIN)="data">
                    <div>
                        <b-link to="#" class="font-weight-bold">
                            {{ data.item.GTIN }}
                        </b-link>
                    </div>
                </template>

                <template #cell(SKU)="data">
                    <div>
                        {{ data.item.SKU }}
                    </div>
                </template>

                <template #cell(QTYbc)="data">
                    <div>
                        {{ data.item.QTYbc }}
                    </div>
                </template>

                <template #cell(QTYshops)="data">
                    <div>
                        {{ data.item.QTYshops }}
                    </div>
                </template>
            </b-table>

            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6">
                        <span 
                            class="text-muted"
                        >
                            {{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }}
                            {{ dataMeta.of }} {{ $t('entries') }}
                    </span>
                    </b-col>
                </b-row>
            </div>
        </b-card>

        <!-- webshop card -->

        <b-card no-body>
            <div class="m-2">
                <b-row>
                    <b-col
                        cols="12"
                        md="10"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <div>
                            <h2>{{ $t('Webshops') }}</h2>
                        </div>
                    </b-col>
                    
                    <b-col
                        cols="12"
                        md="2"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            variant="outline-secondary"
                            @click="deleteInventoryShop()"
                            >
                            {{ $t("Delete") }}
                        </b-button>
                    </b-col>
                </b-row>
            </div>
            <b-table
                ref="refInvoiceListTablenew"
                :items="this.webshopdata"
                responsive
                :fields="webshoptableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
                class="position-relative"
            >
                <template #head(invoiceStatus)>
                    <feather-icon icon="TrendingUpIcon" class="mx-auto" />
                </template>

                <template #cell(GTIN)="data">
                    <div>
                        <b-link to="#" class="font-weight-bold">
                            {{ data.item.GTIN }}
                        </b-link>
                    </div>
                </template>

                <template #cell(SKU)="data">
                    <div>
                        {{ data.item.SKU }}
                    </div>
                </template>

                <template #cell(Quantity)="data">
                    <div>
                        {{ data.item.Quantity }}
                    </div>
                </template>

                <template #cell(Shop)="data">
                    <div>
                        {{ data.item.Shop }}
                    </div>
                </template>

                <template #cell(Color)="data">
                    <div>
                        {{ data.item.Color }}
                    </div>
                </template>

                <template #cell(Size)="data">
                    <div>
                        {{ data.item.Size }}
                    </div>
                </template>

                <template #cell(Style)="data">
                    <div>
                        {{ data.item.Style }}
                    </div>
                </template>
            </b-table>

            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6">
                        <span 
                            class="text-muted"
                        >
                            {{ $t('Showing') }} {{ webshopDataMeta.from }} {{ $t('to') }} {{ webshopDataMeta.to }} {{ $t('of') }}
                            {{ webshopDataMeta.of }} {{ $t('entries') }}
                    </span>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
    import axios from "axios";
    import Ripple from 'vue-ripple-directive'
    import i18n from '@/libs/i18n/index';
    //import { BCard, BCardText } from 'bootstrap-vue'
    import {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    } from "bootstrap-vue";

    import vSelect from "vue-select";
    import { ref, watch, computed } from "@vue/composition-api";
    export default {
        directives: {
            Ripple
        },
        props: {
            loggedIn: {
                type: Boolean, 
                default: false 
            }
        },
        components: {
            BCard,
            BRow,
            BCol,
            BFormInput,
            BButton,
            BTable,
            BMedia,
            BAvatar,
            BLink,
            BBadge,
            BDropdown,
            BDropdownItem,
            BPagination,
            BTooltip,
            vSelect,
        },

        data() {
            return {
                totalData: ref(0),
                perPageOptions: [10,20,40,60,80,100],
                //perPageOptions: [5,10,15,20,25,30,40],
                sortBy: ref("id"),
                isSortDirDesc: ref(true),
                totalData: "",
                webtotalData: "",
                perPage: "10",
                currentPage: "1",
                filteroffset: 0,
                refInvoiceListTablenew: "",
                refetchData: "",
                localItemsCount: "",
                Searchgtin : "",

                tableColumns: [
                    { key: "GTIN", label: i18n.t('GTIN'), sortable: true },
                    { key: "SKU", label: i18n.t('SKU'), sortable: true },
                    { key: "QTYbc", label: i18n.t('QTY BC'), sortable: true },
                    { key: "QTYshops", label: i18n.t('QTY SHOPS'), sortable: true }
                ],

                webshoptableColumns: [
                    { key: "GTIN", label: i18n.t('GTIN'), sortable: true },
                    { key: "SKU", label: i18n.t('SKU'), sortable: true },
                    { key: "Quantity", label: i18n.t('QTY'), sortable: true },
                    { key: "Shop", label: i18n.t('Shop'), sortable: true },
                    { key: "Color", label: i18n.t('Color'), sortable: true },
                    { key: "Size", label: i18n.t('Size'), sortable: true },
                    { key: "Style", label: i18n.t('Style'), sortable: true }
                ],

                mytoken: "",

                bussinessdata : [],
                webshopdata : [],

                dataMeta: { from: 1, to: this.perPage, of: this.totalData },
                webshopDataMeta : { from: 1, to: this.perPage, of: this.webtotalData }
            };
        },

        created() {
            if(this.loggedIn){
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("days");
                localStorage.removeItem("pagesize");
                localStorage.setItem("loggedIn", false);
                this.$router.push({ name: "login" });
            }else{
                this.filterdays = localStorage.getItem("days");
                this.perPage = localStorage.getItem("pagesize");
            }
        },

        updated() {
            const f = this.perPage * (this.currentPage - 1);
            this.dataMeta.from = f + 1;
            this.dataMeta.to = this.perPage * this.currentPage;
        },

        watch: {
            perPage: function (val) {
                this.perPage = val;
            },
            filteroffset: function (val) {
                this.filteroffset = val;
            },
            currentPage: function (val) {
                this.currentPage = val;
            },
        },

        methods: {
            getInventBC(){
                if(this.Searchgtin){
                    this.mytoken = localStorage.getItem("token");

                    axios(
                        "https://engine.netsupport.dk:8270/webshops/v1/getinventbc/" +this.mytoken + 
                        "?gtin=" + this.Searchgtin
                    )
                    .then((response) => {

                        //console.log(response)
                        this.dataMeta.of = 1;
                        this.totalData = response.data.rowsAffected[0];
                        this.bussinessdata = JSON.parse(
                            JSON.stringify(response.data.recordset)
                        );
                        if(this.bussinessdata.length <= 0){
                            alert("Records Not Found");
                        }
                    })
                    .catch(function (error) {
                        if(error.response.status == 403)
                        {
                            localStorage.setItem("token", "");
                            window.location.reload();
                        }
                    });
                    this.getInventshops();
                }else{
                    alert("GTIN Number Not Found.");
                }
            },

            getInventshops(){
                this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/webshops/v1/getinventshops/" +this.mytoken + 
                    "?gtin=" + this.Searchgtin
                )
                .then((response) => {

                    //console.log(response)
                    this.webshopDataMeta.of = response.data.rowsAffected[0];
                    this.webtotalData = response.data.rowsAffected[0];
                    this.webshopdata = JSON.parse(
                        JSON.stringify(response.data.recordset)
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

            deleteInventoryShop(){
                if(this.Searchgtin){
                    if (confirm("Are you sure you want to delete this Inventory?")) {
                        this.mytoken = localStorage.getItem("token");

                        var config = {
                            method: "delete",
                            url: "https://engine.netsupport.dk:8270/webshops/v1/deleterecords/" +this.mytoken + 
                            "?gtin=" + this.Searchgtin,
                            headers: {
                            "Content-Type": "application/json",
                            }
                        };

                        axios(config)
                        .then((response) => {
                            //console.log(response);
                            alert(response.data);
                            window.location.reload();
                        })
                        .catch(function (error) {
                            if(error.response.status == 403)
                            {
                                localStorage.setItem("token", "");
                                window.location.reload();
                            }
                        });
                    }else{
                        alert("Your Data is Safe");
                    }
                }else{
                    alert("GTIN Number Not Found.");
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .per-page-selector {
        //width : 85px;
        max-width: 100%;
        margin-top: 15px;
    }

    .invoice-filterday-select{
        min-width: 70px;
        margin-top: 15px;
    }

    .invoice-filter-select {
        //min-width: 190px;
        min-width: 120px;

        ::v-deep .vs__selected-options {
            flex-wrap: nowrap;
        }

        ::v-deep .vs__selected {
            width: 100px;
        }
    }
    .page-label{
        margin-top: 10px;
    }

    .success_icn{
        background-color: #4cbb17;
        color: white;
    }
    .danger_icn{
        background-color: #ff6347;
        color: white;
    }
    .warning_icn{
        background-color: #fdde6c;
        color: white;
    }
    .secondary_icn{
        background-color: darkgrey;
        color: white;
    }
    .check-btn{
        transform: scale(02);
        width: 12px;
        height: 12px;
    }
    .invoice-filtercheck-select{
        margin-top: 15px;
        width: 60%;
    }
    .deleted-row{
        color: #ff6347 !important;
    }

    .btn-outline-secondary:hover:not(.disabled):not(:disabled){
        background-color: rgb(45, 131, 142) !important;
    }

    .btn-outline-secondary:hover:not(.disabled):not(:disabled) {
    color: #d0d2d6;
    }
</style>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
