import React from 'react';
import './App.css';
import data from './data/profilesData.json';
import maleicon from './res/icons/male-icon.png';
import femaleicon from './res/icons/female-icon.png';
import logo from './res/images/logo.png';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      profilesDetails: data
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
      profilesDetails: data.filter((profileObj) => {
        return profileObj.fullname.toLowerCase().includes(event.target.value.toLowerCase());
      })
    });
  }

  render() {
    return (
      <div className="App">
        <HeaderBox data={{value: this.state.inputValue, function: this.handleChange}} />
        <ProfilesRowsBoard profiles={this.state.profilesDetails} />
      </div>
    );
  }
}


function HeaderBox(props) {
  return (
    <div className="header-box">
      <img className="logo" src={logo} alt="logo" />
      <SearchBar data={props.data} />
    </div>
  )
}

function SearchBar(props) {
  return (
    <div className="search-bar">
      <input value={props.data.value} onChange={props.data.function} placeholder="Search by name" />
      <div className="search-icon">
        <i className="fa fa-search fa4x"></i>
      </div>
    </div>
  )
}

function ProfilesRowsBoard(props) {
  const profiles = props.profiles;
  const filteredProfiles = profiles.map((profileObj) => {
    return <ProfileRow key={profileObj.fullname.toString()} profile={profileObj} />
  });
  return filteredProfiles;
}

function ProfileRow(props) {
  const icon = (props.profile.gender === 'M') ? maleicon : femaleicon;
  return (
    <div className="profile-row-box">
      <img alt="avatar icon" className="avatar-icon" src={icon}/>
      <div className="vertical-divider"></div>
      <p className="main-profile-details">{props.profile.fullname}</p>
      <div className="vertical-divider"></div>
      <p className="secondary-profile-details">{props.profile.degree}</p>
      <div className="vertical-divider"></div>
      <p className="secondary-profile-details">{props.profile.grade}</p>
      <div className="vertical-divider"></div>
      <p className="main-profile-details">{props.profile.email}</p>
      <button className="copy-button">Copy email</button>
    </div>
  )
}

export default App;