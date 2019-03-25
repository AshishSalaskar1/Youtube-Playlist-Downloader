const fetch = require('node-fetch')
const ytParser = require('js-video-url-parser');

let url = 'https://www.youtube.com/playlist?list=PL7416bv7eAxw4UgYX_8ifKMp9KRM4IWaN';

let key = 'AIzaSyAm-PDWgEFDy5c-LoMk5ubQSBR1FbzVT-8';

//get the Playlist ID
let temp1 = url.split("=");
const pid = temp1[temp1.length-1];
// console.log('pid:', pid)

//async fetch call
let  fetchAsync = async () => { 
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
};

//Call YT 3 api
const finalPlayUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+pid+'&key='+key;

let playVidArr;
let lst = [];

//Make url from Video ID
let urlMaker = (urlN) => {
    let urlNew = ytParser.create({
        videoInfo: {
          provider: 'youtube',
          id: urlN,
          mediaType: 'video'
        }
      });
      return urlNew
};

fetch(finalPlayUrl)
    .then(res => res.json())
    .then((out) => {
        console.log("No of Videos",out.items.length);
        playVidArr = out.items;
        lst = playVidArr.map((ele) => {
            return {name : ele.snippet.title,
                    url : urlMaker(ele.snippet.resourceId.videoId)}
        });


        console.log(lst);
        
}).catch(err => console.error(err));

// console.log(lst);


  
