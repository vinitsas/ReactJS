import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
		
	state = {
		selectedFile : null
	}
	fileSelect = (event) => {
		this.setState({selectedFile: event.target.files})
		// console.log(event.target.files[0])
	}
	fileUpload = () => {
		
		// console.log(this.state.selectedFile[0]);
		
		var uploaded_images = this.state.selectedFile;
		
		for(var i=0;i<uploaded_images.length;i++){
		
			const fd = new FormData();
			fd.append('image', this.state.selectedFile[i], this.state.selectedFile[i].name);
			axios.post('http://localhost/php-upload/upload.php', fd

			).then(res=>
			{
				console.log(res);
			}
			);
			
		}
		
	}
	
	render() {
		return (
			<div style={{margin:"200px"}}>
				<input type="file" multiple="true" onChange = {this.fileSelect} />
				// <button onClick = {this.fileUpload}>Upload</button>
				
				<hr />
				  <h1>Uploaded Images</h1>	
					
					 {/* Display all selected images. */}        
					{this.state.selectedFile && [...this.state.selectedFile].map((file)=>(
					   <img 
							src={URL.createObjectURL(file)}
							alt={URL.createObjectURL(file)}
							style={{width:"300px",height:"250px",marginLeft:"20px"}} />
					))}
					
			</div>
		);
	}
}

export default App;