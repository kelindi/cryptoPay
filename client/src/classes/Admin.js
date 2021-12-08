import cPayRequest from "../CryptoPayClient";
import MoneyRequest from "./MoneyRequest";
import User from "./User";
import Report from "./Report";

class Admin {
	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
		this.users = []
		this.reports = []
		this.resolvedReports = []
		this.transactions = []
		this.moneyRequests = []
	}

	updateAdminData = async () => {
		let {status, data} = await cPayRequest("/moneyRequests", "GET");
		if (status === 200 && data.length > 0){
			data.forEach(async (request) => {
				const mr = new MoneyRequest(request._id,request.originUser,request.destinationUser,request.destinationWallet,request.amount,request.date);
				console.log(this)
				this.moneyRequests.push(mr)
				await mr.getIncomingFirstLastName();
				await mr.getOutgoingFirstLastName();
			});
			// console.log(this.moneyRequests)
		}

		({status, data} = await cPayRequest('/users','GET'));
		if(status === 200 && data.length > 0){
			data.forEach(async (request) => {
				const user = new User(request.firstName, request.lastName, request.userName, 0, request.walletAddress, null, null);
				this.users.push(user)
			});
		};

		({status, data} = await cPayRequest('/reports','GET'));
		if(status === 200 && data.length > 0){
			data.forEach(async (request) => {
				const report = new Report(request.submitter, request.reportedUser, request.reason, request.date, request.time, request._id);
				this.reports.push(report)
			});
		};
	}
}

export default Admin