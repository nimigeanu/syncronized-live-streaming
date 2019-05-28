## Syncronized Live Streaming for HLS and MPEG-DASH

### How it works?

Video player will adjust the playback speed to keep all viewers in sync.  
It also syncronizes with (a derivative of) NTP to compensate for clock offsets between various end-user devices.

### Setup for HLS

1. Configure your live streaming server so that it sends accurate EXT-X-PROGRAM-DATE-TIME headers. For Wowza you can follow this guide https://www.wowza.com/docs/how-to-control-display-of-program-date-and-time-headers-in-apple-hls-chunklists-for-live-streams-ext-x-program-date-time
2. Set up a Node.js server and run the [server/ntp.js](server/ntp.js) on it; ideally this would run on the same machine as the HLS server or have its clock syncronized with it
3. Configure and run your player
	1. change the NTP server url with yours ([player/HLS/ntp.js](player/HLS/ntp.js#L18) line 18)
	2. change the HLS url ([player/HLS/index.html](player/HLS/index.html#L48) line 48)
	3. (optional) adjust the live delay ([player/HLS/index.html](player/HLS/index.html#L29) line 29 - default is 30 seconds); you should define this in conjuction with your HLS settings like playlist size and segment length
	4. (optional) adjust the sync tolerance ([player/HLS/index.html](player/HLS/index.html#L30) line 30 - default 100ms); mind that a value that's too small might get the video to endlessly switch between fast and slow playback and never stabilize
	5. open your player in a browser - [player/HLS/index.html](player/HLS/index.html)

### Setup for MPEG-DASH
1. Set up a Node.js server and run the [server/ntp.js](server/ntp.js) on it; ideally this would run on the same machine as the HLS server or have its clock syncronized with it
2. Configure and run your player
	1. change the NTP server url with yours ([player/MPEG-DASH/ntp.js](player/MPEG-DASH/ntp.js#L18) line 18)
	2. change the MPEG-DASH url ([player/MPEG-DASH/index.html](player/MPEG-DASH/index.html#L32) line 32)
	3. (optional) adjust the live delay ([player/MPEG-DASH/index.html](player/MPEG-DASH/index.html#L24) line 24 - default is 30 seconds); you should define this in conjuction with your MPEG-DASH settings like playlist size and segment length
	4. open your player in a browser - [player/MPEG-DASH/index.html](player/MPEG-DASH/index.html)

## Shortcomings
* Playback will at first be fast or slow and should normally stabilize after it reaches the desired latency from realtime
* This is a proof-of-concept and was never deployed in production
* You should not use this for security-critical applications (i.e. gambling, auction); video is possible to be "sniffed" and watched some seconds ahead of the desired playback time, potentially offering some an unfair advantage

## Notes 
* faster stabilization may be achieved by carefully corroborating the desired delay with the HLS or DASH settings; also by adjusting the speed indexes (see last js function in index.html)
* it is also possible to initially seek to a syncronized point (or close to it) rather than varying the playback speed, however that bit did not make it into this demo as it would act inconsistently across browsers
