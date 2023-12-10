import { fetchUserById } from './apiService';
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
    const currentRoute = window.router.getRoute(); // Use the appropriate method to get the current route
    console.log('Route: ' + currentRoute)
    const router = window.router;
    if (currentRoute == "login") {
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

            fetchUserById(username.toLowerCase())
                .then(async(user) => {
                    console.log("User Details",user)
                    const userPassword = user.metadata?.password;
                    if(window.atob(userPassword) == password) {
                        try {
                            // Connect user in Sendbird
                            await sendbirdChat.connect(user.user_id);
                            router.setRoute('/chat')           
                        } catch (err) {
                            console.error('Error fetching users:', err);
                            $("#wrongLoginAlert").removeClass("d-none")
                        }                        
                    }
                    $("#wrongLoginAlert").removeClass("d-none")
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                    $("#wrongLoginAlert").removeClass("d-none")
                });
        });
    }
});

export default loginPageContent;