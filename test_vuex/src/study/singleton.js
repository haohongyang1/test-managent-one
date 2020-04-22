class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}
