<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use App\Services\ProductService;
use App\Repositories\ProductRepository;
use App\Jobs\ImportProductsJob;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with('category')->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|string',
        ]);
        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::with('category')->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);
        $product->update($request->all());
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

    public function productFormImport()
    {
        return Inertia::render('ProductFormImport');
    }

    public function import(Request $request)
    {
        $productId = $request->input('id');

        if ($productId) {
            ImportProductsJob::dispatch(new ProductService(new ProductRepository()), $productId);
            return true;
        } else {
            ImportProductsJob::dispatch(new ProductService(new ProductRepository()));
            return true;
        }

        return false;
    }
}
