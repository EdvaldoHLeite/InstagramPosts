import ReactDOM from 'react-dom';
const axios = require('axios');
const instagramURL = "https://graph.instagram.com/"

async function UserProfile(){
	var userToken = document.getElementById('input').value;
	
	const response  = await axios.get(instagramURL+"me", {
		params: {
			fields: 'id,username,media_count,account_type,media',
			access_token: userToken,
		},
	});
	
	// id posts
	var data = response.data;
	const mediaIds = data['media']['data'];
	const username = data['username'];
	
	// render profile
	var url = "https://instagram.com/"+username;
	const profile = <a href={url}> @{username} </a>;
	ReactDOM.render(profile, document.getElementById('profile'));
	
	// get media
	const mediaHtml = []; 
	var id;
	for (id in mediaIds){
		var mediaId = mediaIds[id]['id']; 
		//window.alert(mediaId);
		const response  = await axios.get(instagramURL+mediaId, {
			params: {
				fields: 'id,caption,media_url,timestamp,media_type',
				access_token: userToken,
			},
		});
		data = response['data'];
		
		var htmlMedia = null;
		
		if (data['media_type'] === "IMAGE") {
			htmlMedia =
			<div id="media-img">
				<img src={data['media_url']} alt={data['caption']}/>
				<br/>
				<a href={data['media_url']}> {data['caption']} </a>
			</div>;
		} else if (data['media_type'] === "VIDEO") {
			htmlMedia = 
			<div id="media-img">
				<video src={data['media_url']} controls> 
					 Your browser does not support the video tag.
				</video>
				<br/>
				<a href={data['media_url']}> {data['caption']} </a>
			</div>;
		}
		
		mediaHtml.push(htmlMedia);
	}
	
	// render media
	ReactDOM.render(mediaHtml, document.getElementById('media'));
}

export default UserProfile;