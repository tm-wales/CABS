export const onWaypointNav = {
    data: () => ({
        intersectionOptions: {
          root: null,
          rootMargin: '0px 0px 0px 0px',
          thresholds: [0]
        } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      }),
      methods: {
        onWaypointNav ({ going, direction }) {
          var element = document.getElementById('nav')
          // going: in, out
          // direction: top, right, bottom, left

          if (typeof direction === 'undefined') {
              console.log('triggered')
            element.classList.add('fixed')
          }

          if (direction === this.$waypointMap.DIRECTION_TOP) {
            element.classList.add('fixed')
          }

          if (direction === this.$waypointMap.DIRECTION_BOTTOM) {
            element.classList.remove('fixed')
          }
        }
      }
}
