//AUTH
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
//Customers
import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/View.vue';
//Users
import UsersMain from './components/users/Main.vue';
import UsersList from './components/users/List.vue';
import NewUser from './components/users/New.vue';
import User from './components/users/View.vue';
//Products
import ProductsMain from './components/products/Main.vue';
import ProductsList from './components/products/List.vue';
import NewProduct from './components/products/New.vue';
import Product from './components/products/View.vue';
import ProductDetails from './components/products/Details.vue';
//Cart
import Cart from './components/products/Cart.vue';

export const routes = [{
        path: '/',
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: '/customers',
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/',
                component: CustomersList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            }
        ]
    },
    {
        path: '/admin/users',
        component: UsersMain,
        children: [{
                path: '/',
                component: UsersList
            },
            {
                path: 'new',
                component: NewUser
            },
            {
                path: ':id',
                component: User
            }
        ]
    },
    {
        path: '/admin/products',
        component: ProductsMain,
        children: [{
                path: '/',
                component: ProductsList
            },
            {
                path: 'new',
                component: NewProduct
            },
            {
                path: ':id',
                component: Product
            },
            {
                path: ':id/details',
                component: ProductDetails
            }
        ]
    }
];
