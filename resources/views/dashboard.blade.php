@use('Laravel\Pennant\Feature')
@use('Illuminate\Support\Facades\Auth')
@use('App\Features\ViteDashboard')

<x-layouts.app :title="__('Dashboard')">
    @if(Feature::for(Auth::id())->active(ViteDashboard::class))
        @vite(['workspaces/front/src/main.tsx'])
        <div class="flex h-full w-full flex-1 flex-col gap-4 rounded-xl" id="dashboard"></div>
        <script>
        setTimeout(() => {
            const initEvent = new Event('dashboard:init');
            document.dispatchEvent(initEvent);
        }, 200);
        </script>
    @else
        @livewireStyles
        <div class="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
            <!--<iframe src="/components/index.html" frameborder="0" width="100%" height="500px"></iframe>-->

            <div class="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                <livewire:notes />
            </div>

            <div class="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                <livewire:tag-form />
            </div>

        </div>
        @livewireScripts
    @endif

</x-layouts.app>
