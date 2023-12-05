import Navigo from "navigo";
import chat from "./chat";
import login from "./login";
import register from "./register";
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

const router = new Navigo('/');

const sendbirdChat = SendbirdChat.init({
	appId: "948F94B8-AD39-4EC1-9F8E-B2BB0FC0C708",
	localCacheEnabled: true,
	modules: [new GroupChannelModule(), new MessageModule]
});
console.log("Sendbird: ", sendbirdChat)

window.sb = sendbirdChat

router.on('/login', login).resolve()

// .on('/register', register).on('/home', login).resolve();