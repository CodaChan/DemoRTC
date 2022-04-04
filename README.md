# DemoRTC
An P2P online video meeting WebRTC Demo that can be deployed on your server.

![Screen Shot 2022-03-05 at 13.33.26](README.png)



## Live Example

Here's an [Example](https://sh.coda.wiki:5002) application that you can join the same room and talk together with your friends!

**Requirement**

A computer with Chrome, good internet and, of course, some friends...

**Useage**

Just enter the example application directly, and you will get a random `roomId` , then your `URL` is looks like:

```html
https://sh.coda.wiki:5002/<yourRandomRoomId>
```

Or you can choose your favorite `roomId` , and attach it behind default `URL` :

```html
https://sh.coda.wiki:5002/<yourFavoriteRoomId>
```

**Invite**

If you want to invite your friend to your room, just copy your `URL` and send it to your friend.

Remember to tell them opening this on Chrome and allowing Camera & Microphone access.



## Deployment

**Requirement**

Fist of all, make sure that latest NodeJS was already installed on your linux server(tested on Ubuntu Server 20.04), then download this project, and use `cd` command make you stay on the project folder, and do following operating.

This project will use Port 5002(RTC Server) and Port 5001(PeerJS Server), make sure they are open on your server, or you can change the code, make it use the port which you want.

And you should have a Domain and SSL certificate for it.

```
ejs == 3.1.6
express == 4.17.3
peer == 0.6.1
socket.io == 4.4.1
uuid == 8.3.2
```



**Step by Step**

1. Install project dependencies on your project.

   ```
   npm i ejs express socket.io uuid
   ```

2. Install PeerJS Server on your server.

   ```
   npm i -g peer
   ```

3. Get your SSL certificate, and put them into the `ssl` folder on this project. Then edit both of server.js and peer.js, change the path of `key` and `cert` to the path of your SSL certificate. [Why do you need an SSL certificate?](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

4. Run PeerJS Server.

   ```
   node peerServer.js &
   ```

   Or run this on `screen` (after run command behind, press `Ctrl+A` , then press `D` to go back):

   ```
   screen -S peerServer node peerServer.js
   ```

5. Run RTC Server

   ```
   node server.js &
   ```

   Or run this on `screen` :

   ```
   screen -S rtcServer node server.js
   ```

6. If the DNS resolution of your Domain is your server IP, just visit `https://<yourDomain>:<yourPort(default is 5002)>/` to enjoy the DemoRTC!


## Update

### v0.0.1

- Support devices without Camera.
- Add 'play' button for devices without Camera, because of [policies](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/autoplay).

## TODO List

- Optimized code structure
- Deployment Docker Containerized


## Thanks

[How To Create A Video Chat App With WebRTC (Youtube)](https://www.youtube.com/watch?v=DvlyzDZDEq4)

[WebRTC For The Curious (E-Book)](https://webrtcforthecurious.com)

[@reekystive (Suggestions)](https://github.com/reekystive)

