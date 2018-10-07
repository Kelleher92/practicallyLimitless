import React, { Component } from 'react';
import $ from 'jquery';
import {openSnackbar} from '../components/FlashNotification';

class CompanyLogo extends Component {
    constructor(props) {
        super(props);

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleLaunchFileExplorer = this.handleLaunchFileExplorer.bind(this);
    }

    // launch a file explorer to allow user to select image
    handleLaunchFileExplorer() {
        $('.logo__upload').trigger('click');
    }

    //upload image to Cloudinary
    handleUploadImage = (ev) => {        
        let me = this;
        let newImageToUpload = ev.target.files[0];

        if(newImageToUpload) {
            // set loader while image is being processed.
            me.props.handleUpdateLogo('../public/images/loading.gif');
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
                        setTimeout(function() { 
                            res = JSON.parse(res);
                            if(res.responseCode === 200 && (res.message.secure_url !== null))    {
                                me.props.handleUpdateLogo(res.message.secure_url);
                                me.saveNewLogo();
                            } else {
                                me.props.handleUpdateLogo('');
                                openSnackbar({ message: 'Error uploading image, please try again.' });
                            }
                        }, 1000);
                    },
                    error: function(res) {
                        setTimeout(function() { 
                            me.props.handleUpdateLogo('');
                            openSnackbar({ message: 'Error uploading image, please try again.' });
                        }, 1000);
                    }
                });
            }, false);           
        }
    }

    // Save cloudinary URL for new logo to the database
    saveNewLogo() {
        let me = this;
        
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'updateCompanyLogo',
                data: JSON.stringify({companyId: this.props.companyId, logo: this.props.logo, company: me.props.company})
            },
            url: 'public/process.php',
            success: function(res) {
                setTimeout(function() { 
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        // Success
                        openSnackbar({ message: 'Logo updated successfully.'});
                    }
                    else if(res.responseCode === 400) {
                        // Error
                        openSnackbar({ message: 'Your image was not saved to the database, please try again.' });
                    }
                }, 1000);
            },
            error: function(res) {
                setTimeout(function() { 
                    me.props.showFlashNotification(res.message);
                }, 1000);
            }
        });
    }
    
    render() {
        // if no image yet uploaded, set to a default
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