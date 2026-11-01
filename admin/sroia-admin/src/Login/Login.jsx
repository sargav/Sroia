import React from 'react'

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className='formInput'>
                    <label for="name"> Name</label>
                    <input type="text" name='name' id='name' placeholder='Name' />

                </div>
                <div className='formInput'>
                    <label for="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Password' />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login