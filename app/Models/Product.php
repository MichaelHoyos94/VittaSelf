<?php 

namespace App\Models;

use App\Enums\Category;
use App\Enums\Presentation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'cover',
        'price',
        'points',
        'slug',
        'stock',
        'presentation',
        'category',
    ];


    protected function casts()
    {
        return [
            'category' => Category::class,
            'presentation' => Presentation::class,
        ];
    }
    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }
}