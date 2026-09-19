export function createDivElement(parent: HTMLElement, ...classes: string[]) {
    const el = document.createElement("div");
    el.classList.add(...classes);
    parent.appendChild(el);
    return el;
}