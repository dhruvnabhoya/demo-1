<template>
<div>
    <div id="Main_filter_Line">

        <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1 mb-md-0 pl-0" id="Gap_id">
            <input type="checkbox" v-model="DATA_y" value="2022" class="check-btn Years_wise_graph" id="Year_2022" checked>
            <label for="Year_2022" class="Y_W_g">2022</label>
            <input type="checkbox" v-model="DATA_y" value="2021" class="check-btn Years_wise_graph" id="Year_2021">
            <label for="Year_2021" class="Y_W_g">2021</label>
            <input type="checkbox" v-model="DATA_y" value="2020" class="check-btn Years_wise_graph" id="Year_2020">
            <label for="Year_2020" class="Y_W_g">2020</label>
            <input type="checkbox" v-model="DATA_y" value="2019" class="check-btn Years_wise_graph" id="Year_2019">
            <label for="Year_2019" class="Y_W_g">2019</label>
            <input type="checkbox" v-model="DATA_y" value="2018" class="check-btn Years_wise_graph" id="Year_2018">
            <label for="Year_2018" class="Y_W_g">2018</label>
            <!-- <label class="mt-1 Yeat_text">{{ $t('years') }}</label>
        <v-select v-model="filterYears" dir="ltr" :options="YearsData" :clearable="false" class="invoice-filter-select mt-1 ml-50" :placeholder="$t('years')">
        </v-select>&nbsp; -->
        </b-col>
    </div>
    <!-- <b-row class="d-flex justify-content-between mt-3">
        <b-col md='3' col="3" xl="3">
            <div id="To_inAm">
                <div class="Under_class">
                <h3 class="text-center">Total Invoice Amount</h3>
                <h6 class="text-center">years : 2022</h6>
                <p class="text-center">$ 255555</p>
            </div>
            </div>
        </b-col>

    </b-row> -->
    <b-row class="d-flex justify-content-between">
        <b-col class="card mt-3 " xl="6" md="6" id="firstBox">
            <div id="chart">
                <apexchart type="bar" height="250" :options="chartOptions" :series="YearGraphData"></apexchart>
            </div>
        </b-col>
        <!-- <b-col class="card mt-3 SecondBox ml-2" xl="5" md="5">
            <div id="chart">
                <apexchart type="donut" width="380" :options="RoundGraph" :series="series"></apexchart>
            </div>
        </b-col> -->
    </b-row>
    <!-- <b-card title="Kick start your project 🚀">
          <b-card-text>All the best for your new project.</b-card-text>
          <b-card-text>Please make sure to read our <b-link
              href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
              target="_blank"
          >
              InteGreat Oversigt
          </b-link> to understand where to go from here and how to use our template.</b-card-text>
          </b-card> -->
    <!-- 
          <b-card title="Want to integrate JWT? 🔒">
          <b-card-text>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</b-card-text>
          <b-card-text>Please read our  JWT Documentation to get more out of JWT authentication.</b-card-text>
          </b-card> -->
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {
    BCard,
    BCardText,
    BLink,
    BCol,
    BFormRadio,
    BFormCheckbox
} from 'bootstrap-vue'
import axios from "axios";
import vSelect from "vue-select";
export default {
    props: {},
    components: {
        BCard,
        BCardText,
        BLink,
        BCol,
        vSelect,
        apexchart: VueApexCharts,
        BFormRadio,
        BFormCheckbox,
    },
    data() {
        return {
            InvoicePaymentData: [],
            DATA_y: ['2022'],
            TotalInAmont: 0,
            series: [12, 54, 54, 69, 8, 9, 44, 55, 41, 17, 15, 10],
            RoundGraph: {
                name: 'Year 2022',
                chart: {
                    width: 380,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {

                        chart: {
                            width: 200
                        },
                        legend: {
                            show: false
                        }
                    }
                }]
            },
            YearGraphData: [{
                    name: 'Year 2022',
                    data: [],
                    id: '2022'
                },
                {
                    name: 'Year 2021',
                    data: [],
                    id: '2021'
                },
                {
                    name: 'Year 2020',
                    data: [],
                    id: '2020'
                },
                {
                    name: 'Year 2019',
                    data: [],
                    id: '2019'
                },
                {
                    name: 'Year 2018',
                    data: [],
                    id: '2018'
                },
            ],
            chartOptions: {
                colors: ['#FF0000', '#FFA500', "#FFFF00", "#00FF00", '#0000FF'],
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: {
                        show: true,
                        tools: {
                            download: false
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                },
                yaxis: {
                    title: {
                        // text: '$ (thousands)'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    download: false,
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            },
            YearsData: ['2022', '2021', '2020', '2019', '2018'],
        }
    },
    watch: {
        DATA_y: function (val) {
            this.DATA_y = val
            this.InvoiceData();
        },
    },
    created() {
        localStorage.setItem("title", 'Dashboard')
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
                        // console.log('Home');
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
        this.InvoiceData();
    },
    methods: {
        async InvoiceData() {
            // invoice payment data //
            this.DATA_y
            console.log("DATA_y", this.DATA_y, this.YearGraphData);
            // remove data
            for (let j = 0; j < 5; j++) {
                this.YearGraphData[j].data = []
            }
            for (let i = 0; i < this.DATA_y.length; i++) {
                const element = this.DATA_y[i];

                var config = {
                    method: "get",
                    url: "https://engine.netsupport.dk:8270/dashboard/v1/totals/" + this.mytoken +
                        "?year=" + element
                };
                await axios(config)
                    .then((response) => {
                        this.InvoicePaymentData = response.data.months.recordset
                        let i = this.YearGraphData.findIndex(a => a.id == element)
                        console.log('index', i)
                        this.YearGraphData[i].data = []
                        this.InvoicePaymentData.forEach(
                            ele => {
                                this.YearGraphData[i].data.push(
                                    ele.invoiceAmount

                                )
                            })
                    })
                console.log("this.YearGraphData[0].data", this.YearGraphData[0].data);

                this.YearGraphData[0].data.forEach(ele => {
                    this.TotalInAmont += ele
                })
                console.log("this.TotalInAmont", this.TotalInAmont);
            }
            window.dispatchEvent(new Event('resize'))
        }
    },
}
</script>

<style scoped>
div#To_inAm {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}

div#Gap_id {
    margin-left: 15px;
    grid-column-gap: 20px;
}

label.Y_W_g {
    font-size: medium;
    font-weight: 600;
}

.check-btn {
    transform: scale(02);
    width: 12px;
    height: 12px;
}

div#Main_filter_Line {
    padding: 10px 0px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgb(34 41 47 / 10%);
}
</style><style lang="scss" scoped>
.invoice-filter-select {
    //min-width: 190px;
    min-width: 170px;
    background-color: white;

    ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
        width: 100px;
    }
}
</style><style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
