import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './Signup.css'

const Signup = () => {
    const [error, setError] = useState(null)
    const {createUser} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)


        if(password.length < 6){
            setError('Password should be 6 characters or more.')
        }

        if (password !== confirm) {
            setError('Your password did not match.')
            return
        }
        createUser(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user)
            form.rest()
        } )
        .catch(error => console.error(error))

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" required />
                </div>
                <p className='text-error'>{error}</p>
                <input type="submit" className='btn-submit' value="Sign Up" />
            </form>
            <p>Already Have a Account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default Signup;