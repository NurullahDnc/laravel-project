<?php
//* kulanıcı islemleri giris, cıkıs
namespace App\Http\Controllers;

//cagırma, erismek, kutuohanelere
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Carbon;

class AuthController extends Controller 
{   //---------kayıt islemleri ve kontolleri
    public function register(Request $request){
        //kulanıcı kayıt etme, verileri gonderme, kosulara gore
        $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|confirmed'
        ]);
        //kulanıcıyı veritabaınında tabloda olusturduk, save ile kayıt ettik
        $user = new User([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>md5($request->password)
        ]);
        $user = $user->save();

        //giris islemi, oturum acma
        $credentials = ['email' => $request->email, 'password' => $request->password];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Giriş Yapılamadı Bilgileri Kontrol Ediniz'
            ], 401);
        }
    
    
        $user = $request->user();

        //kulancıyı hatırlama ozeligig
        $tokenResult = $user->createToken('Personal Access');
        $token = $tokenResult->token;
        //beni hatırla koslu, 1 hafta, token'i kayıt ediyor
        if($request->remember_me){
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();

        //Http istegine cevap veriyor, kayıt islemi basarılı, verileri gonderme 201 kodu ile
        return response()->json([
            'success'=>true,
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,
            'access_token'=>$tokenResult->accessToken,
            'token_type'=>'Bearer',
            'expires_at'=>Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ],201); 
    }

    //---------giris islemleri
    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
            'remember_me'=>'boolean'
        ]);
        $credentials = request(['email','password']);

        if(!Auth::attempt($credentials)){
            return response()->json([
                'message'=>'Bilgiler Hatalı Kontrol Ediniz'
            ],401);
        }
        //kulanıcıyı veritabanına kaydet
        $user = $request->user();
        //token olustur ve ayarla
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if($request->remember_me){
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        //yanıtı olustur ve geri dondur
        return response()->json([
            'success'=>true,
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,
            'access_token'=>$tokenResult->accessToken,
            'token_type'=>'Bearer',
            'expires_at'=>Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ],201);
    }


    //---------Cıkıs islemleri
    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
            'message'=>'Çıkış Yapıldı'
        ]);
    }

       //---------kulanıcı bilgilerine ulasma islemleri
    public function user(Request $request){
        return response()->json($request->user());
    }

    //kulancı giris basalırılı sekilde yapmıs ise
    public function authenticate(Request $request){
        $user = [];
        if(Auth::check()){
            $user = $request->user();
        }
        return response()->json([
            'user'=>$user,
            'isLoggedIn'=>Auth::check()
        ]);
    }

}



/*30 satır

       // $user = new User([
        //     'name'=>$request->name,
        //     'email'=>$request->email,
        //     'password'=>md5($request->password)
        // ]);
        // $user->save(); // Kullanıcıyı kaydedin
        
        // // Daha sonra bu kullanıcıyı almak için
        // $createdUser = User::where('email', $request->email)->first();
        


*/

