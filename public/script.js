const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '5001',
    path: '/',
    secure: true
})

const myVideo = document.createElement('video')
myVideo.muted = true

const peers = {}

function addVideoStream(video, stream) {
    if(stream.active === true){
        video.srcObject = stream
        var promise = video.play();

        if (promise !== undefined) {
            promise.then(_ => {
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                })
                videoGrid.append(video)
            }).catch(error => {
                document.querySelector('button').onclick = () => {
                    addVideoStream(video, stream)
                }
            });
        }
    }
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

let haveStream = false;
let myStream = new MediaStream();
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)
    haveStream = true
    myStream = stream
})

myPeer.on('call', call => {
    call.answer(myStream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
})

socket.on('user-connected', userId => {
    connectToNewUser(userId, myStream)
})

socket.on('user-disconnected', userId => {
    console.log(userId)
    if(peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


socket.on('user-connected', userId => {
    console.log('User connected, id: ' + userId)
}) 

