import chatPageContent from "./chat";
import loginPageContent from "./login";
import registerPageContent from "./register";
import SendbirdChat from "@sendbird/chat";
import {
    GroupChannelModule,
    GroupChannelFilter,
    PublicChannelFilter,
    MyMemberStateFilter,
    GroupChannelListOrder,
    GroupChannelEventSource,
    MessageCollectionInitPolicy,
    MessageFilter
} from '@sendbird/chat/groupChannel';
import {
    MessageModule
} from '@sendbird/chat/message';

import constant from './constant'
import Router from './router'


// https://www.willtaylor.blog/client-side-routing-in-vanilla-js/
//  https://accreditly.io/articles/how-to-build-a-router-in-vanilla-javascript#:~:text=addEventListener('popstate'%2C%20(),a%20router%20in%20Vanilla%20JavaScript.

const routes = [
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

const router = new Router(routes);
console.log(router);

const sendbirdChat = SendbirdChat.init({
    appId: constant.sendbirdAppId,
    localCacheEnabled: true,
    modules: [new GroupChannelModule(), new MessageModule]
});
console.log("Sendbird: ", sendbirdChat)

window.sb = sendbirdChat
window.router = router;

// router.navigateTo('login');

// window.addEventListener('popstate', () => {
//     router._loadInitialRoute();
// });

// document.addEventListener('DOMContentLoaded', function () {
//     console.log('DOMContentLoaded event triggered');
// });

