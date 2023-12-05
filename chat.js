
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

import './style.css'
import moment from "moment/moment";

export default async function chat() {
	document.querySelector('#app').innerHTML = `
		<div class="">
			<div class="row">
				<div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
					<div class="row message-heading">
						<h3 id="message-heading">Message</h3>
					</div>
					<div class="row chat-screen" id="userLists">
						${userListsPlaceholderLoading()}
					</div>
				</div>
				<div class="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-9" id="chat-section">
					<div class="author-chat">
						${userDetailsPlaceholderLoading()}
					</div>
					<div class="chat">
						<div class="chat-messages">${userMessagePlaceholderLoading()}</div>
						<div class="text-box-section">
							<div class="text-box" id="send-message-controller" style="">
								<div class="input-text">
									<input type="text" id="message-text" placeholder="Type something here">
								</div>
								<div class="send-icon send-icon-face2">
									<div class="text-setting">
										<input type="file" id="file-message" name="file-message" style="display:none" />
										<button id="send-file-message" onclick="$('#file-message').trigger('click')">
											<img width="24" height="24" src="https://img.icons8.com/sf-black/64/attach.png" alt="attach"/>
										</button>
									</div>
									<div class="send-button">
										<button id="send-message">
											<img width="24" height="24" src="https://img.icons8.com/material-rounded/24/sent.png" alt="sent"/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				
				
			</div>
		</div>
	`;

	function userListsPlaceholderLoading() {
		let userList = `
			<div class="user-name-list user-name-list-face2">
				<div class="author-name-details">
					<div class="author-img img__skeleton __skeleton"></div>
					<div class="author-name">
						<div class="author-username username__skeleton __skeleton"></div>
						<p id="last_message" class="last_message__skeleton __skeleton"></p>		
					</div>
				</div>
			</div>
		`;

		let userLists = userList;
		for (let index = 0; index < 6; index++) {
			userLists += userList;
		}
		return userLists;
	}

	function userDetailsPlaceholderLoading() {
		return `
		<div class="author-chat-name">
			<div class="auhor-img">
				<div class="auhor-detailing">
					<h3 id="group_name" class="userDetail_userName__skeleton __skeleton"></h3>
					<p id="online-offline-status" class="online-offline-status__skeleton __skeleton"></p>
				</div>
				<div class="auhor-details">
					<div class="p-number phone_number__skeleton" id="targetauhor-details-info">
						<h5 class="__skeleton"></h5>
						<p class="__skeleton"></p>
					</div>
				</div>
			</div>
		</div>
		<div class="enrolled-text"><div class="enrolled-text__skeleton __skeleton"></div>
	`
	}

	function userMessagePlaceholderLoading() {
		let messageDiv = `
			<div class="chat-text chat-text-face2">
				<div class="chat-img chat-img-face2 img__skeleton __skeleton">
				</div>
				<div class="chat-message">
					<div class="chat-message-name">
						<div class="username__skeleton __skeleton"></div>
					</div>    
					<div class="personal-author-chat">
					<p class="last_message__skeleton __skeleton"></p>
					</div>
				</div>
			</div>
		`
		let messageDivs = messageDiv;
		for (let index = 0; index < 6; index++) {
			messageDivs += messageDiv;
		}
		return messageDivs;
	}


	var currentChannel;
	var channels = [];
	var channelName = '';
	var coverUrl = '';
	var channelMember;
	let mychannels = [];
	let messageCollections = [];
	let myGroupChannels = [];

	let currentUser = '1';

	const url = new URL(location.href);
	const searchParams = new URLSearchParams(url.search);

	if (searchParams.has('id')) {
		currentUser = searchParams.get('id').toString();
	}
	console.log(currentUser, url)

	// get Instance of Sendbird SDK.
	const sendbirdChat = window.sb;
	console.log(sendbirdChat, sendbirdChat.currentUser)
	if (!sendbirdChat.currentUser) {
		try {
			// Connect user in Sendbird
			const user = await sendbirdChat.connect(currentUser);
			// Update User Info in SendBird
			const userUpdateParams = {
				nickname: "Hiren Gamit",
			};
			await sendbirdChat.updateCurrentUserInfo(userUpdateParams);
			console.log(user);
			sendbirdChat.setChannelInvitationPreference(true);

		} catch (err) {
			// Handle error.
			console.log(err)
		}
	}
	// For Unique Handler Id
	const getUniqueHandlerId = () => {
		return (Math.random() + 1).toString(36).substring(7);
	}

	// GET:  Group channel by Chennel URL
	const getGroupChannel = async (channelUri) => {
		return await sendbirdChat.groupChannel.getChannel(channelUri);
	}

	const getReceiverMember = async (channel) => {
		return (channel.members[0].userId != sendbirdChat.currentUser.userId) ? channel.members[0] : channel.members[1];
	}

	// To check channel is archived or not
	const checkForChannelArchive = async (channel) => {
		const channelExtraData = (channel.data) ? JSON.parse(channel.data) : [];
		if (moment().valueOf() > moment(channelExtraData?.archiveDate).valueOf()) {
			const params = {
				hidePreviousMessages: false,
				allowAutoUnhide: false,
			};
			return await channel.hide(params);
		}
		return false
	}

	const groupChannelFilter = new GroupChannelFilter();
	groupChannelFilter.includeEmpty = true; // Optional.
	// groupChannelFilter.publicChannelFilter  = PublicChannelFilter.PUBLIC; // Retrieve public group channels. Optional.
	groupChannelFilter.myMemberStateFilter = MyMemberStateFilter.ALL;

	const groupChannelCollection = sendbirdChat.groupChannel.createGroupChannelCollection({
		filter: groupChannelFilter,
		order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
	});

	const groupChannelCollectionHandler = {
		onChannelsAdded: (context, channels) => {
			// Add new channels to your data source.
			console.log("onChannelsAdded", context, channels)
			if (context.source === GroupChannelEventSource.SYNC_CHANNEL_CHANGELOGS) {
				// add channels
			}
		},
		onChannelsUpdated: (context, channels) => {
			console.log("onChannelsUpdated", context, channels)
			// Update the existing channels in your data source.
			if (context.source === GroupChannelEventSource.EVENT_CHANNEL_TYPING_STATUS_UPDATE) {
				// update typing status.
			}
			if (context.source === GroupChannelEventSource.SYNC_CHANNEL_CHANGELOGS) {
				// update channels
			}
		},
		onChannelsDeleted: (context, channelUrls) => {
			console.log("onChannelsDeleted", context, channelUrls)
			if (context.source === GroupChannelEventSource.SYNC_CHANNEL_CHANGELOGS) {
				// delete channels
			}
			// Delete the channels with the matching channelUrls from your data source.
		},
	};

	groupChannelCollection.setGroupChannelCollectionHandler(groupChannelCollectionHandler);

	// Call hasMore to see if there are more channels to load.
	if (groupChannelCollection.hasMore) {
		myGroupChannels = await groupChannelCollection.loadMore();
	}
	console.log(groupChannelCollection, myGroupChannels);

	const messageCollectionHandler = {
		onMessagesAdded: (context, channel, messages) => {
			// Add the messages to your data source.
			console.log("onMessagesAdded", context, channel, messages)
		},
		onMessagesUpdated: (context, channel, messages) => {
			// Update the messages in your data source.
			console.log("onMessagesUpdated", context, channel, messages)
		},
		onMessagesDeleted: (context, channel, messageIds) => {
			// Remove the messages from the data source.
			console.log("onMessagesDeleted", context, channel, messageIds)
		},
		onChannelUpdated: (context, channel) => {
			// Change the chat view with the updated channel information.
			console.log("onChannelUpdated", context, channel)
		},
		onChannelDeleted: (context, channelUrl) => {
			// This is called when a channel was deleted. So the current chat view should be cleared.
			console.log("onChannelDeleted", context, channelUrl)
		},
		onHugeGapDetected: () => {
			// The Chat SDK detects more than 300 messages missing.
			console.log("onHugeGapDetected")
		}
	};

	const initMessageCollections = async () => {
		const filter = new MessageFilter();
		const limit = 100;
		const startingPoint = Date.now();
		const collection = currentChannel.createMessageCollection({
			filter,
			limit,
			startingPoint,
		});
		collection.initialize(MessageCollectionInitPolicy.CACHE_AND_REPLACE_BY_API)
			.onCacheResult((err, messages) => {
				console.log("onCacheResult Err: ", err, "Messages: ", messages)
				// Messages are retrieved from the local cache.
				// They might be too outdated or far from the startingPoint.
				messageCollections = messages
			})
			.onApiResult((err, messages) => {
				console.log(" onApiResult Err: ", err, "Messages: ", messages)
				// Messages are retrieved from the Sendbird server through API.
				// According to MessageCollectionInitPolicy.CACHE_AND_REPLACE_BY_API,
				// the existing data source needs to be cleared
				// before adding retrieved messages to the local cache.
			});

		collection.setMessageCollectionHandler(messageCollectionHandler);

		// messageCollections = await collection.loadNext();
		console.log("collection: ", collection)
		// if (collection.hasPrevious) {
		// 	// Load the previous messages when the scroll
		// 	// reaches the first message in the chat view.
		// 	messageCollections = await collection.loadPrevious()
		// }

		// if (collection.hasNext) {
		// 	// Load the next messages when the scroll
		// 	// reaches the last message in the chat view.
		// 	messageCollections = await collection.loadNext();
		console.log("await collection.loadNext();", await collection.loadNext())
		// }
		console.log("collection: ", collection)
	}

	const channelDetail = async (channel, active) => {
		let channelMember;
		let isInstructor;
		channelMember = await getReceiverMember(channel)
		if (channelMember) {
			console.log(channelMember);
			channelName = (channelMember) ? channelMember.nickname : '';
			coverUrl = (channelMember) ? channelMember.plainProfileUrl : '';
			isInstructor = (channelMember) ? channelMember?.metaData.userType == "instructor" : false;
			console.log(channel);
			const channelExtraData = (channel.data) ? JSON.parse(channel.data) : null;
			return `
			<div class="user-name-list user-name-list-face2 ${(active) ? 'active' : ''}" id="${channel.url}">
				<div class="author-name-details" data-channel_url=${channel.url}>
					<div class="author-img ${(isInstructor) ? 'maker-img' : ''}">
						${(coverUrl) ? `<img class="img-fluid" src="${coverUrl}" alt="">` :
					`<span class="img-circle ">${channelName.toUpperCase().substr(0, 2)}</span>`
				}
					</div>
					<div class="author-name">
						<div class="author-username">
							<h3>${channelName}</h3>
							<p class="${channel.unreadMessageCount > 0 ? 'unread-message' : ''}">${(channel.lastMessage) ? moment(channel.lastMessage.createdAt).format("h:mm") : ''}</p>
						</div>
						<p id="last_message">${(channel.lastMessage) ? (channel.lastMessage.messageType == "user" ? channel.lastMessage.message : channel.lastMessage.name) : ((!isInstructor) ? '<i>Recently enrolled</i>' : '<i>Recently Joined</i>')
				}</p>
					</div>
					<div class="message-time unread-message-container">
						${channel.unreadMessageCount > 0 ? `<p class="unread-message-count">${channel.unreadMessageCount}</p>` : ''}
					</div>
				</div>
			</div>
		`;
		}
		return '';
	}

	$("#userLists").empty();
	if (myGroupChannels.length > 0) {
		$(".text-box-section").show()
	} else {
		$(".text-box-section").hide()
	}

	myGroupChannels.map(async (channel, index) => {
		const isArchived = await checkForChannelArchive(channel);
		if (!isArchived) {
			$("#userLists").append(await channelDetail(channel, index == 0));
			if (index === 0) {
				// await handleJoinChannel(channel.url);
				currentChannel = channel;
				await initMessageCollections();
				await addMessages(channel);
			}
		}
	});

	const addMessages = async (channel) => {
		let channelMember;
		if (channel.isSuper) {
			channelName = channel.name;
			coverUrl = channel.coverUrl;
		} else {
			channelMember = await getReceiverMember(channel)
			// console.log("channel Memebr : ", channelMember)
			channelName = channelMember.nickname;
			coverUrl = channelMember.plainProfileUrl;
		}

		const channelExtraData = (channel.data) ? JSON.parse(channel.data) : {};
		console.log(channelExtraData?.enrolledText);
		if (channelExtraData?.enrolledText) {
			$(".enrolled-text").text(channelExtraData.enrolledText);
			$(".enrolled-text").show();
		} else {
			$(".enrolled-text").hide();
		}
		let contactPhone = (channelExtraData?.phone) ? channelExtraData.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : "----------";
		let contactEmail = (channelExtraData?.email) ? channelExtraData.email : '';
		$(".author-chat-name").empty();

		$(".author-chat-name").append(`
		<div class="open-profile">
		<div class="back-to-main"><img width="30" height="30" src="https://img.icons8.com/flat-round/64/info.png" alt="info"/></div>
		<div class="auhor-img">
		<div class="group_cover-img" id="group_cover-img">
		${(coverUrl) ?
				`<img id="group_cover" class="img-fulid" src="${coverUrl}" width="50" height="50" style="border-radius:50%">`
				: `<span class="img-circle ">${channelName.toUpperCase().substr(0, 2)}</span>`}
		</div>
			<div class="auhor-detailing">
				<h3 id="group_name">${channelName}</h3>
				<p id="online-offline-status">${(channelMember.connectionStatus == "online") ? 'Online<span class="online-indicator"></span>' : 'Offline'}</p>
			</div>
			<div class="auhor-details">
				<div class="auhor-details-mobile">
				   <div class="auhor-details-info" id="auhor-details-info">
				   		<img width="30" height="30" src="https://img.icons8.com/flat-round/64/info.png" alt="info"/>
				   </div>
				   <div class="auhor-details-close">
				   		<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="delete-sign"/>
				   </div>
				</div>
				<div class="p-number" id="targetauhor-details-info">
					<h5>${contactPhone}</h5>
					<p>${contactEmail}</p>
				</div>
			</div>
		</div>
		</div>
	`);

		$(".chat-messages").empty();
		console.log("messageCollections: ", messageCollections)

		// if(messageCollections.length > 0) {
		messageCollections.map(async message => {
			await messageDetailDiv(channel, message)
		})
		// }
		var div = $(".chat");
		div.scrollTop(div.prop('scrollHeight'));
	}

	const changeChannel = async (thisNode, channelUrl, from) => {
		var channelMember;
		$(".author-chat-name").empty()
		$(".author-chat-name").append(userDetailsPlaceholderLoading());
		$(".chat-messages").empty();
		$(".chat-messages").append(userMessagePlaceholderLoading());
		currentChannel = await getGroupChannel(channelUrl);
		await currentChannel.markAsRead()
		initMessageCollections();
		let childNodes = $(thisNode).children();
		let unreadMessageCounter = $(childNodes).find(".unread-message-container").children();
		$(unreadMessageCounter).remove()
		await currentChannel.refresh();
		addMessages(currentChannel)
		if (from == "inbox") {
			var div = document.getElementById(`${channelUrl}`);
			$(div).addClass('inbox-message')
		}

		$(document.getElementById(`${channelUrl}`)).siblings().removeClass('active');
		$(document.getElementById(`${channelUrl}`)).addClass('active');
		// handleJoinChannel(currentChannel.url)

		// $(".chat-messages").empty();
		$(".author-chat-name").addClass('author-chat-name-active');
		$(".author-chat").addClass('add-z-index')
		$(".author-message-lits").addClass('message-z-index')
		$(".chat").addClass('chat-active')
	}

	// To check user is online or offline acording to connection stastus 
	// const refreshCurrentChannel = async (channel) => {
	// 	await channel.refresh();
	// 	const receiverUser = await getReceiverMember(channel);
	// 	$('#online-offline-status').html(`
	// 		${(receiverUser?.connectionStatus == "online") ? `Online<span class="online-indicator"></span>` : 'Offline'}
	// 	`)
	// }

	// // To check receiver user connection status in every 5 seconds
	// setInterval(function () {
	// 	console.log(moment().format('ss'))
	// 	if (currentChannel !== undefined) {
	// 		refreshCurrentChannel(currentChannel);
	// 	}
	// }, 3000);

	// Send Text messages.
	const sendUserMessage = (message) => {
		const params = {
			message: message,
		};
		currentChannel.sendUserMessage(params)
			.onPending((message) => {
				console.log(message)
				// Add the view with the pending message.
			})
			.onSucceeded(async (message) => {
				messageDetailDiv(currentChannel, message)
				var div = $(".chat");
				div.scrollTop(div.prop("scrollHeight"));
				await currentChannel.markAsRead()
				await currentChannel.refresh();
				await onMessageSuccess(currentChannel, true);
				const receiverUser = await getReceiverMember(currentChannel);
				console.log("receiverUser: ", receiverUser.connectionStatus);
				if (receiverUser.connectionStatus == "offline") {
					// sendNotificationToReceiver(receiverUser.userId, message.message)
				}
			})
			.onFailed((error, message) => {
				console.log(error, message)
			});
	}

	// Send Text Message.
	$("#send-message").click(() => {
		if ($("#message-text").val() != "" && $("#message-text").val().trim() != "") {
			let message = $("#message-text").val().trim();
			$("#message-text").val("");
			sendUserMessage(message)
		}
	});

	// Send Text Message when press Enter Key.
	$("#message-text").on("keypress", (e) => {
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (keycode == '13') {
			if ($("#message-text").val() != "" && $("#message-text").val().trim() != "") {
				let message = $("#message-text").val().trim()
				$("#message-text").val("");
				sendUserMessage(message)
			}
		}
	})

	// Send a file message with a raw file like video, image, audio, gif, text, and so more.
	$('#file-message').change(function () {
		// console.log($(this))
		const files = $('#file-message')[0.].files
		let fileSize = (files[0].size / 1024 / 1024).toFixed(2);
		if (fileSize > 25) {
			alert("Allowed only up to 25MB file");
		} else {
			const params = {
				file: files[0],
				fileName: files[0].name,
				fileSize: files[0].size,
				thumbnailSizes: [{ maxWidth: 100, maxHeight: 100 }, { maxWidth: 200, maxHeight: 200 }],
				mimeType: files[0].type,
				// mentionType: MentionType.USERS, // Either USERS or CHANNEL
				// pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
			}
			// console.log(params)
			currentChannel.sendFileMessage(params)
				.onPending((message) => {
					messageDetailDiv(currentChannel, message)
				})
				.onSucceeded(async (message) => {
					$(`#${message.reqId}`).remove();
					$("#file-message").val("");

					messageDetailDiv(currentChannel, message)
					var div = $(".chat");
					div.scrollTop(div.prop("scrollHeight") + 50);
					await currentChannel.markAsRead()
					await currentChannel.refresh();
					await onMessageSuccess(currentChannel, true);

				})
				.onFailed((error, message) => {
					console.log(error, message)
				});
		}
	});


	const onMessageSuccess = async (channel, active) => {
		$(`#${channel.url}`).remove();
		$("#userLists").prepend(await channelDetail(channel, active));
	}

	function messageTypeImage(message) {
		return `
		<a href="${message.url}" download>
			<img src=${(message.url) ? message.url : "{{asset('assets/images/loader1.gif')}}"} width="100px" />
		</a>
	`
	}

	function messageTypeVideo(message) {
		return `
		<video width="320" height="240" controls ${(message.url) ? '' : 'poster=""'}> 
			${(message.url) ? `<source src=${message.url} type=${message.type}>` : ''}
			Your browser does not support the video tag.
		</video>
	`
	}

	function messageTypeAudio(message) {
		return `
		<audio controls>
			<source src="${message.url}" type="${type}">
			Your browser does not support the audio tag.
		</audio>
	`
	}

	function messageTypeDocuments(message) {
		return `
		<div class="filesend-wraper">
			<div class="u_file-message">
				<div class="u_other-file">
					<div class="u_flex u_item-center">
						<div class="u_text-center">
							<img src="{{asset('assets/images/text-file-logo.svg')}}" />
							<p>${message.name.split('.').at(-1)}</p>
						</div>
						<div class="u_other-file-content">
							<p>${message.name}</p>
							<p>1 KB</p>
						</div>
						<div>
							<a href="${message.url}" ${(message.url) ? 'download' : ''}>
								<img src="{{asset('assets/images/file-download-log.svg')}}" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
	}

	let isFirst = false;
	let daysdiffFirst;
	const showToday = (messageDate) => {
		let dayIndecator;
		let daysdiff = moment().diff(moment(messageDate), 'days')
		// console.log(dayIndecator, daysdiff)
		let dayIndecatorString = (moment(messageDate).isSame(moment().format('YYYY-MM-DD'))) ? "Today" : (moment().subtract(1, 'day').format('YYYY-MM-DD') == messageDate) ? "Yesterday" : `${daysdiff} days ago`;
		if (daysdiffFirst != daysdiff) {
			isFirst = true;
			daysdiffFirst = daysdiff
		}

		if (isFirst) {
			dayIndecator = `
			<div class="yesterday">
				<div class="line1"></div>
				<div class="main-text-center">${dayIndecatorString}</div>
				<div class="line2"></div>
			</div>`;
			isFirst = false;
		}
		return dayIndecator;
	}


	const messageDetailDiv = async (channel, message) => {
		console.log(message)
		if (message.messageType != "user") {
			var type = message.type;
		}

		if (message.sender?.plainProfileUrl) {
			var image = `<img class="img-fluid" src="${message.sender?.plainProfileUrl}" alt="">`;
		}
		else {
			var name = message.sender?.nickname;
			var image = `<span class="img-circle">${name.toUpperCase().substr(0, 2)}</span>`
		}
		let userMeta = message.sender?.metaData.userType == "instructor";

		$(".chat-messages").append(await showToday(moment(message.createdAt).format('YYYY-MM-DD')), `
		<div class="chat-text chat-text-face2" id="${message.reqId}">
			<div class="chat-img chat-img-face2 ${(userMeta) ? 'maker-img' : ''}">
				${image}
			</div>
			<div class="chat-message">
				<div class="chat-message-name">
					<h3>${message.sender?.nickname}</h3>
					<p>${moment(message.createdAt).format('h:mm a')}</p>
				</div>    
				<div class="personal-author-chat">
				${(message.messageType == "user" || message.messageType == "admin")
				?
				`<p>${message.message}</p>`
				:
				(`${type.includes('video')
					?
					messageTypeVideo(message)
					:
					(`${type.includes('image')
						?
						messageTypeImage(message)
						:
						(`${type.includes("audio")
							?
							messageTypeAudio(message)
							:
							messageTypeDocuments(message)
							}`)
						}`)

					}`)
			}
				</div>
			</div>
		</div>
	`);
		var div = $(".chat");
		div.scrollTop(div.prop('scrollHeight'));
	}




	$(document).on('click', '.user-name-list', async function () {
		var channelUrl = $(this).children().data("channel_url");
		// await handleJoinChannel(channelUrl)
		changeChannel($(this), channelUrl, "chat")
		$('#message-text').val('');
	})





	function setupCounter(element) {
		let counter = 0
		const setCounter = (count) => {
			counter = count
			element.innerHTML = `count is ${counter}`
		}
		element.addEventListener('click', () => setCounter(counter + 1))
		setCounter(0)
	}
}