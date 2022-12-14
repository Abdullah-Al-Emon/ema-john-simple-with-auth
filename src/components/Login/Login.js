import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './Login.css'

const Login = () => {
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user)
            form.reset()
            navigate(from, {replace: true})
        })
        .catch(error => console.error(error))

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>login </h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <input type="submit" className='btn-submit' value="Login" />
            </form>
            <p>New to ema jon <Link to='/signup'>Create a New Account</Link></p>
        </div>
    );
};

export default Login;