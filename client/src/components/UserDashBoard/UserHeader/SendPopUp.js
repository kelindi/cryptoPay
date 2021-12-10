import React, { Component } from "react";
import cPayRequest from "../../../CryptoPayClient";
 
class SendPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            moneyReceiver: '',
            validAmount: false,
            currentUser: this.props.currentUser.userName,
            userFriends: this.props.friendsList,
            filteredFriends: this.props.friendsList,
            showResults: false,
            nameFilled: false,
        }
        this.amountValidation = this.amountValidation.bind(this)
        // this.setMoneyReceiver = this.setMoneyReceiver(this)
        // this.setFilteredFriends = this.setFilteredFriends(this)
        console.log(this.state.currentUser)
    }

    minimizePopUp = () => {
     this.props.minimizeSend();
    };

    maxmizePopUp = () => {
        this.props.maximizeSend();
    };

    amountValidation(event){
        const amount = event.target.value
        if(!isNaN(+amount)) {
            this.setState({amount: amount}, this.setState({validAmount: true}))
        }
    }

    sendMoney = async () => {
        if(this.state.validAmount && this.state.nameFilled){
            // Trigger a transaction
            // is currentUser an object or id
            if (this.props.global.userBalance - this.state.amount >= 0) {
                // update the balance  (NEEDS TO BE CONNECTED TO METAMASK in USERHEADER?USERDASHBOARD)
                this.props.updateBalance(this.state.amount)

                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                let h = String(today.getHours())
                let m = String(today.getMinutes()).padStart(2, '0');

                let {status, data} = await cPayRequest('/api/user/'+ this.state.currentUser +'/friends', 'get');
                let rWalletAddress = data.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver.toString())))[0].walletAddress
                // where does ayush need this wallet address? updateBalance?
                let date = yyyy + '-' + mm + '-' + dd;
                let time = h + ':' + m;
                let body = {
                    originUser: this.state.currentUser,
                    destinationUser: this.state.moneyReceiver,
                    amount: this.state.amount,
                    date: date,
                    time: time
                }
                console.log(JSON.stringify(body))
                // Add it to database
                cPayRequest('/transaction', 'post', body)

                // if(status==)
                // backend call to update transactions
            } else {
                alert("Not enough balance!")
            }

            // minimize the pop up
            this.props.minimizeSend()
        }  
    }

    setMoneyReceiver = (event)=> {
        // if(event.target.value === ''){
        //     this.setState({moneyReceiver:event.target.value},this.setState({filteredFriends:[]}))
        //     return
        // }
        this.setState({moneyReceiver: event.target.value}, this.setFilteredFriends)   
    }

    setFilteredFriends = () => {
        
        if(this.state.moneyReceiver === '') {
            this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
        }
        else{
            this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver.toString())))}, this.setState({showResults: true}))
        }
        
    }

    pasteOption = (event) => {
        console.log(event.target.value)
        this.setState(({showResults: false}), this.setState({filteredFriends: []}, this.setState({moneyReceiver: event.target.value},
            this.setState({nameFilled: true}))))
    } 

    

    render() {
        return (
            <div className="bg-transparent w-screen h-screen shadow-lg fixed left-0 z-50">
            <div className="bg-black rounded md:w-1/3 w-1/2 h-1/1 shadow-lg fixed z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-gray-800">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-white md:text-base text-sm">Send Money</span> 
                    </div>
                </div>
                <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
                    <div className='h-2/3'>
                        {/* Searching friends */}
                        <div className='h-1/3 mt-2'>
                            Friend:
                            <input className="ml-8 w-44 pl-2" value={this.state.moneyReceiver} onChange={this.setMoneyReceiver} placeholder="Friend"/>
                            { this.state.showResults ? (
                            <div className='ml-20 w-44 pl-1 opacity-100 bg-white absolute'>
                                <ul className=''>
                                    {this.state.filteredFriends.map((friend) =>
                                    {
                                        return (
                                            <li><button onClick={this.pasteOption} value={friend.userName}>{friend.userName}</button></li>
                                        )
                                    })}
                                </ul>

                            </div>
                            ) : null}
                            {/* {this.state.searchOn ? <FriendFinder displayHTML={this.state.displayHTML}/>:null} */}
                        </div>
    
                        <div className='h-1/3'>
                            <form>
                                <label>
                                    Amount:
                                    <input className="ml-5 w-44 pl-2" type="text"  value={this.state.amount} onChange={this.amountValidation} placeholder="Amount"/>
                                </label>                
                            </form>
                        </div>
                    </div>
                    <div className='w-1/1 mt-2 text-right'>
                        <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.sendMoney}><b>Send</b></button>
                        <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
                        onClick={this.minimizePopUp}><b>Cancel</b></button>
                    </div>
                </div>
            </div>
            <div className="bg-black opacity-80 w-full h-full"></div>
            </div>
        );
    }
}
 
export default SendPopUp;