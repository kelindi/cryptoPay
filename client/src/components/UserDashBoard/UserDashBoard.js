import React, { Component } from "react";
import FriendsList from "./FriendsList";
import NotificationBar from "./NotificationBar/NotificationBar";
import UserFeed from "./UserFeed/UserFeed";
import UserHeader from "./UserHeader/UserHeader";
import { ethers } from "ethers";

class UserDashBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // uncomment for testing without build
      
      // userBalance: this.props.testUser.userBalance,
      // userName: this.props.testUser.userName,
      // firstName: this.props.testUser.firstName,
      // lastName: this.props.testUser.lastName,
      // friendsList: this.props.testUser.friendsList,

      // comment for testing without build
      //==========================================================
      userBalance: this.props.userData.userBalance,
      userName: this.props.userData.userName,
      firstName: this.props.userData.firstName,
      lastName: this.props.userData.lastName,
      friendsList: this.props.userData.friends,
      provider: this.props.userData.provider,
      signer: this.props.userData.signer,
      wallet: this.props.userData.wallet,
      //==========================================================
      profilePicture: this.props.testUser.profilePicture,
      incomingFriendRequests: this.props.testUser.friendRequests,
      sentFriendRequests: this.props.testUser.sentFriendRequests,
      incomingMoneyRequests: this.props.testUser.requests,
      sentMoneyRequests: this.props.testUser.sentRequests,
      transactions: this.props.backend.transactions,
    };
  }
  componentDidMount = () => {
    
  };

  setUpWeb3 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = await signer.getAddress();
    let userBalance = await provider.getBalance(wallet);
    userBalance = ethers.utils.formatEther(userBalance);

    this.setState({
      provider: provider,
      signer: signer,
      wallet: wallet,
      userBalance: userBalance,
    });
    this.setUserData();
  };

  setUserData = async () => {
    let firstName = "firstName";
    let lastName = "lastName";
    let userName = this.props.currentUser;
    const { status, data } = await this.props.useApi(
      "post",
      "/user/getUserData",
      userName
    );
    if (status === 200) {
      userName = data.userName;
      firstName = data.firstName;
      lastName = data.lastName;
      
      
    }

    this.setState({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    });
  };

  changeUserBalance = (x) => {
    this.setState({ userBalance: x });
  };

  changeUserName = (x) => {
    this.setState({ userName: x });
  };

  changeFirstName = (x) => {
    this.setState({ FirstName: x });
  };

  changeLastName = (x) => {
    this.setState({ LastName: x });
  };

  changeProfilePicture = (x) => {
    this.setState({ profilePicture: x });
  };

  changeFriendsList = (x) => {
    this.setState({ friendsList: x });
  };

  changeIncomingFriendRequests = (x) => {
    this.setState({ incomingFriendRequests: x });
  };

  changeSentFriendRequests = (x) => {
    this.setState({ sentFriendRequests: x });
  };

  changeIncomingMoneyRequests = (x) => {
    this.setState({ incomingMoneyRequests: x });
  };

  changeSentMoneyRequests = (x) => {
    this.setState({ sentMoneyRequests: x });
  };

  sendMoneyRequest = async (body) => {
    await this.props.useApi("post", "/moneyRequests", body);
    const {status,data} = await this.props.useApi("get", "/moneyRequests/"+this.state.userName);
    if(status === 200){
      this.setState({incomingMoneyRequests: data});
    }
  };
  sendFriendRequest = async (body) => {
    await this.props.useApi("post", "/friendRequests", body);
    const {status,data} = await this.props.useApi("get", "/friendRequests/"+this.state.userName);
    if(status === 200){
      this.setState({incomingFriendRequests: data});
    }
  };



  render() {
    const { currentUser } = this.props;
    return (
      <div className="font-serif">
        <div className="flex flex-column h-100">
          <div className="w-10/12 h-screen flex-shrink-0">
            <NotificationBar
              changeFriendsList={this.changeFriendsList}
              changeIncomingFriendRequests={this.changeIncomingFriendRequests}
              global={this.state}
            ></NotificationBar>
            <UserHeader
              changeSentMoneyRequests={this.changeSentMoneyRequests}
              changeUserBalance={this.changeUserBalance}
              global={this.state}
              backend={this.props.backend}
              currentUser={this.props.testUser}
            ></UserHeader>

            <UserFeed
              changeSentFriendRequests={this.changeSentFriendRequests}
              global={this.state}
              changeOutgoingMoneyRequests={this.changeSentMoneyRequests}
              changeIncomingMoneyRequests={this.changeIncomingMoneyRequests}
              changeUserBalance={this.changeUserBalance}
              changeFriendsList={this.changeFriendsList}
              changeIncomingFriendRequests={this.changeIncomingFriendRequests}
              backend={this.props.backend}
              currentUser={this.props.testUser}
            ></UserFeed>
          </div>

          <FriendsList
            changeUserBalance={this.changeUserBalance}
            global={this.state}
            changeSentMoneyRequests={this.changeSentMoneyRequests}
            className="w-2/12 flex-shrink-0"
            global={this.state}
            changeSentFriendRequests={this.changeSentFriendRequests}
            backend={this.props.backend}
            currentUser={this.props.testUser}
          ></FriendsList>
        </div>
      </div>
    );
  }
}

export default UserDashBoard;
