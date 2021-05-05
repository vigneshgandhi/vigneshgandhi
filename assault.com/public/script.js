const socket = io("/"); 
const videoGrid = document.getElementById("video-grid");
console.log(videoGrid);
const myVideo = document.createElement("video");
myVideo.muted = true;
let myvideostream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream=>{
    myvideostream =stream;
    addvideostream(myVideo,stream);
});
socket.emit('join-room',room_id);
socket.on('user-connected',()=>{
    connectTonewuser();
});
const connectTonewuser = () =>{
    console.log("new user");
}
const addvideostream = (video,stream) => {
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    });
    videoGrid.append(video);
}