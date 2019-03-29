const fetch = require('node-fetch')
const ytParser = require('js-video-url-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const horizon = require('horizon-youtube-mp3');
const path = require('path');
let express = require("express");
let port = process.env.PORT || 3000;
const _ = require('lodash');

// let url;
let key = 'AIzaSyAm-PDWgEFDy5c-LoMk5ubQSBR1FbzVT-8';

var app = express();
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

//makes curl from video ID
let urlMaker = (urlN) => {
  let urlNew = ytParser.create({
      videoInfo: {
        provider: 'youtube',
        id: urlN,
        mediaType: 'video'
      }
    });

    return urlNew;
};

//download URL
// let getVideos = (finalPlayUrl) => {
//   let lst = [];
//   let playVidArr
//   fetch(finalPlayUrl)
//     .then(res => res.json())
//     .then((out) => {
//         console.log("No of Videos",out.items.length);
//         playVidArr = out.items;
//         lst = playVidArr.map((ele) => {
//             return {name : ele.snippet.title,
//                     url : urlMaker(ele.snippet.resourceId.videoId)}
//         });

//         console.log(lst);
//         console.log("Returning");
        

//         // lst.forEach(element => {
//         //   downloadVideo(element.url,element.name);         
//         // });

//         // downloadVideo(lst[0].url,lst[0].name)

//         // process.exit()
        
// }).catch(err => console.error(err));

// }

let getVideos1 = async (finalPlayUrl) => {
  let lst = [];
  let playVidArr
  const res = await fetch(finalPlayUrl);
  console.log('finalPlayUrl:', finalPlayUrl)
  const out = await res.json();

          console.log("No of Videos",out.items.length);
          playVidArr = out.items;
          lst = playVidArr.map((ele) => {
              return {name : ele.snippet.title,
                      image : ele.snippet.thumbnails.default.url,
                      url : urlMaker(ele.snippet.resourceId.videoId)}
          });

          console.log(lst);
          console.log("Returning");
          return lst;

};

let playlistToVids = async (URL) => {
    //get the Playlist ID
    //  url = URL;
    let temp1 = URL.split("=");
    const pid = temp1[temp1.length-1];

    //Call Youtube 3 api http:/....pid+key
    const finalPlayUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+pid+'&key='+key;

    console.log(finalPlayUrl);
    let res = await getVideos1(finalPlayUrl);
  
    return res;
};

//PLaylist to all vids API route
app.post('/url',(req,res) => {
  // let VidUrl = res.params.url;
  let VidUrl = _.pick(req.body,['url']).url;
  console.log('VidUrl:', VidUrl)

  playlistToVids(VidUrl)
    .then((data) => res.send(data))
    .catch((e) => console.log(e));

});

//download video
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

app.listen(port,() => {
  console.log(`Server running on port ${port}`);
});