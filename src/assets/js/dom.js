export function hasClass(el, className) {
  let reg = new RegExp(`(^|\s)${className}(\s|$)`)
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 切换窗口滚动
 * @param yes 默认允许滚动，传false组织滚动
 */
export function allowBodyScroll(yes = true) {
  let bodyEl = document.body;
  if (!yes) {
    bodyEl.style.overflow = 'hidden';
  } else {
    bodyEl.style.overflow = 'unset';
  }
}