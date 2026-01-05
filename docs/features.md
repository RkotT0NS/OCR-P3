# Using features
Using `php artisan tinker` command, you can access a shell which allow interactive feature manipulation. 
Feature are referenced as fully qualified class name to avoid confusion with other symbols.

## Listing feature states
```php artisan tinker
>> \Illuminate\Support\Facades\DB::table('features')->get();
```

## Available features

### ViteDashboard
#### Use feature in blade template
Add following at the top of your blade template
```php
@use('Laravel\Pennant\Feature')
@use('Illuminate\Support\Facades\Auth')
@use('App\Features\ViteDashboard')
```
Since this feature only provide boolean value, you can use it in blade like this:
```php
@if (Feature::active(ViteDashboard::class))
    <div class="alert alert-info">
        You are using Vite Dashboard feature!
    </div>
@else 
    <div class="alert alert-warning">
        You are not using Vite Dashboard feature!
    </div>
@endif
```

#### Activate feature for user 1 
```php artisan tinker shell
> use Laravel\Pennant\Feature;
> use App\Features\ViteDashboard;
> Feature::for(1)->activate(ViteDashboard::class);
= null
```
#### Deactivate feature for user 1 
```php artisan tinker shell
> use Laravel\Pennant\Feature;
> use App\Features\ViteDashboard;
> Feature::for(1)->deactivate(ViteDashboard::class);
= null
```
#### Check if feature is active for user 1 
```php artisan tinker
> Feature::for(1)->active(ViteDashboard::class);
= true
```
