<script setup>
import FormAdd from '../components/FormAdd.vue'
import Card from '../components/Card.vue'
</script>
<template>
    <h1 class="text-2xl font-bold text-indigo-900">Tất Cả Giao Dịch</h1>
    <div class="w-full h-[100%] mt-2">
        <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4">
            <h3 class="text-indigo-900">Tổng số dư: <span class="text-lime-500 font-bold">100.000.000đ</span></h3>
        </div>
        <div class="w-full h-[100%] flex mt-5 gap-3">
            <div class="w-[40%] h-full">
                <form class="flex flex-col gap-2">
                    <div>
                        <label class="text-base">Thời gian:</label>
                        <select
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="">Tất cả</option>
                            <option value="">1 ngày qua</option>
                            <option value="">7 ngày qua</option>
                            <option value="">30 ngày qua</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-base">Phân loại:</label>
                        <select
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="">Tất cả</option>
                            <option value="">Giải trí</option>
                            <option value="">Sức khỏe</option>
                            <option value="">Ăn uống</option>
                            <option value="">Di chuyển</option>
                            <option value="">Phiếu lương</option>
                            <option value="">Khác</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-base">Sắp xếp:</label>
                        <select
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="">Không</option>
                            <option value="">Theo ngày</option>
                            <option value="">Theo giá trị</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-base">Khác:</label>
                        <select
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="">Không</option>
                            <option value="">Tăng dần</option>
                            <option value="">Giản dần</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center justify-center gap-2 text-gray-700 text-base mt-3">
                            <i class="fa-solid fa-filter"></i>
                            Lọc
                        </button>
                    </div>
                </form>
            </div>
            <div class="w-[60%] h-[70%] overflow-auto">
                <Card v-for="t in 10" :key="t" />
            </div>
        </div>
    </div>
</template>