import { ZoomMtg } from '@zoomus/websdk';

const secrets = require('../../../secrets.json').jwt;

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

    window.addEventListener('beforeunload', () => {
        fetch('/api/foo/beforeUnload');
    });

    const userSelector = document.querySelector('#user-select');
    const hold = document.querySelector('#hold_meeting');
    const join = document.querySelector('#join_meeting');
    const meetingNumber = document.querySelector('#meeting_number');
    const holdDisplayName = document.querySelector('.hold .display_name');
    const joinDisplayName = document.querySelector('.join .display_name');
    const userId = document.querySelector('#user-select');
    const password = document.querySelector('#password');

    const users = (await listUsers()).users;

    users.forEach((user) => {
        const option = document.createElement('option');
        option.textContent = `${user.first_name} ${user.last_name}`;
        option.value = user.id;

        userSelector.appendChild(option);
    });

    hold.addEventListener('click', async (e) => {
        e.preventDefault();

        const meeting = await createMeeting(userId.value);

        meetingNumber.value = meeting.id;
        password.value = meeting.encrypted_password;

        await joinMeeting(meeting.id, meeting.encrypted_password, 1, holdDisplayName.value);
    });

    join.addEventListener('click', async (e) => {
        e.preventDefault();

        await joinMeeting(meetingNumber.value, password.value, 0, joinDisplayName.value);
    });
})();

async function listUsers() {
    const res = await fetch('/api/user/list');
    const b = await res.json();

    return b;
}

async function createMeeting(userId) {
    const res = await fetch(`/api/meeting/create?userId=${userId}`);
    const b = await res.json();

    return b.meeting;
}

async function joinMeeting(meetingNumber, password, role, username) {
    return new Promise((resolve, reject) => {
        ZoomMtg.join({
            meetingNumber,
            userName: username || 'User name',
            // userEmail: '',
            passWord: password, 
            apiKey: secrets.apiKey,
            signature: ZoomMtg.generateSignature({
                apiKey: secrets.apiKey,
                apiSecret: secrets.apiSecret,
                meetingNumber,
                role,
            }),
            participantId: 'UUID',
            success: function (res) {
                resolve(res);
            },
            error: function (res) {
                reject(res);
            },
        });
    });
}
