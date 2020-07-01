import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import InputLinkForm from './Components/InputLinkForm/InputLinkForm';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '1400ccf87b0a4d7aa663d891820f5799'
});

const parameters = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Input: '',
      ImageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  CalculateFaceLocation = (data) => {
    const FaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const Image = document.getElementById('ImageInput');
    const width = Number(Image.width);
    const height = Number(Image.height);
    return {
      topRow: FaceBox.top_row * height,
      leftCol: FaceBox.left_col * width,
      rightCol: width - (FaceBox.right_col * width),
      bottomRow: height - (FaceBox.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ Input: event.target.value });
  }

  onButtonSubmit = (event) => {
    this.setState({ ImageUrl: this.state.Input });
    app.models
      .predict(
        "c0c0ac362b03416da06ab3fa36fb58e3",
        this.state.Input)
      .then(response => this.displayFaceBox(this.CalculateFaceLocation(response)))
      .catch(err => console.log(err))
}

  onButtonRedirect = (route) => {
    this.setState({route: route});
    this.setState({ImageUrl: ''});
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }
  }

  render() {
    return (
    <div>
      <Particles className="particles" params={parameters} />
      <Navigation isSignedIn={this.state.isSignedIn} onButtonRedirect={this.onButtonRedirect} />
      { (this.state.route === 'signin')
      ? <SignIn onButtonRedirect={this.onButtonRedirect} />
      : ((this.state.route === 'register')
      ? <Register onButtonRedirect={this.onButtonRedirect} />
      : <div>
      <Logo />
      <Rank />
      <InputLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
      />
      <FaceRecognition ImageUrl={this.state.ImageUrl} box={this.state.box}/>
      </div>
    )}
    </div>
  );
}
}

export default App;
