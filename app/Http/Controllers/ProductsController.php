<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Products;

class ProductsController extends Controller
{
    //
    public function all()
    {
        $products = Products::all();
        return response()->json([
                "products" => $products
            ], 200);
    }

    public function get($id)
    {
        $product = Products::whereId($id)->first();

        return response()->json([
                "product" => $product
            ], 200);
    }

    public function new(Request $request)
    {
        $product = new Products();
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->slug = Str::slug($request->get('name'));
        $product->save();
        return response()->json([
                "product" => $product
            ], 200);
    }

    public function delete($id)
    {
        Products::destroy($id);
        return response()->json([
                "id" => $id
            ], 200);
    }

    public function edit(Request $request)
    {
        $product = Products::whereId($request->get('id'))->first();
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->slug = Str::slug($request->get('name'));
        $product->save();
        return response()->json([
              "product" => $product
          ], 200);
    }

    public function details($slug)
    {
        $product = Products::where('slug', $slug)->first();

        return response()->json([
                        "product" => $product
                    ], 200);
    }
}
