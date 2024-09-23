<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\ProductService;

class ImportProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $productService;
    protected $productId;

    /**
     * Create a new job instance.
     */
    public function __construct(ProductService $productService, $productId = null)
    {
        $this->productService = $productService;
        $this->productId = $productId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->productId) {            
            $this->productService->importProductById($this->productId);
        } else {            
            $this->productService->importProducts();
        }
    }
}
