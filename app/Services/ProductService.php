<?php
namespace App\Services;

use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Http;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function importProducts()
    {
        $response = Http::get('https://fakestoreapi.com/products');
        
        if ($response->successful()) {
            $products = $response->json();
            //\Log::info('Fetched Products: ', $products);

            foreach ($products as $product) {
                $this->productRepository->createOrUpdate($product);
            }
        } else {
            // Lidar com o erro de resposta da API
            \Log::error('Failed to fetch products from API');
        }
    }

    public function importProductById($id)
    {    
        $response = Http::get("https://fakestoreapi.com/products/{$id}");
        
        if ($response->successful()) {
            $product = $response->json();
            
            if ($product) {
                $this->productRepository->createOrUpdate($product);
                \Log::info("Product with ID {$id} imported successfully.");
            } else {
                \Log::warning("Product with ID {$id} not found.");
            }
        } else {
            \Log::error("Failed to fetch product with ID {$id} from API");
        }
    }
}
