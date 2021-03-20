import { CasinoComponent } from '../maps/casino/casino.component';
import { GardenComponent } from '../maps/garden/garden.component';
import { LivingRoomComponent } from '../maps/living-room/living-room.component';
import { MoveRoomService } from '../maps/move-room/move-room.service';
import { TeaRoomComponent } from '../maps/tea-room/tea-room.component';
import { WorkShopComponent } from '../maps/work-shop/work-shop.component';

// Language Settings
export const INIT_LANGS = [
  {label:'English', value: 'en'},
  {label:'日本語', value: 'ja'},
  {label:'Português', value: 'pt'}
]

// Switching Sounds
export const INIT_SOUNDS = [
  {label:'ON', value: 'on'},
  {label:'OFF', value: 'off'}
]

// Transitable Rooms
export const TRANSITABLE_ROOMS = {
  'livingRoom': LivingRoomComponent,
  'workShop': WorkShopComponent,
  'teaRoom': TeaRoomComponent,
  'casino': CasinoComponent,
  'garden': GardenComponent
};

// About Me
// Status Patterns
export const STATUS_PATTERNS = [
  {
    'attr': 'fire',
    'str_val' : '200',
    'str_unit' : '℃',
    'comment': 'Does this placement truly lead users click it?  ――――',
    'speacies': 'Zombie',
    'exp': 'fire!! That\'s why he is called Mr. Fahrenheit.'
  },
  {
    'attr': 'water',
    'str_val' : '40,000',
    'str_unit' : 'mL',
    'comment': 'Like a stream, up to down. Scroll softly. Here it comes!!  ――――',
    'speacies': 'Fairy',
    'exp': 'water!!'
  },
  {
    'attr': 'thunder',
    'str_val' : '5,000',
    'str_unit' : 'kW',
    'comment': 'Which Function? Ah, I\'ve already pushed it.  ――――',
    'speacies': 'Spell Caster',
    'exp': 'thunder!!'
  },
  {
    'attr': 'wind',
    'str_val' : '700',
    'str_unit' : 'km/h',
    'comment': 'I feel the wind of change blows...  ――――',
    'speacies': 'Winged Beast',
    'exp': 'This card save 20% man-hours of labor in total.\n He works pretty speedy as a racing car like Lady Godiva and your project travels at the speed of light.'
  },
  {
    'attr': 'ground',
    'str_val' : '530,000',
    'str_unit' : 'Centuries',
    'comment': 'Let\'s adjust like this. Then everyone gets happier!   ――――',
    'speacies': 'Dinosaur',
    'exp': 'ground!!'
  }
]

export const PREFIX_PORTRAIT = 'portrait_';
export const IMG_PATH_ABOUT_ME = '../../../assets/img/';
export const EXT_PORTRAIT = '.jpg';
export const EXT_ATTR = '.png';
