<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Customer;


class UsersController extends Controller
{
    public function all()
    {
        $users = User::all();
        return response()->json([
            "users" => $users
        ], 200);
    }

    public function get($id)
    {
        $user = User::whereId($id)->first();

        return response()->json([
            "user" => $user
        ], 200);
    }

    public function new(Request $request)
    {
        $user = User::create($request->only(["name", "email", "password"]));
        $user->password = bcrypt($user->password);
        $user->save();
        return response()->json([
            "user" => $user
        ], 200);
    }

    public function delete($id){
        User::destroy($id);
        return response()->json([
            "id" => $id
        ], 200);
    }

    public function edit(Request $request){

      $user = User::whereId($request->get('id'))->first();
      $user->name= $request->get('name');
      $user->email= $request->get('email');
      $user->password = bcrypt($request->get('password'));
      $user->save();
      return response()->json([
          "user" => $user
      ], 200);
    }
}
