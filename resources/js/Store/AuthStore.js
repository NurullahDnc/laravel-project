import {observable, action, makeAutoObservable} from 'mobx';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import jwt_encode from 'jwt-encode';

//! kulanıcı localstore ye kaydetme, kaldırma 
class AuthStore{

    appState = null;

    constructor(){
        makeAutoObservable(this,{
            appState:observable,
            saveToken:action,
            getToken:action
        });
    }
    //veriyi localstore ye kaydetme
    saveToken= (appState)=>{
        try{
            //kulanıcı bilgilerini kriptoluyacaz yapıcaz localstore de gozukmemesi icin
            localStorage.setItem('appState',CryptoJS.AES.encrypt(jwt_encode(appState,"secret"),"udemy-laravel-js").toString());
            this.getToken();
        }
        catch(e){
            console.log(e);
        }
    }
    
    //localstore den gelen veriyi dısarı aktarma
    getToken =()=>{
        //local'dan veriyi al appStatedata at, apstatedata veri varsa appstate icerisien at, veri yoksa null yap
        try{
            const appStateData = localStorage.getItem('appState');
            if(appStateData){
                // bilgileri parse edicez geri, appState gondericez 
                var bytes = CryptoJS.AES.decrypt(appStateData, 'udemy-laravel-js');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(originalText);
            }else{
                this.appState = null;
            }
        }
        catch(e){
            console.log(e);
        }
    }

    //localstore de ki kulanıcı bilgisiini kaldrııyor.
    removeToken =()=>{
        localStorage.removeItem("appState");
        
        this.appState = null;
    }
    

}


export default new AuthStore();