import React, { Component } from 'react';
import $ from 'jquery';
import {openSnackbar} from '../components/FlashNotification';

class CompanyLogo extends Component {
    
    constructor(props) {
        super(props);

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleLaunchFileExplorer = this.handleLaunchFileExplorer.bind(this);
    }

    handleLaunchFileExplorer() {
        $('.logo__upload').trigger('click');
    }

    handleUploadImage = (ev) => {
        
        let me = this;
        const formData = new FormData()
        let newImageToUpload = ev.target.files[0];

        if(newImageToUpload) {
            // set loader while image is being processed.
            this.props.handleUpdateLogo('../public/images/loading.gif');
            var reader  = new FileReader();
            reader.readAsDataURL(ev.target.files[0]);
            
            reader.addEventListener("load", function () {
                $.ajax({
                    method: 'POST',
                    data: {
                        token: me.props.token,
                        action: 'uploadCompanyLogo',
                        data: JSON.stringify({
                            'image': reader.result,
                            'imageName': newImageToUpload.name,
                            'companyId': me.props.companyId
                        })
                    },
                    url: 'public/process.php',
                    success: function(res) {
                        console.log(res);
                        setTimeout(function() { 
                            res = JSON.parse(res);
                            if(res.responseCode === 200 && (res.message.secure_url !== null))    {
                                //me.setState({imageUrl: res.message.secure_url});
                                me.props.handleUpdateLogo(res.message.secure_url);
                            } else {
                                //me.setState({imageUrl: 'https://avatar-cdn.atlassian.com/95f5e447148da5383b0652e0a50516a5'});
                                me.props.handleUpdateLogo('');
                                openSnackbar({ message: 'Error uploading image, please try again.' });
                            }
                        }, 1000);
                    },
                    error: function(res) {
                        console.log(res);
                        setTimeout(function() { 
                            //me.setState({imageUrl: 'https://avatar-cdn.atlassian.com/95f5e447148da5383b0652e0a50516a5'});
                            me.props.handleUpdateLogo('');
                            openSnackbar({ message: 'Error uploading image, please try again.' });
                        }, 1000);
                    }
                });
            }, false);
            
        }
    }
    
    render() {
        let logo = this.props.logo ? this.props.logo : 'https://avatar-cdn.atlassian.com/95f5e447148da5383b0652e0a50516a5';
        return (
            <div className="logo__wrapper">
                <input className="logo__upload" type="file" accept=".jpg, .png, .jpeg, .gif, .svg" onChange={this.handleUploadImage}/>
                <div className="logo__overlay" onClick={this.handleLaunchFileExplorer}>
                    Update Logo
                </div>
                <img className="logo" src={logo} alt="Company Logo"/>
            </div>
        );
    }
}

export default CompanyLogo;