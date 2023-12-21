import { fetchUserById } from '../lib/apiService';

export default function loginPageContent() {
    document.getElementById('app').innerHTML = `
    <section> 
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
                    <div class="links"> <a href="#">Forgot Password</a> <a href="#" id="signup" onclick="window.router.navigateTo('register');">Signup</a>
                    </div>
                    <div class="inputBox">
                        <input type="submit" value="Login">
                    </div>
                </form>
            </div>
        </div>
    </section>`;

    const sendbirdChat = window.sb
    const loginForm = document.getElementById('login');
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
                        localStorage.setItem('userId', user.user_id);
                        window.router.navigateTo('chat');          
                    } catch (err) {
                        console.error('Error fetching users:', err);
                        $("#wrongLoginAlert").removeClass("d-none");
                    }                        
                }
                $("#wrongLoginAlert").removeClass("d-none");
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                $("#wrongLoginAlert").removeClass("d-none");
            });
    });
}