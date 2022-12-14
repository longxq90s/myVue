import { observe } from "./observe/index";

export function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === "function" ? data.call(vm) : data;
  vm._data = data;
  console.log("data", data);
  observe(data); // 对数据进行观测
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
// 实现数据代理 将vm._data.name 代理为 vm.name
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(v) {
      console.log("keys", key);
      return (vm[target][key] = v);
    }
  });
}
