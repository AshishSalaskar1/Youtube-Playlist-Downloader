const fetch = require('node-fetch')
const ytParser = require('js-video-url-parser');
const fs = require('fs');
const horizon = require('horizon-youtube-mp3');
const path = require('path');
// let express = require("express");
// let port = process.env.PORT || 3000;

let url = 'https://www.youtube.com/playlist?list=PL7416bv7eAxw4UgYX_8ifKMp9KRM4IWaN';

let key = 'AIzaSyAm-PDWgEFDy5c-LoMk5ubQSBR1FbzVT-8';

//express Init
// var app = express();
// const publicPath = path.join(__dirname, '/public');
// app.use(express.static(publicPath));

//get the Playlist ID
let temp1 = url.split("=");
const pid = temp1[temp1.length-1];
//Call Youtube 3 api http:/....pid+key
const finalPlayUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+pid+'&key='+key;

let playVidArr;
let lst = [];

//Make url from Video ID using ytParser
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

let getVideos = (finalPlayUrl)=> {
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

        // lst.forEach(element => {
        //   downloadVideo(element.url,element.name);         
        // });

        downloadVideo(lst[0].url,lst[0].name)

        // process.exit()
        
}).catch(err => console.error(err));
}

getVideos(finalPlayUrl);

let downloadVideo = (url,name) => {

  //remove special chards
  let vidName = name.replace(/[^\w\s]/gi, '_')+".mp3";

  var downloadPath = path.join(__dirname);
 
horizon.downloadToLocal(
  'https://www.youtube.com/watch?v=Y4fodpIwal8',
  __dirname+"/mp3",
  vidName,
  null,
  null,
  onConvertVideoComplete,
  onConvertVideoProgress
);
 
function onConvertVideoComplete(err, result) {
  console.log(err, result);
}
 
function onConvertVideoProgress(percent, timemark, targetSize) {
  console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);

}
}

console.log("HIIII");

// app.listen(port,() => {
//   console.log(`Server running on port ${port}`);
// });