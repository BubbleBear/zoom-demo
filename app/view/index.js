import { ZoomMtg } from '@zoomus/websdk';
import { generateSignature } from './zoom-sig';

const secrets = require('../../secrets.json').zoom;

(async function () {
    ZoomMtg.setZoomJSLib('@zoomus/websdk/dist/lib', '/av');

    ZoomMtg.preLoadWasm();

    ZoomMtg.prepareJssdk();

    await new Promise((resolve, reject) => {
        ZoomMtg.init({
            debug: true, //optional
            leaveUrl: 'http://www.zoom.us', //required
            // webEndpoint: 'PSO web domain', // PSO option
            // rwcEndpoint: 'PSO rwc domain', // PSO option
            // rwcBackup: 'PSO multi rwc domain', // PSO option
            showMeetingHeader: false, //option
            disableInvite: false, //optional
            disableCallOut: false, //optional
            disableRecord: false, //optional
            disableJoinAudio: false, //optional
            audioPanelAlwaysOpen: true, //optional
            showPureSharingContent: false, //optional
            isSupportAV: true, //optional,
            isSupportChat: true, //optional,
            isSupportQA: true, //optional,
            isSupportCC: true, //optional,
            screenShare: true, //optional,
            rwcBackup: '', //optional,
            videoDrag: true, //optional,
            sharingMode: 'both', //optional,
            videoHeader: true, //optional,
            isLockBottom: true, // optional,
            isSupportNonverbal: true, // optional,
            isShowJoiningErrorDialog: true, // optional
            success: (result) => {
                resolve(result);
            },
            error: (error) => {
                reject(error);
            },
        });
    });

    const meetingNumber = 2116254264;

    ZoomMtg.join({
        meetingNumber,
        userName: 'User name',
        userEmail: 'vawang@ebay.com',
        passWord: '123',
        apiKey: 'fi16onS1RXOdsGeIuDz7Aw',
        signature: generateSignature({
            apiKey: secrets.apiKey,
            apiSecret: secrets.apiSecret,
            meetingNumber,
            role: 0,
        }),
        participantId: 'UUID',
        success: function(res){console.log(res)},
        error: function(res){console.log(res)}
     });
})();
