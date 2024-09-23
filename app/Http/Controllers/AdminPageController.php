<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminPageController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminPage');
    }
}