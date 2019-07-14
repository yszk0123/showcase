export class XSampleWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    const name = this.getAttribute('name');
    mountPoint.innerText = `Hello, ${name}!`;
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(mountPoint);
  }
}
