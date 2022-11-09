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
                    </v-select> &nbsp;
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
                    md="3"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
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
                        :total-rows="totalInvoices"
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
                    <b-button
                        class="mr-1"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        id="PR"
                        @click="multipleAction"
                    >
                        {{ $t("Print") }}
                    </b-button>

                    <b-button
                        class="mr-1"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        id="SW"
                        @click="multipleAction"
                    >
                        {{ $t("send-to-warehouse") }}
                    </b-button>

                    <b-button
                        class="mr-1"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        id="PU"
                        @click="multipleAction"
                    >
                        {{ $t("picked-up") }}
                    </b-button>

                    <b-button
                        class="mr-1"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        id="SI"
                        @click="multipleAction"
                    >
                        {{ $t("send to invoice") }}
                    </b-button>

                    <b-button
                        class="mr-1"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        id="DL"
                        @click="multipleAction"
                    >
                        {{ $t("Delete") }}
                    </b-button>
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
        <div>
        </div>
            <template #head(checked_id)>
                <input 
                    type="checkbox" 
                    @click="checkallOrder($event)" 
                    name="order_checkedall[]" 
                    class="check-btn"
                >
            </template>

            <!-- Column: Id -->
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

            <template #cell(id)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    <a href="javascript:void(0)" class="font-weight-bold deleted-row">
                        {{ data.item.orderNumber }}
                    </a>
                </div>
                <div v-else>
                    <b-link :to="'/order-preview/'+ data.item.orderNumber +'/'+ data.item.shop" class="font-weight-bold">
                        {{ data.item.orderNumber }}
                    </b-link>
                </div>
            </template>

            <template #cell(shop)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.shop }}
                </div>
                <div v-else>
                    {{ data.item.shop }}
                </div> 
            </template>

            <template #cell(PRN,DSP,INV,DEL)="data">

                <!-- <template #cell(PRN)="data"> -->
                    <span v-if="(data.item.PRN == 'Q')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px;  background-color:blue;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                    <span v-if="(data.item.PRN == 'T')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color:blue;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                    <span v-if="(data.item.PRN == 'R')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-warning rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.PRN == undefined)" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.PRN == 'empty')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.PRN == 'space')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.PRN == 'N')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color: lightblue;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.PRN == 'Y')" style="margin-left: -12px;">
                    <span
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5036"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                data-v-9a6e255c="" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-check-circle"
                            >
                                <path data-v-9a6e255c="" d="M22 11.08V12a10 10 0 1 1-5.93-9.14">	
                                </path>
                                <polyline data-v-9a6e255c="" points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
            <!-- </template> -->

            <!-- <template #cell(DSP)="data"> -->
                <span v-if="(data.item.DSP == undefined)" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DSP == 'empty')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DSP == 'space')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DSP == 'N')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color: lightblue;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DSP == 'T')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color: orange;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DSP == 'Q')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DSP == 'Y')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" id="invoice-row-5036"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                data-v-9a6e255c="" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-check-circle"
                            >
                                <path data-v-9a6e255c="" d="M22 11.08V12a10 10 0 1 1-5.93-9.14">	
                                </path>
                                <polyline data-v-9a6e255c="" points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DSP == 'R')">
                    <span data-v-9a6e255c="" class="b-avatar badge-light-warning rounded-circle" style="width: 32px; height: 32px;" id="invoice-row-5031">
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-loader"
                            >
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                            </svg>
                        </span>
                    </span>
                </span>
            <!-- </template> -->

            <!-- <template #cell(INV)="data"> -->
                <span v-if="(data.item.INV == undefined)" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.INV == 'empty')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.INV == 'space')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.INV == 'N')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color: lightblue;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.INV == 'Q')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.INV == 'T')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar rounded-circle" 
                        style="width: 32px; height: 32px; background-color: orange;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.INV == 'Y')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5036"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                data-v-9a6e255c="" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-check-circle"
                            >
                                <path data-v-9a6e255c="" d="M22 11.08V12a10 10 0 1 1-5.93-9.14">	
                                </path>
                                <polyline data-v-9a6e255c="" points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.INV == 'R')">
                    <span 
                        data-v-9a6e255c="" class="b-avatar badge-light-warning rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5031"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-loader"
                            >
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                            </svg>
                        </span>
                    </span>
                </span>
            <!-- </template> -->

            <!-- <template #cell(DEL)="data"> -->
                <span v-if="(data.item.DEL == undefined)" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DEL == 'empty')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DEL == 'space')" style="margin-left: -12px;">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-secondary rounded-circle" 
                        style="width: 32px; height: 32px; " 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <span v-if="(data.item.DEL == 'N')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-success rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DEL == 'R')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-danger rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DEL == 'Q')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-danger rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DEL == 'T')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-danger rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5027"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-file"
                            >
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>

                <span v-if="(data.item.DEL == 'Y')">
                    <span 
                        data-v-9a6e255c="" 
                        class="b-avatar badge-light-danger rounded-circle" 
                        style="width: 32px; height: 32px;" 
                        id="invoice-row-5032"
                    >
                        <span class="b-avatar-custom">
                            <svg 
                                data-v-9a6e255c="" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14px" 
                                height="14px" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                class="feather feather-info"
                            >
                                <circle data-v-9a6e255c="" cx="12" cy="12" r="10"></circle>
                                <line data-v-9a6e255c="" x1="12" y1="16" x2="12" y2="12"></line>
                                <line data-v-9a6e255c="" x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </span>
                    </span>
                </span>
            </template>

            <!-- Column: Invoice Status -->

            <template #cell(buyername)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.buyerName }}
                </div>
                <div v-else>
                    {{ data.item.buyerName }}
                </div>
            </template>

            <template #cell(buyercity)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.buyerCity }}
                </div>
                <div v-else>
                    {{ data.item.buyerCity }}
                </div>
            </template>

            <template #cell(deliveryDate)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.deliveryDate }}
                </div>
                <div v-else>
                    {{ data.item.deliveryDate }}
                </div>
            </template>

            <template #cell(delivername)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.deliverName }}
                </div>
                <div v-else>
                    {{ data.item.deliverName }}
                </div>
            </template>

            <template #cell(delivercity)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.deliverCity }}
                </div>
                <div v-else>
                    {{ data.item.deliverCity }}
                </div>
            </template>

            <template #cell(Netto)="data">
                <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                    {{ data.item.Netto}}
                </div>
                <div v-else>
                    {{ data.item.Netto}}
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
                        $router.push('/order-preview/'+ data.item.orderNumber +'/'+ data.item.shop)
                        "
                    />
                    <b-tooltip
                        title="preview order"
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
        directives: {
            Ripple
        },

        data() {
            return {
                perPageOptions: [10, 20, 40, 60, 80, 100],
                totalInvoices: "",
                perPage: "10",
                currentPage: "1",
                filter: "",
                filtershop: "",
                filterdays: 7,
                filterName: "",
                filterCity: "",
                filterPostal: "",
                filterOrder:"",
                filteroffset: 0,
                filterselectedOrder :"",
                checkall:false,

                tableColumns: [
                    { key: "checked_id", label: ""},
                    { key: "id", label: i18n.t('order'), sortable: true },
                    { key: "shop",label: i18n.t('Shop'), sortable: true },
                    { key: "PRN,DSP,INV,DEL" },
                    { key: "buyername", label: i18n.t('buyerName'), sortable: true },
                    { key: "buyercity", label: i18n.t('buyerCity'), sortable: true },
                    { key: "deliveryDate", label: i18n.t('deliveryDate'), sortable: true },
                    { key: "deliverName", label: i18n.t('deliverName'), sortable: true },
                    { key: "deliverCity", label: i18n.t('deliverCity'), sortable: true },
                    { key: "Netto", label: i18n.t('Netto'), sortable: true },
                    { key: "actions", label: i18n.t('actions'), },
                ],

                daysOptions : ["1", "7", "14", "30", "365"],
                shopOptions : [],
                orderOptions :[
                    {
                        text:"print",
                        value:"print"
                    },
                    {
                        text:"send-to-warehouse",
                        value:"SW"
                    },
                    {
                        text:"picked-up",
                        value:"PU"
                    },
                    {
                        text:"send to invoice",
                        value:"SI"
                    },
                    {
                        text:"delete",
                        value:"DL"
                    }
                ],
                mytoken: "",

                orderdata: [],
                actionData : [],

                dataMeta: { from: 1, to: this.perPage, of: this.totalInvoices },
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
            filterdays: function (val, oldval) {
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
            console.log("shopOptions",this.shopOptions);
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
            getorderdata() {
                this.mytoken = localStorage.getItem("token");
                localStorage.setItem("days", this.filterdays);
                localStorage.setItem("pagesize", this.perPage);
                const offset = this.perPage * (this.currentPage - 1);
                this.filteroffset = offset;

                axios(
                    "https://engine.netsupport.dk:8270/orders/v1/headers/" + this.mytoken +
                        "?offset=" + this.filteroffset +
                        "&pagesize=" + this.perPage +
                        "&days=" + this.filterdays +
                        "&currentpage=" + this.currentPage +
                        "&shop=" + this.filtershop +
                        "&order=" + this.filterOrder +
                        "&delivername=" + this.filterName +
                        "&delivercity=" + this.filterCity +
                        "&deliverpostal=" + this.filterPostal
                )
                .then((responseorder) => {
                    this.dataMeta.of = responseorder.data.orders.MaxRecords;
                    this.totalInvoices = responseorder.data.orders.MaxRecords;
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.orders.recordset)
                    );

                    console.log(this.orderdata);
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
            },
            
            multipleAction(event){
                
                if(this.actionData.length == 0){
                    alert('Please Select One Order');
                }else{
                    
                    let temp = [];
                    //console.log(this.orderdata);
                    this.orderdata.forEach(element => {
                        this.actionData.forEach(ele => {
                            if(element.orderNumber == ele){
                                temp.push({
                                    orderNumber : ele,
                                    hdrid : element.hdrid,
                                    action : event.target.id
                                })
                            }
                        });   
                    });

                    var submitData = JSON.stringify({
                        lines : temp
                    });

                    console.log(submitData);
                    console.log("temp",this.orderdata);
                    this.mytoken = localStorage.getItem("token");
                    var config = {
                        method: "put",
                        url: "https://engine.netsupport.dk:8270/orders/v1/actions/" + this.mytoken,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: submitData,
                    };
                    axios(config)
                    .then((response) => {
                        console.log(response.data);
                        alert('Action Succuessfully Applied.');
                        //alert('Action '+response.data.actions);
                        this.actionData.forEach(element => {
                            document.getElementById(element).checked = false;
                        });
                        this.getorderdata();
                        temp = [];
                        this.actionData = [];
                    })
                    .catch(function (error) {
                        alert("Data not Updated.");
                    });
                }
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
