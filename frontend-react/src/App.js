import axios from 'axios';
import './App.css';

import React,{Component} from 'react';

class App extends Component {

    state = {

      // Initially, no file is selected
      selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

      // Update the state
      this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {
      const url = "http://localhost:5000/upload"
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      console.log(formData);
      axios.post(url, formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

      if (this.state.selectedFile) {

        return (
          <div>
            <h2>File Details:</h2>

<p>File Name: {this.state.selectedFile.name}</p>


<p>File Type: {this.state.selectedFile.type}</p>


<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>

          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };

    render() {

      return (
        <div>
            <h1>
              PyPI FASTEN plugin
            </h1>
            <h3>
              Upload your source code (.zip):
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }

  export default App;
