import React, {Component} from 'react';

export default class LocationMap__TextInput extends React.Component {
    constructor(){
        super();
        this.state = {
            placeholder: 'Enter your location',
            addressInput:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.onkeypress = this.onkeypress.bind(this);
    }

    handleChange(name, e){
        var me = this;
        this.setState({[name]: e.target.value});
        
        setTimeout(function(){
            console.log(me.state.addressInput);
        }, 100);

    }

    onkeypress(event){
        if(event.key == 'Enter'){
            console.log('enter was hit, current value - ' + this.state.addressInput);
            this.props.handleChangeInput(this.state.addressInput);
        }
    }

    render(){
        return(
            <input
                        type="text"
                        placeholder={this.state.placeholder}
                        className="location-map__text-input"
                        onInput={
                            (e) => this.handleChange("addressInput", e)
                        }
                        onClick = {
                            (e) => this.handleChange("addressInput", e)
                        }
                        onKeyPress={
                            this.onkeypress
                        }
            />
        );
    }
}