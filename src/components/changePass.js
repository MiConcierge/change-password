import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ChangePass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      password2: '',
      isPasswordVisible: false,
      isPassword2Visible: false
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const value = query.get('token')

    if (!value) return window.location.replace('http://reset.miconcierge.mx')
    localStorage.setItem('token', value)
  }

  componentWillMount() {
    localStorage.removeItem('token')
  }

  _createLink = async (e) => {
    e.preventDefault();
    const pass = this.state.password;
    const pass2 = this.state.password2;
    const token = localStorage.getItem('token');
    const result = await this.props.updatePassword({ variables: { pass, pass2, token } });

    localStorage.removeItem('token');
    console.log(result);

    if (result.data.setPassword && result.data.setPassword.success) {
      document.getElementById('passInput').value = '';
      document.getElementById('passInput2').value = '';
      this.props.history.push('/confirm');
    }

    // if (result.data.updatePassword.token !== null) {
    // }
  }

  render() {
    return (
      <div>
        <h1>Change your Password</h1>
        <form className='form' id='formulario' onSubmit={this._createLink.bind(this)}>
          <fieldset>
            <div className='form-group'>
              {/* <p>Type your new password</p> */}
              {this.state.isPasswordVisible ?
                <input placeholder="Type your new password" autoComplete="off" type='text' id='passInput' onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} /> :
                <input placeholder="Type your new password" autoComplete="off" type='password' id='passInput' onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />}
              {this.state.isPasswordVisible ?
                <button type='button' className='btn btn-md' id='see' onClick={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}><span className='glyphicon glyphicon-eye-close'></span></button> :
                <button type='button' className='btn btn-md' id='see' onClick={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}><span className='glyphicon glyphicon-eye-open'></span></button>
              }
              {/* <p>Confirm your new password</p> */}
              {this.state.isPassword2Visible ?
                <input placeholder="Confirm new password" autoComplete="off" type='text' id='passInput2' onChange={(e) => this.setState({ password2: e.target.value })} value={this.state.password2} /> :
                <input placeholder="Confirm new password" autoComplete="off" type='password' id='passInput2' onChange={(e) => this.setState({ password2: e.target.value })} value={this.state.password2} />}
              {this.state.isPassword2Visible ?
                <button type='button' className='btn btn-md' id='see' onClick={() => this.setState({ isPassword2Visible: !this.state.isPassword2Visible })}><span className='glyphicon glyphicon-eye-close'></span></button> :
                <button type='button' className='btn btn-md' id='see' onClick={() => this.setState({ isPassword2Visible: !this.state.isPassword2Visible })}><span className='glyphicon glyphicon-eye-open'></span></button>
              }
            </div>
            <div className='form-group'>
              <input className='btn btn-lg btn-primary btn-block' value='Change Password' type='submit' />
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

const CHANGE_PASSWORD = gql`
  mutation updatePassword($pass: String!, $pass2: String!, $token: String!) {
    setPassword(password1: $pass, password2: $pass2, token: $token){
      success,
      message
    }
  }
`

export default graphql(CHANGE_PASSWORD, { name: 'updatePassword' })(ChangePass)
