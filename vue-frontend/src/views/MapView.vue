<template>
  <div>
    <div class="map-area">
      <div class="searchbox">
        <div class="d-flex">
          <input type="text"
          v-model="inputData" 
          @keyup.enter="searchPlace"
          class="form-control"
        >
          <button 
            class="btn btn-primary"
            @click="searchPlace"
          >검색</button>
        </div>
        <div class="results">
          <div class="place" 
            v-for="rs in search.results" 
            :key="rs.id"
            @click="showPlace(rs)"
          >
            <div>
              <h4>{{ rs.place_name }}</h4>
              <div class="addr">{{rs.address_name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="map" style="width:70%;height:800px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      inputData: '영화관',
      markers: [],
      search: {
        keyword: null,
        pgn: null,
        results: [],
      },
      lat: 0,
      lng: 0,
      mapOption: {},
    }
  },
  mounted() {
    if (!("geolocation" in navigator)) {
      return
    }

    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude

      if (window.kakao && window.kakao.maps) {
        this.initMap(this.lat, this.lng);
      } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7fbd020bad4babc068a51b10d8cf9b74&libraries=services';
        document.head.appendChild(script);
      }
    })
  },
  methods: {
    initMap(lat, lng) {
      const mapContainer = document.getElementById('map') // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      this.map = new kakao.maps.Map(mapContainer, mapOption);

      // var positions = [
      //   {
      //     latlng: new kakao.maps.LatLng(lat, lng),
      //   },
      // ]
      
      // positions.forEach(function(pos) {
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        // position: pos.latlng,
      })
      marker.setMap(this.map);
      // })

      // this.displayMarker([[lat, lng]])


      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      

    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null))
      }
      const positions = markerPositions.map(position => {
        new kakao.maps.LatLng(...position)
      })

      if (positions.length > 0) {
        this.markers = positions.map(position => {
          new kakao.maps.Marker({
            map: this.map,
            position,
          })
        })

        const bounds = positions.reduce((bounds, latlng) => {
          bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        })

        this.map.setBounds(bounds)
      }
    },
    searchPlace() {
      const keyword = this.inputData
      if (keyword.length === 0) {
        return
      }

      const ps = new kakao.maps.services.Places(this.map)

      ps.keywordSearch(keyword, (data, status, pgn) => {
        this.search.keyword = keyword
        this.search.pgn = pgn
        this.search.results = data
      })
    },
    showPlace(place) {
      this.initMap(place.y, place.x)
    }
  }
}
</script>

<style>
  .map-area {
    display: flex;
    /* justify-content: start; */
    margin-left: 3%;
  }
  .map-area > .searchbox {
    
    height: 800px;
    z-index: 10000;
    /* background-color: #ffffffaa; */
    background-color: #dfdcdc00;
    width: 300px;
    display: flex;
    flex-direction: column;
  }
  .map-area > .searchbox > .results {
    flex: 1 1 auto;
    overflow-y: auto;
  }
  .map-area > .searchbox > .results > .place {
    padding: 8px;
    cursor: pointer;
  }
  .map-area > .searchbox > .results > .place > :hover {
      background-color: rgba(240, 248, 255, 0.657);
    }
  .map-area > .searchbox > .results > .place > h4 {
    margin: 0;
  }
</style>