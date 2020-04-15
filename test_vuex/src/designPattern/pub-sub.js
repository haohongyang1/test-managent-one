class Event{
    constructor() {
        this.callbacks = {}
    }
    $on(name, fn) {
        if (this.callbacks[name] || this.callbacks[name] === []) {
            this.callbacks[name].push(fn)
        }
    }
    $emit(name, args) {
        let cbs = this.callbacks[name]
        if (cbs) {
            this.call(cbs, args)
        }
    }
    $off(name) {}
}