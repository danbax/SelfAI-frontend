import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@src/components/views/AccessView/LoginForm.vue";
import RegisterForm from "@src/components/views/AccessView/RegisterForm/RegisterForm.vue";
import HomeView from "@src/components/views/HomeView/HomeView.vue";
import PasswordResetView from "@src/components/views/PasswordResetView/PasswordResetView.vue";
import Chat from "@src/components/views/HomeView/Chat/Chat.vue";
import UserDataView from "@src/components/views/HomeView/Sidebar/UserData/UserDataView.vue";
import ConversationsView from "@src/components/views/HomeView/Sidebar/Conversations/Conversations.vue";
import NotificationsView from "@src/components/views/HomeView/Sidebar/Notifications/Notifications.vue";
import CategoriesView from "@src/components/views/HomeView/Sidebar/Categories/Categories.vue";
import SettingsView from "@src/components/views/HomeView/Sidebar/Settings/Settings.vue";
import GoogleCallback from "@src/components/views/AccessView/GoogleCallback.vue";

const routes = [
  {
    path: "/chat/",
    name: "Home",
    alias: "/",
    component: HomeView,
    children: [
      {
        path: "/chat/",
        alias: "/",
        name: "No-Chat",
        component: Chat,
      },
      {
        path: "/chat/:id/",
        name: "Chat",
        component: Chat,
      },{
        path: "sessions",
        name: "Active Sessions",
        component: ConversationsView,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: NotificationsView,
      },
      {
        path: "categories",
        name: "Categories",
        component: CategoriesView,
      },
      {
        path: "settings",
        name: "Settings",
        component: SettingsView,
      },
      {
        path: "/user-data/:type",
        name: "UserData",
        component: UserDataView,
      },
    ],
  },
  {
    path: "/access/sign-in/",
    name: "SignIn",
    component: LoginForm,
  },
  {
    path: "/access/sign-up/",
    name: "SignUp",
    component: RegisterForm,
  },
  {
    path: "/reset",
    name: "Reset",
    component: PasswordResetView,
  },
  {
    path: "/auth/google/callback",
    name: "GoogleCallback",
    component: GoogleCallback,
  },
];

// create the router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// (router gaurd) when navigating in mobile screen from chat to chatlist,
// don't navigate to the previous chat navigate to the chatlist.
router.beforeEach((to, from, next) => {
  //console.log(window.innerWidth);
  if (from.name === "Chat" && to.name === "Chat" && window.innerWidth <= 967)
    next({ name: "No-Chat" });
  else next();
});

export default router;
