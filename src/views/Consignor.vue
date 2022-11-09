<template>
    <section class="invoice-add-wrapper">
        <b-alert
            variant="danger"
            :show="ordernumber === undefined"
        >
            <h4 class="alert-heading">
                {{ $t('Error fetching order') }}
            </h4>
            <div class="alert-body">
                {{ $t('Please select an order to print') }}
                <b-link
                    class="alert-link"
                    :to="{ name: 'shipments'}"
                >
                    {{ $t('Shipment List') }}.
                </b-link>
            </div>
        </b-alert>
        <b-row
            class="invoice-add"
            v-if="ordernumber"
        >
            <!-- Col: Left (Invoice Container) -->
            <b-col
                cols="12"
                xl="12"
                md="12"
            >
                <validation-observer ref="transportValidation">
                    <b-form @submit.prevent>
                        <b-card
                            no-body
                            class="invoice-preview-card"
                        >
                            <!-- Header -->
                            <b-card-body class="pb-0">
                                <div class="flex-column invoice-spacing mt-0">
                                    <b-row>
                                        <!-- Header: Left Content -->
                                        <b-col cols="6" class="d-flex" >
                                            <b-row class='flex-grow-1 p-1'>
                                                <b-col cols="8">
                                                    <div class="">
                                                        <b-card-text class="mb-25">
                                                            <b-form-input
                                                                v-model="orderdata.deliverName"
                                                                id="invoice-data-id"
                                                                :placeholder="$t('Name')"
                                                                disabled
                                                            />
                                                        </b-card-text>
                                                        <b-card-text class="mb-25">
                                                            <b-form-input
                                                                v-model="orderdata.deliverAddress"
                                                                id="invoice-data-id"
                                                                :placeholder="$t('Address')"
                                                                disabled
                                                            />
                                                        </b-card-text>
                                                        <b-card-text class="mb-25">
                                                            <b-row>
                                                                <b-col cols="3">
                                                                    <b-form-input
                                                                        v-model="orderdata.deliverZip"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Zip')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                                <b-col cols="6" class="ml-0">
                                                                    <b-form-input
                                                                        v-model="orderdata.deliverCity"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('City')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                                <b-col cols="3">
                                                                    <b-form-input
                                                                        v-model="orderdata.deliverCountry"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Country')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                            </b-row>
                                                        </b-card-text>
                                                        <b-card-text class="mb-25">
                                                            <b-row>
                                                                <b-col cols="4">
                                                                    <b-form-input
                                                                        v-model="orderdata.deliverPhone"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Phone')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                                <b-col cols="8">
                                                                    <b-form-input
                                                                        v-model="orderdata.deliverMail"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Email')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                            </b-row>
                                                        </b-card-text>
                                                        <!-- <b-card-text class="mb-25">
                                                            <b-row>
                                                                <b-col cols="6">
                                                                    <b-form-input
                                                                        v-model="ordernumber"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Order')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                                <b-col cols="6">
                                                                    <b-form-input
                                                                        v-model="shop"
                                                                        id="invoice-data-id"
                                                                        :placeholder="$t('Chain')"
                                                                        disabled
                                                                    />
                                                                </b-col>
                                                            </b-row>
                                                        </b-card-text> -->
                                                    </div>
                                                </b-col>
                                                <b-col cols="4">
                                                    <div class="">
                                                        <b-card-text class="mb-25">
                                                            <b-form-input
                                                                v-model="ordernumber"
                                                                id="invoice-data-id"
                                                                :placeholder="$t('Order')"
                                                                disabled
                                                            />
                                                        </b-card-text>
                                                        <b-card-text class="mb-25">
                                                            <b-form-input
                                                                v-model="shop"
                                                                id="invoice-data-id"
                                                                :placeholder="$t('Chain')"
                                                                disabled
                                                            />
                                                        </b-card-text>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        
                                        <b-col cols="6" class="d-flex justify-content-end">
                                            <div class="mb-0">
                                                <span class="title">
                                                    {{ $t('Area') }}:
                                                </span>
                                                <validation-provider
                                                    #default="{ errors }"
                                                    name="Area"
                                                    rules="required"
                                                >
                                                    <v-select
                                                        v-model="filterArea"
                                                        dir="ltr"
                                                        :options="areaOptions"            
                                                        class="invoice-filter-select mr-50"
                                                        :placeholder="$t('Area')"
                                                        :state="errors.length > 0 ? false : null"
                                                        label="text"
                                                        @input="getConsignorFields($event.value)"
                                                    >
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
                                                    <!-- <b-row>
                                                        <b-col cols="12" class="d-flex justify-content-end">
                                                            <div class="mb-0">
                                                                <span class="title">
                                                                    {{ $t('Transport') }}:
                                                                </span>
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Transport"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterTransport"
                                                                        dir="ltr"
                                                                        :options="transportOptions"            
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Transport')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        label="text"
                                                                        @input ="getCarriers($event)"
                                                                    >
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
                                                    </b-row> 
                                                    <hr class="mt-0"> -->
                                                    <b-row>
                                                        <b-col cols="6">
                                                            <div class="mb-0">
                                                                <span class="title">
                                                                    {{ $t('Carrier') }}:
                                                                </span>
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Carrier"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterCarrier"
                                                                        dir="ltr"
                                                                        :options="carrierOptions"            
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Carrier')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        label="text"
                                                                        @input="getProduct($event)"
                                                                    >
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
                                                            <!-- <div class="mb-0">
                                                                <span class="title">
                                                                    {{ $t('Sub Carriers') }}:
                                                                </span>
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Sub Carriers"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterSubcarrier"
                                                                        dir="ltr"
                                                                        :options="subcarrierOptions"
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Subcarrier')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        :disabled="activation"
                                                                        label="text"
                                                                    >
                                                                        <template #selected-option="{ text }">
                                                                            <span class="text-truncate overflow-hidden">
                                                                                {{ text }}
                                                                            </span>
                                                                        </template>
                                                                    </v-select>
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </validation-provider>
                                                                &nbsp;
                                                            </div> -->
                                                            <div class="mb-0">
                                                                <span class="title">
                                                                    {{ $t('Product') }}:
                                                                </span>
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Product"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterProduct"
                                                                        dir="ltr"
                                                                        :options="productOptions"
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Product')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        :disabled="productActive"
                                                                        label="text"
                                                                        @input="getServiceGoods($event)"
                                                                    >
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
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Goods Type"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterGoodstype"
                                                                        dir="ltr"
                                                                        :options="goodstypeOptions"            
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Goods Type')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        :disabled="activation"
                                                                        label="text" 
                                                                    >
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
                                                                    <v-select
                                                                        v-model="filterService"
                                                                        dir="ltr"
                                                                        :options="serviceOptions"            
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Service')"
                                                                        :disabled="activation"
                                                                        label="text"
                                                                    >
                                                                        <template #selected-option="{ text }">
                                                                            <span class="text-truncate overflow-hidden">
                                                                                {{ text }}
                                                                            </span>
                                                                        </template>
                                                                    </v-select>
                                                                    
                                                                &nbsp;
                                                            </div>
                                                        </b-col>
                                                        <!-- <b-col cols="4">
                                                            <div class="mb-0">
                                                                <span class="title">
                                                                    {{ $t('Product') }}:
                                                                </span>
                                                                <validation-provider
                                                                    #default="{ errors }"
                                                                    name="Product"
                                                                    rules="required"
                                                                >
                                                                    <v-select
                                                                        v-model="filterProduct"
                                                                        dir="ltr"
                                                                        :options="productOptions"
                                                                        class="invoice-filter-select mr-50"
                                                                        :placeholder="$t('Product')"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        :disabled="activation"
                                                                        label="text"
                                                                    >
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
                                                        </b-col> -->
                                                    </b-row>
                                                </div>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-0 flex-grow-1 p-0">
                                        <b-col cols="4" class="d-flex justify-content-start">
                                        </b-col>
                                        <b-col cols="8" class="d-flex justify-content-start">
                                            <div class="mb-0">
                                                <span class="title">
                                                    {{ $t('Delivery Date') }}:
                                                </span>
                                                <b-form-input
                                                    type="date"
                                                    class="custom-width"
                                                    v-model="orderdata.deliveryDate"
                                                    id="invoice-data-id"
                                                    :placeholder="$t('Delivery Date')"
                                                />
                                                &nbsp;
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-0 flex-grow-1 p-0">
                                        <b-col cols="4" class="d-flex justify-content-start">
                                        </b-col>
                                        <b-col cols="8" class="d-flex justify-content-start">
                                            <div class="mb-0">
                                                <span class="title">
                                                    {{ $t('Freight Message') }}:
                                                </span>
                                                <v-select
                                                    v-model="filterFreightmsg"
                                                    dir="ltr"
                                                    :options="freightmsgOptions"
                                                    class="invoice-filter-select mr-50"
                                                    label="text"
                                                    :placeholder="$t('Freight Message')"
                                                >
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
                                                <b-form-textarea
                                                    v-model="message"
                                                    id="invoice-data-id"
                                                    maxlength = "50"
                                                    class="height-40-textarea"
                                                />
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-card-body>
                            
                            <!-- Spacer -->
                            <hr class="invoice-spacing">
                            <!-- Invoice Client & Payment Details -->
                            <b-card-body
                                class="invoice-padding pt-0 "
                            >
                                <b-row>
                                    <b-col
                                        cols="12"
                                        md="8"
                                        class="d-flex justify-content-start p-0 mb-1 mt-1"
                                    >
                                        <h4 class="mr-1 mt-0">
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
                                        </h6>
                                    </b-col>
                                    <b-col
                                        cols="12"
                                        md="4"
                                        class="d-flex justify-content-end p-0 mb-1"
                                    >
                                        <b-button
                                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                            variant="outline-primary"
                                            class="w-50"
                                            @click="sendOrderLine()"
                                        >
                                            {{ $t('Print') }}
                                        </b-button>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <!-- Col: Invoice To -->
                                    <b-col cols="12" xl="12" class="p-0">
                                        
                                        <div v-if="orderlinedata.length > 3">
                                            <VueSlickCarousel v-bind="slickOptions" v-if="orderlinedata.length > 0">
                                          
                                                <div
                                                    v-for="(item, index) in orderlinedata"
                                                    :key="index"
                                                >
                                                    <b-row>
                                                        <b-col class="mr-1 ml-1">
                                                            <b-row>
                                                                <b-col cols="6" class="d-flex justify-content-start">
                                                                    <h6 class="mt-2">
                                                                        {{ $t('Label') }}: {{ index+1 }}
                                                                    </h6>
                                                                </b-col>
                                                                <b-col cols="6" class="d-flex justify-content-end">
                                                                    <b-button
                                                                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                                        size="sm"
                                                                        variant="primary"
                                                                        class="deletebtn"
                                                                        @click="deleteOrderline(index)"
                                                                    >
                                                                        {{ $t("delete label") }}
                                                                    </b-button>
                                                                </b-col>
                                                            </b-row><br>
                                                            <b-row>
                                                                <b-col cols="4" class="d-flex justify-content-start">
                                                                    <p class="mb-25">
                                                                        <b-form-input
                                                                            v-model="item.line"
                                                                            id="invoice-data-id"
                                                                            :placeholder="$t('Line')"
                                                                        />
                                                                    </p>
                                                                </b-col>
                                                                <b-col cols="4" class="d-flex justify-content-start">
                                                                    <p class="card-text mb-25">
                                                                        <b-form-input
                                                                            v-model="item.weight"
                                                                            id="invoice-data-id"
                                                                            :placeholder="$t('Weight')"
                                                                        />
                                                                    </p>
                                                                </b-col>
                                                                <b-col cols="4" class="d-flex justify-content-start">
                                                                    <p class="card-text mb-25">
                                                                        <b-form-input
                                                                            v-model="item.volume"
                                                                            id="invoice-data-id"
                                                                            :placeholder="$t('Volume')"
                                                                        />
                                                                    </p>
                                                                </b-col>
                                                            </b-row>
                                                            <p class="card-text mb-25">
                                                                <b-form-textarea
                                                                    v-model="item.description1"
                                                                    id="invoice-data-id"
                                                                    :placeholder="$t('Description')"
                                                                />
                                                            </p>
                                                            <b-col 
                                                                cols="12" 
                                                                class="d-flex justify-content-center" 
                                                                v-if="activeView"
                                                            >
                                                                <b-button
                                                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                                    size="sm"
                                                                    variant="primary"
                                                                    class="deletebtn"
                                                                    @click="viewPDF(index+1)"
                                                                >
                                                                    {{ $t("View PDF") }}
                                                                </b-button>
                                                            </b-col>
                                                        </b-col>
                                                    </b-row>
                                                </div>
                                            </VueSlickCarousel>
                                        </div>
                                        <div v-if="orderlinedata.length <= 3">
                                          
                                            <b-row>
                                                <b-col
                                                    cols="4" 
                                                    v-for="(item, index) in orderlinedata"
                                                    :key="index"
                                                >  
                                                    <b-row>
                                                        <b-col cols="6" class="d-flex justify-content-start">
                                                            <h6 class="mt-2">
                                                                {{ $t('Label') }}: {{ index+1 }}
                                                            </h6>
                                                        </b-col>
                                                        <b-col cols="6" class="d-flex justify-content-end">
                                                            <b-button
                                                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                                size="sm"
                                                                variant="primary"
                                                                class="deletebtn"
                                                                @click="deleteOrderline(index)"
                                                            >
                                                                {{ $t("delete label") }}
                                                            </b-button>
                                                        </b-col>
                                                    </b-row><br>
                                                    <b-row>
                                                        <b-col cols="4" class="d-flex justify-content-start">
                                                            <p class="mb-25">
                                                                <b-form-input
                                                                    v-model="item.line"
                                                                    id="invoice-data-id"
                                                                    :placeholder="$t('Line')"
                                                                />
                                                            </p>
                                                        </b-col>
                                                        <b-col cols="4" class="d-flex justify-content-start">
                                                            <p class="card-text mb-25">
                                                                <b-form-input
                                                                    v-model="item.weight"
                                                                    id="invoice-data-id"
                                                                    :placeholder="$t('Weight')"
                                                                />
                                                            </p>
                                                        </b-col>
                                                        <b-col cols="4" class="d-flex justify-content-start">
                                                            <p class="card-text mb-25">
                                                                <b-form-input
                                                                    v-model="item.volume"
                                                                    id="invoice-data-id"
                                                                    :placeholder="$t('Volume')"
                                                                />
                                                            </p>
                                                        </b-col>
                                                    </b-row>
                                                    <p class="card-text mb-25">
                                                        <b-form-textarea
                                                            v-model="item.description1"
                                                            id="invoice-data-id"
                                                            :placeholder="$t('Description')"
                                                        />
                                                    </p>
                                                    <b-col 
                                                        cols="12" 
                                                        class="d-flex justify-content-center" 
                                                        v-if="activeView"
                                                    >
                                                        <b-button
                                                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                            size="sm"
                                                            variant="primary"
                                                            class="deletebtn"
                                                            @click="viewPDF(index+1)"
                                                        >
                                                            {{ $t("View PDF") }}
                                                        </b-button>
                                                    </b-col>
                                                </b-col>
                                            </b-row>
                                        </div>

                                        <!-- <VueSlickCarousel v-bind="slickOptions" v-if="orderlinedata.length > 0">
                                            <div 
                                                v-for="i in 5" 
                                                :key="i" 
                                                class="img-warpper"
                                            >
                                                <img :src="`https://picsum.photos/200/100?random=${i}`" />
                                            </div>
                                        </VueSlickCarousel> -->
                                        
                                    </b-col>   
                                </b-row> 
                            </b-card-body>

                            <b-card-body class="invoice-padding form-item-section">
                            </b-card-body>

                            <b-card-body class="invoice-padding">
                                <b-row class="mt-1">
                                    <div 
                                        class="d-flex border rounded trasport_head_txt"
                                        v-for="(item, index) in totalOrderlinedata"
                                        :key="index"
                                    >
                                        <span class="trasport_head_span">{{ $t('Line') }} - {{ index+1 }}</span>
                                        <b-row class="flex-grow-1 p-1">
                                            <b-col
                                                cols="12"
                                                lg="6"
                                                class="d-flex"
                                            >
                                                <div class="w-70 mr-1">
                                                    <label class="d-inline">{{ $t("GTIN") }}</label>
                                                    <b-form-input
                                                        v-model="item.GTIN"
                                                        type="text"
                                                        class="mb-2 gtin-width"
                                                        disabled
                                                    />
                                                </div>
                                                <div class="w-15 mr-1">
                                                    <label class="d-inline">{{ $t("SKU") }}</label>
                                                    <b-form-input
                                                        v-model="item.SKU"
                                                        type="text"
                                                        class="mb-2 sku-width"
                                                        disabled
                                                    />
                                                </div>
                                                <div class="mr-1">
                                                    <label class="d-inline">{{ $t("QTY") }}</label>
                                                    <b-form-input
                                                        v-model="item.qty"
                                                        type="text"
                                                        class="mb-2 qty-width w-50"
                                                        disabled
                                                    />
                                                </div>
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="2"
                                            >
                                                <!-- <label class="d-inline">{{ $t("InternalText") }}</label>
                                                <b-form-input
                                                    v-model="item.internalText"
                                                    type="text"
                                                    class="mb-2"
                                                    disabled
                                                /> -->
                                            </b-col>
                                            <b-col
                                                cols="12"
                                                lg="4"
                                            >
                                                <label class="d-inline">{{ $t("Description") }} 1</label>
    
                                                <b-form-textarea
                                                    v-model="item.description1"
                                                    class="mb-2 mb-lg-0"
                                                    disabled
                                                >
                                                </b-form-textarea>
                                            </b-col>
                                        </b-row>
                                    </div>
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
    import Logo from '@core/layouts/components/Logo.vue';
    import Ripple from 'vue-ripple-directive';
    import VueSlickCarousel from 'vue-slick-carousel';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css';
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
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
        BFormRadio,
        VBToggle,
    } from 'bootstrap-vue';
    import vSelect from 'vue-select';
    import flatPickr from 'vue-flatpickr-component';
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import { required } from "@validations";

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
            BFormRadio,
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
        data(){
            return{
                slickOptions: {
                    slidesToShow : 3
                },
                required,
                activation : true,
                productActive : true,
                filterArea : "",
                filterTransport : "",
                filterCarrier : "",
                filterSubcarrier : "",
                filterProduct : "",
                filterService : "",
                filterGoodstype : "",
                filterFreightmsg : "",
                totalLabels : 0,
                totalrecords : 0,
                freightmsg : "",
                message : "",

                ordernumber : this.$route.params.order,
                shop : this.$route.params.shop,
                provider : this.$route.params.provider,

                actor : '',
                
                areaOptions : [],
                transportOptions : [],
                carrierOptions : [],
                subcarrierOptions : [],
                productOptions : [],
                serviceOptions : [],
                goodstypeOptions : [],
                freightmsgOptions : [
                    {
                        text : "Not Sent",
                        value : "0"
                    },
                    {
                        text : "Sent to Driver",
                        value : "1"
                    },
                    {
                        text : "Sent to Carrier",
                        value : "2"
                    },
                    {
                        text : "Sent to Recipient",
                        value : "3"
                    },
                ],

                orderdata:[],
                totalOrderlinedata :[],
                orderlinedata:[],

                itemFormBlankItem:{
                    line: "",
                    GTIN: "",
                    SKU: "",
                    qty: "",
                    description1: "",
                    description2: "",
                    internalText: ""
                },
                activeView: false,
                pdfLabels:[],

                carriersdata : [],
                productsdata : []
            }
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
                        this.getOrderdata();
                        this.getCarrierdata();
                        this.getorderlinedata();
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
            getorderlinedata(){
                this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/orderlines/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.shop
                )
                .then((responseorderline) => {
                    this.totalOrderlinedata = JSON.parse(
                        JSON.stringify(responseorderline.data.articles)
                    );
                    this.totalrecords = this.totalOrderlinedata.length;
                    this.orderlinedata = this.totalOrderlinedata.slice(0,5);
                    this.totalLabels = this.orderlinedata.length;

                    this.itemFormBlankItem.description1 = this.orderlinedata[this.totalLabels-1].description1;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getOrderdata(){
                this.mytoken = localStorage.getItem("token");

                axios(
                    "https://engine.netsupport.dk:8270/transport/v1/order/" + this.mytoken +
                    "?order=" + this.ordernumber +
                    "&shop=" + this.shop
                )
                .then((responseorder) => {
                    this.orderdata = JSON.parse(
                        JSON.stringify(responseorder.data.deliverOrder[0])
                    );
                    console.log(this.orderdata);
                    var area = "";
                    if(this.orderdata.deliverZip < 5000){
                        this.filterArea = "sjælland";
                        area = "5482";
                    }else if(this.orderdata.deliverZip > 5000){
                        this.filterArea = "jylland";
                        area = "5481";
                    }

                    this.getConsignorFields(area);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            getCarrierdata(){
                this.transportOptions = [];
                this.mytoken = localStorage.getItem("token");
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
                            text:element.Carrier.trim(),
                            value:element.Consignor
                        });
                    });

                    const key = 'text';
                    this.areaOptions = [...new Map(Area.map(item =>
                        [item[key], item])).values()];
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            getConsignorFields(event){
                this.actor = event;

                if(this.actor){
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
                                text:element.CarrierShortName.trim(),
                                value:element.CarrierCSID
                            });
                        });
                        
                        const key = 'text';
                        this.carrierOptions = [...new Map(carrier.map(item =>
                        [item[key], item])).values()];

                    })
                    .catch(function (error) {
                        console.log(error);
                        if(error.response.status == 403)
                        {
                            localStorage.setItem("token", "");
                            window.location.href = '/login';
                        }
                    });   
                }
            },
            changeLabelsize(){
                
                this.orderlinedata = this.totalOrderlinedata.slice(0,this.totalLabels);
            },

            addNewItemInItemForm(){
                this.orderlinedata.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)));
                this.totalLabels = this.orderlinedata.length;
            },
            
            deleteOrderline(index){
                if (confirm("Are you sure you want to delete this orderline?")) {
                    this.orderlinedata.splice(index, 1);
                    this.totalLabels = this.orderlinedata.length;
                }else{
                    alert("Your Data is Safe");
                }
            },
            
            sendOrderLine(){
                this.$refs.transportValidation.validate().then((success) => {
                    if (success) {

                        //console.log(this.orderlinedata);
                        var packagedata=[];
                        this.orderlinedata.forEach((element,index) => {
                            packagedata.push({
                                labelnumber : index + 1,
                                weight : element.weight,
                                volume : element.volume,
                                goods : this.filterGoodstype.value,
                                service : this.filterService.value,
                                description : element.description1
                            });
                        });

                        var senddata = {
                            
                            shop : this.shop,
                            order : this.ordernumber,
                            actor : this.actor,
                            //deliveryDate : this.orderdata.deliveryDate,
                            
                            prodcsid : this.filterProduct.value.toString(),
                            
                            lines : packagedata,

                            message : this.message,
                            messageto : this.filterFreightmsg.value
                        };
                        console.log(senddata);

                        var config = {
                            method: "post",
                            url: "https://engine.netsupport.dk:8270/transport/v1/shipconsignor/" +this.mytoken,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: senddata
                        };
                        axios(config)
                        .then((response) => {
                            alert(response.data);
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

            viewPDF(index){
                //console.log("index",index);
                window.open(this.pdfLabels.find(e => e.labelline == index)?.packageURL,'_blank');
            },
            // ========== old code start ==========
            getCarriers(event){
                console.log(event.value);
                if(event.value){
                    this.carrierOptions = [];
                    this.subcarrierOptions = [];
                    this.productOptions = [];
                    this.serviceOptions = [];
                    this.goodstypeOptions = [];

                    this.mytoken = localStorage.getItem("token");
                    axios(
                        "https://engine.netsupport.dk:8270/transport/v1/getconsignor/" + this.mytoken +
                        "?account=" + event.value 
                    )
                    .then((responsecarriers) => {
                        this.activation = false;
                        //console.log(responsecarriers);
                        var carriersdata = responsecarriers.data.Carriers;
                        var carrier = [];
                        var subcarrier = [];
                        var product = [];
                        var service = [];
                        var goodstype = [];

                        carriersdata.forEach(element => {
                            carrier.push({
                                text:element.CarrierShortName.trim(),
                                value:element.CarrierCSID
                            });
                            element.Subcarriers.forEach(ele =>{
                                subcarrier.push({
                                    text:ele.SubcarrierName.trim(),
                                    value:ele.SubcarrierCSID
                                });
                                ele.Products.forEach(el =>{
                                    product.push({
                                        text:el.ProdName.trim(),
                                        value:el.ProdCSID
                                    });
                                    el.GoodTypes.forEach(e =>{
                                        goodstype.push({
                                            text:e.GoodTypeKeyword.trim(),
                                            value:e.GoodTypeID
                                        });
                                    });
                                    el.Services.forEach(em =>{
                                        service.push({
                                            text:em.ServiceName.trim(),
                                            value:em.ServiceID
                                        });
                                    });
                                });
                            });
                        });
                        
                        const key = 'text';

                        this.carrierOptions = [...new Map(carrier.map(item =>
                        [item[key], item])).values()];

                        this.subcarrierOptions = [...new Map(subcarrier.map(item =>
                        [item[key], item])).values()];

                        this.productOptions = [...new Map(product.map(item =>
                        [item[key], item])).values()];

                        this.goodstypeOptions = [...new Map(goodstype.map(item =>
                        [item[key], item])).values()];

                        this.serviceOptions = [...new Map(service.map(item =>
                        [item[key], item])).values()];

                    })
                    .catch(function (error) {
                        console.log(error);
                    });   
                }
            },

            // ============ old code end ============

            getProduct(event){
                this.productOptions = [];
                this.productsdata = [];

                var singleCarrier = this.carriersdata.filter(function (el){
                    return el.CarrierCSID == event.value; 
                });
                this.productsdata = singleCarrier[0].Subcarriers[0].Products;
                var product = [];

                this.productsdata.forEach(element => {
                    product.push({
                        text:element.ProdName.trim(),
                        value:element.ProdCSID
                    });  
                });
                const key = 'text';
                this.productOptions = [...new Map(product.map(item =>
                [item[key], item])).values()];
                
                this.productActive = false;
            },
            getServiceGoods(event){
                this.serviceOptions = [];
                this.goodstypeOptions = [];
                var servicegoods = this.productsdata.filter(function (el){
                    return el.ProdCSID == event.value; 
                });

                var service = [];
                var goodstype = [];

                servicegoods[0].GoodTypes.forEach(element => {
                    goodstype.push({
                        text:element.GoodTypeKeyword.trim(),
                        value:element.GoodTypeKey1
                    });
                });
                servicegoods[0].Services.forEach(em => {
                    service.push({
                        text:em.ServiceName.trim(),
                        value:em.ServiceID
                    });
                });
                const key = 'text';

                this.goodstypeOptions = [...new Map(goodstype.map(item =>
                [item[key], item])).values()];

                this.serviceOptions = [...new Map(service.map(item =>
                [item[key], item])).values()];

                this.activation = false;
            }
        },
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style scoped>

    ::v-deep .slick-prev::before, ::v-deep .slick-next::before {
        font-family: 'slick';
        font-size: 20px;
        line-height: 1;
        opacity: 0.75;
        color: #767676 !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
        .trasport_head_span{
            background-color: #283046;   
        }
    }

    .form-item-section .row .border {
        background-color: white;
    }

    .deletebtn{
        margin-top: 6px;
        margin-left: 15px;
    }

    .invoice-filter-select{
        width: 200px;
    }

    .trasport_head_txt{
        position: relative;
        margin-bottom: 2em;
        width: 100%;
    }

    .trasport_head_span{
        position:absolute;
        bottom: 115px;
        left: 20px;
        padding: 10px 20px;
        background-color: #fff;
        font-size: 16px;
    }

    .linebtn{
        padding: 12px;
        font-size: 15px;
    }

    .custom-labelnumber{
        width: 12%;
        margin-top: -10px;
    }
    .addbtn{
        margin-top: -10px;
        padding: 12px;  
    }
    .span_lbl_mr{
        width: 85px; 
    }
    .span_lbl_mr_2{
        width: 65px;
    }
    .height-40-textarea{ 
        height: 40px;
    }
    .custom-width{
        width: 140% !important;
    }
    // .gtin-width{
    //     max-width: 70%;    
    // }
    // .sku-width{
    //     max-width: 60%;
    // }
    // .qty-width{
    //     max-width: 30%;
    // }
</style>

