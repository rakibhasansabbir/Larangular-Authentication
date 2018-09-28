<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        if (!$this->validateEmail($request->email)) {
            return $this->faildResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email){
        $oldToken = DB::table('password_resets')->where('email', $email)->first()->token;

        if ($oldToken) {
            return $oldToken;
        }
        $token = str_random(60);
        $this->saveToken($token,$email);
        return $token;
    }

    public function saveToken($token, $email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email){
        return !!User::where('email', $email)->first();
    }

    public function faildResponse(){
        return response()->json([
            'error' => 'Email does\'t found on our system'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse(){
         return response()->json([
            'data' => 'Reset email is send successfully, please check your inbox.'
        ], Response::HTTP_OK);
    }

    public function resetPassword(Request $request){

    }
}
