import constant from './constant'

const loginPageContent = `
        <section> 
            <span></span><span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <span></span>
            <div class="signin">
                <div class="content">
                    <h2>Sign In</h2>
                    <div class="alert alert-danger d-flex align-items-center mb-0 d-none" role="alert" id="wrongLoginAlert">
                      <i class="bi bi-exclamation-triangle-fill"></i>
                      <div class="ps-1 pe-1">Username or password is wrong</div>
                      <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <form class="form" id="login">
                        <div class="inputBox">
                            <input type="text" name="username" required> <i>Username</i>
                        </div>
                        <div class="inputBox">
                            <input type="password" name="password" required> <i>Password</i>
                        </div>
                        <div class="links"> <a href="#">Forgot Password</a> <a href="#/register">Signup</a>
                        </div>
                        <div class="inputBox">
                            <input type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;

// Attach event listener to the form
document.addEventListener('routechange', function () {
	console.log('routechange event triggered Login');
	const sendbirdChat = window.sb
	const loginForm = document.getElementById('login');
	console.log(sendbirdChat.currentUser)
	console.log(constant.sendbirdAppId, constant.sendbirdAppKey)

	loginForm?.addEventListener('submit', async function (event) {
		event.preventDefault();
		const formData = new FormData(loginForm);
		// Get the values of the username and password from the FormData
		const username = formData.get('username');
		const password = formData.get('password');

		// Log the values to the console (you can replace this with your actual login logic)
		console.log('Username:', username);
		console.log('Password:', password);

		console.log(sendbirdChat)
		// const queryParams = {
		//     userIdsFilter: [username],
		// };


		const url = `https://api-${constant.sendbirdAppId}.sendbird.com/v3/users/${username}`
		const headers = {
			'Api-Token': constant.sendbirdAppKey,
		};

		fetch(url, {
			method: 'GET',
			headers: headers,
		}).then(response => {
				console.log(response)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then(user => {
				console.log(user);
			})
			.catch(error => {
				console.error('Error fetching users:', error);
				$("#wrongLoginAlert").removeClass("d-none")

			});
		console.log(sendBirdUser)

	});
});

export default loginPageContent;