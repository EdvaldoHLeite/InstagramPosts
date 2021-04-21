import ReactDOM from 'react-dom';

async function UserProfile(){
	const axios = require('axios');
	var userToken = "IGQVJVekZAaN0hhX1BFdmc3MUpoTTVXZA0NZAa3UyVWdYZAEFCczJnZAkRvMHdoNnVIRkxuX1cwNFdpcFRYQjVySU5URnAyRDdsNHRub21uZAEI3eVlqenpfYUVib3FjQk9UVW9rcEliNF9B";
	var userToken = document.getElementById('input').value;
	var instagramURL = "https://graph.instagram.com/"
	
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
	/*
	"data": [
		{
		  "id": "17895695668004550"
		},
		{
		  "id": "17899305451014820"
		},
		{
		  "id": "17896450804038745"
		},
		{
		  "id": "17881042411086627"
		}
	  ]*/
	
	//window.alert(Object.keys(response.data['media']['data'][1]));
	//window.alert(response.data['media']['data'][1]['id']);
	
	var url = "https://instagram.com/"+username;
	const profile = <a href={url}> {username} </a>;
	ReactDOM.render(profile, document.getElementById('profile'));
	
	const mediaHtml = []; 
	var id;
	for (id in mediaIds){
		var mediaId = mediaIds[id]['id']; 
		//window.alert(mediaId);
		const response  = await axios.get(instagramURL+mediaId, {
			params: {
				fields: 'id,caption,media_url,timestamp',
				access_token: userToken,
			},
		});
		var data = response['data'];
		
		//window.alert(Object.keys(response['data']));
		var img = 
		<div class="media-img">
			<div class="container">
				<img src={data['media_url']} alt={data['caption']}>
				</img>
				<span class="caption">
					{data['caption']}
				</span>
			</div>
		</div>;
		
		mediaHtml.push(img);
	}
	
	ReactDOM.render(mediaHtml, document.getElementById('media'));
}

/*function UserProfile() {
	const username = TestUserProfile();
	
	var url = "https://instagram.com/"+username;
	const profile = <a href={url}> {username} </a>;
	ReactDOM.render(profile, document.getElementById('profile'));
}*/

export default UserProfile;