import * as React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

declare const NativeInterface: any;
declare const webkit: any;


const routerTable = {
    login: '/login',
    phoneLogin: '/phoneLogin',
    bindPhone: '/bindPhone',
    main: '/main',
    set: '/set',
    about: '/about',
    user: '/user',
    feedback: '/feedback',
    outside: '/outside'
};


class App extends React.Component<any, any> {

    render() {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                }}>
                {this.props.children}
            </div>
        )
    }
}

let app = document.getElementById('app');

// window.onerror = function(msg,url,l){
//     let txt ="";
//     txt="There was an error on this page.\n\n"
//     txt+="Error: " + msg + "\n"
//     txt+="URL: " + url + "\n"
//     txt+="Line: " + l + "\n\n"
//     txt+="Click 确定 to continue.\n\n"
//     alert(txt);
// }

render(<Router history={hashHistory}>
    <Route path="/" component={App}>
        <Route path="/outside" component={}/>
    </Route>
</Router>, app);


