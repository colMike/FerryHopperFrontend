/* eslint-disable */
export const categories = [
    {
        id      : 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        parentId: null,
        name    : 'Male',
        slug    : 'male'
    },
    {
        id      : '07986d93-d4eb-4de1-9448-2538407f7254',
        parentId: null,
        name    : 'Female',
        slug    : 'female'
    }
];
export const brands = [
    {
        id  : 'e1789f32-9475-43e7-9256-451d2e3a2282',
        name: 'Benton',
        slug: 'benton'
    },
    {
        id  : '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        name: 'Capmia',
        slug: 'capmia'
    },
    {
        id  : 'f9987124-7ada-4b93-bef7-35280b3ddbd7',
        name: 'Lara',
        slug: 'lara'
    },
    {
        id  : '5913ee46-a497-41db-a118-ee506011529f',
        name: 'Premera',
        slug: 'premera'
    },
    {
        id  : '2c4d98d8-f334-4125-9596-862515f5526b',
        name: 'Zeon',
        slug: 'zeon'
    }
];
export const tags = [
    {
        id   : '167190fa-51b4-45fc-a742-8ce1b33d24ea',
        title: 'mens'
    },
    {
        id   : '3baea410-a7d6-4916-b79a-bdce50c37f95',
        title: 'ladies'
    },
    {
        id   : '8ec8f60d-552f-4216-9f11-462b95b1d306',
        title: 'unisex'
    },
    {
        id   : '8837b93f-388b-43cc-851d-4ca8f23f3a61',
        title: '44mm'
    },
    {
        id   : '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
        title: '40mm'
    },
    {
        id   : '2300ac48-f268-466a-b765-8b878b6e14a7',
        title: '5 ATM'
    },
    {
        id   : '0b11b742-3125-4d75-9a6f-84af7fde1969',
        title: '10 ATM'
    },
    {
        id   : '0fc39efd-f640-41f8-95a5-3f1d749df200',
        title: 'automatic'
    },
    {
        id   : '7d6dd47e-7472-4f8b-93d4-46c114c44533',
        title: 'chronograph'
    },
    {
        id   : 'b1286f3a-e2d0-4237-882b-f0efc0819ec3',
        title: 'watch'
    }
];
export const vendors = [
    {
        id  : '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        name: 'Evel',
        slug: 'evel'
    },
    {
        id  : '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        name: 'Mivon',
        slug: 'mivon'
    },
    {
        id  : '05ebb527-d733-46a9-acfb-a4e4ec960024',
        name: 'Neogen',
        slug: 'neogen'
    }
];
export const products = [
    {
        id         : '1c',
        category   : 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name       : 'Michael',
        description: 'Consequat esse in culpa commodo anim. Et ullamco anim amet est. Sunt dolore ex occaecat officia anim. In sit minim laborum nostrud. Consequat ex do velit voluptate do exercitation est adipisicing quis velit.',
        tags       : [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '2300ac48-f268-466a-b765-8b878b6e14a7',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        sku        : '1',
        barcode    : '8346201275534',
        brand      : '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        vendor     : '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        stock      : 30,
        reserved   : 5,
        cost       : 450.18,
        basePrice  : 1036,
        taxPercent : 30,
        price      : 1346.8,
        weight     : 0.61,
        thumbnail  : 'assets/images/apps/ecommerce/products/watch-01-thumb.jpg',
        images     : [
            'assets/images/apps/ecommerce/products/watch-01-01.jpg',
            'assets/images/apps/ecommerce/products/watch-01-02.jpg',
            'assets/images/apps/ecommerce/products/watch-01-03.jpg'
        ],
        active     : true
    }
];

export const customers = [
    {
        id : '1c',
        firstName : "Michael",
        middleName : "Ngigi",
        lastName : "Mbugua",
        email : "mike@gmail.com",
        phoneNumber : "0708453901",
        dob :  "15-07-1993",
        gender : "male",
        status : "active",
        isLoggedIn : "false",
        idNumber : "30258124",
        passport : "A002SSSS",
        country : "Kenya",
        city : "Nairobi",
        homePort : "Test Port",
        createdBy : "aaaa",
        createdAt : "aaaa",
        lastLogin : "aaaa",
        accountConfirmed : "aaaa",
        images :"aaaa",
    },
    {
        id : '1c',
        firstName : "Kelvin",
        middleName : "Munyua",
        lastName : "Mbugua",
        email : "kelvin@gmail.com",
        phoneNumber : "0756998153",
        dob :  "26-10-1996",
        gender : "male",
        status : "active",
        isLoggedIn : "false",
        idNumber : "30258124",
        passport : "A002SSSS",
        country : "Kenya",
        city : "Nairobi",
        homePort : "Test Port",
        createdBy : "aaaa",
        createdAt : "aaaa",
        lastLogin : "aaaa",
        accountConfirmed : "aaaa",
        images :"aaaa",
    }
];
export const users = [
    {
        id : '1c',
        firstName : "testCustomerOne",
        middleName : "John",
        lastName : "Doe",
        email : "john@gmail.com",
        phoneNumber : "0708453901",
        dob :  "15-07-1993",
        gender : "male",
        status : "active",
        isLoggedIn : "false",
        idNumber : "30258124",
        passport : "A002SSSS",
        country : "Kenya",
        city : "Nairobi",
        homePort : "Test Port",
        createdBy : "aaaa",
        createdAt : "aaaa",
        lastLogin : "aaaa",
        accountConfirmed : "aaaa",
        images :"aaaa",
    },
    {
        id : '1c',
        firstName : "TestCustomerTwo",
        middleName : "Munyua",
        lastName : "Mbugua",
        email : "kelvin@gmail.com",
        phoneNumber : "0756998153",
        dob :  "26-10-1996",
        gender : "male",
        status : "active",
        isLoggedIn : "false",
        idNumber : "30258124",
        passport : "A002SSSS",
        country : "Kenya",
        city : "Nairobi",
        homePort : "Test Port",
        createdBy : "aaaa",
        createdAt : "aaaa",
        lastLogin : "aaaa",
        accountConfirmed : "aaaa",
        images :"aaaa",
    }
];
