
const sendbirdChat = window.sb


export default async function login() {
	document.querySelector('#login').innerHTML = `
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
                    <form class="form" onsubmit="return login(this)" id="login">
                        <div class="inputBox">
                            <input type="text" required> <i>Username</i>
                        </div>
                        <div class="inputBox">
                            <input type="password" required> <i>Password</i>
                        </div>
                        <div class="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a>
                        </div>
                        <div class="inputBox">
                            <input type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;

    function login(event) {
        event.preventDefault()
        console.log(document.getElementById('login'))
    }
}