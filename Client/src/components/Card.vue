<template>
    <div
        class="rounded-md border-[2px] border-white bg-slate-100 bg-opacity-50 w-full p-1 focus:border-green-500 flex justify-between items-center mb-2">
        <div class="flex w-full gap-2">
            <div class="w-[10%]">
                <img src="/logo.png" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <div class="">
                    <h3>Test</h3>
                </div>
                <div class="flex gap-5 text-base">
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-regular fa-money-bill-1"></i>
                        <span>10.000.000đ</span>
                    </h4>
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>06/02/2023</span>
                    </h4>
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-solid fa-message"></i>
                        <span>Ăn hải sản,...</span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="p-5">
            <i class="fa-solid fa-pen-to-square cursor-pointer text-orange-600 hover:text-orange-400"></i>
            <i class="fa-solid fa-trash cursor-pointer text-red-600 hover:text-red-400"></i>
        </div>
    </div>
</template>