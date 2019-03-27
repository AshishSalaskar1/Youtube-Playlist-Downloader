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
    });
}

let exec = () => {
    let URL = document.getElementById("urlBox").value;
    getVids({url: URL});
};
