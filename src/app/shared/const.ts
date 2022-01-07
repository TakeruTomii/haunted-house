import { CasinoComponent } from '../maps/casino/casino.component';
import { GardenComponent } from '../maps/garden/garden.component';
import { LivingRoomComponent } from '../maps/living-room/living-room.component';
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

// Valid Page Names
export const PAGE_NAME_LIST = [
  'init-conf',
  'loading',
  'title',
  'aboutme',
  'contactme',
  'concept',
  'character-list'
];

//BGM filename map of each page
export const PAGE_BGMS = {
  'init-conf':'no_sound.mp3',
  'loading':'takibi.mp3',
  'title':'utakata_no_yume.mp3',
  'aboutme':'shamisendokusou_ma.mp3',
  'contactme':'wafuu_no_otayori_shoukai_corner.mp3',
  'concept':'hanaurashi.mp3',
  'character-list':'Hanamibiyori.mp3'
};

// Valid Room Names of HomeScreenComponent
export const ROOM_NAME_LIST = [
  'livingRoom',
  'workShop',
  'teaRoom',
  'casino',
  'garden'
];

// BGMs for each room at HomeScreenComponent
export const ROOM_BGMS = {
  'livingRoom': "koto_wo_omotte.mp3",
  'workShop': "Shinobitoon.mp3",
  'teaRoom': "ryuusui_to_matsu.mp3",
  'casino': "otoko_no_tamashii_mensore.mp3",
  'garden': "tsuki_no_kei.mp3"
};

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
  // Summary
  {
    'title': 'Summary',
    'rows': [
      {
        'item': 'Coding',
        'rate': 4
      },
      {
        'item': 'Cooking',
        'rate': 5
      },
      {
        'item': 'Karaoke',
        'rate': 5
      },
      {
        'item': 'Money',
        'rate': 1
      },
      {
        'item': 'Fame',
        'rate': 0
      },
      {
        'item': 'Potential',
        'rate': 7
      }
    ]
  },
  // Language
  {
    'title': 'Language',
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

// Character List
// Character Data List
export const IMG_PATH_CHARACTER_LIST = '../../../assets/img/';
export const EXT_CHARACTER = '.png';

// Characters
export const CHARACTER_DATA = [
  {
    'id': 0,
    'name': 'Akabeko',
    'main_image_file': 'Akabeko_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Akabeko_neutral' + EXT_CHARACTER,
    'explanation': 'Akabeko was born from a old toy.\n\n'+
                    'The lunch box on his back was pretty delicious. ' +
                    'Once a renowned swordman praised its taste countlessly.'
  },
  {
    'id': 1,
    'name': 'Tommy',
    'main_image_file': 'Tommy_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Tommy_neutral' + EXT_CHARACTER,
    'explanation': 'The developer of this site.\n\n' +
                    'His appearance is critisizing the dilemma of modern people ' +
                    'that suffers between past and future and cannnot live in this moment.'
  },
  {
    'id': 2,
    'name': 'Jessie-Khan',
    'main_image_file': 'Jessie-Khan_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Jessie-Khan_neutral' + EXT_CHARACTER,
    'explanation': 'The illustrator of this site, and the wife of Tommy.\n\n' +
                    'She has an extremery bad case of military neck and became such long neck.'
  },
  {
    'id': 3,
    'name': 'Ittan momen',
    'main_image_file': 'Ittan-momen_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Ittan-momen_neutral' + EXT_CHARACTER,
    'explanation': 'A long band monster in southern part of Japan.\n\n' +
                    'Usually they are made of cotton but somehow he is made of wool.' +
                    'The maker abandoned him in half way so he always greeving his imcompleteness extremely.'
  },
  {
    'id': 4,
    'name': 'Eye-mirror',
    'main_image_file': 'Eye-mirror_neutral',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Eye-mirror_neutral' + EXT_CHARACTER,
    'explanation': 'Nothing is known about it.\n\n ' +
                    'But it is said it might be the key to another entertainment.'
  }
]

// Error Component
// Error Messages
export const VALUE_CHEATED = 'Do not cheat the value of form.';
export const ROOM_NAME_CHEATED = 'Do not cheat the name of room.';
export const PAGE_NAME_CHEATED = 'Do not cheat the value of page.';
export const NO_EXIST_CHARACTER = 'You cannnot choose a character which doesn\'t exist.';
