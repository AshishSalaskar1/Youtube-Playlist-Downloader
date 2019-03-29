console.log("HEREEEEE");

let saveVid = (url) => {
    console.log(url);
};

let setHtmlVids = (name,imageUrl,url) => {
    // console.log(url);
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
          <button class="btn-success" onclick=saveVid("${url}")>Save</button>
      </div>
  </div>
</div>`
        newItem.innerHTML = content;                   // Insert text
        document.getElementById("song-display").appendChild(newItem);
}

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

let exec = () => {
    let URL = document.getElementById("urlBox").value;
    getVids({url: URL});
};
