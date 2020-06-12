import React from 'react';

import './styles/desktop.css';
import './styles/mobile.css';

import copy from 'copy-to-clipboard';
import data from './data/profilesData.json';
import maleIcon from './res/icons/male-icon.png';
import femaleIcon from './res/icons/female-icon.png';
import logo from './res/images/logo.png';
import sourceCodeIcon from './res/icons/code-source-icon.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.sortData(data);
    this.state = {
      inputValue: '',
      profilesDetails: data
    };
    this.handleChange = this.handleChange.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  // called at the first data loading to display data in an ordered way
  sortData(data) {
    data.sort(function(a,b) {
      var nameA = a.fullname.toUpperCase();
      var nameB = b.fullname.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  // called everytime the search input element value is changed
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
        <FooterBox />
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

function PopupMessage() {
  return (
    <div className="popup-message">
      <div className="popup-rectangle">
        <p>Copied!</p>
      </div>
      <div className="arrow-down"></div>
    </div>
    );
}

class ProfileRow extends React.Component {

  icon = (this.props.profile.gender === 'M') ? maleIcon : femaleIcon;
  
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      index: 0,
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.switchMail = this.switchMail.bind(this);
  };

  // copies the email to the user's clipboard & displays a feedback bubble
  copyToClipboard() {
    copy(this.props.profile.emails[this.state.index].email);
    this.setState({
      copied: true,
      index: this.state.index
    });
    this.myInterval = setInterval(() => {
      this.setState({
        copied: false,
        index: this.state.index
      });
    }, 3000);
  };

  switchMail(orientation) {
    let length = this.props.profile.emails.length;
    let index = this.state.index;

    // Might look complexe but this just increases/decreases index value without allowing it
    // become greater than the actual number of emails available nor get bellow 0
    // TODO : Refactor : this can be done more elegantly...probably
    let newIndex = orientation === "down" ? (index - 1) < 0 ? 0 : (index - 1) : (index + 1) >= length ? length - 1 : index + 1;

    if(index !== newIndex) {
      this.setState({ 
        copied: false,
        index: newIndex
      });
    }
  };


  // TODO : This probably needs a proper refactoring
  // TODO : Add visual feedback : either right or left button has to be visibily disabled when index is at one boundary
  render () {
    return (
      <div className="profile-row-box">
        <img alt="avatar icon" className="avatar-icon" src={this.icon}/>
        <div className="vertical-divider"></div>
        <p className="main-profile-details" id="profile-fullname">{this.props.profile.fullname}</p>
        <div className="vertical-divider"></div>
        <p className="secondary-profile-details" id="profile-degree">{this.props.profile.degree}</p>
        <div className="vertical-divider"></div>
        <p className="secondary-profile-details" id="profile-grade">{this.props.profile.grade}</p>
        <div className="vertical-divider"></div>
        {this.state.copied ? <PopupMessage /> : <div></div>}
        <p className="main-profile-details" id="profile-email">{this.props.profile.emails[this.state.index].email}</p>

        { this.props.profile.emails.length>1
        ?
        <div className="switch-button-box">
          <button className="switch-button fa fa-caret-left" onClick={() => this.switchMail("down")}></button>
          <button className="switch-button fa fa-caret-right" onClick={() => this.switchMail("up")}></button>
        </div>
        :
        <div></div>
        }
        <button className="copy-button" onClick={this.copyToClipboard}>Copy email</button>
      </div>
    )
  }
}

function FooterBox() {
  return (
    <div className="footer-box">
      <a href="https://github.com/Noisy96/PROFinder" target="_blank" rel="noopener noreferrer">
        <img src={sourceCodeIcon} alt="Source code link" />
      </a>
    </div>
  );
};

export default App;