<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ProductService;
use App\Repositories\ProductRepository;
use App\Jobs\ImportProductsJob;

class ImportProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:import {--id= : The ID of the product to import}';   

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import products from external API';

    protected $productService;

    public function __construct(ProductService $productService)
    {
        parent::__construct();
        $this->productService = $productService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $productId = $this->option('id');

        if ($productId) {            
            ImportProductsJob::dispatch(new ProductService(new ProductRepository()), $productId);
            $this->info("Import process for product ID $productId started successfully!");
        } else {            
            ImportProductsJob::dispatch(new ProductService(new ProductRepository()));
            $this->info('Import process for all products started successfully!');
        }
    }
}
