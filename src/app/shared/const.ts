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
// Path Properties
export const PREFIX_PORTRAIT = 'portrait_';
export const IMG_PATH_ABOUT_ME = '../../../assets/img/';
export const EXT_PORTRAIT = '.jpg';
export const EXT_ATTR = '.png';

// Status Patterns
export const STATUS_PATTERNS = [
  // fire
  {
    'attr': 'fire',
    'str_val' : '200',
    'str_unit' : '℃',
    'comment': 'Does this placement truly lead users click it?  ――――',
    'speacies': 'Zombie',
    'exp': 'fire!! That\'s why he is called Mr. Fahrenheit.'
  },
  // water
  {
    'attr': 'water',
    'str_val' : '40,000',
    'str_unit' : 'mL',
    'comment': 'Like a stream, up to down. Scroll softly. Here it comes!!  ――――',
    'speacies': 'Fairy',
    'exp': 'water!!'
  },
  // thunder
  {
    'attr': 'thunder',
    'str_val' : '5,000',
    'str_unit' : 'kW',
    'comment': 'Which Function? Ah, I\'ve already pushed it.  ――――',
    'speacies': 'Spell Caster',
    'exp': 'thunder!!'
  },
  // wind
  {
    'attr': 'wind',
    'str_val' : '700',
    'str_unit' : 'km/h',
    'comment': 'I feel the wind of change blows...  ――――',
    'speacies': 'Winged Beast',
    'exp': 'This card save 20% man-hours of labor in total.\n He works pretty speedy as a racing car like Lady Godiva and your project travels at the speed of light.'
  },
  // ground
  {
    'attr': 'ground',
    'str_val' : '530,000',
    'str_unit' : 'Centuries',
    'comment': 'Let\'s adjust like this. Then everyone gets happier!   ――――',
    'speacies': 'Dinosaur',
    'exp': 'ground!!'
  }
]

// Slide Properties
export const SKILL_SLIDES = [
  // Language
  {
    'title': 'Language',
    'clazz': 'bg-blue',
    'rows': [
      {
        'item': 'HTML',
        'rate': 4
      },
      {
        'item': 'CSS',
        'rate': 4
      },
      {
        'item': 'JavaScript',
        'rate': 4
      },
      {
        'item': 'C#',
        'rate': 4
      },      {
        'item': 'Python',
        'rate': 3
      },
      {
        'item': 'Java',
        'rate': 3
      },
      {
        'item': 'TypeScript',
        'rate': 2
      }
    ]
  },
  // Frameworks
  {
    'title': 'Framework',
    'clazz': 'bg-yellow',
    'rows': [
      {
        'item': 'ASP.NET MVC',
        'rate': 5
      },
      {
        'item': 'Angular',
        'rate': 5
      },
      {
        'item': 'jQuery',
        'rate': 5
      },
      {
        'item': 'Node.js',
        'rate': 2
      },      {
        'item': 'Spring Framework',
        'rate': 2
      }
    ]
  },
  // OS
  {
    'title': 'OS',
    'clazz': 'bg-yellow',
    'rows': [
      {
        'item': 'Windows',
        'rate': 4
      },
      {
        'item': 'Linux(CentOS)',
        'rate': 3
      },
      {
        'item': 'Mac',
        'rate': 3
      }
    ]
  },
  // DB
  {
    'title': 'DB',
    'clazz': 'bg-yellow',
    'rows': [
      {
        'item': 'SQL Server',
        'rate': 4
      },
      {
        'item': 'Oracle',
        'rate': 2
      },
      {
        'item': 'Postgres',
        'rate': 2
      }
    ]
  },
  // Cloud
  {
    'title': 'Cloud',
    'clazz': 'bg-yellow',
    'rows': [
      {
        'item': 'Azure Logic Apps',
        'rate': 5
      },
      {
        'item': 'Azure Functions',
        'rate': 5
      },
      {
        'item': 'Azure API Management',
        'rate': 4
      }
      ,
      {
        'item': 'Azure App Service',
        'rate': 3
      },
      {
        'item': 'Azure Strage Blob',
        'rate': 3
      },
      {
        'item': 'Azure DevOps',
        'rate': 2
      },
      {
        'item': 'Azure SQL Database',
        'rate': 2
      }
    ]
  }
]
