<template>
    <b-card no-body>
        <div class="m-2">
            <b-row>
                <b-col
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
                    </v-select>&nbsp;
                    <div class="d-flex align-items-center justify-content-end input-tag-div">
                        <b-form-input
                            v-model="filterGTIN"
                            class="d-inline-block mr-1"
                            :placeholder="$t('Search by GTIN')"
                        />
                    </div>
                    <div class="d-flex align-items-center justify-content-end input-tag-div">
                        <b-form-input
                            v-model="filterSKU"
                            class="d-inline-block mr-1"
                            :placeholder="$t('Search by SKU')"
                        />
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="12"
                    md="3"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
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
                    </v-select>&nbsp;
                </b-col>

                <b-col
                    cols="12"
                    md="6"
                    class="d-flex align-items-center justify-content-center mb-1 mb-md-0"
                >
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalInventories"
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
                    md="3"
                    class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
                >
                    <label class="mt-1">{{ $t('Pagesize') }}</label>
                    <v-select
                        v-model="perPage"
                        dir="ltr"
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block ml-50 mr-1 mt-1"
                    />
                </b-col>
            </b-row>
        </div>
        <b-table
            ref="refInvoiceListTablenew"
            :items="this.myinventorydata"
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

            <!-- Column: Id -->

            <template #cell(hdrId)="data">
                <div>
                    <b-link :to="'/inventory-edit/'+ data.item.hdrId" class="font-weight-bold">
                        {{ data.item.hdrId }}
                    </b-link> 
                </div>
            </template>

            <template #cell(gtin)="data">
                <div>
                    {{ data.item.gtin }}
                </div>
            </template>

            <template #cell(shop)="data">
                <div>
                    {{ data.item.shop }}
                </div>
            </template>

            <!-- Column: Invoice Status -->

            <template #cell(sku)="data">
                <div>
                    {{ data.item.sku }}
                </div>
            </template>

            <template #cell(qty)="data">
                <div>
                    {{ data.item.qty }}
                </div>
            </template>

            <template #cell(Netto)="data">
                <div>
                    {{ data.item.Netto }}
                </div>
            </template>

            <template #cell(Descript)="data">
                <div>
                    {{ data.item.Descript }}
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
                        :id="`invoice-row-${data.item.id}-preview-icon`"
                        icon="EyeIcon"
                        size="16"
                        class="mx-1"
                        @click="
                        $router.push('/invoice-preview/'+ data.item.invoice + '/' + data.item.orderNumber + '/' + data.item.shop)
                        "
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

                        <b-dropdown-item :to="'/inventory-edit/'+ data.item.gtin">
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
                perPageOptions: [10,20,40,60,80,100],
                totalInventories:"",
                perPage: "10",
                currentPage: "1",
                filterdays: 7,
                filteroffset: 0,
                filtershop: "",
                filterGTIN:"",
                filterSKU:"",

                tableColumns: [
                    { key: "hdrId", label: i18n.t('hdrId'), sortable: true },
                    { key: "gtin", label: i18n.t('GTIN'), sortable: true },
                    { key: "shop", label: i18n.t('Shop'), sortable: true },
                    { key: "sku", label: i18n.t('SKU'), sortable: true },
                    { key: "qty", label: i18n.t('qty'), sortable: true },
                    { key: "Netto", label: i18n.t('Netto'), sortable: true },
                    { key: "Descript", label: i18n.t('Descript'), sortable: true },
                    { key: "actions", label: i18n.t('actions') },
                ],

                shopOptions: [],
                daysOptions : ["1", "7", "14", "30", "365"],
                mytoken: "",

                myinventorydata : [],

                dataMeta: { from: 1, to: this.perPage, of: this.totalInventories },
            };
        },

        updated() {
            const f = this.perPage * (this.currentPage - 1);
            this.dataMeta.from = f + 1;
            this.dataMeta.to = this.perPage * this.currentPage;
        },

        watch: {
            perPage: function (val) {
                this.perPage = val;
                this.getinventorydata();
            },
            filterdays: function (val) {
                this.filterdays = val;
                this.getinventorydata();
            },
            filtershop: function (val) {
                this.filtershop = val;
                this.getinventorydata();
            },
            filterGTIN: function (val) {
                this.filterGTIN = val;
                this.getinventorydata();
            },
            filterSKU: function (val) {
                this.filterSKU = val;
                this.getinventorydata();
            },
            filteroffset: function (val) {
                this.filteroffset = val;
                this.getinventorydata();
            },
            currentPage: function (val) {
                this.currentPage = val;
                this.getinventorydata();
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
                        this.filterdays = localStorage.getItem("days");
                        if(this.filterdays == null){
                            this.filterdays = 7;  
                        }
                        this.perPage = localStorage.getItem("pagesize");
                        if(this.perPage == null){
                            this.perPage = "10";  
                        }
                        this.getinventorydata();
                        this.getshops();
                    }
                })
                .catch(function (error) {
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
            getinventorydata() {
                this.mytoken = localStorage.getItem("token");

                const offset = this.perPage * (this.currentPage - 1);
                this.filteroffset = offset;

                axios(
                    "https://engine.netsupport.dk:8270/inventory/v1/headers/" +this.mytoken + 
                    "?offset=" + this.filteroffset +
                    "&pagesize=" + this.perPage 
                    // "&shop=" + this.filtershop +
                    // "&gtin=" + this.filterGTIN +
                    // "&sku=" + this.filterSKU 
                )
                .then((responseinventory) => {

                    //console.log(responseinventory);
                    this.dataMeta.of = responseinventory.data.inventory.MaxRecords;
                    this.totalInventories = responseinventory.data.inventory.MaxRecords;
                    this.myinventorydata = JSON.parse(
                        JSON.stringify(responseinventory.data.inventory.recordset)
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
            }
        },
    };
</script>

<style lang="scss" scoped>
    .per-page-selector {
        //width : 85px;
        max-width: 100%;
    }

    .invoice-filterday-select{
        min-width: 90px;
    }

    .invoice-filter-select {
        min-width: 200px;

        ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
        }

        ::v-deep .vs__selected {
        width: 100px;
        }
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
    .deleted-row{
        color: #ff6347 !important;
    }

    .vs__actions svg {
        fill: #95989f !important;
    }
    .input-tag-div{
        width: 30%;  
    }
</style>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
