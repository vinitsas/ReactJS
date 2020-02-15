import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';

class App extends Component {
		
	state = {
		selectedFile : null,
		Img : []
	}
	
	fileSelect = (event) => {
		this.setState({selectedFile: event.target.files})
		// console.log(event.target.files[0])
		
		console.log(this.state.items)
		
	}
	
	fileUpload = () => {
		
		// console.log(this.state.selectedFile[0]);
		
		var uploaded_images = this.state.selectedFile;
		
		for(var i=0;i<uploaded_images.length;i++){
		
			const fd = new FormData();
			fd.append('image', this.state.selectedFile[i], this.state.selectedFile[i].name);
			axios.post('http://localhost/php-upload/upload.php', fd)
			.then(res=>
			{
				console.log(res);
			}
			);
			
		}
		
		
		$('form p').text("Uploaded Done");
		
	}
	
	componentDidMount() {
		
		$(document).ready(function(){
		  $('form input').change(function () {
			$('form p').text(this.files.length + " file(s) selected");
		  });
		});
		
		this.fetchUsers();
		
	}
	
	fetchUsers() {
	  // Where we're fetching data from
	  fetch('http://localhost/php-upload/get-images')
		// We get the API response and receive data in JSON format...
		.then(response => response.json())
		// ...then we update the users state
		.then(data =>
		  this.setState({
			Img: data
		  })
		  // alert(data)
		  // alert(data[0].id)
		)
		// Catch any errors we hit and update the app
		.catch(
			// alert('error')
		);
	}
	
	render() {
		const { Img } = this.state;
		return (
			<div>
				<div id="images_uploader_drag_and_drop">
					<form onSubmit = {this.fileUpload}>
						<input type="file" multiple="multiple" onChange = {this.fileSelect} />
						<p>Drag your files here or click in this area.</p>
						<button type="submit">Upload</button>
					</form>
				</div>
				
				<div id="uploaded_images_get">
					<h1>Uploaded Images</h1>
				
				
				{Img.length>0 && Img.map(user => {
					  const { name, image_url } = user;
					  return (
						  <img 
							  src={image_url}
							  alt={name} />
					  );
				})}
				
				</div>
				
			</div>
		);
	}
}

export default App;