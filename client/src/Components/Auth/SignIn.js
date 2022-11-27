import React from "react";
import style from'./Auth.css';

function SignIn(){
    // const [username, setUsername] = useState("");
    // const [paassword, setPassword] = useState("");
    // const [errors, setErrors] = useState([]); 

    // const [showSignUp, setShowSignup] = useState(false);
    
    //log-in submit
    function handleSignInSubmit(e){

    }

    //sign-up submit
    function handleSignUpSubmit(e){

    }

    return(
        <>
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password"/>
                            </div>
                            {/* <div className="group">
                                <input id="check" type="checkbox" className="check" checked/>
                                <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                            </div> */}
                            <div className="group">
                                <input type="submit" className="button" value="Sign In"/>
                            </div>
                            <div className="hr"></div>
                            {/* <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div> */}
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" data-type="password"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Email Address</label>
                                <input id="pass" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up"/>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <label htmlFor="tab-1">Already Member?</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;