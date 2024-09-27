
export function debounce(func: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null
  
    return function (this: any, ...args: any[]) {
      if (timer) {
        clearTimeout(timer)
      }
  
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
  
