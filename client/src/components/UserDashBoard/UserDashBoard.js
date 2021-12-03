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
      userBalance: this.props.currentUser.currentAccountBalance,
      userName: this.props.currentUser.userName,
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      profilePicture: this.props.currentUser.profilePicture,
      friendsList: this.props.currentUser.friends,
      incomingFriendRequests: this.props.currentUser.friendRequests,
      sentFriendRequests: this.props.currentUser.sentFriendRequests,
      incomingMoneyRequests: this.props.currentUser.requests,
      sentMoneyRequests: this.props.currentUser.sentRequests,
      transactions: this.props.backend.transactions,
      provider: null,
      signer: null,
      wallet:null,

    };
  }
  componentDidMount = () => {
    this.setUpWeb3()
    
  };

  setUpWeb3 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = await signer.getAddress()
    let userBalance = await provider.getBalance(wallet)
    userBalance = ethers.utils.formatEther(userBalance)

    this.setState({provider:provider,signer:signer,wallet:wallet,userBalance:userBalance})

  };
  //comment
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
              currentUser={this.props.currentUser}
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
              currentUser={this.props.currentUser}
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
            currentUser={this.props.currentUser}
          ></FriendsList>
        </div>
      </div>
    );
  }
}

export default UserDashBoard;