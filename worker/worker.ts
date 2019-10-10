const context: Worker = self as any;

context.onmessage = (ev) => {
    let message: string = ev.data;
    context.postMessage(message + '<<');
};