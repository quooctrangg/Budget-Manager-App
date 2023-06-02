<template>
    <form class="w-full  flex flex-col gap-3">
        <input type="text"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"
            placeholder="Tiêu đề">
        <input type="number"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"
            placeholder="Số tiền">
        <input type="date"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base text-gray-400">
        <select name="" id=""
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base text-gray-400">
            <option value="">Chọn</option>
            <option value="">Giải trí</option>
            <option value="">Sức khỏe</option>
            <option value="">Ăn uống</option>
            <option value="">Di chuyển</option>
            <option value="">Phiếu lương</option>
            <option value="">Khác</option>
        </select>
        <textarea name="" id="" rows="5" placeholder="Ghi chú"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"></textarea>
        <div class="w-full flex justify-center">
            <button type="submit"
                class="w-auto border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-plus"></i>
                Thêm
            </button>
        </div>
    </form>
</template>