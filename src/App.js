import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceLocation from './components/FaceLocation/FaceLocation';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';

const app = new Clarifai.App({
  apiKey: '627ff3c665a1430db9bd4606f9298deb'
}); //sample

const particlesOptions = {
    particles: {
        number: {
          value: 160,
          density: {
            enable: false
          }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          speed: 4,
          size_min: 0.3
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        random: true,
        speed: 3,
      }
    },
    interactivity: {
        events: {
          onhover: {
            enable: true,
          }
        }
    }
}

const initialState = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
}

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
}

displayfaceBox = (box) => {
  this.setState({box: box})
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

/* Picture Submit */
onButtonSubmit = () => {
  this.setState({imageURL: this.state.input});
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          if (response) {
            fetch('https://localhost:3000/image', {
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
            this.displayfaceBox(this.calculateFaceLocation(response))
          }).catch(err => console.log(err));
}

onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
}

render(){
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} 
        />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries} 
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceLocation box={box} imageURL={imageURL} />
            </div> 
            : (
              route === 'signin' 
              ? <Signin 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} /> 
              : <Register 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
