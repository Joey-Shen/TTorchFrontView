const APP_NAME = "/TTorchServer";
const URL_PREFIX = "http://43.240.96.2" + APP_NAME;
const TRAJ_ID_API = "/API/ID";
const API_MULTI = "/API/MULTI";
const TRAFFIC_NETWORK_FILE = "/data/trafficNetwork.txt";
const CAMERA_FILE = "/data/tags.txt";
const EDGE_FILE = "/data/edge.txt";

// for remember current state
camPairArray = [];


//variables for displaying trajectory over mapV
var curHighlight;
var curCircle;
var allRoads = [];
var curRoads = [];
var labels = [];

var vertexLookup = new Map();

//mapv drawing options
let mapv_option_line_red = {
    fillStyle: 'rgba(255, 0, 0, 0.6)',
    shadowColor: 'rgba(255, 0, 0, 1)',
    shadowBlur: 30,
    globalCompositeOperation: 'lighter',
    methods: {
        click: function (item) {
            // console.log(item);
        }
    },
    size: 5,
    draw: 'simple'
};

let mapv_option_line_single = {
    strokeStyle: 'rgba(245,61,190, 1)',
    shadowColor: 'rgba(245,61,190, 1)',
    shadowBlur: 5,
    lineWidth: 2,
    draw: 'simple'
};

let mapv_option_line_raw = {
    strokeStyle: 'rgb(83, 244, 102, 1)',
    shadowColor: 'rgb(83, 244, 102, 1)',
    shadowBlur: 1,
    lineWidth: 1,
    draw: 'simple'
};

let mapv_option_line_matched = {
    strokeStyle: 'rgb(247, 255, 58, 1)',
    shadowColor: 'rgb(247, 255, 58, 1)',
    shadowBlur: 1,
    lineWidth: 1,
    draw: 'simple'
};



//draw purple
let mapv_option_line_light_purple = {
    strokeStyle: 'rgba(245,61,190,0.3)',
    //coordType: 'bd09mc',
    //globalCompositeOperation: 'lighter',
    shadowColor: 'rgba(53,57,255,0.3)',
    shadowBlur: 3,
    lineWidth: 3.0,
    draw: 'simple'
};

//draw dot animation
let mapv_option_dot_animation = {
    zIndex:3,
    fillStyle: 'rgba(255, 250, 250, 1)',
    //coordType: 'bd09mc',
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
        type:'time',
        stepsRange: {
            start: 0,
            end: 300
        },
        trails: 1,
        duration: 12,  //update every 8 seconds
    },
    draw: 'simple'
};

//draw dot animation
let mapv_option_single_line_dot_animation = {
    zIndex:3,
    fillStyle: 'rgba(255, 250, 250, 1)',
    //coordType: 'bd09mc',
    size: 4,
    animation: {
        type:'time',
        stepsRange: {
            start: 0,
            end: 400
        },
        trails: 1,
        duration: 15,  //update every 8 seconds
    },
    draw: 'simple'
};

let mapv_option_dot_animation_init = {
    zIndex:3,
    fillStyle: 'rgba(255, 250, 250, 1)',
    //coordType: 'bd09mc',
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
        type:'time',
        stepsRange: {
            start: 0,
            end: 400
        },
        trails: 1,
        duration: 13,  //update every 8 seconds
    },
    draw: 'simple'
};

// baidu map drawing options
let pathStyle = {
    strokeColor: "white",
    strokeWeight: 3,             // width of the stroke
    strokeOpacity: 0.8,
    strokeStyle: "white"        // solid or dashed
};

let rectStyle = {
    strokeColor: "white",
    fillColor: "white",
    strokeOpacity: 0.1,
    fillOpacity: 0.6,
    strokeStyle: "solid"
};

let mapStyle = [{
    "featureType": "water",
    "elementType": "all",
    "stylers": {
        "color": "#044161"
    }
}, {
    "featureType": "land",
    "elementType": "all",
    "stylers": {
        "color": "#091934"
    }
}, {
    "featureType": "boundary",
    "elementType": "geometry",
    "stylers": {
        "color": "#064f85"
    }
}, {
    "featureType": "railway",
    "elementType": "all",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "color": "#004981"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#005b96",
        "lightness": 1
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "color": "#004981",
        "lightness": -10

    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#00508b"
    }
},{
    "featureType": "local",
    "elementType": "all",
    "stylers": {
        "color": "#004981",
        "lightness": -20
    }
}, {
    "featureType": "local",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#00508b"
    }
}, {
    "featureType": "green",
    "elementType": "all",
    "stylers": {
        "color": "#056197",
        "visibility": "off"
    }
}, {
    "featureType": "subway",
    "elementType": "all",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "manmade",
    "elementType": "all",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "boundary",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#029fd4"
    }
}, {
    "featureType": "building",
    "elementType": "all",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffff"
    }
}, {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#1e1c1c"
    }
}];
