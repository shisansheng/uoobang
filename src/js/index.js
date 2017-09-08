$(function(){
	new WOW().init();

	
    //地图；
    var map = new BMap.Map("map"); 
    var point = new BMap.Point(116.448818,39.89893)
    map.centerAndZoom(point, 17);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    var opts = {
      width : 200,     
      height: 100,  
      title : "爱力科技" , // 信息窗口标题
      enableMessage:true
    }
    var infoWindow = new BMap.InfoWindow("地址：北京市东城区广渠门南小街1号领航国际一号楼一单元2008", opts);  // 创建信息窗口对象 
    map.openInfoWindow(infoWindow,point); //开启信息窗口
    marker.addEventListener("click", function(){          
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
    map.addControl(new BMap.MapTypeControl());   
    map.setCurrentCity("北京");  
    // map.enableScrollWheelZoom();
    var navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true
    });
    map.addControl(navigationControl);
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError",function(e){
        console(e.message);
    });

});