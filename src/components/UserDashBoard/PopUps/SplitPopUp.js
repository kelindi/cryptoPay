import React, { Component } from "react";
 
class SplitPopUp extends Component {
    handleClick = () => {
     this.props.toggle();
    };

    render() {
        return (
            <div className="bg-white rounded md:w-1/3 w-1/2 border shadow-lg absolute z-100 left-1/4 top-1/3 ">
                <div className="rounded-t bg-teal-500">
                    <div className="relative py-3 px-2 flex">
                        <span className="font-semibold text-black md:text-base text-sm">Split Money</span>
                        <span className="ml-96" onClick={this.handleClick}>X</span> 
                        {/* mkae the x into a button, not span */}
                    </div>
                </div>
                <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-24">
                    <p>Popup Messages</p>
                </div>
            </div>
        );
    }
}
 
export default SplitPopUp;