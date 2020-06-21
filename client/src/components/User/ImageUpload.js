import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, 
    FormControl,
    FormHelperText,
} from '@material-ui/core';

import { clearErrors } from '../../store/actions/errorActions'
import { uploadImage } from '../../store/actions/userActions'

class ImageUpload extends Component {
    state = {
        imageError: false,
        imageErrorText: '',
    }
        
    static propTypes = {
        imageError: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    getFile = (e) => {
        const file = e.target.file;

        if(!file.type.match('image.*')) {
            this.setState({imageErrorText: 'Image type can not be processed', imageError: true})
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            this.setState({imageError: false, imageErrorText: ''})
            this.props.uploadImage(reader.result);
        }

        reader.onerror = () => {
            this.setState({imageError: true, imageErrorText: 'Image can not be processed'})
        }
    }


    render() {
        const { imageError, imageErrorText } = this.state;
        return(
            <FormControl>

                <Input
                    id='file'
                    type='file'
                    disableUnderline
                    onChange={this.getFile}
                />

                {imageError && 
                    <FormHelperText>
                        {imageErrorText}
                    </FormHelperText>
                }

            </FormControl>

        )
    }
}

export default connect(
    mapStateToProps,
    { clearErrors, uploadImage }
  )(ImageUpload)