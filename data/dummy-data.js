import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Camisa Roja',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Una camiseta roja, perfecta para días con clima no rojo..',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Alfombra azul',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Se adapta perfectamente a tu camisa roja. Para estar de pie. No usarlo.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Taza de café',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    '¡También se puede usar para té!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'El libro - Edición limitada',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Cual es el contenido? ¿Por qué importaría eso? ¡Es una edición limitada!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Hardware impresionante, teclado de mierda y un precio elevado. ¡Compre ahora antes de que se lance uno nuevo!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Lápiz y papel',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Puede usarse para juegos de rol (no el tipo de juego de roles en el que estás pensando ...).",
    5.49
  )
];

export default PRODUCTS;
