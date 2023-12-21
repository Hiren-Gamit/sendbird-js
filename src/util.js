export function userListsPlaceholderLoading() {
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

export function userDetailsPlaceholderLoading() {
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

export function userMessagePlaceholderLoading() {
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