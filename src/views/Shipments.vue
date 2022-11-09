<template>
    <b-card no-body>
        <div class="m-2">
            <b-row>
                <b-col
                    cols="12"
                    md="8"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                    <v-select
                        v-model="filtershop"
                        dir="ltr"
                        :options="shopOptions"            
                        class="invoice-filter-select mr-50"
                        :placeholder="$t('Shop')"
                    >
                        <template #selected-option="{ label }">
                            <span class="text-truncate overflow-hidden">
                                {{ label }}
                            </span>
                        </template> 
                    </v-select>
                    &nbsp;
                    <b-form-input
                        v-model="filterOrder"
                        class="d-inline-block mr-50 advance-search"
                        :placeholder="$t('Order')"
                    />
                    <b-form-input
                        v-model="filterName"
                        class="d-inline-block mr-50 advance-search"
                        :placeholder="$t('Name')"
                    />
                    
                    <b-form-input
                        v-model="filterCity"
                        class="d-inline-block mr-50 advance-search"
                        :placeholder="$t('City')"
                    />
                    
                    <b-form-input
                        v-model="filterPostal"
                        class="d-inline-block mr-50 advance-search"
                        :placeholder="$t('Postal')"
                    />
                </b-col>
                <b-col>
                    <div class="d-flex align-items-center justify-content-end">
                        <b-form-input
                            v-model="filter"
                            class="d-inline-block mr-50 advance-search"
                            :placeholder="$t('Advance search')"
                        />
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col
                    cols="12"
                    md="5"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                    <!-- <v-select
                        v-model="filterselectedOrder"
                        dir="ltr"
                        :options="orderOptions"
                        @input ="multipleAction($event)"
                        class="invoice-filtercheck-select mt-1"
                        :placeholder="$t('Actions')"
                    >
                        <template #selected-option="{ label }">
                            <span class="text-truncate overflow-hidden">
                                {{ $t(label) }}
                            </span>
                        </template>
                        <template #option="{ label }">
                            <span class="text-truncate overflow-hidden">
                                {{ $t(label) }}
                            </span>
                        </template>
                    </v-select> &nbsp; -->

                    <label class="mt-1">{{ $t('Days') }}</label>
                    <v-select
                        v-model="filterdays"
                        dir="ltr"
                        :options="daysOptions"
                        :clearable="false"
                        class="invoice-filterday-select mt-1 ml-50"
                        :placeholder="$t('Days')"
                    >
                        <template #selected-option="{ label }">
                            <span class="text-truncate overflow-hidden">
                                {{ label }}
                            </span>
                        </template>
                    </v-select> &nbsp;

                    <div class="demo-inline-spacing ml-1">
                        <b-form-radio
                            v-model="filterlandsdel"
                            value="Jylland/Fyn"
                        >
                            {{ $t('Jylland/Fyn') }}
                        </b-form-radio>
                        <b-form-radio
                            v-model="filterlandsdel"
                            value="Sjælland"
                        >
                            {{ $t('Sjælland') }}
                        </b-form-radio>
                        <!-- <b-form-radio
                            v-model="filterlandsdel"
                            value="Fyn"
                        >
                            {{ $t('Fyn') }}
                        </b-form-radio> -->
                        <b-form-radio
                            v-model="filterlandsdel"
                            value="all"
                        >
                            {{ $t('all') }}
                        </b-form-radio>
                    </div>

                </b-col>
                <b-col
                    cols="12"
                    md="5"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalShipments"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0 mt-1 float-right mr-1"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                    </b-pagination>  
                </b-col>
                <b-col
                    cols="12"
                    md="2"
                    class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
                >
                    <label class="mt-1">{{ $t('Pagesize') }}</label>
                    <v-select
                        v-model="perPage"
                        dir="ltr"
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block ml-50 mr-50 mt-1"
                    />
                </b-col>
            </b-row>

            <b-row>
                
                <b-col
                    cols="12"
                    md="12"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1"
                >
                    <div v-if="labelsvalue">
                        <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            id="direct"
                            @click="printAction"
                        >
                            {{ $t("Print Labels") }}
                        </b-button>
                    </div>
                    <div v-else-if="consignorvalue">
                        <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            id="consignor"
                            @click="printAction"
                        >
                            {{ $t("Print Labels") }}
                        </b-button>
                    </div>
                    <div v-if="consignorpallets">
                        <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            id="consignor"
                            @click="printAction"
                        >
                            {{ $t("Print Labels") }}
                        </b-button>
                    </div>
                    <!-- <b-pagination
                        v-model="currentPage"
                        :total-rows="totalShipments"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0 mt-1 float-right mr-1"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                    </b-pagination> -->
                </b-col>
            </b-row>
        </div>

        <b-table
            ref="refInvoiceListTable"
            :items="this.orderdata"
            responsive
            :fields="tableColumns"
            :filter="filter"
            primary-key="id"
            show-empty
            empty-text="No matching records found"
            class="position-relative"
        >
        <div></div>
        <template #head(checked_id)>
                <input 
                    type="checkbox" 
                    @click="checkallOrder($event)" 
                    name="order_checkedall[]" 
                    class="check-btn"
                >
            </template>
            <template #cell(checked_id)="data" class="check-main">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    <input 
                        type="checkbox" 
                        @click="checkOrder($event)" 
                        name="order_checked[]" 
                        class="check-btn" 
                        :value="data.item.orderNumber" 
                        :id="data.item.orderNumber" 
                        disabled
                    >
                </div>
                <div v-else>
                    <input
                        type="checkbox" 
                        @click="checkOrder($event)" 
                        name="order_checked[]" 
                        class="check-btn" 
                        :value="data.item.orderNumber" 
                        :id="data.item.orderNumber"
                        :checked="checkall"
                    >
                </div>
            </template>
                <!-- <input
                    type="checkbox" 
                    @click="checkOrder($event)" 
                    name="order_checked[]" 
                    class="check-btn" 
                    :value="data.item.orderNumber" 
                    :id="data.item.orderNumber"
                > -->

            <template #cell(orderNumber)="data">
                <div v-if="labelsvalue">
                    <b-link
                        :to="'/labels/'+ data.item.orderNumber +'/'+ data.item.shop +'/direct'" 
                        class="font-weight-bold"
                    >
                        {{ data.item.orderNumber }}
                    </b-link>
                </div>
                <div v-else-if="consignorvalue">
                    <b-link 
                        :to="'/consignor/'+ data.item.orderNumber +'/'+ data.item.shop +'/consignor'" class="font-weight-bold"
                    >
                        {{ data.item.orderNumber }}
                    </b-link>
                </div>
                <div v-else-if="consignorpallets">
                    <!-- <b-link
                        :to="'/consignor-pallets/'+ data.item.orderNumber +'/'+ data.item.shop +'/consignor'" 
                        class="font-weight-bold"
                    > -->
                        {{ data.item.orderNumber }}
                    <!-- </b-link> -->
                </div>
                
            </template>

            <template #cell(actions)="data">
                <div class="text-nowrap">
                    <feather-icon
                        :id="`invoice-row-${data.item.id}-send-icon`"
                        icon="SendIcon"
                        class="cursor-pointer"
                        size="16"
                    />
                    <b-tooltip
                        title="Send Invoice"
                        class="cursor-pointer"
                        :target="`invoice-row-${data.item.id}-send-icon`"
                    />

                    <feather-icon
                        v-if="data.item.provider == 'direct'"
                        :id="`invoice-row-${data.item.id}-preview-icon`"
                        icon="EyeIcon"
                        size="16"
                        class="mx-1"
                        @click=" $router.push('/labels/'+ data.item.orderNumber +'/'+ data.item.shop +'/direct')"
                    />
                    <feather-icon
                        v-else-if="data.item.provider == 'consignor'"
                        :id="`invoice-row-${data.item.id}-preview-icon`"
                        icon="EyeIcon"
                        size="16"
                        class="mx-1"
                        @click=" $router.push('/consignor/'+ data.item.orderNumber +'/'+ data.item.shop +'/consignor')"
                    />
                    <feather-icon
                        v-else
                        :id="`invoice-row-${data.item.id}-preview-icon`"
                        icon="EyeIcon"
                        size="16"
                        class="mx-1"
                        @click=" $router.push('/labels/'+ data.item.orderNumber +'/'+ data.item.shop +'/direct')"
                    />
                    <b-tooltip
                        title="Preview Invoice"
                        :target="`invoice-row-${data.item.id}-preview-icon`"
                    />

                    <!-- Dropdown -->
                    <b-dropdown
                        variant="link"
                        toggle-class="p-0"
                        no-caret
                        :right="$store.state.appConfig.isRTL"
                    >
                        <template #button-content>
                            <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="align-middle text-body"
                            />
                        </template>
                        <b-dropdown-item>
                            <feather-icon icon="DownloadIcon" />
                            <span class="align-middle ml-50">{{ $t('Download') }}</span>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <feather-icon icon="EditIcon" />
                            <span class="align-middle ml-50">{{ $t('Edit') }}</span>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <feather-icon icon="TrashIcon" />
                            <span class="align-middle ml-50">{{ $t('Delete') }}</span>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <feather-icon icon="CopyIcon" />
                            <span class="align-middle ml-50">{{ $t('Duplicate') }}</span>
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </template>
        </b-table>

        <div class="mx-2 mb-2">
            <b-row>
                <b-col
                    cols="12"
                    sm="6"
                    class="
                        d-flex
                        align-items-center
                        justify-content-center justify-content-sm-start
                    "
                >
                    <span 
                        class="text-muted"
                    >
                        {{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }}
                        {{ dataMeta.of }} {{ $t('entries') }}
                    </span>
                </b-col>
                <!-- Pagination -->
                <b-col
                    cols="12"
                    sm="6"
                    class="
                        d-flex
                        align-items-center
                        justify-content-center justify-content-sm-end
                    "
                >
                </b-col>
            </b-row>
        </div>
    </b-card>
</template>

<script>
    import axios from "axios";
    import i18n from '@/libs/i18n/index';
    import Ripple from 'vue-ripple-directive';
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
        BFormCheckbox,
        BFormRadio 
    } from "bootstrap-vue";

    import vSelect from "vue-select";

    export default {
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
            BFormCheckbox,
            BFormRadio
        },
        directives: {
            Ripple
        },
        data() {
            return {
                perPageOptions : [10, 20, 40, 60, 80, 100],
                statusFilter : "",
                totalShipments : "",
                perPage : "10",
                currentPage : "1",
                filter : "",
                refInvoiceListTable : "",
                filtershop : "",
                filterdays : 7,
                filterName : "",
                filterCity : "",
                filterPostal : "",
                filterOrder : "",
                filteroffset : 0,
                filterselectedOrder : "",
                filterlandsdel : "all",
                checkall:false,

                tableColumns: [
                    { key: "checked_id", label: "" },
                    { key: "orderNumber", label: i18n.t('order'), sortable: true },
                    { key: "shop",label: i18n.t('Shop'), sortable: true },
                    { key: "deliverName", label: i18n.t('deliverName'), sortable: true },
                    { key: "deliverCity", label: i18n.t('deliverCity'), sortable: true },
                    { key: "deliverCountry", label: i18n.t('deliverCountry'), sortable: true },
                    { key: "deliveryDate", label: i18n.t('deliverDate'), sortable: true },
                    { key: "actions", label: i18n.t('actions') },
                ],

                daysOptions : ["1", "7", "14", "30", "365"],
                shopOptions : [],
                orderOptions :[
                    "print",
                    "send-to-warehouse",
                    "picked-up",
                    "send to invoice",
                    "delete"
                ],
                mytoken : "",
                consignorvalue : false,
                labelsvalue : false,
                consignorpallets : false,

                orderdata: [],
                actionData : [],

                dataMeta: { from: 1, to: this.perPage, of: this.totalShipments },
            };
        },

        
        updated() {
            const f = this.perPage * (this.currentPage - 1);
            this.dataMeta.from = f + 1;
            var checkrecords = this.perPage * this.currentPage;
            if(checkrecords > this.totalShipments){
                this.dataMeta.to = this.totalShipments;
            }else{
                this.dataMeta.to = this.perPage * this.currentPage;
            }
        },
        watch: {
            perPage: function () {
                this.getorderdata();
            },
            filterdays: function (val) {
                this.filterdays = val;
                this.getorderdata();
            },
            filtershop: function (val) {
                this.filtershop = val;
                this.getorderdata();
            },
            filterName: function (val) {
                this.filterName = val;
                this.getorderdata();
            },
            filterCity: function (val) {
                this.filterCity = val;
                this.getorderdata();
            },
            filterPostal: function (val) {
                this.filterPostal = val;
                this.getorderdata();
            },
            filterOrder: function (val) {
                this.filterOrder = val;
                this.getorderdata();
            },
            filterlandsdel: function (val) {
                this.filterlandsdel = val;
                this.getorderdata();
            },
            filteroffset: function (val) {
                this.filteroffset = val;
                this.getorderdata();
            },
            currentPage: function (val) {
                this.currentPage = val;
                this.getorderdata();
            },
        },
        created() {
            this.mytoken = localStorage.getItem("token");
            if (this.mytoken == "" ) {
                localStorage.setItem("token", '');
                localStorage.removeItem("username");
                localStorage.removeItem("days");
                localStorage.removeItem("pagesize");
                localStorage.removeItem("consignor");
                localStorage.removeItem("labels");
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

                        this.filterdays = localStorage.getItem("days");
                        if(this.filterdays == null){
                            this.filterdays = 7;
                        }
                        
                        this.perPage = localStorage.getItem("pagesize");
                        if(this.perPage == null){
                            this.perPage = "10";
                        }
                        this.getorderdata();
                        this.getshops();
                        this.consignorvalue = localStorage.getItem("consignor");
                        this.labelsvalue = localStorage.getItem("labels");
                        this.consignorpallets = localStorage.getItem("consignorpallets");
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
                        localStorage.removeItem("consignor");
                        localStorage.removeItem("labels");
                        window.location.href = '/login';
                    }
                });
            }  
        },
        methods: {
            getorderdata() {
                this.orderdata = [],
                this.mytoken = localStorage.getItem("token");
                localStorage.setItem("days", this.filterdays);
                localStorage.setItem("pagesize", this.perPage);
                const offset = this.perPage * (this.currentPage - 1);
                this.filteroffset = offset;

                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/orders/" + this.mytoken +
                        "?offset=" + this.filteroffset +
                        "&pagesize=" + this.perPage +
                        "&days=" + this.filterdays +
                        "&shop=" + this.filtershop +
                        "&order=" + this.filterOrder +
                        "&delivername=" + this.filterName +
                        "&delivercity=" + this.filterCity +
                        "&deliverpostal=" + this.filterPostal +
                        "&landsdel=" + this.filterlandsdel
                )
                .then((responseorder) => {
                    //console.log("respone ",responseorder.data.orders.recordset);
                    this.dataMeta.of = responseorder.data.orders.MaxRecords;
                    this.totalShipments = responseorder.data.orders.MaxRecords;
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.orders.recordset)
                    );
                    this.actionData = [];
                })
                .catch(function (error) {
                    if(error.response.status == 403)
                    {
                        localStorage.setItem("token", "");
                        window.location.href = '/login';
                    }
                });
            },

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
            checkallOrder(event){
                let temp = [];
                if(event.target.checked){
                    this.checkall = true;
                    this.orderdata.forEach(element => {
                        temp.push(element.orderNumber)
                    });

                    this.actionData=temp;
                }else{
                    this.checkall = false;
                    this.actionData=[];
                }
            },
            checkOrder(event){
                if(event.target.checked){
                    this.actionData.push(event.target.value);
                }else{
                    this.actionData = this.actionData.filter((f) => f !== event.target.value ? this.actionData : '');
                }
                //console.log(this.actionData);
            },
            multipleAction(event){
                if(this.actionData.length == 0){
                    alert('Please Select One Order');
                    this.filterselectedOrder = "";
                }else{
                    console.log('filterselectedOrder====>>>>',event);
                }
            },
            printAction(e){
                let areacode = "";
                if(this.filterlandsdel == 'Jylland/Fyn'){
                    areacode = "5481";
                }else if(this.filterlandsdel == 'Sjælland'){
                    areacode = "5482";
                }else{
                    areacode = "";
                }
                let senddata = [];
                this.orderdata.forEach(element => {
                    this.actionData.forEach(ele => {
                        if(element.orderNumber == ele){
                            senddata.push({
                                orderNumber : ele,
                                shop : element.shop,
                                provider : e.target.id,
                                selectedArea : (localStorage.getItem("areaCode")) ? areacode : ""
                                
                            })
                        }
                    });   
                });

                    
                if (this.labelsvalue) {
                    console.log("senddata",senddata);
                    this.$router.push({
                        name: "labels",
                        params: { 
                           arrayData:senddata
                        }
                    }); 
                }
                else if(this.consignorpallets){
                    this.$router.push({
                        name: "consignor-pallets",
                        params: { 
                           arrayData : senddata
                        }
                    }); 
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .per-page-selector {
        max-width: 100%;
    }

    .invoice-filter-select {
        //min-width: 190px;
        min-width: 170px;

        ::v-deep .vs__selected-options {
            flex-wrap: nowrap;
        }

        ::v-deep .vs__selected {
            width: 100px;
        }
    }

    .invoice-filterday-select{
        min-width: 70px;
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
        background-color: darkgray;
        color: white;
    }
    .check-btn{
        transform: scale(02);
        width: 12px;
        height: 12px;
    }
    .invoice-filtercheck-select{
        width: 60%;
    }
    .deleted-row{
        color: #ff6347 !important;
    }
    .vs__actions svg {
        fill: #95989f !important;
    }
</style>


<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
