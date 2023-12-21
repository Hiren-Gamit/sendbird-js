import { fetchUserById, createUser } from "../lib/apiService";

export default function registerPageContent () {
    document.getElementById('app').innerHTML = `
    <section>
        <div class="signin">
            <div class="content">
                <h2>Register</h2>
                <form class="form" id="signupForm">
                    <div class="inputBox">
                        <input type="text"  id="userName" name="userName" required>
                        <i>Username</i>
                        <div class="valid-feedback">
                            <!-- Bootstrap checkmark icon for success state -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" class="bi bi-check" viewBox="0 0 16 16">
                                <path d="M14.78 4.22a.75.75 0 0 0-1.06 0L6 11.94 2.28 8.22a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.06 0L14.78 5.28a.75.75 0 0 0 0-1.06z"/>
                            </svg>
                            Username available!
                        </div>
                        <div class="invalid-feedback">
                            <!-- Bootstrap cross icon for error state -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.293 4.293a1 1 0 0 1 1.414 0L8 6.586l2.293-2.293a1 1 0 0 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 0-1.414z"/>
                            </svg>
                            Username not available!
                        </div>
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
                    <div class="links"><a></a><a href="#" onclick="window.router.navigateTo('login');">Signin</a>
                    </div>
                    <div class="inputBox">
                        <input type="submit" value="Register">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;

    const sendbirdChat = window.sb
    const loginForm = document.getElementById('signupForm');

    const userNameInput = document.getElementById("userName")
    const successFeedback = document.querySelector('.valid-feedback');
    const errorFeedback = document.querySelector('.invalid-feedback');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        // Get the values of the username and password from the FormData
        const userName = formData.get('userName');
        const fullName = formData.get('fullName');
        const phoneNo = formData.get('phoneNo');
        const email = formData.get('email');
        const password = formData.get('password');

        const queryParams = {
            "user_id": userName.toLowerCase(),
            "nickname": fullName,
            "profile_url": "https://picsum.photos/200/300",
            "metadata": {
                "phone": phoneNo,
                "email": email,
                "password": window.btoa(password)
            }
        }

        createUser(queryParams)
            .then(async(user) => {
                console.log(user)
                try {
                    // Connect user in Sendbird
                    await sendbirdChat.connect(user.user_id);
                    localStorage.setItem('userId', user.user_id);    
                    window.router.navigateTo('chat')      
                } catch (err) {
                    console.error('Error fetching users:', err);
                    $("#wrongLoginAlert").removeClass("d-none")
                }   
            })
            .catch(error => {
                console.error("Error creating user: ", error)
            })
    });
        
    userNameInput.addEventListener('input', function(event) {
        fetchUserById(userNameInput.value.toLowerCase())
            .then(user => {
                console.log(user);
                userNameInput.classList.remove('is-valid');
                userNameInput.classList.add('is-invalid');
                successFeedback.style.display = 'none';
                errorFeedback.style.display = 'block';
            })
            .catch(error => {
                userNameInput.classList.remove('is-invalid');
                userNameInput.classList.add('is-valid');
                errorFeedback.style.display = 'none';
                successFeedback.style.display = 'block';
            });
    })
}