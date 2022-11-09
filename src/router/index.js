import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../libs/i18n/index' // import VueI18n instance

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/views/Home.vue'),
            meta: {
                pageTitle: 'InteGreat Dashboard',
                breadcrumb: [{
                    text: 'InteGreat Dashboard',
                    active: true,
                }, ],
            },
        },
        {
            path: '/orders',
            name: 'second-page',
            component: () =>
                import ('@/views/SecondPage.vue'),
            meta: {
                pageTitle: 'Orders',
                breadcrumb: [{
                    text: 'Orders',
                    active: true,
                }, ],
            },
        },
        {
            path: '/order-preview/:id/:shop',
            name: 'order-preview',
            component: () =>
                import ('@/views/OrderPreview.vue'),
            meta: {
                pageTitle: 'Order Preview',
                breadcrumb: [{
                    text: 'Order Preview',
                    active: true,
                }, ],
            },

        },
        {
            path: '/order-edit/:id/:shop',
            name: 'order-edit',
            component: () =>
                import ('@/views/OrderEdit.vue'),
            meta: {
                pageTitle: 'Order Edit',
                breadcrumb: [{
                    text: 'Order Edit',
                    active: true,
                }, ],
            },

        },
        {
            path: '/order-create',
            name: 'order-create',
            component: () =>
                import ('@/views/OrdersAdd.vue'),
            meta: {
                pageTitle: 'Order Create',
                breadcrumb: [{
                    text: 'Order Create',
                    active: true,
                }, ],
            },
        },
        {
            path: '/shipments',
            name: 'shipments',
            component: () =>
                import ('@/views/Shipments.vue'),
            meta: {
                pageTitle: 'Shipments',
                breadcrumb: [{
                    text: 'Shipments',
                    active: true,
                }, ],
            },
        },
        {
            // path: '/labels/:order/:shop/:provider',
            // name: 'labels',
            // component: () =>
            //     import ('@/views/Labels.vue'),
            // meta: {
            //     pageTitle: 'Labels',
            //     breadcrumb: [{
            //         text: 'Labels',
            //         active: true,
            //     }, ],
            // },
            path: '/labels',
            name: 'labels',
            props: true,
            component: () =>
                import ('@/views/Labels.vue'),
            meta: {
                pageTitle: 'labels',
                breadcrumb: [{
                    text: 'Labels',
                    active: true,
                }, ],
            },
        },
        {
            path: '/consignor/:order/:shop/:provider',
            name: 'consignor',
            component: () =>
                import ('@/views/Consignor.vue'),
            meta: {
                pageTitle: 'Consignor',
                breadcrumb: [{
                    text: 'Consignor',
                    active: true,
                }, ],
            },
        },
        {
            path: '/consignor-pallets',
            name: 'consignor-pallets',
            props: true,
            component: () =>
                import ('@/views/ConsignorPallets.vue'),
            meta: {
                pageTitle: 'Consignor Pallets',
                breadcrumb: [{
                    text: 'Consignor Pallets',
                    active: true,
                }, ],
            },
        },
        {
            path: '/invoices',
            name: 'invoices-page',
            component: () =>
                import ('@/views/invoices-page.vue'),
            meta: {
                pageTitle: 'Invoices',
                breadcrumb: [{
                    text: 'Invoices',
                    active: true,
                }, ],
            },
        },
        {
            path: '/invoice-preview/:invoice/:order/:shop',
            name: 'invoice-preview',
            component: () =>
                import ('@/views/InvoicePreview.vue'),
            meta: {
                pageTitle: 'Invoice Preview',
                breadcrumb: [{
                    text: 'Invoice Preview',
                    active: true,
                }, ],
            },

        },
        {
            path: '/invoice-edit/:invoice/:order/:shop',
            name: 'invoice-edit',
            component: () =>
                import ('@/views/InvoiceEdit.vue'),
            meta: {
                pageTitle: 'Invoice Edit',
                breadcrumb: [{
                    text: 'Invoice Edit',
                    active: true,
                }, ],
            },
        },
        {
            path: '/invoices-add',
            name: 'invoices-add',
            component: () =>
                import ('@/views/InvoicesAdd.vue'),
            meta: {
                pageTitle: 'Invoice Create',
                breadcrumb: [{
                    text: 'Invoice Create',
                    active: true,
                }, ],
            },
        },
        {
            path: '/inventory-page',
            name: 'inventory-page',
            component: () =>
                import ('@/views/inventory-page.vue'),
            meta: {
                pageTitle: 'Inventory',
                breadcrumb: [{
                    text: 'Inventory',
                    active: true,
                }, ],
            },
        },
        {
            path: '/inventory-edit/:hdrid',
            name: 'inventory-edit',
            component: () =>
                import ('@/views/inventory-edit.vue'),
            meta: {
                pageTitle: 'Inventory Edit',
                breadcrumb: [{
                    text: 'Inventory Edit',
                    active: true,
                }, ],
            },
        },
        {
            path: '/shop-inventory',
            name: 'shop-inventory',
            component: () =>
                import ('@/views/ShopInventory.vue'),
            meta: {
                pageTitle: 'Shop Inventory',
                breadcrumb: [{
                    text: 'Shop Inventory',
                    active: true,
                }, ],
            },
        },
        {
            path: '/gdpr-anonymisation',
            name: 'gdpr-anonymisation',
            component: () =>
                import ('@/views/GDPR-anonymisation.vue'),
            meta: {
                pageTitle: 'GDPR Anonymisation',
                breadcrumb: [{
                    text: 'GDPR Anonymisation',
                    active: true,
                }, ],
            },
        },
        {
            path: '/nets-payment',
            name: 'nets-payment',
            component: () =>
                import ('@/views/NETSpayment.vue'),
            meta: {
                pageTitle: 'NETS payment',
                breadcrumb: [{
                    text: 'NETS payment',
                    active: true,
                }, ],
            },
        },
        {
            path: '/nets-costs',
            name: 'nets-costs',
            component: () =>
                import ('@/views/NETScost.vue'),
            meta: {
                pageTitle: 'NETS cost',
                breadcrumb: [{
                    text: 'NETS cost',
                    active: true,
                }, ],
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/Login.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '/registration',
            name: 'registration',
            component: () =>
                import ('@/views/Registration.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '/error-404',
            name: 'error-404',
            component: () =>
                import ('@/views/error/Error404.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '*',
            redirect: 'error-404',
        },
    ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router