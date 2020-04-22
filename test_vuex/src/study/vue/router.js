class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    this.url = "";
  }
  init() {
    this.watchUrl();
    this.createRouteMap(this.$options);
    this.initComponents();
  }
  watchUrl() {
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashChange", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.url = window.location.hash.slice(1) || "/";
  }
  createRouteMap(options) {
    options.routes.forEach((item) => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponents() {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: "#" + this.to,
            },
          },
          [this.$slots.default]
        );
      },
    });
    Vue.component("route-view", {
      render: (h) => {
        const comp = this.routeMap(this.url);
        return h(comp);
      },
    });
  }
}
VueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
};
