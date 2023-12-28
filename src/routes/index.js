import chatPageContent from "../pages/chat";
import loginPageContent from "../pages/login";
import registerPageContent from "../pages/register";

export default [
    {
        path: '/',
        callback: () => loginPageContent(),
    },
    {
        path: '/login',
        callback: () => loginPageContent(),
    },
    {
        path: '/register',
        callback: () => registerPageContent(),
    },
    {
        path: '/chat',
        callback: () => chatPageContent(),
    },
];