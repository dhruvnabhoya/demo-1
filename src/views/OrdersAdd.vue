<template>
  <section class="invoice-add-wrapper">
    <b-row class="invoice-add">
      <!-- Col: Left (Invoice Container) -->
      <b-col id="Manual_FUll_width" cols="12" xl="12" md="8">
        <validation-observer ref="loginValidation">
          <b-form @submit.prevent>
            <b-card no-body class="invoice-preview-card">
              <!-- Header -->
              <b-card-body class="invoice-padding p-1 pb-0 card_cls">
                <div
                  class="
                    d-flex
                    justify-content-between
                    flex-column
                    invoice-spacing
                    mt-0
                  "
                >
                  <!-- Header: Left Content -->
                  <div>
                    <div class="logo-wrapper">
                      <!-- <b-img fluid :src="imgUrl" alt="Login V2" style="max-width: 35px;"/>
                                <h3 class="text-primary invoice-logo">
                                    InteGreat
                                </h3> -->
                    </div>
                    <div>
                      <b-row>
                        <b-col cols="12" lg="3">
                          <validation-provider
                            #default="{ errors }"
                            name="orwderNumber"
                            rules="required"
                          >
                            <b-card-text class="mb-25">
                              <b-form-input
                                id="invoice-data-id"
                                v-model="orderdata.orderNumber"
                                :state="errors.length > 0 ? false : null"
                                :placeholder="$t('Order Number')"
                              />
                            </b-card-text>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-col>
                        <b-col cols="12" lg="2" class="px-0">
                          <b-card-text class="mb-25">
                            <validation-provider
                              #default="{ errors }"
                              name="shop"
                              rules="required"
                            >
                              <v-select
                                v-model="orderdata.shop"
                                :state="errors.length > 0 ? false : null"
                                dir="ltr"
                                :options="shopOptions"
                                class="invoice-filter-select"
                                :placeholder="$t('Shop')"
                              >
                                <template #selected-option="{ label }">
                                  <span class="text-truncate overflow-hidden">
                                    {{ label }}
                                  </span>
                                </template>
                              </v-select>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-card-text>
                          &nbsp;
                        </b-col>
                        <b-col cols="12" lg="3" class="pr-0" v-if="!(orderdata.shop == 'Manual')">
                          <validation-provider
                            
                            #default="{ errors }"
                            name="postal"
                            rules="required"
                          >
                            <b-card-text class="mb-0">
                              <b-form-input
                                id="invoice-data-id"
                                v-model="postal"
                                :placeholder="$t('Postal')"
                                v-on:keyup="getAddress()"
                              />
                            </b-card-text>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                          <div
                            v-if="
                              postal.length >= 4 &&
                              !(orderdata.shop == 'Manual')
                            "
                          >
                            <div v-if="this.AddressList.length <= 0">
                              <p>{{ $t("No Shop Found in This Area") }}</p>
                            </div>
                            <!-- <validation-provider
                              #default="{ errors }"
                              name="shopAddress"
                              rules="required"
                            >
                              <table id="customers">
                                <p v-for="item in shopAdd" :key="item.id">
                                  <input
                                    class="btn-check"
                                    id="success-outlined"
                                    type="radio"
                                    v-model="orderdata.shopAddress"
                                    :state="errors.length > 0 ? false : null"
                                    :value="item"
                                  />
                                  {{ item.DS_ID }}
                                </p>
                              </table>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider> -->
                          </div> 
                        </b-col>
                        <b-col
                          class="col-4"
                          v-if="!(orderdata.shop == 'Manual')"
                        >
                          <div
                            class="
                              d-flex
                              align-items-center
                              justify-content-end
                            "
                          >
                            <b-form-input
                              v-model="AndvaceSearch"
                              class="d-inline-block mr-50 advance-search"
                              :placeholder="$t('Advance search')"
                            />
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                    <div>
                      <b-row>
                        <b-col cols="12" lg="2" v-if="!(orderdata.shop == 'Manual')">
                          <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            block
                            @click="addOrder()"
                          >
                            {{ $t("Create") }}
                          </b-button>
                        </b-col>
                        <b-col cols="12" lg="2" v-else>
                          <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            block
                            @click="addOrderManual()"
                            
                          >
                            {{ $t("Create") }}
                          </b-button>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="mb-0 mt-2" v-show="ErrorShopadd" >
                    <p id="ErrorId">Please Select the Shop Address !</p>
                  </div>
                    <b-table
                    v-if="this.AddressList.length > 0 && !(orderdata.shop == 'Manual')"
                      ref="refInvoiceListTable"
                      :fields="tableColumns"
                      :filter="AndvaceSearch"
                      class="mt-2"
                      responsive
                      :items="this.AddressList"
                    >
                      <!-- <input
                        class="btn-check"
                        id="success-outlined"
                        type="radio"
                        v-model="orderdata.shopAddress"
                        :value="item"
                      /> -->
                      <template #cell(checked_id)="data" class="check-main">
                        <!-- <div v-if="(data.item.DEL == 'Y')" class="deleted-row">
                                                <input type="radio" @click="checkOrder($event)" :value="this.Datasearchget.shopPostal">
                                            </div> -->
                        <div>
                          <input 
                            type="radio"
                            :name="data.item.shopAddress"
                            @click="checkOrder(data)"
                            :value="data.item.shopAddress"
                            class="Radio_class"
                            
                          />
                        </div>
                      </template>
                    </b-table>
                  </div>
                </div>
              </b-card-body>
            </b-card>
          </b-form>
        </validation-observer>
      </b-col>
      <!-- Right Col: Card -->
      <!-- <b-col
        v-if="!(orderdata.shop == 'Manual')"
        cols="12"
        md="4"
        xl="3"
        class="invoice-actions mt-md-0 mt-2"
      > -->
        <!-- Action Buttons -->
        <!-- Button: Send Invoice -->
        <!-- <b-card>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            disabled
          >
            {{ $t("Send Invoice") }}
          </b-button>
          Button: DOwnload
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
          >
            {{ $t("Preview") }}
          </b-button>
          Button: Print
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" block @click="addOrder()">
                {{ $t('Save') }}
            </b-button> -->
        <!-- </b-card> -->
      <!-- </b-col> -->
    </b-row>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import Logo from "@core/layouts/components/Logo.vue";
import Ripple from "vue-ripple-directive";
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
  VBToggle,
  BImg,
  BTable,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import i18n from "@/libs/i18n/index";
import { required } from "@validations";

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
    BImg,
    flatPickr,
    vSelect,
    Logo,
    ValidationProvider,
    ValidationObserver,
    BTable,
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  data() {
    return {
      required,
      orderdata: {
        orderNumber: "",
        shop: "",
        shopIndex:"",
      },
      tableColumns: [
        {
          key: "checked_id",
          label: "",
        },
        {
          key: "DS_ID",
          label: i18n.t("DS_ID"),
          sortable: true,
        },
        {
          key: "shopName",
          label: i18n.t("shopName"),
          sortable: true,
        },
        {
          key: "shopAddress",
          label: i18n.t("shopAddress"),
          sortable: true,
        },
        {
          key: "shopPostal",
          label: i18n.t("shopPostal"),
          sortable: true,
        },
        {
          key: "shopCity",
          label: i18n.t("shopCity"),
          sortable: true,
        },
        {
          key: "deptNumber",
          label: i18n.t("deptNumber"),
          sortable: true,
        },
        {
          key: "department",
          label: i18n.t("department"),
          sortable: true,
        },
        {
          key: "shopNumber",
          label: i18n.t("shopNumber"),
          sortable: true,
        },
        // {
        //   key: "shopCombined",
        //   label: i18n.t("shopCombined"),
        //   sortable: true,
        // },
        {
          key: "shopGLN",
          label: i18n.t("shopGLN"),
          sortable: true,
        },
      ],
      ErrorShopadd:false,
      postal: "",
      AddressList: [],
      shopOptions: [],
      shopAdd: [],
      // shopNm:[],
      paymentMethods: ["Bank Account", "PayPal", "UPI Transfer"],
      Deparment: [],
      AndvaceSearch: "",
      // Datasearchget: [],
    };
  },
  watch: {
    // AndvaceSearch: function (val) {
    //   console.log(val);
    //   this.AndvaceSearch = val;
    //   this.AdSearchFunc();
    // },
  },
  computed: {
    imgUrl() {
      this.sideImg = require("@/assets/images/pages/new_login.png");
      return this.sideImg;
    },
    opendirect() {
      console.log("hello");
    },
  },

  created() {
    this.getshops();
    // this.AdSearchFunc();
    this.getAddress();
  },

  methods: {
    checkOrder(a) {
      // console.log(a.item.shopAddress);
      // console.log(this.orderdata.shopAddress = a.item.shopAddress);
      this.orderdata.shopIndex = a.item.DS_ID
      console.log("a.item.DS_ID",a.item.DS_ID);
    },
    // AdSearchFunc() {
    //   console.log(this.AddressList, "AllData");
    //   this.Datasearchget = [];
    //   if (this.AndvaceSearch === "") {
    //     this.Datasearchget = this.AddressList;
    //   }
    //   this.Datasearchget = this.AddressList
    //   // return this.AddressList.filter(ele  => return
    //   // ele.department === this.AddressList.includes(this.AddressList))
    //   // console.log("this.abc",abc);
    // },
    getshops() {
      this.mytoken = localStorage.getItem("token");
      axios("https://engine.netsupport.dk:8270/orders/v1/shops/" + this.mytoken)
        .then((responseshop) => {
          this.shopOptions = JSON.parse(
            JSON.stringify(responseshop.data.shops)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getAddress() {
      this.shopAdd = [];
      // this.shopNm = [];

      var postal = this.postal;

      if (postal.length >= 4) {
        // console.log(this.postal);
        this.mytoken = localStorage.getItem("token");

        axios(
          "https://engine.netsupport.dk:8270/orders/v1/postal/" +
            this.mytoken +
            "/" +
            this.orderdata.shop +
            "/" +
            this.postal
        )
          .then((responseAddress) => {
            var addressList = JSON.parse(
              JSON.stringify(responseAddress.data.shops.recordset)
            );

            this.AddressList = addressList;
            // this.AddressList && this.AdSearchFunc();

            // console.log(this.AddressList, "AddressList");

            for (let i = 0; i < addressList.length; i++) {
              this.shopAdd[i] = addressList[i];
              this.Deparment[i] = addressList[i].department;
            }

            this.shopAdd = [...new Set(this.shopAdd)];
            this.Deparment = [...new Set(this.Deparment)];
            //this.shopAdd = this.shopAdd;
            // console.log("this.shopAdd", this.shopAdd);
            // console.log("this.Deparment", this.Deparment);
            // console.log(this.shopNm);
          })

          .catch(function (error) {
            console.log(error);
          });
      }
    },

    addOrder() {
      if (this.orderdata.shopAddress == '') {
       return this.ErrorShopadd = true
      }
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          var orderdata = this.orderdata;

        //   var config = {
        //       method: "post",
        //       url: "https://engine.netsupport.dk:8270/orders/v1/createorder/" + this.mytoken,
        //       headers: {
        //           "Content-Type": "application/json",
        //       },
        //       data: orderdata,
        //   };
        //   axios(config)
        //       .then((responseorder) => {
        //           console.log(responseorder);
        //         alert("your order is created")
        //         this.$router.push('/order-edit/'+ orderdata.orderNumber +'/'+ orderdata.shop); 
        //       })
        //       .catch(function (error) {
        //           alert(error);
        //       });
          console.log("this.orderdata", orderdata);
        }
      });
    },
    addOrderManual() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          var orderdata = this.orderdata;
          var config = {
              method: "post",
              url: "https://engine.netsupport.dk:8270/orders/v1/createorder/" + this.mytoken,
              headers: {
                  "Content-Type": "application/json",
              },
              data: orderdata,
          };
          axios(config)
              .then((responseorder) => {
                  console.log(responseorder);
                  this.$router.push('/order-edit/'+ orderdata.orderNumber +'/'+ orderdata.shop); 
                // alert("your order is created")
              })
              .catch(function (error) {
                  alert(error);
              });
          console.log("this.orderdata", orderdata);
        }
      });
    },
  },
};
</script>

<style scoped>
p#ErrorId {
    color: red;
    font-weight: 500;
}
input.Radio_class {
    width: 20px;
    height: 20px;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import "~@core/scss/base/components/variables-dark";

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
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

.card_cls {
  margin-bottom: 20%;
}

// .inteGreat_check_mn {
//     height: 200px;
//     overflow: auto;
// }

// .inteGreat_check_mn li {
//     white-space: nowrap;
//     margin: 10px 0;
// }

// .inteGreat_check_mn li input {
//     margin-right: 6px;
// }

// .ul_cls {
//     list-style-type: none;
//     padding: 0px;
// }
</style>
