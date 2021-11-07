import React, { Component } from 'react';

class IncomingMoneyRequest extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {request} = this.props

        return(
            <div className="relative rounded-2xl w-full h-20 bg-gray-100 mt-2">
                <div className="absolute float-left rounded-full h-20 w-20">
                    <img className="float-left absolute rounded-full h-20 w-20 flex px-3 py-3 items-center
                    justify-center" src={request.originUser.profilePicture}></img>
                </div>
                <div className="relative float-right top-2 w-10/12">
                    <div className="float-left tracking-wide text-center"><b>{request.originUser.firstName}</b> {request.originUser.lastName}     <small>({request.originUser.userName})</small></div> <br/>
                    <div className="float-left">
                        <div className="px-1 float-left font-light">Amount:{request.amount} </div>
                        <div className="px-1 font-light float-right"> Sent on {request.date} </div>
                    </div>
                    <div className="float-right">
                        <button className="float-left bg-green-400 opacity-75 w-1/2 py-1 rounded-md">Accept</button>
                        <button className="float-right bg-red-600 opacity-80 rounded-md w-1/2 py-1">Reject</button>
                    </div>
                
                </div>
                
            </div>
        )
    }
}

export default IncomingMoneyRequest