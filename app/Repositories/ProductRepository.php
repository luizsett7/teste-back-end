<?php
    namespace App\Repositories;

    use App\Models\Product;
    use App\Models\Category;
    
    class ProductRepository
    {
        public function createOrUpdate(array $data)
        {
            $payload = [
                'name' => $data['title'],
                'price' => $data['price'],
                'description' => $data['description'],
                'category_id' => $this->getCategoryId($data['category']),
                'image' => $data['image'],
            ];
    
            Product::updateOrCreate(['name' => $data['title']], $payload);
        }
    
        protected function getCategoryId($categoryName)
        {
            return Category::firstOrCreate(['name' => $categoryName])->id;
        }
    }
    