export default [{
        title: 'Dashboard',
        route: 'home',
        icon: 'HomeIcon',
    },
    {
        title: 'Orders',
        route: 'second-page',
        icon: 'FileIcon',
        children: [{
                title: 'Order List',
                route: 'second-page',
            },
            {
                title: 'Order Preview',
                route: 'order-preview',
            },
            // {
            //     title: 'Edit Order',
            //     route: 'order-edit',
            //     //route: { name: 'apps-invoice-preview', params: { id: 4987 } },
            // },
            {
                title: 'Create Order',
                route: 'order-create',
                //route: { name: 'apps-invoice-preview', params: { id: 4987 } },
            }
        ]
    },

    {
        title: 'Transport',
        route: 'shipments',
        icon: 'TruckIcon',
        children: [{
                title: 'Shipments',
                route: 'shipments',
            },
            {
                title: 'Labels',
                route: 'labels',
            },
            {
                title: 'Consignor',
                route: 'consignor',
            },
            {
                title: 'Consignor Pallets',
                route: 'consignor-pallets',
            }
        ]
    },

    {
        title: 'Invoices',
        route: 'invoices-page',
        icon: 'FileTextIcon',
        children: [{
                title: 'Invoice List',
                route: 'invoices-page',
            },
            {
                title: 'Invoice Preview',
                route: 'invoice-preview',
                //route: { name: 'apps-invoice-preview', params: { id: 4987 } },
            }
            // {
            //     title: 'Edit Invoice',
            //     route: 'invoice-edit',
            //     //route: { name: 'apps-invoice-preview', params: { id: 4987 } },
            // },
            // {
            //     title: 'Create Invoice',
            //     route: 'invoices-add',
            //     //route: { name: 'apps-invoice-preview', params: { id: 4987 } },
            // }
        ]
    },
    {
        title: 'Inventory',
        route: 'inventory-page',
        icon: 'BookIcon',
    },
    {
        title: 'WebShops',
        route: 'shop-inventory',
        icon: 'ShoppingCartIcon',

        children: [{
            title: 'Shop Inventory',
            route: 'shop-inventory',
        }, ]
    },
    {
        title: 'GDPR anonymisation',
        route: 'gdpr-anonymisation',
        icon: 'BookIcon',
    },
    {
        title: 'Payment',
        route: 'payment',
        children: [{
            title: 'NETS payment',
            route: 'nets-payment',
        },
        {
            title: 'NETS costs',
            route: 'nets-costs',
           
        }
    ]
    },
]