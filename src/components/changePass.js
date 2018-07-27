import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class changePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordVisible: false
    }
  }

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)
    const value = query.get('token')

    if (!value) {
      return window.location.replace('http://reset.miconcierge.mx')
    }

    localStorage.setItem('token', value)
  }

  componentWillMount () {
    localStorage.removeItem('token')
  }

  _createLink = async (e) => {
    e.preventDefault();
    const pass  = this.state.password;
    const result = await this.props.updatePassword({ variables: { pass } });

    localStorage.removeItem('token');

    if (result.data.updatePassword.token !== null) {
      document.getElementById('passInput').value = "";
      this.props.history.push('/confirm');
    }
  }

  render() {
    return (
      <div>
      <h1>Change your Password</h1>
      <form className="form" id="formulario" onSubmit={this._createLink.bind(this)}>
        <fieldset>
          <div className=" form-group">
              <p>Write your new password</p>
              {this.state.isPasswordVisible ?
                <input type='text'  id="passInput" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} /> :
                <input type='password' id="passInput" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />}
                {this.state.isPasswordVisible ?
                  <button type="button" className="btn btn-md" id="see" onClick={() => this.setState({isPasswordVisible: !this.state.isPasswordVisible})}><span className="glyphicon glyphicon-eye-close"></span></button>:
                  <button type="button" className="btn btn-md" id="see" onClick={() => this.setState({isPasswordVisible: !this.state.isPasswordVisible})}><span className="glyphicon glyphicon-eye-open"></span></button>
                }
          </div>
          <div className="form-group">
            <input className="btn btn-lg btn-primary btn-block" value="Change Password" type="submit"/>
          </div>
    </fieldset>
    </form>
    </div>
    )
  }
}

// 1
const CHANGE_PASSWORD = gql`
  mutation updatePassword($pass: String!) {
    updatePassword(password: $pass){
      token
    }
  }
`

export default graphql(CHANGE_PASSWORD, { name: 'updatePassword' })(changePass)
