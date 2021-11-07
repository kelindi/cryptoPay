// import React, { Component } from "react";
 
// class SplitPopUp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             amount: '',
//             moneyReceiver: '',
//             validAmount: true,
//             currentUser: this.props.currentUser,
//             userFriends: this.props.currentUser.friends,
//             filteredFriends: this.props.userFriends,
//             showResults: false,
//         }
//         this.amountValidation = this.amountValidation.bind(this)
//         this.sendMoney = this.sendMoney.bind(this)
//         // this.setMoneyReceiver = this.setMoneyReceiver(this)
//         // this.setFilteredFriends = this.setFilteredFriends(this)
//     }

//     minimizePopUp = () => {
//      this.props.minimizeSplit();
//     };

//     maxmizePopUp = () => {
//         this.props.maximizeSplit();
//     };

//     amountValidation(event){
//         const amount = event.target.value
//         if(!isNaN(+amount)) {
//             this.setState({amount: amount})
//         }
//         else {
//             this.setState({validAmount: false})
//         }
//     }

//     sendMoney(){
//         this.props.updateBalance(this.state.amount)
//         this.props.minimizeSplit()
//     }

//     setMoneyReceiver = (event)=> {
//         // if(event.target.value === ''){
//         //     this.setState({moneyReceiver:event.target.value},this.setState({filteredFriends:[]}))
//         //     return
//         // }
//         this.setState({moneyReceiver: event.target.value}, this.setFilteredFriends)   
//     }

//     setFilteredFriends = () => {
        
//         if(this.state.moneyReceiver === '') {
//             this.setState(({showResults: false}),this.setState({filteredFriends: []}))
            
//         }
//         else{
//             this.setState({filteredFriends: this.state.userFriends.filter(friends => (friends.userName.toString().includes(this.state.moneyReceiver.toString())))}, this.setState({showResults: true}))
//         }
        
//     }

    

//     render() {
//         return (
//             <div className="bg-white rounded md:w-1/3 w-1/2 h-1/1 border shadow-lg absolute z-100 left-1/4 top-1/3 ">
//                 <div className="rounded-t bg-blue-300 text-black">
//                     <div className="relative py-3 px-2 flex">
//                         <span className="font-semibold text-black md:text-base text-sm">Split Money</span> 
//                     </div>
//                 </div>
//                 <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-48">
//                     <div className='h-2/3'>
//                         {/* Searching friends */}
//                         <div className='h-1/3 mt-2'>
//                             Friend:
//                             <input className="ml-5 pl-2" value={this.state.moneyReceiver} onChange={this.setMoneyReceiver} placeholder="Friend"/>
//                             { this.state.showResults ? (
//                             <div>
//                                 <ul className=''>
//                                     {this.state.filteredFriends.map((friend) =>
//                                     {
//                                         return (
//                                             <li>{friend.userName}</li>
//                                         )
//                                     })}
//                                 </ul>

//                             </div>
//                             ) : null}
//                             {/* {this.state.searchOn ? <FriendFinder displayHTML={this.state.displayHTML}/>:null} */}
//                         </div>
    
//                         <div className='h-1/3'>
//                             <form>
//                                 <label>
//                                     Amount:
//                                     <input className="ml-2 pl-2" type="text"  value={this.state.amount} onChange={this.amountValidation} placeholder="Amount"/>
//                                 </label>                
//                             </form>
//                         </div>
//                     </div>
//                     <div className='w-1/1 mt-2 text-right'>
//                         <button className='bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
//                         onClick={this.sendMoney}><b>Split</b></button>
//                         <button className='ml-1 bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded-xl hover:border-blue rounded' 
//                         onClick={this.minimizePopUp}><b>Cancel</b></button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
 
// export default SplitPopUp;