import React, { Component } from "react";
import AcceptMoneyReq from "./AcceptMoneyReq";
import cPayRequest from "../../../../CryptoPayClient";
import { async } from "q";

class IncomingMoneyRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // balance: this.props.request.destinationUser.currentAccountBalance,
      // incomingRequests: this.props.request.destinationUser.requests
      incomingRequests: this.props.user.requests,
      balance: this.props.global.userBalance,
      user: this.props.user,
    };
  }

  sendPopOn = () => {
    this.setState({
      sendOpen: true,
    });
  };

  sendPopOff = () => {
    this.setState({
      sendOpen: false,
    });
  };

  handleAccept = async (amount, request) => {
    await this.props.sendMoney(request.destinationWallet, parseFloat(amount));
    await request.deleteRequest();
    this.props.updateUser();
  };

  handleReject = async (request) => {
    await request.deleteRequest();
    this.props.updateUser();
  };
  // changeBalance(amount) {
  //     this.setState({balance: this.state.balance-amount})
  // }

  /*
        On accept, 
            set state for curr accepted req
            Set state for showing pop up
            set state for show popup to off
        On cancel,
            set state for show popup to off
    */

  render() {
    const {
      request,
      user,
      global,
      balance,
      changeIncomingMoneyRequests,
      changeUserBalance,
    } = this.props;

    return (
      <div className="h-14 flex items-center px-4 py-3 bg-gray-800 rounded-xl my-2">
        <img
          className="h-10"
          src={
            "https://avatars.dicebear.com/api/bottts/" +
            request.originUser +
            ".png"
          }
        ></img>
        <p className="text-custom-100 text-sm mx-2 w-28">
          <span className="font-bold block">
            <strong className="uppercase">{request.originUser} </strong>
          </span>
          <div>
          <div className="font-light text-xs">
              <b className=''>Sent:</b> {request.date.slice(0, 10)}{" "}
          </div>
          </div>
        </p>
        <div className="px-1 float-left font-light text-lg flex flex-row text-center w-16 h-full items-center">
            <img class="h-full w-5 mx-2 inline" alt="ETH" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="24"></img>
              {request.amount}
            </div>
        <div className="ml-auto text-xs">
          <button
            className="bg-warm-gray-400 hover:bg-warm-gray-500 text-gray-800 hover:text-custom-100 font-light py-1 px-5 rounded-full mr-2"
            onClick={this.sendPopOn}
          >
            Accept
          </button>
          <button
            className="ml-1 bg-black hover:bg-gray-700 text-gray-300 font-light py-1 px-5 rounded-full"
            onClick={() => this.handleReject(request)}
          >
            Reject
          </button>
        </div>
        {this.state.sendOpen ? (
          <AcceptMoneyReq
            className="rounded-xl"
            request={request}
            user={user}
            acceptRequest={this.handleAccept}
            minimizeSend={this.sendPopOff}
          />
        ) : null}
      </div>
    );
  }
}

export default IncomingMoneyRequest;
