import React, { useState } from 'react'


const Login = (props) => {
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')

    function handleUsernameChange(event) {
        setUsernameText(event.target.value)
    }

    function handlePasswordChange(event) {
        setPasswordText(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameText, password: passwordText })
        }
        fetch('/login', options)//response shuold send back token and stored in state
        .then(res=> res.json())
        .then(data => {
            props.setCredentials({ username: usernameText, token: data.token })

        })
    }

    return (
        <div>
            <div class="container mt-4">
                <div class="row justify-content-md-center">
                    <div class="col col-lg-3 mt-2">
                        <div class="text-center">
                            <h1>login</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <input value={usernameText} onChange={handleUsernameChange} class="form-control" placeholder="Enter username" />
                            </div>
                            <div class="form-group">
                                <input value={passwordText} onChange={handlePasswordChange} class="form-control" placeholder="Enter pword" />
                            </div>
                            <div class='form group text-center mb-2'>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;
