<template>
  <vue-navigation-bar :options="options" />
  <div class="hello">
    <h1> TEST GITHUB PAGES WITH VUE.JS </h1>
  </div>
</template>

<script>
export default {
  data () {
      return {
          navbarData: {
              elementId: 'main-navbar',
              isUsingVueRouter: true,
              mobileBreakpoint: 992,
              brandImagePath: '/',
              // brandImage: require('../src/assets/images/lockup-color.png'),
              brandImageAltText: 'vue-navigation-bar',
              collapseButtonStyle: 'dark',
              ariaLabelMainNav: 'Main Navigation',
              menuOptionsLeft: [
                  {
                      type: 'link',
                      text: 'Why Dunder Mifflin',
                      path: '/why',
                      subMenuOptions: [
                          {
                              type: 'link',
                              text: 'About',
                              path: '#',
                          },
                          {
                              type: 'hr',
                          },
                          {
                              type: 'link',
                              text: 'Locations',
                              path: '/locations',
                          },
                          {
                              type: 'link',
                              text: 'Blog',
                              path: '/blog',
                          },
                      ]
                  },
                  {
                      type: 'link',
                      text: 'Contact',
                      path: '/contact',
                      subMenuOptions: [
                          {
                              type: 'link',
                              text: 'Customer Service',
                              path: '/customer-service',
                          },
                          {
                              type: 'link',
                              text: 'Accounting',
                              path: '/accounting',
                          },
                          {
                              type: 'link',
                              text: 'Reception',
                              path: '/reception',
                          },
                      ]
                  },
                  {
                      type: 'link',
                      text: 'Pricing',
                      path: '/pricing',
                  },
              ],
              menuOptionsRight: [
                  {
                      type: 'button',
                      text: 'Signup',
                      path: '/signup',
                      class: 'button-red'
                  },
                  {
                      type: 'button',
                      text: 'Login',
                      path: '/login',
                  }
              ]
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.vnb {
    .button-red {
        background: #FF3B30;

        &:hover {
            background: darken(#FF3B30, 10%);
        }
    }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #247a94;
}
</style>
