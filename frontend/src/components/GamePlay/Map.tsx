import "./Map.css"
import map_mk2 from "../../assets/image/Map.png"
import ImageMapper from 'react-img-mapper';
import map_pin from "../../assets/image/Map-Pin.png"
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { setMapState, setWindowSize } from "../../features/Game/GameSlice";
import { useEffect } from "react";

type areaType = {
  name : string,
  shape : string,
  coords : number[],
  scaledCoords : number[],
  center : number[]
}

export default function Map({client, gameId} : {client : any, gameId : any}) {
    useEffect(() => {dispatch(setWindowSize(window.innerWidth))}, [window.innerWidth])
    const dispatch = useAppDispatch()
    const mapId = useAppSelector((state: RootState) => state.game.mapStatus)
    const windowSize = useAppSelector((state:RootState) => state.game.windowSize)
    const isGm = useAppSelector((state: RootState) => state.room.isGm)
    const width = windowSize >=2560 ? 814.08 : 1920 <=windowSize  ? 610 : 1024 <= windowSize ? 325.632 : 244.224
    const swamp = [651,1789,642,1828,594,1820,607,1781,620,1746,622,1705,601,1673,607,1638,685,1636,707,1679,713,1716,732,1746,756,1742,778,1723,771,1688,797,1701,847,1699,881,1707,918,1712,933,1695,967,1712,1013,1720,1028,1738,1069,1738,1090,1738,1107,1751,1129,1772,1168,1798,1185,1813,1192,1835,1211,1854,1226,1876,1224,1914,1189,1940,1157,1949,1148,1964,1151,1994,1170,2009,1170,2057,1172,2098,1185,2130,1202,2160,1189,2201,1144,2238,1135,2281,1127,2326,1103,2361,1127,2380,1120,2417,1095,2427,1060,2451,1013,2462,978,2481,959,2522,948,2570,970,2578,976,2613,959,2662,929,2669,909,2665,885,2660,875,2688,855,2690,857,2725,853,2742,821,2734,806,2755,825,2783,776,2837,676,2884,627,2811,452,2734,372,2615,260,2421,295,2251,272,2152,263,2027,431,1906]
    const start = [841,2780,856,2793,895,2772,917,2782,951,2761,999,2743,1031,2720,1068,2713,1089,2692,1109,2662,1145,2668,1156,2692,1175,2711,1214,2735,1247,2743,1288,2720,1288,2696,1283,2672,1294,2646,1322,2631,1341,2610,1363,2575,1417,2569,1460,2549,1529,2549,1555,2571,1576,2552,1555,2526,1542,2485,1548,2459,1574,2446,1589,2498,1706,2513,1751,2489,1826,2452,1846,2407,1870,2381,1854,2321,1848,2278,1844,2237,1796,2248,1796,2293,1813,2315,1768,2345,1712,2360,1663,2362,1632,2347,1583,2360,1540,2353,1535,2394,1501,2422,1454,2433,1443,2459,1397,2463,1354,2452,1322,2483,1307,2511,1249,2511,1182,2515,1132,2517,1098,2517,1081,2534,1089,2558,1059,2571,1025,2562,990,2567,956,2562,973,2584,984,2610,981,2638,960,2666,908,2670,887,2664,880,2694,861,2692,856,2735]
    const forest =  [952,2554,973,2506,1001,2465,1042,2459,1085,2448,1107,2433,1133,2407,1122,2368,1118,2336,1133,2304,1150,2248,1167,2220,1204,2187,1204,2151,1184,2097,1171,2026,1161,1985,1165,1961,1197,1935,1230,1905,1223,1851,1197,1821,1184,1795,1212,1795,1234,1786,1266,1761,1275,1743,1309,1713,1353,1676,1374,1642,1425,1635,1456,1683,1510,1687,1557,1687,1572,1713,1615,1739,1646,1761,1689,1754,1715,1765,1732,1797,1749,1819,1788,1838,1784,1881,1809,1875,1840,1868,1850,1886,1844,1920,1844,1948,1866,1967,1883,1987,1872,2019,1876,2056,1866,2097,1844,2127,1842,2161,1831,2196,1827,2228,1771,2254,1775,2286,1792,2308,1753,2334,1693,2351,1637,2338,1591,2343,1540,2336,1529,2373,1503,2407,1430,2418,1436,2442,1387,2440,1339,2433,1326,2457,1300,2476,1262,2485,1231,2502,1175,2506,1089,2506,1057,2532,1059,2545,1016,2554,984,2556]
    const cavern = [1613,1656,1622,1699,1637,1725,1654,1744,1706,1720,1740,1740,1753,1774,1773,1802,1813,1817,1839,1832,1865,1850,1878,1880,1880,1923,1882,1960,1904,1979,1906,2024,1893,2069,1874,2138,1863,2151,1882,2192,1921,2268,2085,2233,2126,2080,2163,1983,2182,1888,2214,1826,2214,1712,2165,1653,2070,1533,1979,1492,1930,1492,1906,1539,1913,1578,1872,1608,1844,1651,1781,1638,1727,1630,1721,1660,1667,1681]
    const mountain =  [79,1675,818,1690,884,1694,930,1679,973,1690,1016,1707,1055,1725,1111,1725,1145,1757,1165,1781,1216,1768,1270,1707,1322,1673,1348,1645,1374,1615,1389,1572,1395,1449,1406,1341,1378,1235,1272,1056,1158,1005,1022,1278,921,1313,876,1300,757,1330,744,1375,701,1436,611,1444,604,1524,742,1677 ]
    const devil = [1373,1179,1490,1028,1697,972,1895,1092,1930,1282,1904,1379,1904,1455,1906,1511,1880,1578,1830,1618,1753,1623,1714,1623,1680,1666,1593,1649,1604,1692,1548,1670,1490,1666,1442,1618,1404,1588,1429,1465,1443,1358 ]
    const MAP = {
      name: "my-map",
      areas: [
        { name: "Swamp", shape: "poly", coords: windowSize >=2560 ? swamp.map(x => 0.333 * x):1920 <=windowSize  ? swamp.map(x => 0.25 * x): 1024 <= windowSize ? swamp.map(x => 0.133 * x) :swamp.map(x => 0.07 * x),id: 'swamp'},
        { name: "Start", shape: "poly", coords: windowSize >=2560 ? start.map(x => 0.333 * x):1920 <=windowSize  ? start.map(x => 0.25 * x): 1024 <= windowSize ? start.map(x => 0.133 * x) :start.map(x => 0.07 * x)},
        { name: "Forest", shape: "poly", coords: windowSize >=2560 ? forest.map(x => 0.333 * x):1920 <=windowSize  ? forest.map(x => 0.25 * x): 1024 <= windowSize ? forest.map(x => 0.133 * x) :forest.map(x => 0.07 * x)},
        { name: "Cavern", shape: "poly", coords: windowSize >=2560 ? cavern.map(x => 0.333 * x):1920 <=windowSize  ? cavern.map(x => 0.25 * x): 1024 <= windowSize ? cavern.map(x => 0.133 * x) :cavern.map(x => 0.07 * x)},
        { name: "Mountain", shape: "poly", coords: windowSize >=2560 ? mountain.map(x => 0.333 * x):1920 <=windowSize  ? mountain.map(x => 0.25 * x): 1024 <= windowSize ? mountain.map(x => 0.133 * x) :mountain.map(x => 0.07 * x)},
        { name: "Devil", shape: "poly", coords: windowSize >=2560 ? devil.map(x => 0.333 * x):1920 <=windowSize  ? devil.map(x => 0.25 * x): 1024 <= windowSize ? devil.map(x => 0.133 * x) :devil.map(x => 0.07 * x), }
      ]
    }
    return (
        <div id="map">
          <span id ="map-name">{mapId === 0 ? "Myrian": mapId === 1? "Swamp Denizens": mapId === 2? "Black Forest": mapId === 3? "Dark Cavern": mapId ===5? "Deep Under the Mountain": "DevilDom"}</span>
          <ImageMapper src={map_mk2} map={MAP} width={width}
          onMouseEnter = {(index) => {console.log(index)}}
          onClick = {
            (area) => {
              if (isGm == true) {
                console.log('gm이다 바꾼다')
                dispatch(setMapState(area))
               //* 서버에 메세지 전송
              //? connect를 하고 callback으로 send을 하면 값이 나가지 않음 
              client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(area), {id : gameId});
              }
              
            }
          } />
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-swamp":1920 <=windowSize  ? "HD-swamp": 1024 <= windowSize ? "SD-swamp" :"mobile-swamp"} className={mapId === 1 ? "on" : "off"}/>
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-start":1920 <=windowSize  ? "HD-start": 1024 <= windowSize ? "SD-start" :"mobile-start"} className={mapId === 0 ? "on" : "off"}/>
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-forest":1920 <=windowSize  ? "HD-forest": 1024 <= windowSize ? "SD-forest" :"mobile-forest"} className={mapId === 2 ? "on" : "off"}/>
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-cavern":1920 <=windowSize  ? "HD-cavern": 1024 <= windowSize ? "SD-cavern" :"mobile-cavern"} className={mapId ===3 ? "on" : "off"}/>
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-mountain":1920 <=windowSize  ? "HD-mountain": 1024 <= windowSize ? "SD-mountain" :"mobile-mountain"} className={mapId === 5 ? "on" : "off"}/>
          <img src={map_pin} alt="" id= {windowSize >=2560 ? "QHD-devil":1920 <=windowSize  ? "HD-devil": 1024 <= windowSize ? "SD-devil" :"mobile-devil"} className={mapId === 4 ? "on" : "off"}/>
      
      
        </div>
        
    )
}
