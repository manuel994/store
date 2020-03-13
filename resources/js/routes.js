import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/View.vue';
import UsersMain from './components/users/Main.vue';
import UsersList from './components/users/List.vue';
import NewUser from './components/users/New.vue';
import User from './components/users/View.vue';
export const routes = [
  {
    path: '/',
    component:  Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    component:  Login
  },
    {
      path: '/customers',
      component:  CustomersMain,
      meta: {
        requiresAuth: true
      },
      children:[
        {
          path:'/',
          component: CustomersList
        },
          {
            path:'new',
            component: NewCustomer
          },
            {
              path:':id',
              component: Customer
            }
      ]
    },
      {
        path: '/admin/users',
        component:  UsersMain,
        meta: {
          requiresAuth: true
        },
        children:[
          {
            path:'/',
            component: UsersList
          },
            {
              path:'new',
              component: NewUser
            },
              {
                path:':id',
                component: User
              }
        ]
      }
];
