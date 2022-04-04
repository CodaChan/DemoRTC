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

const peerss = {}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
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
    peerss[userId] = call
}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        console.log('+ Connected, id: ' + userId)
        connectToNewUser(userId, stream)
    })
})



myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})



socket.on('user-disconnected', userId => {
    console.log('- Disconnected, id: ' + userId)
    if(peerss[userId]) peerss[userId].close()
})