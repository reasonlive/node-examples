export const resources = [
    {
        name: "accounts",
        list: "/accounts",
        create: "/accounts/create",
        edit: "/accounts/edit/:id",
        show: "/accounts/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "users",
        list: "/users",
        create: "/users/create",
        edit: "/users/edit/:id",
        show: "/users/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "wallets",
        list: "/wallets",
        create: "/wallets/create",
        edit: "/wallets/edit/:id",
        show: "/wallets/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "tokenWallets",
        list: "/tokenWallets",
        create: "/tokenWallets/create",
        edit: "/tokenWallets/edit/:id",
        show: "/tokenWallets/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "addresses",
        list: "/addresses",
        //create: "/addresses/create",
        //edit: "/addresses/edit/:id",
        show: "/addresses/show/:id",
        meta: {
            canDelete: false,
        },
    },
    {
        name: "xpubs",
        list: "/xpubs",
        create: "/xpubs/create",
        edit: "/xpubs/edit/:id",
        show: "/xpubs/show/:id",
        meta: {
            canDelete: true,
            canEdit: true,
            canCreate: true
        },
    },
    {
        name: "transactions",
        list: "/transactions",
        //create: "/transactions/create",
        edit: "/transactions/edit/:id",
        show: "/transactions/show/:id",
        meta: {
            canDelete: false,
            canEdit: false,
            canCreate: false
        },
    },
    {
        name: "coins",
        list: "/coins",
        create: "/coins/create",
        edit: "/coins/edit/:id",
        show: "/coins/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "tokens",
        list: "/tokens",
        create: "/tokens/create",
        edit: "/tokens/edit/:id",
        show: "/tokens/show/:id",
        meta: {
            canDelete: true,
        },
    },
];