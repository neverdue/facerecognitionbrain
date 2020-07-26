import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import InputLinkForm from './Components/InputLinkForm/InputLinkForm';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value: 30,
      density:{
        enable:true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  Input: '',
  ImageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  showMessage: false
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  CalculateFaceLocation = (data) => {
    const box = [];
    const Image = document.getElementById('ImageInput');
    const width = Number(Image.width);
    const height = Number(Image.height);
    const Faces = data.outputs[0].data.regions;
    Faces.forEach((Face, i) => {
      box.push({
        topRow: Face.region_info.bounding_box.top_row * height,
        leftCol: Face.region_info.bounding_box.left_col * width,
        rightCol: width - (Face.region_info.bounding_box.right_col * width),
        bottomRow: height - (Face.region_info.bounding_box.bottom_row * height)
      })
    });
    return box;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ Input: event.target.value });
  }

  onButtonEnterDetect = (event) => {
    if (event.which === 13) {
      this.onButtonSubmit();
    }
  }

  onButtonSubmit = (event) => {
    this.setState({ ImageUrl: this.state.Input });
    fetch('https://frozen-hollows-93293.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.Input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://frozen-hollows-93293.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.CalculateFaceLocation(response))
      })
      .catch(err => console.log(err))
}

  onButtonRedirect = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else if (route === 'signin') {
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render() {
    return (
    <div>
      <Particles className="particles" params={particlesOptions}/>
      <Navigation isSignedIn={this.state.isSignedIn} onButtonRedirect={this.onButtonRedirect} />
      { (this.state.route === 'signin')
      ? <SignIn loadUser={this.loadUser} onButtonRedirect={this.onButtonRedirect}/>
      : ((this.state.route === 'register')
      ? <Register loadUser={this.loadUser} onButtonRedirect={this.onButtonRedirect} />
      : <div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
      <InputLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        onButtonEnterDetect={this.onButtonEnterDetect}
      />
      <FaceRecognition ImageUrl={this.state.ImageUrl} allbox={this.state.box}/>
      </div>
    )}
    </div>
  );
}
}

export default App;
