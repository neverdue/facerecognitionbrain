import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      showMessage: this.props.showMessage
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onButtonEnterRegister = (event) => {
    if (event.which === 13) {
      this.onSubmitRegister();
    }
  }

  onSubmitRegister = (event) => {
    fetch('https://frozen-hollows-93293.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.name) {
          this.props.loadUser(user);
          this.props.onButtonRedirect('home');
        } else if (user === "can't register") {
          this.props.changeMessage('register');
          this.refs.name.value = '';
          this.refs.email.value = '';
          this.refs.password.value = '';
        }
      })
  }

  render() {
    return (
      <div>
          { this.props.showMessage ?
            <div className="alert alert-warning">
                <strong>The user already exists! Please sign in</strong>
            </div>
            : <div>
              </div>
          }
        <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 center">
        <div onKeyUp={this.onButtonEnterRegister}>
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input
                    ref="name"
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-auto"
                    type="name"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    ref="email"
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    ref="password"
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="center">
                <input
                onClick = {this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                />
              </div>
            </div>
          </main>
        </div>
        </article>
      </div>
    )
  }
}

export default Register;
