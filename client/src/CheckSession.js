import { Redirect } from "react-router";
import User from "./classes/User";
import { ethers } from "ethers";
export const checkSession = async (app) => {
    const url = `http://localhost:5000/users/check-session`
    try{
        let res = await fetch(url);
        if (res.status === 200){
          let json = await res.json();
          console.log(json)
          if (json && json.userName) {
              let provider = new ethers.providers.Web3Provider(window.ethereum);
              let signer = provider.getSigner();
              let walletAddress = await signer.getAddress();
              let tempUserBalance = await provider.getBalance(walletAddress);
              let userBalance = ethers.utils.formatEther(tempUserBalance);
              let user = new User (json.firstName, json.lastName, json.userName, userBalance, walletAddress, signer, provider)
              let {status, newUser} = await user.updateData()
              if(status === 200){
                app.setState({ currentUser: newUser})
              }
              
              
          }
        }
      }
      catch(error){
        console.log(error)
      }
    // fetch(url)
    // .then(res => {
    //     if(res.status === 200){
    //         return res.json();
    //     }
    // })
    // .then(json => {
    //     if(json && json.currentUser){
    //         // app.setState({ currentUser: json.currentUser })
    //         let provider = new ethers.providers.Web3Provider(window.ethereum);
    //         let signer = userData.provider.getSigner();
    //         let walletAddress = await userData.signer.getAddress();
    //         let userBalance = await userData.provider.getBalance(userData.wallet);
    //         userData.userBalance = ethers.utils.formatEther(userBalance);
    //         //getWalletInfo
    //         user = new User (json.firstName, json.lastName, json.userName, 0, )
    //         // getWalletInfo -> create new user -> update user data -> App.setState curUser = user

    //         // else{
    //         //     return <Redirect push to="/" />;
    //         // }
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // });



    // try{
    //     let res = await fetch(url);
    //     if (res.status === 200){
    //       let json = await res.json();
    //       if (json && json.currentUser) {
    //         this.setState({ currentUser: json.currentUser })
    //         // return window.location.assign("/userDashBoard")
    //         return <Redirect push to="/userDashBoard" />;
    //       }
    //       else{
    //         return <Redirect push to="/" />;
    //         // return window.location.assign("/")
    //       }
    //     }
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
}