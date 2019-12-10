import { ZoomMtg } from '@zoomus/websdk';
import { generateSignature } from './signature';

const secrets = require('../../../secrets.json').zoom;

(async function () {
    ZoomMtg.setZoomJSLib('@zoomus/websdk/dist/lib', '/av');

    ZoomMtg.preLoadWasm();

    ZoomMtg.prepareJssdk();

    await new Promise((resolve, reject) => {
        ZoomMtg.init({
            debug: true, //optional
            leaveUrl: 'http://localhost:3005', //required
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
            sharingMode: 'fit', //optional,
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

    const meetingNumber = 981833865;

    ZoomMtg.join({
        meetingNumber,
        // userName: 'User name',
        userEmail: 'vesselvatel@163.com',
        passWord: 'Abc123123',
        apiKey: 'fi16onS1RXOdsGeIuDz7Aw',
        signature: generateSignature({
            apiKey: secrets.apiKey,
            apiSecret: secrets.apiSecret,
            meetingNumber,
            role: 1,
        }),
        participantId: 'UUID',
        success: function(res){console.log(res)},
        error: function(res){console.log(res)}
     });
})();
