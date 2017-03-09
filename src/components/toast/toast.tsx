import * as React from 'react';
//import 'rc-notification/assets/index.css';
import * as Notification from 'rc-notification/lib/index';

let messageInstance;
function getMessageInstance() {
    return messageInstance = messageInstance || Notification.newInstance();
}

interface ToastProps {
    type?: 'warn' | 'success' | 'error';
    content: any;
    style ? : any;
    duration ? : number;
    onClose? : Function;
}
const DEFAULT_VALUE = {
    duration: 2,
    onClose: null
}
let key = 1;

function toast(options:ToastProps) {
    options = Object.assign(DEFAULT_VALUE,options);

    let instance = getMessageInstance();
    instance.notice({
        key,
        duration:options.duration,
        style: options.style,
        content: (
                <div className="weui-toast" style={{minHeight:'initial',width:'10.6em',marginLeft:'-4.8em'}}>
                    {/*<i className={`weui-icon-${options.type}-no-circle weui-icon_toast`}></i>*/}
                    <p className="weui-toast__content" style={{margin: '10px 12px'}}>{options.content}</p>
                </div>
        ),
        onClose:options.onClose
    });

}
export default {
  toast
}
    