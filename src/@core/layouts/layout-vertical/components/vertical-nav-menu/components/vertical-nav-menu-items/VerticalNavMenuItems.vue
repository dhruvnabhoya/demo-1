<template>
    <ul>
        <component
            :is="resolveNavItemComponent(item)"
            v-for="item in menuitems"
            :key="item.header || item.title"
            :item="item"
        />
        <!-- <div v-for="item in items" :key="item.header || item.title">
        <component
            :is="resolveNavItemComponent(item)"
            :item="item"
        />
        </div> -->
    </ul>
</template>

<script>
    import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils';
    import { provide, ref } from '@vue/composition-api';
    import VerticalNavMenuHeader from '../vertical-nav-menu-header';
    import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue';
    import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue';
    import axios from "axios";

    export default {
        components: {
            VerticalNavMenuHeader,
            VerticalNavMenuLink,
            VerticalNavMenuGroup,
        },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        setup() {
            provide('openGroups', ref([]))

            return {
                resolveNavItemComponent,
            }
        },
        data(){
            return{
                menuaction:{},
                menuitems :[]
            }
        },
        created(){
            this.getMenuhandler();
            //console.log("===items===",this.items); 
        },
        methods:{
            getMenuhandler(){
                //console.log(this.items);
                this.mytoken = localStorage.getItem("token");
                axios(
                    "https://engine.netsupport.dk:8270/orders/v1/menues/" + this.mytoken   
                )
                .then((response) => {
                    // response.data = {
                    //     "dashboard": "enabled",
                    //     "orders": "enabled",
                    //     "WebShops": "disabled",
                    //     "Inventory": "disabled",
                    //     "transport": "enabled",
                    //     "invoices": "disabled",
                    //     "gdpr":"enabled",
                    //     // "Payment":"disabled",
                    //     //"consignor": "enabled",
                    //     "labels": "enabled",
                    //     // "consignorpallets": "disabled"
                    // }
                    // console.log("response============>>>",response);
                
                    if(!response.data.gdpr){
                        response.data.GDPRanonymisation = "hidden";
                    }else if(response.data.gdpr == 'disabled'){
                        response.data.GDPRanonymisation = "disabled";
                    }else{
                        response.data.GDPRanonymisation = "enabled";    
                    }

                    if(response.data.consignor){
                        localStorage.setItem("consignor", true);
                    }
                    else if(response.data.labels){
                        localStorage.setItem("labels", true);
                    }
                    else if(response.data.consignorpallets){
                        localStorage.setItem("consignorpallets", true);
                    }

                    console.log(response.data);
                    
                    response.data.payment = 'enabled'
                    this.menuaction = response.data;
                    this.menuitems = [];

                    this.items.forEach(elem => {
                        const permission = {};
                        Object.keys(response.data).forEach((e) => {
                            //console.log(e);
                            if(response.data[e] == 'enabled' ){
                                // console.log(e, "enabled");
                                permission['enabled'] = true;
                                permission['disabled'] = false;
                                permission['hidden'] = false;
                            }

                            else if(response.data[e] == 'disabled'){
                                // console.log(e, "disabled");
                                permission['enabled'] = false;
                                permission['disabled'] = true;
                                permission['hidden'] = false;
                            }

                            else if(response.data[e] == 'hidden'){
                                //console.log(e, "hidden");
                                permission['enabled'] = false;
                                permission['disabled'] = false;
                                permission['hidden'] = true;
                            }

                            else{
                                permission['enabled'] = true;
                                permission['disabled'] = false;
                                permission['hidden'] = false;
                            }

                            
                            if(e.toLowerCase().replace(/ /g,'') === elem.title.toLowerCase().replace(/ /g,'')) {
                                //console.log(elem.title);
                                this.menuitems.push({
                                    title: elem.title,
                                    route:elem.route,
                                    icon:elem.icon,
                                    children : elem.children,
                                    disabled : permission['disabled'],
                                    enabled : permission['enabled'],
                                    hidden : permission['hidden']
                                });
                            }     
                        })
                        // console.log(permission, elem.title);
                        const found = this.menuitems.some(el => el.title === elem.title);
                        if (!found) {
                            
                            this.menuitems.push({   
                                title : elem.title,
                                route : elem.route,
                                icon : elem.icon,
                                children : elem.children,
                                disabled : false,
                                enabled : true,
                                hidden : false
                            });
                        }
                    })
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
