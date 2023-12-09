import constant from "./constant";

const registerPageContent = `
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
                    <h2>Register</h2>
                    <form class="form" id="signupForm">
                        <div class="inputBox">
                            <input type="text" name="userName" required> <i>Username</i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="fullName" required> <i>Full Name</i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="phoneNo"> <i>Phone No.</i>
                        </div>
                        <div class="inputBox">
                            <input type="email" name="email"> <i>Email ID</i>
                        </div>
                        <div class="inputBox">
                            <input type="password" name="password" required> <i>Password</i>
                        </div>
                        <div class="links"><a href="#/login">Signin</a>
                        </div>
                        <div class="inputBox">
                            <input type="submit" value="Register">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;


// Attach event listener to the form
document.addEventListener('routechange', function () {
    console.log('routechange event triggered register');
    const sendbirdChat = window.sb
    const loginForm = document.getElementById('signupForm');
    console.log(sendbirdChat.currentUser)
    console.log(constant.sendbirdAppId, constant.sendbirdAppKey)

    loginForm?.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        // Get the values of the username and password from the FormData
        const userName = formData.get('userName');
        const fullName = formData.get('fullName');
        const phoneNo = formData.get('phoneNo');
        const email = formData.get('email');
        const password = formData.get('password');

        // Log the values to the console (you can replace this with your actual login logic)
        console.log('Username:', userName);
        console.log('fullName:', fullName);
        console.log('phoneNo:', phoneNo);
        console.log('email:', email);
        console.log('password:', password);

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

export default registerPageContent;