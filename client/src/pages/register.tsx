  
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import RegisterFrom from '../components/auth/RegisterFrom'

const Register = () => {

  const history = useHistory();

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Register</h3>
        <RegisterFrom/>
        <p>
          {`Already have an account?`}
          <Link to={`/login${history.location.search}`} style={{color: 'crimson'}}>
            Login Now
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register