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

import constant from './lib/constant'
import Router from './lib/router'
import routes from "./routes";

const sendbirdChat = SendbirdChat.init({
    appId: constant.sendbirdAppId,
    localCacheEnabled: true,
    modules: [new GroupChannelModule(), new MessageModule]
});
let userId = localStorage.getItem('userId')
if(userId) {
    await sendbirdChat.connect(userId.toString());
}
window.sb = sendbirdChat
console.log("window.sb = sendbirdChat", window.sb);
console.log("Sendbird: ", sendbirdChat)


const router = new Router(routes);
console.log(router);

window.router = router;
console.log(sendbirdChat.currentUser);
(sendbirdChat?.currentUser) ? router.navigateTo('chat') : router.navigateTo('login');

// window.addEventListener('popstate', () => {
//     router._loadInitialRoute();
// });

// document.addEventListener('DOMContentLoaded', function () {
//     console.log('DOMContentLoaded event triggered');
// });
