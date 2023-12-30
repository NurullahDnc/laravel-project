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
    //---------kayıt islemleri ve kontolleri  
    }



 
    //---------giris islemleri
    public function login(Request $request){
    $request->validate([
        'name'=>'required|string',
        'email'=>'required|string|email|unique:users',
        'password'=>'required|string|confirmed'
    ]);

    // Kullanıcıyı veritabanına kaydet
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => md5($request->password) // Şifreyi güvenli bir şekilde hashle
    ]);

    // Oturum açmaya çalış
    $credentials = ['email' => $request->email, 'password' => $request->password];

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Giriş Yapılamadı Bilgileri Kontrol Ediniz'
        ], 401);
    }

    // Oturum açılmış kullanıcıyı al
    $user = $request->user();

    // Token oluştur ve ayarla
    $tokenResult = $user->createToken('Personal Access');
    $token = $tokenResult->token;

    if ($request->remember_me) {
        $token->expires_at = Carbon::now()->addWeeks(1);
    }

    $token->save();

    // Yanıtı oluştur ve geri döndür
    return response()->json([
        'success' => true,
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'access_token' => $tokenResult->accessToken,
        'token_type' => 'Bearer',
        'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
    ], 201);
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

