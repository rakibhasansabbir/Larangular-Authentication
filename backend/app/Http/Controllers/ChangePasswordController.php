<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ChangePasswordRequest;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request){
return $this->getPasswordResetTableRow($request)->get();
    }

    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')->where(['email'=> $request->mail, 'token' => $request->resetToken]);
    }
}
