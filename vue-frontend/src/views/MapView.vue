<template>
  <div>
    <div id="map" style="width:500px;height:400px;"></div>

  

  </div>
</template>


<script>
export default {
  name: 'MapView',
  data() {
    return {
      map: null,
    }
  },
  mounted(){
    // if (!window.kakao || !window.kakao.maps) {

    //   const script = document.createElement('script');

    //   script.src = '//dapi.kako.com/v2/maps/sdk.js?autoload=false&appkey=7fbd020bad4babc068a51b10d8cf9b74';

    //   script.addEventListener("load", () => {
    //     console.log("loaded", window.kakao)
    //   })
    //   document.head.appendChild(script);
    // }
    // else {
    //   console.log('이미 로딩됨:', window.kakao)
    // }
  },
  methods: {
  //   initMap() {
  //     const container = document.getElementById("map")
  //     const options = {
  //       center: new kakao.maps.LatLng(37.2429362, 131.8624647, 16),
  //       level: 5,
  //     }
  //     this.map = new kakao.maps.Map(container, options)
  //   }
  }
}
</script>

<style>

</style>