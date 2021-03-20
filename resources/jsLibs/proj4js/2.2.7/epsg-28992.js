//https://spatialreference.org/ref/epsg/amersfoort-rd-new/proj4/
//http://epsg.io/28992

/*
Unit: metre

Geodetic CRS: Amersfoort

Datum: Amersfoort

Ellipsoid: Bessel 1841

Prime meridian: Greenwich
Data source: OGP

Revision date: 2005-05-27

Scope: Large and medium scale topographic mapping and engineering survey.

Remarks: Replaces 28991 (Amersfoort / RD Old).

Area of use: Netherlands - onshore, including Waddenzee, Dutch Wadden Islands and 12-mile offshore coastal zone.

Coordinate system: Cartesian 2D CS. Axes: easting, northing (X,Y). Orientations: east, north. UoM: m.

Center coordinates
142892.19 470783.87

Projected bounds:
646.36 308975.28
276050.82 636456.31

WGS84 bounds:
3.2 50.75
7.22 53.7

 */

(function(){
    let registerEpsg28992 = function(){
            if(typeof proj4 === 'undefined'){
                console.log('EPSG 28992 registration waiting for proj4...');
                setTimeout(registerEpsg28992, 1000);
                return;
            }
            proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");
            registerInOl();
        },
        registerInOl = function(){
            if(typeof ol === 'undefined' || typeof ol.proj === 'undefined'|| typeof ol.proj.proj4 === 'undefined'){
                console.log('EPSG 28992 registration waiting ol...');
                setTimeout(registerInOl, 1000);
                return;
            }
            ol.proj.proj4.register(proj4);
        };

    registerEpsg28992();
}());