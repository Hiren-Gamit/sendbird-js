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
import { Router } from "director";
// Define content for each page
const pages = {
	login: loginPageContent,
	register: registerPageContent,
	chat: chatPageContent,
};

const routeChangeEvent = new Event('routechange');

// Function to handle navigation based on the current route
function handleNavigation(route) {
	const content = document.getElementById('app');
	content.innerHTML = pages[route] || "Page not found";
	// Dispatch the custom event
	document.dispatchEvent(routeChangeEvent);
}

// Set up routes using Director
const router = new Router({
	'/login': () => handleNavigation('login'),
	'/register': () => handleNavigation('register'),
	'/chat': () => handleNavigation('chat'),
	'/main': () => handleNavigation('main'),
});

const sendbirdChat = SendbirdChat.init({
	appId: constant.sendbirdAppId,
	localCacheEnabled: true,
	modules: [new GroupChannelModule(), new MessageModule]
});
console.log("Sendbird: ", sendbirdChat)

window.sb = sendbirdChat
window.router = router;
document.addEventListener('DOMContentLoaded', function () {
	console.log('DOMContentLoaded event triggered');
	router.init('/login'); // Set the initial route
});