console.log("HEREEEEE");


let getVids = (url) => {
    fetch('http://localhost:3000/url', {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(url)
  }).then((res) => res.json())
    .then((data) => {
        console.log(data);
        //change HTML
        data.forEach(element => {
            setHtmlVids(element.name,element.image,element.url);
        });
    });
}

let saveVidCall = (url) => {

    fetch('http://localhost:3000/save', {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(url)
  })
}

let exec = () => {
    let URL = document.getElementById("urlBox").value;
    getVids({url: URL});
};

let saveVid = (URL,NAME) => {
    // console.log(url);
    saveVidCall({
        url: URL,
        name: NAME
    });
};

let setHtmlVids = (name,imageUrl,url) => {
    // console.log(url);
//   let Title = name.replace(/\s/g,'').replace(/[^\w\s]/gi, '_');
    let Title = (name.split(" ").join("_")).replace(/[^\w\s]/gi, '_');
  console.log(Title);
  let newItem = document.createElement('div');
  let content = `<div class="song-item container ">
  <div class="row p-3 align-items-center">
      <div class="col-2">
          <img src=${imageUrl} alt="" >
      </div>
      <div class="col-8 song-name">
          <p>${name}</p>
      </div>
      <div class="col-2">
          <button class="btn-success" onclick=saveVid("${url}","${Title}")>Save</button>
      </div>
  </div>
</div>`
        newItem.innerHTML = content;                   // Insert text
        document.getElementById("song-display").appendChild(newItem);
}
