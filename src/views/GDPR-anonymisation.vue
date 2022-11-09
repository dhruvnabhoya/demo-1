<template>
<b-card no-body>
    <div class="m-2">
        <b-row>
            <b-col cols="12" md="12" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                <v-select v-model="filtershop" dir="ltr" :options="shopOptions" class="invoice-filter-select mr-50" :placeholder="$t('Shop')">
                    <template #selected-option="{ label }">
                        <span class="text-truncate overflow-hidden">
                            {{ label }}
                        </span>
                    </template>
                </v-select> &nbsp;
                <b-form-input v-model="filterOrder" class="d-inline-block mr-50 advance-search" :placeholder="$t('Order')" />

                <b-form-input v-model="filterBuyerName" class="d-inline-block mr-50 advance-search" :placeholder="$t('Buyer Name')" />
                <b-form-input v-model="filterBuyerPostal" class="d-inline-block mr-50 advance-search" :placeholder="$t('Buyer Postal')" />
                <b-form-input v-model="filterDeliverName" class="d-inline-block mr-50 advance-search" :placeholder="$t('Deliver Name')" />
                <b-form-input v-model="filterDeliverPostal" class="d-inline-block mr-50 advance-search" :placeholder="$t('Deliver Postal')" />
            </b-col>
            <!-- <b-col>
                    <div class="d-flex align-items-center justify-content-end">
                        <b-form-input
                            v-model="filter"
                            class="d-inline-block mr-50 advance-search"
                            :placeholder="$t('Advance search')"
                        />
                    </div>
                </b-col> -->
        </b-row>
        <b-row>
            <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                <!-- <v-select
                        v-model="filterselectedOrder"
                        dir="ltr"
                        :options="orderOptions"
                        @input ="multipleAction($event)"
                        class="invoice-filtercheck-select mt-1"
                        :placeholder="$t('Actions')"
                        label="text"
                    >
                        <template #selected-option="{ text }">
                            <span> {{ $t(text) }} </span>
                        </template>

                        <template #option="{ text }">
                            <span> {{ $t(text) }} </span>
                        </template>
                    </v-select>&nbsp; -->

                <label class="mt-1 ml-1">{{ $t('Days') }}</label>
                <v-select v-model="filterdays" dir="ltr" :options="daysOptions" :clearable="false" class="invoice-filterday-select mt-1 ml-50" :placeholder="$t('Days')">
                    <template #selected-option="{ label }">
                        <span class="text-truncate overflow-hidden">
                            {{ label }}
                        </span>
                    </template>
                </v-select>&nbsp;
            </b-col>
            <b-col cols="12" md="4" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                <b-pagination v-model="currentPage" :total-rows="totalOrders" :per-page="perPage" first-number last-number class="mb-0 mt-1 float-right mr-1" prev-class="prev-item" next-class="next-item">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </b-col>
            <b-col cols="12" md="3" class="d-flex align-items-center justify-content-end mb-1 mb-md-0">
                <label class="mt-1">{{ $t('Pagesize') }}</label>
                <v-select v-model="perPage" dir="ltr" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-50 mt-1" />
            </b-col>
        </b-row>
    </div>

    <b-table ref="refInvoiceListTable" :items="this.orderdata" responsive :fields="tableColumns" primary-key="id" show-empty empty-text="No matching records found" class="position-relative">
        <div>
        </div>
        <!-- Column: Id -->

        <template #cell(orderNumber)="data">
            <b-link class="font-weight-bold" @click="conalert(data.item.orderNumber)">
                {{ data.item.orderNumber }}
            </b-link>
        </template>

        <template #cell(shop)="data">
            {{ data.item.shop }}
        </template>
        <!-- Column: Invoice Status -->

        <template #cell(buyername)="data">
            {{ data.item.buyerName }}
        </template>

        <template #cell(buyercity)="data">
            {{ data.item.buyerCity }}
        </template>

        <template #cell(delivername)="data">
            {{ data.item.deliverName }}
        </template>

        <template #cell(deliverCity)="data">
            {{ data.item.deliverCity }}
        </template>

        <template #cell(deliverZip)="data">
            {{ data.item.deliverZip }}
        </template>

        <template #cell(actions)="data">
            <div class="text-nowrap">
                <feather-icon :id="`invoice-row-${data.item.id}-send-icon`" icon="SendIcon" class="cursor-pointer" size="16" />
                <b-tooltip title="Send Invoice" class="cursor-pointer" :target="`invoice-row-${data.item.id}-send-icon`" />

                <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="EyeIcon" size="16" class="mx-1" @click="
                        $router.push('/order-preview/'+ data.item.orderNumber +'/'+ data.item.shop)
                        " />
                <b-tooltip title="Preview Invoice" :target="`invoice-row-${data.item.id}-preview-icon`" />

                <!-- Dropdown -->
                <b-dropdown variant="link" toggle-class="p-0" no-caret :right="$store.state.appConfig.isRTL">
                    <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <b-dropdown-item>
                        <feather-icon icon="DownloadIcon" />
                        <span class="align-middle ml-50">{{ $t('Download') }}</span>
                    </b-dropdown-item>
                    <b-dropdown-item :to="'/order-edit/'+ data.item.orderNumber +'/'+ data.item.shop">
                        <feather-icon icon="EditIcon" />
                        <span class="align-middle ml-50">{{ $t('Edit') }}</span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">{{ $t('Delete') }}</span>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </template>
    </b-table>

    <div class="mx-2 mb-2">
        <b-row>
            <b-col cols="12" sm="6" class="
                        d-flex
                        align-items-center
                        justify-content-center justify-content-sm-start
                    ">
                <span class="text-muted">
                    {{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }}
                    {{ dataMeta.of }} {{ $t('entries') }}
                </span>
            </b-col>
        </b-row>
    </div>
</b-card>
</template>

<script>
import axios from "axios";
import i18n from '@/libs/i18n/index';
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

export default {
    props: {

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
            perPageOptions: [10, 20, 40, 60, 80, 100],
            totalOrders: "",

            //filter: "",

            filtershop: "",
            filterOrder: "",
            filterBuyerName: "",
            filterBuyerPostal: "",
            filterDeliverName: "",
            filterDeliverPostal: "",

            perPage: "10",
            currentPage: "1",
            filterdays: 7,
            filteroffset: 0,

            tableColumns: [{
                    key: "orderNumber",
                    label: i18n.t('order'),
                    sortable: true
                },
                {
                    key: "shop",
                    label: i18n.t('shop'),
                    sortable: true
                },
                {
                    key: "buyerName",
                    label: i18n.t('buyerName'),
                    sortable: true
                },
                {
                    key: "buyerCity",
                    label: i18n.t('buyerCity'),
                    sortable: true
                },
                {
                    key: "deliverName",
                    label: i18n.t('deliverName'),
                    sortable: true
                },
                {
                    key: "deliverCity",
                    label: i18n.t('deliverCity'),
                    sortable: true
                },
                {
                    key: "deliverZip",
                    label: i18n.t('deliverZip'),
                    sortable: true
                },
                {
                    key: "actions",
                    label: i18n.t('actions')
                },
            ],

            daysOptions: ["1", "7", "14", "30", "365"],
            shopOptions: [],
            orderOptions: [{
                    text: "print",
                    value: "print"
                },
                {
                    text: "send-to-warehouse",
                    value: "SW"
                },
                {
                    text: "picked-up",
                    value: "PU"
                },
                {
                    text: "send to invoice",
                    value: "SI"
                },
                {
                    text: "delete",
                    value: "delete"
                }
            ],
            mytoken: "",

            orderdata: [],

            dataMeta: {
                from: 1,
                to: this.perPage,
                of: this.totalOrders
            },
        };
    },

    updated() {
        const f = this.perPage * (this.currentPage - 1);
        this.dataMeta.from = f + 1;
        this.dataMeta.to = this.perPage * this.currentPage;
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
        filterOrder: function (val) {
            this.filterOrder = val;
            this.getorderdata();
        },
        filterBuyerName: function (val) {
            this.filterBuyerName = val;
            this.getorderdata();
        },
        filterBuyerPostal: function (val) {
            this.filterBuyerPostal = val;
            this.getorderdata();
        },
        filterDeliverName: function (val) {
            this.filterDeliverName = val;
            this.getorderdata();
        },
        filterDeliverPostal: function (val) {
            this.filterDeliverPostal = val;
            this.getorderdata();
        },
        currentPage: function (val) {
            this.currentPage = val;
            this.getorderdata();
        },
    },

    created() {
        this.mytoken = localStorage.getItem("token");
        if (this.mytoken == "") {
            localStorage.removeItem("token");
            this.loggedIn = false;
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

                        this.getorderdata();
                        this.getshops();
                    }
                })
                .catch(function (error) {
                    console.log(error);
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
        conalert(ordernum) {
            if (confirm("This action cannot be undone, when you anonymize the customer, all data to identify the customer will be lost")) {
                let temp = {};
                this.orderdata.forEach(element => {
                    if (element.orderNumber == ordernum) {
                        temp.order = ordernum
                        temp.hdrid = element.hdrid
                        temp.shop = element.shop

                    }

                });
                console.log(temp);

                this.mytoken = localStorage.getItem("token");
                var config = {
                    method: "post",
                    url: "https://engine.netsupport.dk:8270/gdpr/v1/anonymizeorder/" + this.mytoken,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: temp,
                };
                axios(config)
                    .then((response) => {
                        if (response.data.status == "order updated") {
                            alert("Action Succuessfully Applied.");
                            this.getorderdata();
                        }
                        // console.log(response.data);
                        // alert('Action Succuessfully Applied.');
                        //alert('Action '+response.data.actions);
                        // this.actionData.forEach(element => {
                        //     document.getElementById(element).checked = false;
                        // });
                        //     this.getinvoicedata();
                        //     temp = [];
                        //     this.actionData = [];
                    })
                    .catch(function (error) {
                        alert("Data not Updated.");
                    });
            } else {
                console.log()
            }
        },
        getorderdata() {
            this.mytoken = localStorage.getItem("token");

            const offset = this.perPage * (this.currentPage - 1);
            this.filteroffset = offset;

            axios(
                    "https://engine.netsupport.dk:8270/gdpr/v1/headers/" + this.mytoken +
                    "?shop=" + this.filtershop +
                    "&order=" + this.filterOrder +
                    "&buyername=" + this.filterBuyerName +
                    "&buyerpostal=" + this.filterBuyerPostal +
                    "&delivername=" + this.filterDeliverName +
                    "&deliverpostal=" + this.filterDeliverPostal
                )
                .then((responseorder) => {
                    //console.log("respone ",responseorder);
                    this.dataMeta.of = responseorder.data.orders.MaxRecords;
                    this.totalOrders = responseorder.data.orders.MaxRecords;
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.orders.recordset)
                    );
                    console.log(this.orderdata);
                })
                .catch(function (error) {
                    if (error.response.status == 403) {
                        localStorage.setItem("token", "");
                        window.location.href = '/login';
                    }
                });
        },

        getshops() {
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

.invoice-filterday-select {
    min-width: 70px;
}

.success_icn {
    background-color: #4cbb17;
    color: white;
}

.danger_icn {
    background-color: #ff6347;
    color: white;
}

.warning_icn {
    background-color: #fdde6c;
    color: white;
}

.secondary_icn {
    background-color: darkgray;
    color: white;
}

.check-btn {
    transform: scale(02);
    width: 12px;
    height: 12px;
}

.invoice-filtercheck-select {
    width: 60%;
}

.deleted-row {
    color: #ff6347 !important;
}

.vs__actions svg {
    fill: #95989f !important;
}
</style><style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
