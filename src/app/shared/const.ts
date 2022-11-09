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
    'comment': 'Does this placement truly lead users to click here?  ――――',
    'speacies': 'Dinosaur',
    'exp': 'His passion sets the hearts of development members ablaze ' +
            'and the members around him gain 1000 attack points.\n' +
            'That\'s why he is called Mr. Fahrenheit.'
  },
  // water
  {
    'attr': 'water',
    'str_val' : '40,000',
    'str_unit' : 'mL',
    'comment': 'Take it easy. Everything\'s going on schedule.  ――――',
    'speacies': 'Fairy',
    'exp': 'While enough amount of sleeping time and iced coffee are on the field, ' +
            'this card is unaffected by malicious software ' +
            'and cannot be targeted for phishing attacks.'
  },
  // thunder
  {
    'attr': 'thunder',
    'str_val' : '7,000',
    'str_unit' : 'kW',
    'comment': 'Which function? Ah, I\'ve already pushed it.  ――――',
    'speacies': 'Spell Caster',
    'exp': 'This card save 20% man-hours of labor in total.\n' +
            'He works pretty speedy as much as a racing car passing by like Lady Godiva.'
  },
  // wind
  {
    'attr': 'wind',
    'str_val' : '530,000',
    'str_unit' : 'm/s',
    'comment': 'Today is a good day to release.  ――――',
    'speacies': 'Winged Beast',
    'exp': 'When this card is warm-heartedly summoned; ' +
            'You get the wind at your back.\n' +
            'All cards on the field can attack twice in battle phase.'
  },
  // ground
  {
    'attr': 'ground',
    'str_val' : '5',
    'str_unit' : 'Centuries',
    'comment': 'Let\'s adjust like this. Then everyone gets happier!   ――――',
    'speacies': 'Warrior',
    'exp': 'This card contributes to create incredibly tough and sustainable systems ' +
            'and increase the life time of your company by 10 years.'
  }
]

// Slide Properties
export const SKILL_SLIDES = [
  // Summary
  {
    'title': 'Summary',
    'rows': [
      {
        'item': 'Development',
        'rate': 5
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
        'item': 'C#',
        'rate': 5
      },
      {
        'item': 'JavaScript',
        'rate': 5
      },
      {
        'item': 'TypeScript',
        'rate': 5
      },
      {
        'item': 'HTML',
        'rate': 5
      },
      {
        'item': 'CSS',
        'rate': 5
      },
      {
        'item': 'Python',
        'rate': 5
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
        'item': 'Flask',
        'rate': 3
      }
    ]
  },
  // OS
  {
    'title': 'OS',
    'rows': [
      {
        'item': 'Windows',
        'rate': 5
      },
      {
        'item': 'Linux(CentOS)',
        'rate': 4
      },
      {
        'item': 'Mac',
        'rate': 2
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
        'item': 'Azure Functions',
        'rate': 5
      },
      {
        'item': 'Azure Logic Apps',
        'rate': 5
      },
      {
        'item': 'Azure Strage Blob',
        'rate': 5
      },
      {
        'item': 'Azure SQL Database',
        'rate': 4
      },
      {
        'item': 'Azure API Management',
        'rate': 4
      },

      {
        'item': 'Azure App Service',
        'rate': 4
      },
      {
        'item': 'Azure DevOps',
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
                    'Once a renowned swordman praised its taste countlessly.\n\n' +
                    'It is said he has a divine power to give you wings to fly to the paradise. ' +
                    'Maybe since his name means "Red Bull" in direct translation.'
  },
  {
    'id': 1,
    'name': 'Tommy',
    'main_image_file': 'Tommy_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Tommy_neutral' + EXT_CHARACTER,
    'explanation': 'The developer of this site.\n\n' +
                    'The right of the headphone recalls the memory in his past, ' +
                    'and the left of it rushes to unpredictable future.\n\n' +
                    'He always suffers the dilemma just like modern people ' +
                    'that cannot live in this moment, being trapped between past and future.'
  },
  {
    'id': 2,
    'name': 'Jessie Khan',
    'main_image_file': 'Jessie-Khan_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Jessie-Khan_neutral' + EXT_CHARACTER,
    'explanation': 'The illustrator of this site, and the wife of Tommy.\n\n' +
                    'She had an extremely bad case of military neck, ' +
                    'because of using her smartphone too much. ' +
                    'That\'s why she becomes such long neck.\n\n' +
                    'Besides her sholders are terribly stiff and harder than iron. ' +
                    'You can craft a Mithril armor if you mine her sholders.'
  },
  {
    'id': 3,
    'name': 'Ittan Momen',
    'main_image_file': 'Ittan-momen_map',
    'select_image_file': IMG_PATH_CHARACTER_LIST + 'Ittan-momen_neutral' + EXT_CHARACTER,
    'explanation': 'A long scarf monster which is made of wool.\n\n' +
                    'He was born to be a gift once, but the maker abandoned him in half way. '+
                    'Therefore he is always greeving his incompleteness extremely.\n\n' +
                    'For his complex he became a perfectionist ' +
                    'but he claims he just keeps his minimum quality.\n\n' +
                    'Incidentally, Ittan momen is made of cotton in general. ' +
                    'He sometime gets teased by that and it exacerbates his complex.'
  },
  {
    'id': 4,
    'name': 'Eye Mirror',
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
