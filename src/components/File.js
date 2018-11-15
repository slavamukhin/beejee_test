import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.div`
  
`;

const Image = styled.img`
  display: none;
`;

const Canvas = styled.canvas`
  display: none;
`;

const Label = styled.label`
  opacity: ${props => props.edit ? .5 : 1};
  cursor: ${props => props.edit ? 'not-allowed' : 'pointer'};
`;

const ChooseFile = styled.span`
  cursor: ${props => props.edit ? 'not-allowed' : 'pointer'};
`;

class File extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      nameFile: '',
    }
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const objectURL = window.URL.createObjectURL(file);
    this.setState({
      url: objectURL,
      nameFile: file.name
    })
  };

  componentDidMount() {

    if (this.props.edit) {
      const newFile = this.dataURItoBlob(this.props.url);
      this.setState({file: newFile, nameFile: 'image.jpg'});
      this.props.handleChange('file', newFile, this.props.url);
    }
  }

  handleLoad = () => {
    const c = this.refs.canvas;
    const ctx = c.getContext("2d");
    const img = this.refs.image;

    const imageWidth = img.width;
    const imageHeight = img.height;

    ctx.drawImage(img, 0, 0, 320, imageHeight*(320/imageWidth));
    const newImg = this.refs.canvas.toDataURL();
    const newFile = this.dataURItoBlob(newImg);
    this.setState({file: newFile});
    this.props.handleChange('file', newFile, newImg);
  };

  dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
  // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  };
  
  render() {
    return (
      <Wrapper className="file has-name">
        <Image ref='image' onLoad={this.handleLoad} src={this.state.url}/>
        <Canvas ref='canvas' width={320} height={240}/>
        <Label edit={this.props.edit} className="file-label">
          <input
            accept="image/*"
            onChange={this.handleChange}
            className="file-input"
            type="file"
            name="resume"
            ref='inputFile'
            disabled={this.props.disabled}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"/>
            </span>
            <ChooseFile edit={this.props.edit} className="file-label">
              Choose a file…
            </ChooseFile>
          </span>
          <span className="file-name has-text-grey-darker">
            {this.state.nameFile}
          </span>
        </Label>
      </Wrapper>
    );
  }
}

File.propTypes = {
  handleChange: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  url: PropTypes.string,
  disabled: PropTypes.bool
};

export default File;