import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AdminPage from "@/views/admin/AdminPage.vue";

import Book from "@/views/admin/book/Book.vue";
import BookEdit from "@/views/admin/book/BookEdit.vue";
import BookAdd from "@/views/admin/book/BookAdd.vue";

import Publisher from "@/views/admin/publisher/Publisher.vue";
import PublisherEdit from "@/views/admin/publisher/PublisherEdit.vue";
import PublisherAdd from "@/views/admin/publisher/PublisherAdd.vue";

import Staff from "@/views/admin/staff/Staff.vue";
import StaffEdit from "@/views/admin/staff/StaffEdit.vue";
import StaffAdd from "@/views/admin/staff/StaffAdd.vue";
import StaffLogin from "@/views/admin/StaffLogin.vue";

import Reader from "@/views/admin/reader/Reader.vue";
import ReaderEdit from "@/views/admin/reader/ReaderEdit.vue";
import ReaderAdd from "@/views/admin/reader/ReaderAdd.vue";

import BorrowBook from "@/views/admin/borrowBook/BorrowBook.vue";
import BorrowBookEdit from "@/views/admin/borrowBook/BorrowBookEdit.vue";
import BorrowBookAdd from "@/views/admin/borrowBook/BorrowBookAdd.vue";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BookDetail from "@/views/BookDetail.vue"
import BorrowBookHistory from "@/views/BorrowBookHistory.vue";
import ReaderInformation from "@/views/ReaderInformation.vue";
import ReaderInformationEdit from "@/views/ReaderInformationEdit.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },

    {
        path: "/admin",
        name: "adminPage",
        component: AdminPage,
    },
    
   {
        path: "/admin/book",
        name: "book",
        component: Book,
    },
	
    {
        path: "/admin/book/:id",
        name: "book.edit",
        component: BookEdit,
        props: true 
    },

    {
        path: "/admin/book/add", 
        name: "book.add",  
        component: BookAdd 
    },

    {
        path: "/admin/publisher",
        name: "publisher",
        component: Publisher,
    },

    {
        path: "/admin/publisher/:id",
        name: "publisher.edit",
        component: PublisherEdit,
        props: true 
    },

    {
        path: "/admin/publisher/add", 
        name: "publisher.add",  
        component: PublisherAdd 
    },

    {
        path: "/admin/staff",
        name: "staff",
        component: Staff,
    },

    {
        path: "/admin/staff/:id",
        name: "staff.edit",
        component: StaffEdit,
        props: true 
    },

    {
        path: "/admin/staff/add", 
        name: "staff.add",  
        component: StaffAdd 
    },

    {
        path: "/admin/login", 
        name: "staff.login",  
        component: StaffLogin 
    },

    {
        path: "/admin/reader",
        name: "reader",
        component: Reader,
    },

    {
        path: "/admin/reader/:id",
        name: "reader.edit",
        component: ReaderEdit,
        props: true 
    },

    {
        path: "/admin/reader/add", 
        name: "reader.add",  
        component: ReaderAdd 
    },

     {
        path: "/admin/borrowBook",
        name: "borrowBook",
        component: BorrowBook,
    },

    {
        path: "/admin/borrowBook/:id",
        name: "borrowBook.edit",
        component: BorrowBookEdit,
        props: true 
    },

    {
        path: "/admin/borrowBook/add", 
        name: "borrowBook.add",  
        component: BorrowBookAdd 
    },

    {
        path: "/login", 
        name: "reader.login",  
        component: Login 
    },

    {
        path: "/register", 
        name: "reader.register",  
        component: Register 
    },

    {
        path: "/bookDetail/:id",
        name: "book.detail",
        component: BookDetail,
        props: true 
    },

    {
        path: "/borrowBookHistory", 
        name: "borrowBook.history",  
        component: BorrowBookHistory 
    },

    {
        path: "/readerInformation",
        name: "reader.information",
        component: ReaderInformation,
    },

    {
        path: "/readerInformationEdit",
        name: "readerInformation.edit",
        component: ReaderInformationEdit,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;