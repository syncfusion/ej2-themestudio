var themeColors = {};
var cardsContent = {};
var bv4GrayProps = {};
var bv4ColorProps = {};
var tailwindGrayProps = {};
var tailwindIndigoProps = {};
var tailwindGreenProps = {};
var tailwindRedProps = {};
var tailwindCyanProps = {};
var tailwindOrangeProps = {};
var hiddenControls = [];
var isInitRender = false;
var filteredControls = [];
var defaultThemeColors = {};
var isFilterApplied = false;
var isFilterChecked = false;
var isAdvancedChecked = false;
// var currentTheme = 'material';
var currentTheme = 'material3';
var isThemeSwitcherOpen = false;
var isLocalStorageCleared = false;
var infoToast, controlContent, exportDialog, importDialog, filterDialog;
var fCategoriesCheckbox, fControlsCheckbox, selectAllDiv, filterDefaultData;
var themeDropDown, themeDropDownText, themeSwitcherPopup, themeBodyLeftOverlay;
var filteredData = {
    controls: [],
    categories: {}
};
var categories = {
    small: {
        controls: {},
        card: {}
    },
    big: {}
};
var CARD_CATEGORY = {};
const MATERIAL = 'material';
const QUERY_STRING = '?theme=';
const QUERY_REGEX = /\?+[^>]+/g;
const GOOGLE_REGEX = /\&+[^>]+/g;
const BOOTSTRAP4 = 'bootstrap4';
const BOOTSTRAP5 = 'bootstrap5';
const FLUENT = 'fluent';
const MATERIAL3 = 'material3';
const TWO_COLUMN_CONTROLS = ['grid', 'tab', 'toolbar'];
const DARK_THEMES = [MATERIAL, 'fabric', 'bootstrap', 'tailwind'];
const BV4_NORMAL_ITEMS = ['$primary', '$primary-font', '$secondary', '$secondary-font'];
const TAILWIND_NORMAL_ITEMS = ['$primary', '$primary-font'];
const DEFAULT_THEMES = [MATERIAL, 'fabric', 'bootstrap', BOOTSTRAP4, BOOTSTRAP5, FLUENT, MATERIAL3, 'highcontrast', 'tailwind'];
const APP_CONTROLS = ['card', 'check-box', 'tooltip', 'dialog', 'color-picker', 'uploader'];
const BV4_COLOR_ITEMS = ['$blue', '$indigo', '$purple', '$pink', '$red', '$orange', '$yellow', '$green', '$teal', '$cyan'];
const PACKAGE_MAPPER = {
    'card': 'layouts', 'dashboard-layout': 'layouts','avatar': 'layouts', 'listview': 'lists', 'badge': 'notifications', 'button-group': 'splitbuttons', 'input': 'inputs', 'sidebar': 'navigations', 'signature': 'inputs', 'breadcrumb': 'navigations',  'carousel': 'navigations', 'message': 'notifications', 'floating-action-button': 'buttons', 'speed-dial': 'buttons', 'skeleton': 'notifications', 'appbar': 'navigations', 'mention': 'dropdowns', 'rating': 'inputs' };
const HIDDEN_CONTROLS = ['pivotview', 'dashboard-layout', 'avatar', 'treegrid', 'spreadsheet', 'gantt', 'query-builder', 'file-manager', 'kanban', 'pdfviewer', 'rich-text-editor', 'document-editor', 'sidebar', 'drop-down-tree', 'image-editor', 'slider', 'ribbon'];
const THEMES = [MATERIAL, 'fabric', 'bootstrap', BOOTSTRAP4, BOOTSTRAP5, FLUENT, MATERIAL3, 'highcontrast', 'tailwind', 'fabric-dark', 'material-dark', 'bootstrap-dark','bootstrap5-dark', 'highcontrast-light', 'fusion', 'fluent-dark', 'tailwind-dark', 'material3-dark'];
const BV4_GRAY_ITEMS = ['$white', '$gray-100', '$gray-200', '$gray-300', '$gray-400', '$gray-500', '$gray-600', '$gray-700', '$gray-800', '$gray-900', '$black'];
const TAILWIND_BASE_ITEMS = ['coolgray-50', 'coolgray-100', 'coolgray-200', 'coolgray-300', 'coolgray-400', 'coolgray-500', 'coolgray-600', 'coolgray-700', 'coolgray-800', 'coolgray-900'];
const TAILWIND_BRAND_ITEMS = ['indigo-50', 'indigo-100', 'indigo-200', 'indigo-300', 'indigo-400', 'indigo-500', 'indigo-600', 'indigo-700', 'indigo-800', 'indigo-900'];
const TAILWIND_SUCCESS_ITEMS = ['green-50', 'green-100', 'green-200', 'green-300', 'green-400', 'green-500', 'green-600', 'green-700', 'green-800', 'green-900'];
const TAILWIND_DANGER_ITEMS = ['red-50', 'red-100', 'red-200', 'red-300', 'red-400', 'red-500', 'red-600', 'red-700', 'red-800', 'red-900'];
const TAILWIND_INFO_ITEMS = ['cyan-50', 'cyan-100', 'cyan-200', 'cyan-300', 'cyan-400', 'cyan-500', 'cyan-600', 'cyan-700', 'cyan-800', 'cyan-900'];
const TAILWIND_WARNING_ITEMS = ['orange-50', 'orange-100', 'orange-200', 'orange-300', 'orange-400', 'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900'];
const NODEJS_URL = "http://localhost:1660/themeapi/";

if (isBlazor()) {
    CARD_CATEGORY = {
        'grids': {
            'col-cards': { 'grid': null },
            'big-cards': { 'pivotview': null, 'treegrid': null, 'spreadsheet': null }
        },
        'calendar': {
            'col-cards': {
                'calendar': null,
                'category-pickers': ['datepicker', 'timepicker', 'datetimepicker', 'daterangepicker']
            },
            'big-cards': {
                'schedule': null,
                'gantt': null
            }
        },
        'buttons': {
            'col-cards': {
                'category-button': ['button', 'button-group', 'drop-down-button', 'progress-button', 'split-button', 'floating-action-button', 'speed-dial'],
                'chips': null
            },
            'big-cards': {}
        },
        'dropdowns': {
            'col-cards': {
                'category-dropdown': ['auto-complete', 'drop-down-list', 'drop-down-tree', 'multi-select', 'combo-box', 'list-box']
            },
            'big-cards': {}
        },
        'inputs': {
            'col-cards': {
                'category-inputs': ['textbox', 'maskedtextbox', 'signature', 'numerictextbox', 'slider'],
                'check-box': null,
                'color-picker': null,
                'uploader': null,
                'radio-button': null,
                'switch': null,
                'rating': null
            },
            'big-cards': {}
        },
        'editors': {
            'col-cards': {
                'category-editors': ['inplace-editor'],
            },
            'big-cards': {
                'rich-text-editor': null,
                'document-editor': null,
                'pdfviewer': null
            }
        },
        'layout': {
            'col-cards': {
                'card': null,
                'listview': null,
                'tooltip': null,
                'avatar': null,
                'dashboard-layout': null
            },
            'big-cards': {
                'dialog': null,
                'splitter': null
            }
        },
        'forms': {
            'col-cards': {},
            'big-cards': {
                'query-builder': null
            }
        },
        'notification': {
            'col-cards': {
                'badge': null,
                'toast': null,
                'spinner': null,
                 'message': null
            },
            'big-cards': {
                'dialog': null,
                'skeleton': null
            }
        },
        'navigation': {
            'col-cards': {
                'treeview': null,
                'toolbar': null,
                'accordion': null,
                'context-menu': null,
                'tab': null,
                'menu': null,
                'breadcrumb': null,
                'carousel': null,
                'appbar': null,
            },
            'big-cards': {
                'file-manager': null,
                'sidebar': null,
            }
        },
        'data-visualization': {
            'col-cards': {
            },
            'big-cards': {
                'kanban': null
            }
        }
    };
}
else {
    CARD_CATEGORY = {
        'grids': {
            'col-cards': { 'grid': null },
            'big-cards': { 'pivotview': null, 'treegrid': null, 'spreadsheet': null }
        },
        'calendar': {
            'col-cards': { 'calendar': null },
            'big-cards': {
                'schedule': null,
                'gantt': null
            }
        },
        'editors': {
            'col-cards': {
                'category-editors': ['textbox', 'numerictextbox', 'maskedtextbox', 'slider', 'inplace-editor', 'signature'],
                 'category-pickers': ['datepicker', 'timepicker', 'datetimepicker', 'daterangepicker'],
                 'category-dropdown': ['auto-complete', 'drop-down-list', 'drop-down-tree', 'multi-select', 'combo-box', 'list-box', 'mention'],
                'category-button': ['button', 'drop-down-button', 'split-button', 'button-group', 'progress-button', 'floating-action-button','speed-dial'],
                  'check-box': null,
                  'radio-button': null,
                  'uploader': null,
                  'color-picker': null,
                  'switch': null,
                  'chips': null,
                  'rating': null
            },
            'big-cards': {
                'rich-text-editor': null,
                    'document-editor': null,
                     'image-editor': null
            }
        },
        'layout': {
            'col-cards': {
                'card': null,
                'listview': null,
                 'tooltip': null,
                 'spinner': null,
                 'avatar': null,
                 'dashboard-layout': null
            },
            'big-cards': {
                'dialog': null,
                'splitter': null
            }
        },
        'forms': {
            'col-cards': { },
            'big-cards': {
                'query-builder': null
            }
        },
        'notification': {
            'col-cards': {
                'badge': null,
                'toast': null,
                'message': null
            },
            'big-cards': {
                'dialog': null,
                'skeleton': null
            }
        },
        'navigation': {
            'col-cards': {
                'treeview': null,
                'toolbar': null,
                'accordion': null,
                'context-menu': null,
                'tab': null,
                'menu': null,
                'breadcrumb': null,
                'carousel': null,
                'appbar': null,
            },
            'big-cards': {
                'file-manager': null,
                'sidebar': null,
                'ribbon': null
        }
        },
        'data-visualization': {
            'col-cards': {
            },
            'big-cards': {
                'kanban': null
            }
        },
        'viewer': {
            'col-cards': {
            },
            'big-cards': {
                'pdfviewer': null
            }
        }
    };
}
const THEME_PROPERTIES = {
    'material': {
        'Primary Color': {
            id: 'primary',
            default: '#3f51b5',
            palettes: [
                '#f34235', '#e81d62', '#9b26af', '#6639b6', '#3e50b4', '#2095f2',
                '#02a8f3', '#00bbd3', '#009587', '#4bae4f', '#8ac249', '#ccdb38',
                '#ffea3a', '#ffc006', '#ff9700', '#ff5621', '#9d9d9d', '#5f7c8a',
                '#785447', '#000000', '#ffffff'
            ]
        },
        'Primary Font': {
            id: 'primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Accent Color': {
            id: 'accent',
            default: '#ff4081',
            palettes: [
                '#ff8A80', '#ff5252', '#ff1744', '#d50000', '#ff80ab', '#ff4081', '#f50057', '#c51162',
                '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#b388ff', '#7c4dff', '#651fff', '#6200ea',
                '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#82b1fc', '#448aff', '#2979ff', '#2962ff',
                '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4',
                '#a7ffeb', '#64ffda', '#1de986', '#00bfa5', '#b9fbca', '#69f0ae', '#00e676', '#00c853',
                '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00',
                '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#ffe57f', '#ffd740', '#ffc400', '#ffa600',
                '#ffd1b0', '#ffab40', '#ff9100', '#ff6d00', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00',
                '#000000', '#ffffff'
            ]
        },
        'Accent Font': {
            id: 'accent-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'fabric': {
        'Primary Color': {
            id: 'theme-primary',
            default: '#0078d7',
            palettes: [
                '#f34235', '#e81d62', '#9b26af', '#6639b6', '#3e50b4', '#2095f2',
                '#02a8f3', '#00bbd3', '#009587', '#4bae4f', '#8ac249', '#ccdb38',
                '#ffea3a', '#ffc006', '#ff9700', '#ff5621', '#9d9d9d', '#5f7c8a',
                '#785447', '#000000', '#ffffff'
            ]
        },
        'Primary font': {
            id: 'theme-primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'bootstrap': {
        'Primary Color': {
            id: 'brand-primary',
            default: '#428bca',
            palettes: [
                '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                '#437584', '#6B6D7F', '#333333'
            ]
        },
        'Primary Font': {
            id: 'brand-primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'fusion': {
        'Primary Color': {
            id: 'brand-primary',
            default: '#0565ff',
            palettes: [
                '#0565ff', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                '#437584', '#6B6D7F', '#333333'
            ]
        },
        'Primary Font': {
            id: 'brand-primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'bootstrap4': {
        'grays': {
            id: 'Grays Variables',
            dependentProps: 'primary-font,secondary,secondary-font,content-bg,content-popup-bg,light,dark',
            'White': {
                id: 'white',
                default: '#ffffff',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-100': {
                id: 'gray-100',
                default: '#f8f9fa',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-200': {
                id: 'gray-200',
                default: '#e9ecef',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-300': {
                id: 'gray-300',
                default: '#dee2e6',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-400': {
                id: 'gray-400',
                default: '#ced4da',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-500': {
                id: 'gray-500',
                default: '#adb5bd',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-600': {
                id: 'gray-600',
                default: '#6c757d',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-700': {
                id: 'gray-700',
                default: '#495057',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-800': {
                id: 'gray-800',
                default: '#343a40',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Gray-900': {
                id: 'gray-900',
                default: '#212529',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Black': {
                id: 'black',
                default: '#000000',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            }
        },
        'colors': {
            id: 'Colors Variables',
            dependentProps: 'primary,success,info,warning,danger',
            'Blue': {
                id: 'blue',
                default: '#007bff',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Indigo': {
                id: 'indigo',
                default: '#6610f2',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Purple': {
                id: 'purple',
                default: '#6f42c1',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Pink': {
                id: 'pink',
                default: '#e83e8c',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Red': {
                id: 'red',
                default: '#dc3545',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Orange': {
                id: 'orange',
                default: '#fd7e14',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Yellow': {
                id: 'yellow',
                default: '#ffc107',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Green': {
                id: 'green',
                default: '#28a745',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Teal': {
                id: 'teal',
                default: '#20c997',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Cyan': {
                id: 'cyan',
                default: '#20c997',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            }
        },
        'primary': {
            id: 'Primary Variables',
	    dependentProps: 'primary,primary-font',
            'Primary Color': {
                id: 'primary',
                default: '#007bff',
                defaultName: '$blue',
                defaultCategory: 'colors',
                palettes: [
                    '#0070F0', '#6610F2', '#6F42C1', '#E83E8B', '#DC3243', '#845454',
                    '#218739', '#128260', '#108193', '#6C7A00', '#B12EF1', '#0178C9',
                    '#74588B', '#C34143', '#5866B6', '#0178C9', '#A459A1', '#C639AE',
                    '#437584', '#6B6D7F', '#333333'
                ]
            },
            'Primary Font': {
                id: 'primary-font',
                default: '#ffffff',
                defaultName: '$white',
                defaultCategory: 'grays',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            }
        },
        'secondary': {
            id: 'Secondary Variables',
	    dependentProps: 'secondary,secondary-font',
            'Secondary Color': {
                id: 'secondary',
                default: '#ffffff',
                defaultName: '$white',
                defaultCategory: 'grays',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Secondary Font': {
                id: 'secondary-font',
                default: '#ffffff',
                defaultName: '$white',
                defaultCategory: 'grays',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            }
        },
        'content': {
            id: 'Content Variables',
	    dependentProps: 'content-bg,content-popup-bg',
            'Content BG': {
                id: 'content-bg',
                default: '#ffffff',
                defaultName: '$white',
                defaultCategory: 'grays',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Content Popup BG': {
                id: 'content-popup-bg',
                default: '#ffffff',
                defaultName: '$white',
                defaultCategory: 'grays',
                palettes: [
                    '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            }
        },
        'others': {
            id: 'Other Variables',
	    dependentProps: 'success,info,warning,danger,light,dark',
            'Success': {
                id: 'success',
                default: '#28a745',
                defaultName: '$green',
                defaultCategory: 'colors',
                palettes: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            },
            'Info': {
                id: 'info',
                default: '#17a2b8',
                defaultName: '$cyan',
                defaultCategory: 'colors',
                palettes: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            },
            'Warning': {
                id: 'warning',
                default: '#ffc107',
                defaultName: '$yellow',
                defaultCategory: 'colors',
                palettes: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            },
            'Danger': {
                id: 'danger',
                default: '#dc3545',
                defaultName: '$red',
                defaultCategory: 'colors',
                palettes: ['#fff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            },
            'Light': {
                id: 'light',
                default: '#f8f9fa',
                defaultName: '$gray-100',
                defaultCategory: 'grays',
                palettes: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            },
            'Dark': {
                id: 'dark',
                default: '#212529',
                defaultName: '$gra7-800',
                defaultCategory: 'grays',
                palettes: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                    '#495057', '#343a40', '#212529', '#000', '#007bff', '#6610f2', '#6f42c1', '#e83e8c',
                    '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8']
            }
        },
        'page': {
            id: 'Page',
	    dependentProps: 'page-bg,page-font',
            'Page BG': {
                id: 'page-bg',
                default: '#f5f5f5',
                palettes: ['#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000']
            },
            'Page Font': {
                id: 'page-font',
                default: '#333333',
                palettes: ['#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000']
            }
        }
    },
    'bootstrap5': {
            'Primary Color': {
                id: 'primary',
                default: '#0d6efd',
                defaultName: '$blue',
                palettes: [
                    '#6610f2', '#0d6efd', '#6f42c1', '#d63384', '#dc3545', '#fd7e14',
                    '#ffc107', '#198754', '#20c997', '#0dcaf0'
                ]
            },
            'Primary Font': {
                id: 'primary-text-color',
                default: '#fff',
                defaultName: '$white',
                palettes: [
                    '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Secondary Color': {
                id: 'secondary',
                default: '#6c757d',
                defaultName: '$gray-600',
                palettes: [
                    '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            },
            'Secondary Font': {
                id: 'secondary-text-color',
                default: '#fff',
                defaultName: '$white',
                palettes: [
                    '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                    '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
                ]
            }
    },
    'material3': {
        'Primary Color': {
            id: '--color-sf-primary',
            default: '103, 80, 164',
            defaultName: '--color-sf-primary',
            palettes: [
                '102, 16, 242', '103, 80, 164', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Primary Container': {
            id: '--color-sf-primary-container',
            default: '234, 221, 255',
            defaultName: '--color-sf-primary-container',
            palettes: [
                '234, 221, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Primary': {
            id: '--color-sf-on-primary',
            default: '255, 255, 255',
            defaultName: '--color-sf-on-primary',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Primary Container': {
            id: '--color-sf-on-primary-container',
            default: '33, 0, 94',
            defaultName: '--color-sf-on-primary-container',
            palettes: [
                '33, 0, 94', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface': {
            id: '--color-sf-surface',
            default: '255, 255, 255',
            defaultName: '--color-sf-surface',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface Variant': {
            id: '--color-sf-surface-variant',
            default: '231, 224, 236',
            defaultName: '--color-sf-surface-variant',
            palettes: [
                '231, 224, 236', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Surface': {
            id: '--color-sf-on-surface',
            default: '28, 27, 31',
            defaultName: '--color-sf-on-surface',
            palettes: [
                '28, 27, 31', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On surface Variant': {
            id: '--color-sf-on-surface-variant',
            default: '73, 69, 78',
            defaultName: '--color-sf-on-surface-variant',
            palettes: [
                '73, 69, 78', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Secondary': {
            id: '--color-sf-secondary',
            default: '98, 91, 113',
            defaultName: '--color-sf-secondary',
            palettes: [
                '98, 91, 113', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Secondary Container': {
            id: '--color-sf-secondary-container',
            default: '232, 222, 248',
            defaultName: '--color-sf-secondary-container',
            palettes: [
                '232, 222, 248', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Secondary': {
            id: '--color-sf-on-secondary',
            default: '255, 255, 255',
            defaultName: '--color-sf-on-secondary',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Secondary Container': {
            id: '--color-sf-on-secondary-container',
            default: '30, 25, 43',
            defaultName: '--color-sf-on-secondary-container',
            palettes: [
                '30, 25, 43', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Tertiary': {
            id: '--color-sf-tertiary',
            default: '125, 82, 96',
            defaultName: '--color-sf-tertiary',
            palettes: [
                '125, 82, 96', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Tertiary Container': {
            id: '--color-sf-tertiary-container',
            default: '255, 216, 228',
            defaultName: '--color-sf-tertiary-container',
            palettes: [
                '255, 216, 228', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Tertiary': {
            id: '--color-sf-on-tertiary',
            default: '255, 255, 255',
            defaultName: '--color-sf-on-tertiary',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20)',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Tertiary Container': {
            id: '--color-sf-on-tertiary-containe',
            default: '55, 11, 30',
            defaultName: '--color-sf-on-tertiary-containe',
            palettes: [
                '55, 11, 30', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Background': {
            id: '--color-sf-background',
            default: '255, 255, 255',
            defaultName: '--color-sf-background',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Background': {
            id: '--color-sf-on-background',
            default: '28, 27, 31',
            defaultName: '--color-sf-on-background',
            palettes: [
                '28, 27, 31', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Outline': {
            id: '--color-sf-outline',
            default: '121, 116, 126',
            defaultName: '--color-sf-outline',
            palettes: [
                '121, 116, 126', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Outline Variant': {
            id: '--color-sf-outline-variant',
            default: '196, 199, 197',
            defaultName: '--color-sf-outline-variant',
            palettes: [
                '196, 199, 197', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Shadow': {
            id: '--color-sf-shadow',
            default: '0, 0, 0',
            defaultName: '--color-sf-shadow',
            palettes: [
                '0, 0, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface Tint Color': {
            id: '--color-sf-surface-tint-color',
            default: '103, 80, 164',
            defaultName: '--color-sf-surface-tint-color',
            palettes: [
                '103, 80, 164', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse Surface': {
            id: '--color-sf-inverse-surface',
            default: '49, 48, 51',
            defaultName: '--color-sf-inverse-surface',
            palettes: [
                '49, 48, 51', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse On Surface': {
            id: '--color-sf-inverse-on-surface',
            default: '244, 239, 244',
            defaultName: '--color-sf-inverse-on-surface',
            palettes: [
                '244, 239, 244', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse Primary': {
            id: '--color-sf-inverse-primary',
            default: '208, 188, 255',
            defaultName: '--color-sf-inverse-primary',
            palettes: [
                '208, 188, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Scrim': {
            id: '--color-sf-scrim',
            default: '0, 0, 0',
            defaultName: '--color-sf-scrim',
            palettes: [
                '0, 0, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Error': {
            id: '--color-sf-error',
            default: '179, 38, 30',
            defaultName: '--color-sf-error',
            palettes: [
                '179, 38, 30', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Error Container': {
            id: '--color-sf-error-container',
            default: '249, 222, 220',
            defaultName: '--color-sf-error-container',
            palettes: [
                '249, 222, 220', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Error': {
            id: '--color-sf-on-error',
            default: '255, 250, 250',
            defaultName: '--color-sf-on-error',
            palettes: [
                '255, 250, 250', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Error Container': {
            id: '--color-sf-on-error-container',
            default: '65, 14, 11',
            defaultName: '--color-sf-on-error-container',
            palettes: [
                '65, 14, 11', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Success': {
            id: '--color-sf-success',
            default: '32, 81, 7',
            defaultName: '--color-sf-success',
            palettes: [
                '32, 81, 7', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Success Container': {
            id: '--color-sf-success-container',
            default: '209, 255, 186',
            defaultName: '--color-sf-success-container',
            palettes: [
                '209, 255, 186', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Success': {
            id: '--color-sf-on-success',
            default: '244, 255, 239',
            defaultName: '--color-sf-on-success',
            palettes: [
                '244, 255, 239', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Success Container': {
            id: '--color-sf-on-success-container',
            default: '13, 39, 0',
            defaultName: '--color-sf-on-success-container',
            palettes: [
                '13, 39, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Info': {
            id: '--color-sf-info',
            default: '1, 87, 155',
            defaultName: '--color-sf-info',
            palettes: [
                '1, 87, 155', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Info Container': {
            id: '--color-sf-info-container',
            default: '233, 245, 255',
            defaultName: '--color-sf-info-container',
            palettes: [
                '233, 245, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Info': {
            id: '--color-sf-on-info',
            default: '250, 253, 255',
            defaultName: '--color-sf-on-info',
            palettes: [
                '250, 253, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Info Container': {
            id: '--color-sf-on-info-container',
            default: '0, 51, 91',
            defaultName: '--color-sf-on-info-container',
            palettes: [
                '0, 51, 91', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Warning': {
            id: '--color-sf-warning',
            default: '145, 76, 0',
            defaultName: '--color-sf-warning',
            palettes: [
                '145, 76, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Warning Container': {
            id: '--color-sf-warning-container',
            default: '254, 236, 222',
            defaultName: '--color-sf-warning-container',
            palettes: [
                '254, 236, 222', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Warning': {
            id: '--color-sf-on-warning',
            default: '255, 255, 255',
            defaultName: '--color-sf-on-warning',
            palettes: [
                '255, 255, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Warning Container': {
            id: '--color-sf-on-warning-container',
            default: '47, 21, 0',
            defaultName: '--color-sf-on-warning-container',
            palettes: [
                '47, 21, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        }
    },
    'material3-dark': {
        'Primary Color': {
            id: '--color-sf-primary',
            default: '208, 188, 255',
            defaultName: '--color-sf-primary',
            palettes: [
                '208, 188, 255', '103, 80, 164', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Primary Container': {
            id: '--color-sf-primary-container',
            default: '79, 55, 139',
            defaultName: '--color-sf-primary-container',
            palettes: [
                '79, 55, 139', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Primary': {
            id: '--color-sf-on-primary',
            default: '55, 30, 115',
            defaultName: '--color-sf-on-primary',
            palettes: [
                '55, 30, 115', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Primary Container': {
            id: '--color-sf-on-primary-container',
            default: '234, 221, 255',
            defaultName: '--color-sf-on-primary-container',
            palettes: [
                '234, 221, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface': {
            id: '--color-sf-surface',
            default: '28, 27, 31',
            defaultName: '--color-sf-surface',
            palettes: [
                '28, 27, 31', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface Variant': {
            id: '--color-sf-surface-variant',
            default: '73, 69, 79',
            defaultName: '--color-sf-surface-variant',
            palettes: [
                '73, 69, 79', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Surface': {
            id: '--color-sf-on-surface',
            default: '230, 225, 229',
            defaultName: '--color-sf-on-surface',
            palettes: [
                '230, 225, 229', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On surface Variant': {
            id: '--color-sf-on-surface-variant',
            default: '202, 196, 208',
            defaultName: '--color-sf-on-surface-variant',
            palettes: [
                '202, 196, 208', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Secondary': {
            id: '--color-sf-secondary',
            default: '204, 194, 220',
            defaultName: '--color-sf-secondary',
            palettes: [
                '204, 194, 220', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Secondary Container': {
            id: '--color-sf-secondary-container',
            default: '74, 68, 88',
            defaultName: '--color-sf-secondary-container',
            palettes: [
                '74, 68, 88', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Secondary': {
            id: '--color-sf-on-secondary',
            default: '51, 45, 65',
            defaultName: '--color-sf-on-secondary',
            palettes: [
                '51, 45, 65', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Secondary Container': {
            id: '--color-sf-on-secondary-container',
            default: '232, 222, 248',
            defaultName: '--color-sf-on-secondary-container',
            palettes: [
                '232, 222, 248', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Tertiary': {
            id: '--color-sf-tertiary',
            default: '239, 184, 200',
            defaultName: '--color-sf-tertiary',
            palettes: [
                '239, 184, 200', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Tertiary Container': {
            id: '--color-sf-tertiary-container',
            default: '99, 59, 72',
            defaultName: '--color-sf-tertiary-container',
            palettes: [
                '99, 59, 72', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Tertiary': {
            id: '--color-sf-on-tertiary',
            default: '73, 37, 50',
            defaultName: '--color-sf-on-tertiary',
            palettes: [
                '73, 37, 50', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20)',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Tertiary Container': {
            id: '--color-sf-on-tertiary-containe',
            default: '255, 216, 228',
            defaultName: '--color-sf-on-tertiary-containe',
            palettes: [
                '255, 216, 228', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Background': {
            id: '--color-sf-background',
            default: '28, 27, 31',
            defaultName: '--color-sf-background',
            palettes: [
                '28, 27, 31', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Background': {
            id: '--color-sf-on-background',
            default: '230, 225, 229',
            defaultName: '--color-sf-on-background',
            palettes: [
                '230, 225, 229', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Outline': {
            id: '--color-sf-outline',
            default: '147, 143, 153',
            defaultName: '--color-sf-outline',
            palettes: [
                '147, 143, 153', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Outline Variant': {
            id: '--color-sf-outline-variant',
            default: '68, 71, 70',
            defaultName: '--color-sf-outline-variant',
            palettes: [
                '68, 71, 70', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Shadow': {
            id: '--color-sf-shadow',
            default: '0, 0, 0',
            defaultName: '--color-sf-shadow',
            palettes: [
                '0, 0, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Surface Tint Color': {
            id: '--color-sf-surface-tint-color',
            default: '208, 188, 255',
            defaultName: '--color-sf-surface-tint-color',
            palettes: [
                '208, 188, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse Surface': {
            id: '--color-sf-inverse-surface',
            default: '230, 225, 229',
            defaultName: '--color-sf-inverse-surface',
            palettes: [
                '230, 225, 229', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse On Surface': {
            id: '--color-sf-inverse-on-surface',
            default: '49, 48, 51',
            defaultName: '--color-sf-inverse-on-surface',
            palettes: [
                '49, 48, 51', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Inverse Primary': {
            id: '--color-sf-inverse-primary',
            default: '103, 80, 164',
            defaultName: '--color-sf-inverse-primary',
            palettes: [
                '103, 80, 164', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Scrim': {
            id: '--color-sf-scrim',
            default: '0, 0, 0',
            defaultName: '--color-sf-scrim',
            palettes: [
                '0, 0, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Error': {
            id: '--color-sf-error',
            default: '242, 184, 181',
            defaultName: '--color-sf-error',
            palettes: [
                '242, 184, 181', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Error Container': {
            id: '--color-sf-error-container',
            default: '140, 29, 24',
            defaultName: '--color-sf-error-container',
            palettes: [
                '140, 29, 24', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Error': {
            id: '--color-sf-on-error',
            default: '96, 20, 16',
            defaultName: '--color-sf-on-error',
            palettes: [
                '96, 20, 16', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Error Container': {
            id: '--color-sf-on-error-container',
            default: '249, 222, 220',
            defaultName: '--color-sf-on-error-container',
            palettes: [
                '249, 222, 220', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Success': {
            id: '--color-sf-success',
            default: '83, 202, 23',
            defaultName: '--color-sf-success',
            palettes: [
                '83, 202, 23', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Success Container': {
            id: '--color-sf-success-container',
            default: '22, 62, 2',
            defaultName: '--color-sf-success-container',
            palettes: [
                '22, 62, 2', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Success': {
            id: '--color-sf-on-success',
            default: '13, 39, 0',
            defaultName: '--color-sf-on-success',
            palettes: [
                '13, 39, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Success Container': {
            id: '--color-sf-on-success-container',
            default: '183, 250, 150',
            defaultName: '--color-sf-on-success-container',
            palettes: [
                '183, 250, 150', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Info': {
            id: '--color-sf-info',
            default: '71, 172, 251',
            defaultName: '--color-sf-info',
            palettes: [
                '71, 172, 251', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Info Container': {
            id: '--color-sf-info-container',
            default: '0, 67, 120',
            defaultName: '--color-sf-info-container',
            palettes: [
                '0, 67, 120', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Info': {
            id: '--color-sf-on-info',
            default: '0, 51, 91',
            defaultName: '--color-sf-on-info',
            palettes: [
                '0, 51, 91', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Info Container': {
            id: '--color-sf-on-info-container',
            default: '173, 219, 255',
            defaultName: '--color-sf-on-info-container',
            palettes: [
                '173, 219, 255', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Warning': {
            id: '--color-sf-warning',
            default: '245, 180, 130',
            defaultName: '--color-sf-warning',
            palettes: [
                '245, 180, 130', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'Warning Container': {
            id: '--color-sf-warning-container',
            default: '123, 65, 0',
            defaultName: '--color-sf-warning-container',
            palettes: [
                '123, 65, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Warning': {
            id: '--color-sf-on-warning',
            default: '99, 52, 0',
            defaultName: '--color-sf-on-warning',
            palettes: [
                '99, 52, 0', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        },
        'On Warning Container': {
            id: '--color-sf-on-warning-container',
            default: '255, 220, 193',
            defaultName: '--color-sf-on-warning-container',
            palettes: [
                '255, 220, 193', '13, 110, 253', '111, 66, 193', '214, 51, 132', '220, 53, 69', '253, 126, 20',
                '255, 193, 7', '25, 135, 84', '32, 201, 151', '13, 202, 240'
            ]
        }
    },
    'fluent': {
        'Primary Color': {
            id: 'primary',
            default: '#0078d4',
            defaultName: '$cyanblue10',
            palettes: [
                '#6610f2', '#0d6efd', '#6f42c1', '#d63384', '#dc3545', '#fd7e14',
                '#ffc107', '#198754', '#20c997', '#0dcaf0'
            ]
        },
        'Primary Font': {
            id: 'primary-text-color',
            default: '#ffffff',
            defaultName: '$white',
            palettes: [
                '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        
    },
    'highcontrast-light': {
        'Selection BG': {
            id: 'selection-bg',
            default: '#23726C',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Selection Border': {
            id: 'selection-border',
            default: '#23726c',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Selection Font': {
            id: 'selection-font',
            default: '#FFFFFF',
            palettes: [
                '#FFFFFF', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Hover BG': {
            id: 'hover-bg',
            default: '#C9EDEB',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Hover Border': {
            id: 'hover-border',
            default: '#000000',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Hover Font': {
            id: 'hover-font',
            default: '#000000',
            palettes: [
                '#FFFFFF', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Disable': {
            id: 'disable',
            default: '#757575',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        }
    },
    'tailwind': {
        'coolgrays': {
            id: 'Base Color Variables',
            dependentProps: 'primary-text,success-text,danger-text',
            'White': {
                id: 'white',
                default: '#fff',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-50': {
                id: 'coolgray-50',
                default: '#F9FAFB',
                palettes: [
                    '#fff','#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-100': {
                id: 'coolgray-100',
                default: '#F3F4F6',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-200': {
                id: 'coolgray-200',
                default: '#E5E7EB',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-300': {
                id: 'coolgray-300',
                default: '#D1D5DB',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-400': {
                id: 'coolgray-400',
                default: '#9CA3AF',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-500': {
                id: 'coolgray-500',
                default: '#6B7280',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-700': {
                id: 'coolgray-700',
                default: '#374151',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-800': {
                id: 'coolgray-800',
                default: '#1F2937',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Base-900': {
                id: 'coolgray-900',
                default: '#111827',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Black': {
                id: 'black',
                default: '#000',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            }
        },
        'indigos': {
            id: 'Brand Color',
            dependentProps: 'primary',
                'Brand-200': {
                    id: 'indigo-200',
                    default: '#c7d2fe',
                    palettes: [
                        '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3'
                    ]
                },
                'Brand-400': {
                    id: 'indigo-400',
                    default: '#818cf8',
                    palettes: [
                        '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3'
                    ]
                },
                'Brand-600': {
                    id: 'indigo-600',
                    default: '#4f46e5',
                    palettes: [
                        '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3'
                    ]
                },
                'Brand-700': {
                    id: 'indigo-700',
                    default: '#4338ca',
                    palettes: [
                        '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3'
                    ]
                },
                'Brand-800': {
                    id: 'indigo-800',
                    default: '#3730a3',
                    palettes: [
                        '#c7d2fe', '#818cf8', '#4f46e5', '#4338ca', '#3730a3'
                    ]
                }
        },
        'greens': {
            id: 'Success Color',
            dependentProps: 'success-bg-color,success-border-color,success-text',
            'Success-100': {
                id: 'green-100',
                default: '#dcfce7',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success-300': {
                id: 'green-300',
                default: '#86efac',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success-700': {
                id: 'green-700',
                default: '#15803d',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success-800': {
                id: 'green-800',
                default: '#166534',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success-900': {
                id: 'green-900',
                default: '#14532d',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            }
        },
        'reds': {
            id: 'Danger Color',
            dependentProps: 'danger-bg-color,danger-text,danger-border-color',
            'Danger-300': {
                id: 'red-300',
                default: '#fca5a5',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            },
            'Danger-400': {
                id: 'red-400',
                default: '#f87171',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            },
            'Danger-600': {
                id: 'red-600',
                default: '#dc2626',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            },
            'Danger-700': {
                id: 'red-700',
                default: '#b91c1c',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            },
            'Danger-800': {
                id: 'red-800',
                default: '#991b1b',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            }
        },
        'cyans': {
            id: 'Info Color',
            dependentProps: 'info-bg-color,info-border-color,info-text',
            'Info-300': {
                id: 'cyan-300',
                default: '#67e8f9',
                palettes: [
                    '#67e8f9', '#155e75', '#164e63'
                ]
            },
            'Info-800': {
                id: 'cyan-800',
                default: '#155e75',
                palettes: [
                    '#67e8f9', '#155e75', '#164e63'
                ]
            },
            'Info-900': {
                id: 'cyan-900',
                default: '#164e63',
                palettes: [
                    '#67e8f9', '#155e75', '#164e63'
                ]
            }
        },
        'oranges': {
            id: 'Warning Color',
            dependentProps: 'warning,warning-bg-color,warning-border-color,warning-text',
            'Warning-100': {
                id: 'orange-100',
                default: '#ffedd5',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning-300': {
                id: 'orange-300',
                default: '#fdba74',
                palettes: [
                    '#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316',
                    '#ea580c', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning-700': {
                id: 'orange-700',
                default: '#c2410c',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning-800': {
                id: 'orange-800',
                default: '#9a3412',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning-900': {
                id: 'orange-900',
                default: '#7c2d12',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            }
        },
        'primary': {
            id: 'Primary Variables',
            'Primary Color': {
                id: 'primary',
                default: '#4f46e5',
                defaultName: '$indigo-600',
                defaultCategory: 'indigos',
                palettes: [
                    '#4f46e5', '#15803d', '#dc2626', '#c2410c', '#0e7490', '#007bff',
                    '#6f42c1', '#e83e8c', '#ffc107', '#20c997'
                ]
            },
            'Primary Text': {
                id: 'primary-text',
                default: '#fff',
                defaultName: '$white',
                defaultCategory: 'coolgrays',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
        },
        'success': {
            id: 'Success Variables',
            'Success BG': {
                id: 'success-bg-color',
                default: '#15803d',
                defaultName: '$green-700',
                defaultCategory: 'greens',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success Border': {
                id: 'success-border-color',
                default: '#15803d',
                defaultName: '$green-700',
                defaultCategory: 'greens',
                palettes: [
                    '#dcfce7', '#86efac', '#15803d', '#166534', '#14532d'
                ]
            },
            'Success Text': {
                id: 'success-text',
                default: '#fff',
                defaultName: '$white',
                defaultCategory: 'coolgrays',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            }
        },
        'danger': {
            id: 'Danger Variables',
            'Danger BG': {
                id: 'danger-bg-color',
                default: '#dc2626',
                defaultName: '$red-600',
                defaultCategory: 'reds',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            },
            'Danger Text': {
                id: 'danger-text',
                default: '#fff',
                defaultName: '$white',
                defaultCategory: 'coolgrays',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            },
            'Danger Border': {
                id: 'danger-border-color',
                default: '#dc2626',
                defaultName: '$red-600',
                defaultCategory: 'reds',
                palettes: [
                    '#fca5a5', '#f87171', '#dc2626', '#b91c1c', '#991b1b'
                ]
            }
        },
        'infos': {
            id: 'Info Variables',
            'Info BG': {
                id: 'info-bg-color',
                default: '#0e7490',
                defaultName: '$cyan-700',
                defaultCategory: 'cyans',
                palettes: [
                    '#67e8f9', '#155e75', '#164e63'
                ]
            },
            'Info Border': {
                id: 'info-border-color',
                default: '#0e7490',
                defaultName: '$cyan-700',
                defaultCategory: 'cyans',
                palettes: [
                    '#67e8f9', '#155e75', '#164e63'
                ]
            },
            'Info Text': {
                id: 'info-text',
                default: '#fff',
                defaultName: '$white',
                defaultCategory: 'coolgrays',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            }
        },
        'warning': {
            id: 'Warning Variables',
            'Warning Color': {
                id: 'warning',
                default: '#c2410c',
                defaultName: '$orange-700',
                defaultCategory: 'oranges',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning BG': {
                id: 'warning-bg-color',
                default: '#c2410c',
                defaultName: '$orange-700',
                defaultCategory: 'oranges',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning Border': {
                id: 'warning-border-color',
                default: '#c2410c',
                defaultName: '$orange-700',
                defaultCategory: 'oranges',
                palettes: [
                    '#ffedd5', '#fdba74', '#c2410c', '#9a3412', '#7c2d12'
                ]
            },
            'Warning Text': {
                id: 'warning-text',
                default: '#fff',
                defaultName: '$white',
                defaultCategory: 'coolgrays',
                palettes: [
                    '#fff', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
                    '#374151', '#1F2937', '#111827', '#000'
                ]
            }
        }
    },
    'material-dark': {
        'Primary Color': {
            id: 'primary',
            default: '#3F51B5',
            palettes: [
                '#f34235', '#e81d62', '#9b26af', '#6639b6', '#3e50b4', '#2095f2',
                '#02a8f3', '#00bbd3', '#009587', '#4bae4f', '#8ac249', '#ccdb38',
                '#ffea3a', '#ffc006', '#ff9700', '#ff5621', '#9d9d9d', '#5f7c8a',
                '#785447', '#000000', '#ffffff'
            ]
        },
        'Primary Font': {
            id: 'primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Accent Color': {
            id: 'accent',
            default: '#00b0ff',
            palettes: [
                '#ff8A80', '#ff5252', '#ff1744', '#d50000', '#ff80ab', '#ff4081', '#f50057', '#c51162',
                '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#b388ff', '#7c4dff', '#651fff', '#6200ea',
                '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#82b1fc', '#448aff', '#2979ff', '#2962ff',
                '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4',
                '#a7ffeb', '#64ffda', '#1de986', '#00bfa5', '#b9fbca', '#69f0ae', '#00e676', '#00c853',
                '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00',
                '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#ffe57f', '#ffd740', '#ffc400', '#ffa600',
                '#ffd1b0', '#ffab40', '#ff9100', '#ff6d00', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00',
                '#000000', '#ffffff'
            ]
        },
        'Accent Font': {
            id: 'accent-font',
            default: '#000000',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'fabric-dark': {
        'Primary Color': {
            id: 'theme-primary',
            default: '#0074CC',
            palettes: [
                '#0070F0', '#2F4AD0', '#2972AE', '#886CE5', '#00BCF2', '#309AEF',
                '#0A8A0A', '#027E2F', '#538014', '#028172 ', '#FFC906', '#F26F25',
                '#BD3281', '#BF463B', '#6B4A96', '#BA455A', '#AD1CF8', '#6BBD12',
                '#C62F2F', '#D93F02', '#AC4AA3', '#AA7A2B', '#FFEF22', '#00D085'
            ]
        },
        'Primary font': {
            id: 'theme-primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'bootstrap-dark': {
        'Primary Color': {
            id: 'brand-primary',
            default: '#0070f0',
            palettes: [
                '#0070F0', '#2F4AD0', '#2972AE', '#886CE5', '#00BCF2', '#309AEF',
                '#0A8A0A', '#027E2F', '#538014', '#028172 ', '#FFC906', '#F26F25',
                '#BD3281', '#BF463B', '#6B4A96', '#BA455A', '#AD1CF8', '#6BBD12',
                '#C62F2F', '#D93F02', '#AC4AA3', '#AA7A2B', '#FFEF22', '#00D085'
            ]
        },
        'Primary Font': {
            id: 'brand-primary-font',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        }
    },
    'bootstrap5-dark': {
        'Primary Color': {
            id: 'primary',
            default: '#0d6efd',
            palettes: [
                '#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14',
                '#ffc107', '#198754', '#20c997', '#0dcaf0'
            ]
        },
        'Primary Font': {
            id: 'primary-text-color',
            default: '#fff',
            palettes: [
                '#ffffff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Secondary Color': {
            id: 'secondary',
            default: '#6c757d',
            palettes: [
                '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                '#495057', '#343a40', '#212529' 
            ]
        },
        'Secondary Font': {
            id: 'secondary-text-color',
            default: '#fff',
            palettes: [
                '#fff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                '#495057', '#343a40', '#212529'
            ]
        }
    },
    'fluent-dark': {
        'Primary Color': {
            id: 'primary',
            default: '#0078d4',
            defaultName: '$cyanblue10',
            palettes: [
                '#6610f2', '#0d6efd', '#6f42c1', '#d63384', '#dc3545', '#fd7e14',
                '#ffc107', '#198754', '#20c997', '#0dcaf0'
            ]
        },
        'Primary Font': {
            id: 'primary-text-color',
            default: '#ffffff',
            defaultName: '$white',
            palettes: [
                '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Secondary Color': {
            id: 'secondary',
            default: '#6c757d',
            palettes: [
                '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                '#495057', '#343a40', '#212529' 
            ]
        },
        'Secondary Font': {
            id: 'secondary-text-color',
            default: '#fff',
            palettes: [
                '#fff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                '#495057', '#343a40', '#212529'
            ]
        }  
    },
    'tailwind-dark': {
        'Primary Color': {
            id: 'primary',
            default: '#22d3ee',
            defaultName: '$cyan-400',
            palettes: [
                '#22d3ee', '#374151', '#f87171', '#22c55e', '#f97316', '#0891b2',
                '#38bdf8'
            ]
        },
        'Primary Font': {
            id: 'primary-text-color',
            default: '#000',
            defaultName: '$black',
            palettes: [
                '#fff', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Secondary Color': {
            id: 'secondary-bg-color',
            default: '#1f2937',
            defaultName: '$cool-gray-800',
            palettes: [
                '#1f2937', ''
            ]
        },
        'Secondary Font': {
            id: 'secondary-text-color',
            default: '#fff',
            defaultName: '$white',
            palettes: [
                '#fff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d',
                '#495057', '#343a40', '#212529'
            ]
        }
    },
    'highcontrast': {
        'Selection BG': {
            id: 'selection-bg',
            default: '#FFD939',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Selection Border': {
            id: 'selection-border',
            default: '#FFD939',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Selection Font': {
            id: 'selection-font',
            default: '#000000',
            palettes: [
                '#FFFFFF', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Hover BG': {
            id: 'hover-bg',
            default: '#685708',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Hover Border': {
            id: 'hover-border',
            default: '#ffffff',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        },
        'Hover Font': {
            id: 'hover-font',
            default: '#FFFFFF',
            palettes: [
                '#FFFFFF', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F',
                '#6E6E6E', '#595959', '#3F3F3F', '#262626', '#0C0C0C', '#000000'
            ]
        },
        'Disable': {
            id: 'disable',
            default: '#757575',
            palettes: ['#3aca4d', '#ffd939', '#cc76f6', '#18d2eb', '#fe8aeb', '#5b94ff',
                '#ff82aa', '#7D8DFF', '#00D8AE', '#FF7C7E', '#7AA8FF', '#FF8860',
                '#00CBF1', '#7ED321', '#FD852F', '#E0FF00', '#CDE6F7', '#C09EF7',
                '#35D283', '#7FCBFE', '#DBE782', '#FFFFFF'
            ]
        }
    },
};

(function () {
    isInitRender = true;
    themeDropDown = document.getElementById('dropdownMenu1');
    themeDropDownText = document.getElementById('themeDropText');
    themeBodyLeftOverlay = ej.base.select('.theme-body-left-overlay');

    setThemeColors();
    renderPopups();
    initRender();

    var localSettings = localStorage.getItem('sf-theme-studio');
    if (localSettings && localSettings !== 'null') {
        isInitRender = false;
        var themeProps = JSON.parse(localSettings)
        currentTheme = themeProps.theme;
        isAdvancedChecked = themeProps.isAdvanced ? themeProps.isAdvanced : false;
        renderRightPane();
        renderProperties(currentTheme);
        refreshColorPickerBG();
        applyExistingChanges(themeProps);
    }
    else {
        renderRightPane();
        changeCheckedState({ checked: true });
        setSelectAllState();
        var queryString = window.location.search;
        if (queryString.indexOf(QUERY_STRING) !== -1) {
            currentTheme = queryString.replace(GOOGLE_REGEX, '').replace(QUERY_STRING, '').trim();
            loadTheme(currentTheme, false);
        } else {
            loadDefaultTheme(MATERIAL3);
        }
    }
    window.onbeforeunload = () => {
        setTimeout(() => {
            setLocalStorage();
        }, 0)
    };
})();

// Renders common controls in the application.
function initRender() {
    // rendering tooltip for filter, import, and compatibility icons.
    var filterTooltip = new ej.popups.Tooltip({ content: 'Filter' });
    filterTooltip.appendTo('#filters');
    var importTooltip = new ej.popups.Tooltip({ content: 'Import' });
    importTooltip.appendTo('#imports');
    var saveTooltip = new ej.popups.Tooltip({ content: 'Clear localStorage changes in the Browser' });
    saveTooltip.appendTo('#remove-local-storage');
    var compatibilityTooltip = new ej.popups.Tooltip({
        content: 'Using these compatibility theme files you can render both Essential JS 1 and Essential JS 2 components in a single page.'
    });
    compatibilityTooltip.appendTo('#import');

    // rendering controls inside filter dialog.
    selectAllDiv = ej.base.select('.theme-filter-select-all');

    var compatibilityCheck = new ej.buttons.CheckBox({
        label: 'Include compatibility css'
    });
    compatibilityCheck.appendTo('#ts-checkbox');
    document.getElementById('remove-local-storage').onclick = () => {
        isLocalStorageCleared = true;
        localStorage.setItem('sf-theme-studio', null);
        location.reload();
    };
    document.getElementById('filters').onclick = () => {
        document.getElementById('filters').classList.add('actives');
        filterDialog.show();
    };
    document.getElementById('download-now').onclick = () => {
        ej.base.select('#default-input').value = currentTheme;
        exportDialog.show();
        document.getElementById('downloads-info').style.display = '';
    };
    var selectAll = new ej.buttons.CheckBox({
        checked: false,
        label: 'Select all',
        change: changeCheckedState
    });
    selectAll.appendTo('#filter-select-all');

    fCategoriesCheckbox = ej.base.selectAll('.theme-filter-body .category-checkbox input');
    fControlsCheckbox = ej.base.selectAll('.theme-filter-body .control-checkbox input');
    for (var fCategory of fCategoriesCheckbox) {
        var inputs = ej.base.selectAll(`[data="${fCategory.id}"] input`);
        for (var input of inputs) {
            filteredData.controls.push({
                name: input.value
            });
            filteredData.categories[input.value] = fCategory.id;
        }
        createCheckBox(fCategory, true);
    }

    filterDefaultData = new ej.data.DataManager(filteredData.controls);
    for (var fControl of fControlsCheckbox) {
        createCheckBox(fControl, false);
    }
    for (var hiddenControl of HIDDEN_CONTROLS) {
        if(document.getElementById(hiddenControl)!=null){
            document.getElementById(hiddenControl).style.display = 'none';
        }
    }

    infoToast = new ej.notifications.Toast({
        position: {
            X: 'Right',
            Y: 'Top'
        },
        timeOut: 0,
        icon: 'e-info',
        width: '430px',
        height: '450px',
        title: 'Important!',
        showCloseButton: true,
        target: document.body,
        cssClass: 'e-toast-info',
        animation: {
            show: { effect: 'SlideTopIn' },
            hide: { effect: 'FadeZoomOut' },
        },
        content: `
        <div class='e-toast-content'>
            <div class='info-toast-content'>The following list of components are hidden by default at the initial loading. Please add it from the filter (<span class='theme-header-icon header-icon-filter toast-header-icon'></span>) option in the header if it is needed in your project.</div>
            <div class='info-toast-controls' style="height:120px">
                <ul>
                    <li>PivotTable</li>
                    <li>TreeGrid</li>
                    <li>Spreadsheet</li>
                    <li>Gantt</li>
                    <li>RichTextEditor</li>
                    <li>Document Editor</li>
                    <li>FileManager</li>
                    <li>Kanban</li>
                    <li>PDF Viewer</li>
                    <li>Dashboard Layout</li>
                    <li>Avatar</li>
                    <li>Sidebar</li>
                </ul>
            </div>
            <hr>
            <div class='info-toast-note-content'>We will store your custom colors in the browser's localStorage when you refresh or exit the application. The previous changes will be restored when you re-enter in the application again. You can clear the previous changes by clicking the ( <span class='remove-local-storage-icon toast-clean-icon'></span> ) icon in the header.</div>
        </div>
        `
    });
    if (isBlazor()) {
        infoToast.content = `<div class='e-toast-content'>
            <div class='info-toast-content'>The following list of components are hidden by default at the initial loading. Please add it from the filter (<span class='theme-header-icon header-icon-filter toast-header-icon'></span>) option in the header if it is needed in your project.</div>
            <div class='info-toast-controls' style="height:120px">
                <ul>
                    <li>PivotTable</li>
                    <li>TreeGrid</li>
                    <li>Gantt</li>
                    <li>RichTextEditor</li>
                    <li>Document Editor</li>
                    <li>FileManager</li>
                    <li>Kanban</li>
                    <li>PDF Viewer</li>
                    <li>Dashboard Layout</li>
                    <li>Avatar</li>
                    <li>Sidebar</li>
                </ul>
            </div>
            <hr>
            <div class='info-toast-note-content'>We will store your custom colors in the browser's localStorage when you refresh or exit the application. The previous changes will be restored when you re-enter in the application again. You can clear the previous changes by clicking the ( <span class='remove-local-storage-icon toast-clean-icon'></span> ) icon in the header.</div>
        </div>`;
    }
    infoToast.appendTo('#info-toast');

    document.addEventListener('keyup', (e) => {
        // esc key configuration
        if (e.keyCode == 27) {
            filterDialog.hide();
            exportDialog.hide();
            importDialog.hide();
        }
    });
}

// Set themeColors for each theme from THEME_PROPERTIES.
function setThemeColors() {
    for (var themeName of THEMES) {
        var colors = {};
        var properties = THEME_PROPERTIES[themeName];
        var propertyKeys = Object.keys(properties);
        if (themeName !== BOOTSTRAP4 && themeName !== 'tailwind') {
            for (var property of propertyKeys) {
                var prop = properties[property];
                colors['$' + prop.id] = prop.default;
            }
        }
        else {
            for (var property of propertyKeys) {
                var subProperties = properties[property];
                var subPropertyKeys = Object.keys(subProperties);
                for (var subProperty of subPropertyKeys) {
                    if (subProperty === 'id' || subProperty === 'dependentProps') {
                        continue;
                    }
                    var prop = subProperties[subProperty];
                    colors['$' + prop.id] = prop.default;
                }
            }
        }
        themeColors[themeName] = colors;
    }
    defaultThemeColors = ej.base.extend({}, themeColors, {}, true);
}

// Renders popup for filtering, exporting, and importing functionalities.
function renderPopups() {
    // rendering controls in filter dialog.
    ej.base.select('.theme-filter-header').style.display = 'none';
    var template = ej.base.select('#filter-content-template');
    template.parentElement.removeChild(template);
    var filterContent = `
    <div>
        <div class='filter-header'>
            <span class='header-content'>Filter</span>
            <div class='filter-dialog-close'>
                <span class='e-icons close-icon'></span>
            </div>
        </div>
        ${template.innerHTML}
    </div>
    <div id='filter-buttons'>   
        <button type='button' class='btn btn-primary' id='apply'>APPLY</button>
        <button type='button' class='btn btn-default' id='cancel-filter'>CANCEL</button>
    </div>`
    filterDialog = renderDialog('#filter-dialog', '50%', filterContent);
    var filterElement = filterDialog.element;
    ej.base.select('.filter-dialog-close', filterElement).addEventListener('click', function () { filtering(false) });
    ej.base.select('#apply', filterElement).addEventListener('click', function () { filtering(true) });
    ej.base.select('#cancel-filter', filterElement).addEventListener('click', function () { filtering(false) });
    ej.base.select('#filter-search-input', filterElement).addEventListener('keyup', function (e) { filterSearch(this.value); });

    // rendering export dialog
    var exportContent = `
    <div id='export-dialogs'>
        <div class='headers'>
            <span class='header-content'>Download</span>
            <div class='filter-dialog-close'>
                <span class='e-icons close-icon'></span>
            </div>
        </div>
        <div class='form-group'>
            <label for='default-input' id='input-font'>File Name</label>
            <input class='form-control form-control-sm' id='default-input' type='text' /> 
        </div>
        <div class='download-options' style='display:none' id='downloads-info'>
            <div class='include-css'>
                <input id='ts-checkbox' type='checkbox' value='compatibility'>
            </div>
            <div class='comp-info' id='import'>
                <span class='e-icons sb-compatible-info sb-icons' ></span>
            </div>
        </div>
    </div>
    <div id='export-buttons'>
        <button type='button' class='btn btn-primary' id='download'>DOWNLOAD</button>
        <button type='button' class='btn btn-default' id='export-cancel'>CANCEL</button>
    <div>`;
    exportDialog = renderDialog('#export-dialog', '330px', exportContent);
    var exportElement = exportDialog.element;
    ej.base.select('.filter-dialog-close', exportElement).addEventListener('click', function () { exporting(false) });
    ej.base.select('#download', exportElement).addEventListener('click', function () { exporting(true) });
    ej.base.select('#export-cancel', exportElement).addEventListener('click', function () { exporting(false) });

    // rendering import dialog.
    importDialog = renderDialog('#import-dialog', '300px');
    ej.base.select('#imports').onclick = function () {
        this.classList.add('actives');
        ej.base.select('#contents').style.display = '';
        ej.base.select('#import-settings').disabled = true;
        importDialog.show();
    };

    // Configure upload file hint content.
    ej.base.L10n.load({
        'en-US': {
            'uploader': {
                dropFilesHint: 'Select theme file'
            }
        }
    });

    // rendering upload control inside import dialog.
    var uploadControl = new ej.inputs.Uploader({
        allowedExtensions: '.json',
        dropArea: document.getElementById('dropArea'),
        asyncSettings: {
            saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
        },
        removing: function (args) {
            var li = ej.base.select(`[data-file-name="${args.filesData[0].name}"]`, this.uploadWrapper);
            if (li.classList.contains('e-icon-spinner')) {
                return;
            }
            ej.base.select('#import-settings').disabled = true;
        },
        success: function (args) {
            if (args.operation === 'upload') {
                ej.base.select('#import-settings').disabled = false;
            }
            else {
                ej.popups.hideSpinner(this.uploadWrapper);
                ej.base.detach(this.uploadWrapper.querySelector('.e-spinner-pane'));
            }
        }
    });
    uploadControl.appendTo('#file-uploads');
}

function isBlazor() {
    if (document.body.className.endsWith("blazor")) {
        return true;
    } else {
        return false;
    }
}

// Rendering dialog control by defined model.
function renderDialog(elementId, dialogWidth, dialogContent) {
    var dialogObj = {
        modal: true,
        isModal: true,
        visible: false,
        width: dialogWidth,
        animationSettings: {
            effect: 'None'
        },
        target: document.body,
    };
    if (dialogContent) {
        dialogObj['content'] = dialogContent;
    }
    var dialog = new ej.popups.Dialog(dialogObj);
    dialog.appendTo(elementId);
    return dialog;
}

// Load themes
function loadTheme(themeName, isOverlay) {
    if (themeName !== BOOTSTRAP4 && themeName !== 'tailwind') {
        isAdvancedChecked = false;
    }
    showOverlay(isOverlay);
    refreshColorPickerBG();
    loadDefaultTheme(themeName, true);
}

// Refresh color-picker background when imports existing settings.json.
function refreshColorPickerBG() {
    var wrapperElements = ej.base.selectAll('.e-colorpicker-wrapper', ej.base.select('#theme-properties'));
    for (var element of wrapperElements) {
        changeButtonClass(element, ej.base.select('input', element).ej2_instances[0].value);
    }
}

function compileTheme(themeProperties, callback) {
    var themeProps = themeProperties ? themeProperties : {};
    if (!themeProperties) {
        themeProps['theme'] = currentTheme;
        themeProps['isCustomTheme'] = DEFAULT_THEMES.indexOf(currentTheme) === -1;
        themeProps['properties'] = themeColors[currentTheme];
        setDependencies();
        themeProps['dependencies'] = window.dependencies;
    }
    ajaxRequest(NODEJS_URL + 'CompileTheme', themeProps, function (data) {
        document.getElementById('custom-theme').innerHTML = data;
        callback();
    });
}

// Change the href with new theme name by using history replaceState method.
function refreshUrl(themeName) {
    currentTheme = themeName;
    var baseUrl = window.location.href;
    if (baseUrl.match(QUERY_REGEX)) {
        baseUrl = baseUrl.replace(QUERY_REGEX, '').trim();
    }
    history.replaceState({}, '', baseUrl + QUERY_STRING + themeName);

    // Refresh class name in the body tag with current theme name.
    var classList = THEMES.map(function (theme) {
        return 'sf-' + theme;
    });
    ej.base.removeClass([document.body], classList);
    ej.base.addClass([document.body], 'sf-' + themeName);
}

function loadDefaultTheme(themeName) {
    refreshUrl(themeName);

    themeColors = ej.base.extend({}, defaultThemeColors, {}, true);
    compileTheme(null, () => {
        if (isFilterApplied) {
            generateFilterHtml();
        }
        else {
            destroyControls();
            renderControls();
        }
        // Hide specified controls for fusion theme.
        if (themeName === 'fusion') {
            var hideControls = ['drop-down-tree','spreadsheet', 'kanban', 'pdfviewer'];
            for (var control of hideControls) {
                if (document.getElementById(control) != null) {
                    document.getElementById(control).style.display = 'none';
                }              
            }
        }
        // 2500ms delay for applying app styles.
        setTimeout(() => {
            removeOverlay(true);
            renderTwoColumnLayout();
            ej.base.select('.theme-filter-header').style.display = '';
            if (isInitRender) {
                infoToast.show();
                isInitRender = false;
            }
        }, 2500);
    });
    applyAppStyles();
}

// generate and apply styles used in the application.
function applyAppStyles() {
    var appDependencies = setDependencies(true);
    if (appDependencies.length === 1) {
        return;
    }
    var themeProps = {};
    themeProps['theme'] = currentTheme;
    themeProps['dependencies'] = appDependencies;
    themeProps['properties'] = themeColors[currentTheme];
    themeProps['isCustomTheme'] = DEFAULT_THEMES.indexOf(currentTheme) === -1;
    ajaxRequest(NODEJS_URL + 'ApplyAppStyles', themeProps, (data) => {
        document.getElementById('app-controls').innerHTML = data;
    });
}

// Make ajax post request to process in server side.
function ajaxRequest(postUrl, themeProps, callback) {
    var ajax = new ej.base.Ajax({
        type: 'POST',
        url: postUrl,
        contentType: 'application/json; charset=utf-8',
        processData: false,
        data: JSON.stringify(themeProps)
    }, 'POST', true);
    ajax.send();
    ajax.onSuccess = function (data) {
        callback(data);
    };
}

// Generates filter HTML to render the controls in specific layouts.
function generateFilterHtml() {
    var count = 1;
    var bigHtml = '';
    var smallHtml = {
        col1: '',
        col2: '',
        col3: ''
    };
    var twoColumnHtml = '';
    setControlContents();
    var smallCards = Object.keys(categories.small.card);
    for (var smallCard of smallCards) {
        if (TWO_COLUMN_CONTROLS.indexOf(smallCard) !== -1) {
            twoColumnHtml += cardsContent[smallCard];
        } else {
            smallHtml[`col${count}`] += cardsContent[smallCard];
            count = count === 3 ? 1 : ++count;
        }
    }

    var smallControls = Object.keys(categories.small.controls);
    for (var smallControl of smallControls) {
        if (categories.small.controls[smallControl].checked.length > 0) {
            smallHtml[`col${count}`] += cardsContent[smallControl];
            count = count === 3 ? 1 : ++count;
            hiddenControls = hiddenControls.concat(categories.small.controls[smallControl].unchecked);
        }
    }

    var bigControls = Object.keys(categories.big);
    for (var bigControl of bigControls) {
        bigHtml += cardsContent[bigControl];
    }

    destroyControls();
    ej.base.select('#col-1').innerHTML = smallHtml.col1;
    ej.base.select('#col-2').innerHTML = smallHtml.col2;
    ej.base.select('#col-3').innerHTML = smallHtml.col3;
    ej.base.select('#big-control').innerHTML = bigHtml;
    ej.base.select('#two-column-control').innerHTML = twoColumnHtml;
    renderControls();

    if (hiddenControls.length) {
        var elements = ej.base.selectAll(hiddenControls.map(control => `#${control}`).join(','));
        for (var element of elements) {
            element.style.display = 'none';
        }
    }
}

// Destroy rendered controls in the left pane.
function destroyControls() {
    var elements = ej.base.selectAll('.e-control', ej.base.select('#control-section'));
    for (var element of elements) {
        if (element.ej2_instances) {
            for (var control of element.ej2_instances) {
                if (!control.isDestroyed) {
                    control.destroy();
                }
            }
        }
    }
}

function isFiltered(controlName) {
    return filteredControls.indexOf(controlName) !== -1;
}

function setControlContents() {
    if (!controlContent) {
        var cardElements = ej.base.selectAll('.layout-card');
        for (var element of cardElements) {
            cardsContent[element.id] = element.outerHTML;
        }
        controlContent = ej.base.select('#controls').innerHTML;
    } else if (!isFilterApplied) {
        ej.base.select('#controls').innerHTML = (controlContent);
    }
}

// Renders the controls in the left pane.
function renderControls() {
    ej.base.enableRipple(currentTheme === MATERIAL || currentTheme === 'material-dark');

    setControlContents();

    // set visible to hidden controls which is filtered already.
    for (var controlId of HIDDEN_CONTROLS) {
        var hiddenControl = document.getElementById(controlId);
        if (filteredControls.indexOf(controlId) !== -1 && hiddenControl) {
            hiddenControl.style.display = '';
        }
    }

    // rendering numeric text-box control
    if (isFiltered('numerictextbox')) {
        var numericTextbox = new ej.inputs.NumericTextBox({
            value: 15
        });
        numericTextbox.appendTo('#sf-numeric-textbox');
    }

    // rendering masked text-box control
    if (isFiltered('maskedtextbox')) {
        var maskedTextbox = new ej.inputs.MaskedTextBox({
            mask: '000-000-0000'
        });
        maskedTextbox.appendTo('#sf-masked-textbox');
    }

    // rendering signature control
    if (isFiltered('signature')) {
        var signature = new ej.inputs.Signature({});
        signature.appendTo('#sf-signature');
    }

    // rendering slider control
    if (isFiltered('slider')) {
        var slider = new ej.inputs.Slider({
            value: 30,
            type: 'MinRange',
            tooltip: { isVisible: true, showOn: 'Focus' },
        });
        slider.appendTo('#sf-slider');
    }

    // rendering grid control
    if (isFiltered('grid')) {
        var grid = new ej.grids.Grid({
            allowPaging: true,
            allowGrouping: true,
            allowFiltering: true,
            dataSource: window.gridData,
            filterSettings: { type: 'Menu' },
            groupSettings: { columns: ['OrderID'] },
            pageSettings: { pageCount: 3, pageSize: 3 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120 },
                { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 120 },
                { field: 'Freight', width: 120, format: 'C2', width: 130 },
                { field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', width: 180 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ],
            actionComplete: (args) => {
                if (args.requestType === 'grouping') {
                    grid.pageSettings.pageSize = 3;
                }
                if (args.requestType === 'ungrouping') {
                    grid.pageSettings.pageSize = 6;
                }
            }
        });
        grid.appendTo('#sf-grid');

        // Change Grid card size based on theme name.
        var isBiggerSize = currentTheme.indexOf('highcontrast') !== -1 || currentTheme.indexOf('fabric') !== -1;
        ej.base.select('#sf-grid').closest('.e-card-content').style.height = isBiggerSize ? '420px' : '400px';
    }

    // rendering auto-complete control
    if (isFiltered('auto-complete')) {
        var autoComplete = new ej.dropdowns.AutoComplete({
            dataSource: window.sportsData,
            placeholder: 'e.g. Basketball'
        });
        autoComplete.appendTo('#sf-auto-complete');
    }

    // rendering dropdown list control
    if (isFiltered('drop-down-list')) {
        var dropdownList = new ej.dropdowns.DropDownList({
            index: 2,
            popupHeight: '200px',
            placeholder: 'Select a game'
        });
        dropdownList.appendTo('#sf-drop-down-list');
    }

    // rendering dropdown tree control
    if (isFiltered('drop-down-tree')) {
        //define the array of JSON
        var data = [
            {
                 nodeId: '01', nodeText: 'Music',
                 nodeChild: [
                      { nodeId: '01-01', nodeText: 'Gouttes.mp3' }
                 ]
            },
            {
                 nodeId: '02', nodeText: 'Videos', expanded: true,
                 nodeChild: [
                      { nodeId: '02-01', nodeText: 'Naturals.mp4' },
                      { nodeId: '02-02', nodeText: 'Wild.mpeg' },
                 ]
            },
            {
                 nodeId: '03', nodeText: 'Documents',
                 nodeChild: [
                      { nodeId: '03-01', nodeText: 'Environment Pollution.docx' },
                      { nodeId: '03-02', nodeText: 'Global Water, Sanitation, & Hygiene.docx' },
                      { nodeId: '03-03', nodeText: 'Global Warming.ppt' },
                      { nodeId: '03-04', nodeText: 'Social Network.pdf' },
                      { nodeId: '03-05', nodeText: 'Youth Empowerment.pdf' },
                 ]
            }];
        var dropdownTree = new ej.dropdowns.DropDownTree({
             //binding data source through fields property
             fields: { dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' }
        });
        dropdownTree.appendTo('#sf-drop-down-tree');
    }

    // rendering dialog control
    if (isFiltered('dialog')) {
        var dialog = new ej.popups.Dialog({
            width: '40%',
            isModal: true,
            showCloseIcon: true,
            header: 'Delete Multiple Items',
            animationSettings: { effect: 'None' },
            content: '<span>Are you sure you want to permanently delete these items ?</span>',
            target: document.getElementById('theme-dialog-wrapper'),
            buttons: [
                {
                    click: () => {
                        dialog.hide();
                    },
                    buttonModel: { content: 'Yes', isPrimary: true }
                },
                {
                    click: () => {
                        dialog.hide();
                    },
                    buttonModel: { content: 'No' }
                }
            ],
        });
        dialog.appendTo('#sf-dialog');
        // create button to open the dialog control
        var dialogBtn = new ej.buttons.Button({});
        dialogBtn.appendTo('#sf-dialog-button');
        document.getElementById('sf-dialog-button').onclick = () => dialog.show();
    }

    // rendering multi-select control
    if (isFiltered('multi-select')) {
        var multiSelect = new ej.dropdowns.MultiSelect({
            mode: 'Box',
            placeholder: 'Favorite Sports'
        });
        multiSelect.appendTo('#sf-multi-select');
    }

    // rendering combo-box control
    if (isFiltered('combo-box')) {
        var comboBox = new ej.dropdowns.ComboBox({
            popupHeight: '270px',
            allowFiltering: true,
            placeholder: 'Select a country',
            dataSource: window.ddCountryData,
            fields: { text: 'Name', value: 'Code' },
            filtering: (e) => {
                var query = new ej.data.Query();
                query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
                e.updateData(window.ddCountryData, query);
            }
        });
        comboBox.appendTo('#sf-combo-box');
    }

    // rendering calendar control
    if (isFiltered('calendar')) {
        var calendar = new ej.calendars.Calendar({});
        calendar.appendTo('#sf-calendar');
    }

    // rendering date-picker control
    if (isFiltered('datepicker')) {
        var datePicker = new ej.calendars.DatePicker();
        datePicker.appendTo('#sf-datepicker');
    }

    // rendering time-picker control
    if (isFiltered('timepicker')) {
        var timePicker = new ej.calendars.TimePicker();
        timePicker.appendTo('#sf-timepicker');
    }

    // rendering date-time-picker control
    if (isFiltered('datetimepicker')) {
        var dateTimePicker = new ej.calendars.DateTimePicker();
        dateTimePicker.appendTo('#sf-datetimepicker');
    }

    // rendering date-range-picker control
    if (isFiltered('daterangepicker')) {
        var dateRangePicker = new ej.calendars.DateRangePicker();
        dateRangePicker.appendTo('#sf-daterangepicker');
    }

    // rendering button controls
    if (isFiltered('button')) {
        var normalButton = new ej.buttons.Button({});
        normalButton.appendTo('#sf-normal-button');
        var primaryButton = new ej.buttons.Button({ isPrimary: true });
        primaryButton.appendTo('#sf-primary-button');
        var outlineButton = new ej.buttons.Button({ cssClass: 'e-outline', isPrimary: true });
        outlineButton.appendTo('#sf-outline-button');
        var successButton = new ej.buttons.Button({ cssClass: 'e-success' });
        successButton.appendTo('#sf-success-button');
        var warningButton = new ej.buttons.Button({ cssClass: 'e-warning' });
        warningButton.appendTo('#sf-warning-button');
        var toggleButton = new ej.buttons.Button({
            isToggle: true,
            cssClass: 'e-flat e-primary',
            iconCss: 'e-btn-sb-icons e-play-icon'
        });
        toggleButton.appendTo('#sf-toggle-button');
        toggleButton.element.onclick = function () {
            if (toggleButton.element.classList.contains('e-active')) {
                toggleButton.content = 'Pause';
                toggleButton.iconCss = 'e-btn-sb-icons e-pause-icon';
            } else {
                toggleButton.content = 'Play';
                toggleButton.iconCss = 'e-btn-sb-icons e-play-icon';
            }
        };
    }

    // rendering dropdown button controls
    if (isFiltered('drop-down-button')) {
        var dropDownButton = new ej.splitbuttons.DropDownButton({ items: window.dropDownButtonItems });
        dropDownButton.appendTo('#sf-drop-down-button');
        dropDownButton = new ej.splitbuttons.DropDownButton({ items: window.dropDownButtonItems, cssClass: 'e-caret-hide' });
        dropDownButton.appendTo('#sf-drop-down-button-custom');
        dropDownButton = new ej.splitbuttons.DropDownButton({
            cssClass: 'e-primary',
            iconCss: 'e-ddb-icons e-profile',
            items: window.dropDownButtonItems
        });
        dropDownButton.appendTo('#sf-drop-down-button-icon');
    }

    // rendering split button controls
    if (isFiltered('split-button')) {
        var splitButton = new ej.splitbuttons.SplitButton({ items: splitButtonItems, iconCss: 'e-btn-icons e-paste' });
        splitButton.appendTo('#sf-split-button-icons');
        splitButton = new ej.splitbuttons.SplitButton({ items: splitButtonItems, content: 'Paste', cssClass: 'e-primary' });
        splitButton.appendTo('#sf-split-button-primary');
        splitButton = new ej.splitbuttons.SplitButton({ items: splitButtonItems, content: 'Paste', iconCss: 'e-btn-icons e-paste' });
        splitButton.appendTo('#sf-split-button-context');
    }

    // rendering list view control
    if (isFiltered('listview')) {
        var listView = new ej.lists.ListView({
            dataSource: window.listData,
            fields: { groupBy: 'category' }
        });
        listView.appendTo('#sf-listview');
    }

    // rendering tree view control
    if (isFiltered('treeview')) {
        var treeView = new ej.navigations.TreeView({
            fields: {
                id: 'id',
                text: 'name',
                child: 'subChild',
                dataSource: window.hierarchicalData
            }
        });
        treeView.appendTo('#sf-treeview');
    }

     // rendering ribbon control
     if (isFiltered('ribbon')) {
        var fontSize = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72', '96'];
    var fontStyle = ['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Courier New', 'Candara', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Windings'
    ];
    var tabs = [{
        header: "Home",
        groups: [{
            header: "Clipboard",
            showLauncherIcon: true,
            groupIconCss: 'e-icons e-paste',
            collections: [{
                items: [{
                    type: 'SplitButton',
                    simplifiedMode: 'Group',
                    disabled: true,
                    id: 'pastebtn',
                    allowedSize: ej.ribbon.RibbonItemSize.Large,
                    splitButtonSettings: {
                        iconCss: 'e-icons e-paste',
                        items: [{ text: 'Keep Source Format' }, { text: 'Merge format' }, { text: 'Keep text only' }],
                        content: 'Paste'
                    }
                }]
            }, {
                items: [{
                    type: 'Button',
                    buttonSettings: {
                        content: 'Cut',
                        iconCss: 'e-icons e-cut',
                        clicked: function () { enablePaste(); },
                        simplifiedMode: 'Popup'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        simplifiedMode: 'Group',
                        content: 'Copy',
                        clicked: function () { enablePaste(); },
                        iconCss: 'e-icons e-copy'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        simplifiedMode: 'Auto',
                        content: 'Format Painter',
                        iconCss: 'e-icons e-format-painter'
                    }
                }]
            },]
        }, {
            header: "Font",
            isCollapsible: false,
            enableGroupOverflow: true,
            orientation: 'Row',
            groupIconCss: 'e-icons e-bold',
            cssClass: 'font-group',
            collections: [{
                items: [{
                    type: 'ComboBox',
                    simplifiedMode:'Group',
                    comboBoxSettings: {
                        dataSource: fontStyle,
                        index: 3,
                        allowFiltering: true,
                        width: '150px'
                    }
                }, {
                    type: 'ComboBox',
                    simplifiedMode: 'Group',
                    comboBoxSettings: {
                        dataSource: fontSize,
                        index: 3,
                        width: '65px'
                    }
                }]
            }, {
                items: [{
                        type: 'ColorPicker',
                        displayOptions: ej.ribbon.DisplayMode.Simplified,
                        allowedSizes: ej.ribbon.RibbonItemSize.Small,
                        colorPickerSettings: {
                            value: '#123456',
                        }
                    },{
                        type: 'Button',
                        allowedSize: ej.ribbon.RibbonItemSize.Small,
                        buttonSettings: {
                            iconCss: 'e-icons e-bold'
                        }
                    }, {
                        type: 'Button',
                        allowedSize: ej.ribbon.RibbonItemSize.Small,
                        buttonSettings: {
                            iconCss: 'e-icons e-italic'
                        }
                    }, {
                        type: 'Button',
                        allowedSize: ej.ribbon.RibbonItemSize.Small,
                        buttonSettings: {
                            iconCss: 'e-icons e-underline'
                        }
                    },{
                        allowedSize: ej.ribbon.RibbonItemSize.Small,
                        type: 'Button',
                        buttonSettings: {
                            iconCss: 'e-icons e-strikethrough'
                        }
                    }, {
                        allowedSize:ej.ribbon.RibbonItemSize.Small,
                        type: 'Button',
                        buttonSettings: {
                            iconCss: 'e-icons e-change-case'
                        }
                    }
                ]
            }]
        }, {
            header: "Editing",
            groupIconCss: 'e-icons e-edit',
            orientation: 'Column',
            collections: [{
                items: [{
                    type: 'SplitButton',
                    splitButtonSettings: {
                        iconCss: 'e-icons e-search',
                        content: 'Find',
                        items: [
                            { text: 'Find', iconCss: 'e-icons e-search' },
                            { text: 'Advanced find', iconCss: 'e-icons e-search' },
                            { text: 'Go to', iconCss: 'e-icons e-arrow-right' }
                        ]
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        content: 'Replace',
                        iconCss: 'e-icons e-replace'
                    }
                }, {
                    type: 'SplitButton',
                    splitButtonSettings: {
                        iconCss: 'e-icons e-mouse-pointer',
                        content: 'Select',
                        items: [{ text: 'Select All' }, { text: 'Select Objects' }]
                    }
                }]
            }]
        }, {
            header: "Voice",
            isCollapsible: false,
            groupIconCss: 'sf-icon-dictate',
            collections: [{
                items: [{
                    type: 'SplitButton',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    splitButtonSettings: {
                        content: 'Dictate',
                        iconCss: 'sf-icon-dictate',
                        items: [{ text: 'Chinese' }, { text: 'English' }, { text: 'German' }, { text: 'French' }]
                    }
                }]
            }]
        }, {
            header: "Editor",
            isCollapsible: false,
            groupIconCss: 'sf-icon-editor',
            collections: [{
                items: [{
                    type: 'Button',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    buttonSettings: {
                        content: 'Editor',
                        iconCss:'sf-icon-editor'
                    }
                }]
            }]
        }, {
            header: "Reuse Files",
            isCollapsible: false,
            groupIconCss: 'sf-icon-reuse',
            collections: [{
                items: [{
                    type: 'Button',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    disabled: true,
                    buttonSettings: {
                        iconCss:'sf-icon-reuse',
                        content: 'Reuse Files'
                    }
                }]
            }]
        }]
    }, {
        header: 'Insert',
        groups: [{
            header: 'Tables',
            isCollapsible: false,
            collections: [{
                id: 'defaultcollection9',
                items: [{
                    id: 'defaultitem18',
                    simplifiedMode:'Group',
                    type: 'SplitButton',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    splitButtonSettings: {
                        iconCss: 'e-icons e-table',
                        content: 'Table',
                        items: [
                            { text: 'Insert Table' }, { text: 'Draw Table' },
                            { text: 'Convert Table' }, { text: 'Excel SpreadSheet' }
                        ]
                    }
                }]
            }]
        }, {
            header: 'Illustrations',
            showLauncherIcon: true,
            orientation: 'Row',
            enableGroupOverflow: true,
            collections: [{
                items: [{
                    type: 'SplitButton',
                    splitButtonSettings: {
                        content: 'Pictures',
                        iconCss: 'e-icons e-image',
                        items: [{ text: 'Stock Images' }, { text: 'This device' }, { text: 'Online Images' }]
                    }
                }, {
                    type: 'SplitButton',
                    splitButtonSettings: {
                        content: 'Shapes',
                        iconCss:'sf-icon-shapes',
                        items: [{ text: 'Lines' }, { text: 'Rectangles' }, { text: 'Basic Arrows' }, { text: 'Basic Shapes' }, { text: 'FlowChart' }]
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        content: '3D Models',
                        iconCss:'sf-icon-3d-model'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        iconCss: 'sf-icon-smart-art',
                        content: 'SmartArt',
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        content: 'Chart',
                        iconCss:'sf-icon-chart'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        content: 'Screenshot',
                        iconCss:'sf-icon-screenshot'
                    }
                }]
            }]
        }, {
            header: 'Header & Footer',
            showLauncherIcon: true,
            orientation: 'Column',
            groupIconCss: 'e-icons e-table',
            collections: [{
                items: [{
                    type: 'DropDown',
                    dropDownSettings: {
                        content: 'Header',
                        iconCss: 'e-icons e-header',
                        items: [{ text: 'Insert Header' }, { text: 'Edit Header' }, { text: 'Remove Header' }]
                    }
                }, {
                    type: 'DropDown',
                    dropDownSettings: {
                        iconCss: 'e-icons e-footer',
                        content: 'Footer',
                        items: [{ text: 'Insert Footer' }, { text: 'Edit Footer' }, { text: 'Remove Footer' }]
                    }
                }, {
                    type: 'DropDown',
                    dropDownSettings: {
                        content: 'Page Number',
                        simplifiedMode:'Popup',
                        iconCss: 'e-icons e-page-numbering',
                        items: [{ text: 'Insert Top of page' }, { text: 'Insert Bottom of page' }, { text: 'Format Page Number' }, { text: 'Remove Page Number' }]
                    }
                }]
            }]
        },
        {
            header: 'Comments',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: 'Button',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    simplifiedMode:'Group',
                    buttonSettings: {
                        content: 'New Comment',
                        iconCss: 'e-icons e-comment-add'
                    }
                }]
            }]
        }, {
            header: 'Link',
            groupIconCss: 'e-icons e-link',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: 'DropDown',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    dropDownSettings: {
                        content: 'Link',
                        iconCss: 'e-icons e-link',
                        items: [{ text: 'Insert Link', iconCss: 'e-icons e-link' },
                        { text: 'Recent Links', iconCss: 'e-icons e-clock' },
                        { text: 'Bookmarks', iconCss: 'e-icons e-bookmark' }
                    ]
                    }
                }]
            }]
        }]
    }, {
        header: 'View',
        groups: [{
            header: 'Views',
            groupIconCss: 'e-icons e-print',
            orientation: 'Row',
            collections: [{
                items: [{
                    type: 'Button',
                    buttonSettings: {
                        iconCss: 'sf-icon-read',
                        content: 'Read Mode'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        content: 'Print Layout',
                        iconCss: 'e-print e-icons'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        iconCss: 'sf-icon-web-layout',
                        content: 'Web Layout'
                    }
                }]
            }]
        }, {
            header: 'Zoom',
            orientation: 'Row',
            groupIconCss: 'e-icons e-zoom-to-fit',
            collections: [{
                items: [{
                    type: 'Button',
                    buttonSettings: {
                        content: 'Zoom In',
                        iconCss: 'e-icons e-zoom-in'
                    }
                }, {
                    type: 'Button',
                    buttonSettings: {
                        iconCss: 'e-icons e-zoom-out',
                        content: 'Zoom Out'
                    }
                }]
            }]
        }, {
            header: 'Show',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: 'CheckBox',
                    checkBoxSettings: {
                        label: 'Ruler',
                        checked: false
                    }
                }, {
                    type: 'CheckBox',
                    checkBoxSettings: {
                        checked: false,
                        label: 'Gridlines'
                    }
                }, {
                    type: 'CheckBox',
                    checkBoxSettings: {
                        label: 'Navigation Pane',
                        checked: true
                    }
                }]
            }]
        }, {
            header: 'Dark Mode',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: 'Button',
                    allowedSizes: ej.ribbon.RibbonItemSize.Large,
                    buttonSettings: {
                        iconCss: 'sf-icon-mode',
                        content: 'Dark Mode'
                    }
                }]
            }]
        }]
    }];
    var menuItems = [
        { text: 'New', iconCss:'e-icons e-file-new', id: 'new' }, 
        { text: 'Open', iconCss:'e-icons e-folder-open', id: 'open' },
        { text: 'Rename', iconCss:'e-icons e-rename', id: 'rename' },
        {
            text: 'Save as',
            iconCss:'e-icons e-save',
            id: 'save',
            items: [
                { text: 'Microsoft Word (.docx)', iconCss:'sf-icon-word', id: 'newword' },
                { text: 'Microsoft Word 97-2003(.doc)', iconCss:'sf-icon-word', id: 'oldword' },
                { text: 'Download as PDF', iconCss:'e-icons e-export-pdf', id: 'pdf' }
            ]
        }
    ];
    var files = ({
        header: 'File',
        menuItems: menuItems,
        visible: true
    });
    var ribbon = new ej.ribbon.Ribbon({
        tabs: tabs,
        fileMenu: files,
    });
    ribbon.appendTo("#sf-ribbon");
    var isPasteDisabled = true;    
    function enablePaste() { 
        if (!isPasteDisabled) { return; }        
        ribbon.enableItem('pastebtn');
        isPasteDisabled = false;
    }
    }

    // rendering bread crumb control
    if (isFiltered('breadcrumb')) {
        var items = [
            {
                iconCss: 'e-icons e-home',
                url: "https://ej2.syncfusion.com/javascript/demos",
            },
            {
                text: "Components",
                url: "https://ej2.syncfusion.com/javascript/demos/#/material/grid/grid-overview",
            },
            {
                text: "Navigations",
                url: "https://ej2.syncfusion.com/javascript/demos/#/material/grid/menu/default",
            },
            {
                text: "Breadcrumb",
                url: "./breadcrumb/default",
            }
        ];
    
        var breadCrumb = new ej.navigations.Breadcrumb({
            items: items,
            enableNavigation: false
        }, '#sf-breadcrumb');
    }

    // rendering carousel control
    if (isFiltered('carousel')) {
        var carouselObj = new ej.navigations.Carousel({
            cssClass: 'default-carousel',
            items: [
                { template: '<figure class="img-container"><img src="../Images/carousel/bridge.jpg" alt="bridge" style="height:100%;width:100%;" /><figcaption class="img-caption">Golden Gate Bridge, San Francisco</figcaption></figure>' },
                { template: '<figure class="img-container"><img src="../Images/carousel/trees.jpg" alt="spring_trees" style="height:100%;width:100%;" /><figcaption class="img-caption">Spring Flower Trees</figcaption></figure>' },
                { template: '<figure class="img-container"><img src="../Images/carousel/waterfall.jpg" alt="waterfall" style="height:100%;width:100%;" /><figcaption class="img-caption">Oddadalen Waterfalls, Norway</figcaption></figure>' },
                { template: '<figure class="img-container"><img src="../Images/carousel/sea.jpg" alt="sea" style="height:100%;width:100%;" /><figcaption class="img-caption">Anse Source d`Argent, Seychelles</figcaption></figure>' },
                { template: '<figure class="img-container"><img src="../Images/carousel/rocks.jpeg" alt="rocks" style="height:100%;width:100%;" /><figcaption class="img-caption">Stonehenge, England</figcaption></figure>' }
            ]
        });
        carouselObj.appendTo('#sf-carousel');
    }

    // rendering sidebar control
    if (isFiltered('sidebar')) {
        var sidebar = new ej.navigations.Sidebar({
            showBackdrop: true,
            type: "Push",
            width: '280px'
        });
        sidebar.appendTo('#sf-sidebar');
        // Toggle(Open/Close) the sidebar
    document.getElementById('toggle').onclick = function() {
        sidebar.toggle();
    };

    // Close the sidebar
    document.getElementById('close').onclick = function() {
        sidebar.hide();
    };
    }

    // rendering accordion control
    if (isFiltered('accordion')) {
        var accordion = new ej.navigations.Accordion({
            items: [
                { header: 'Athletics', iconCss: 'e-athletics e-acrdn-icons', content: '#athletics', expanded: true },
                { header: 'Water Games', iconCss: 'e-water-game e-acrdn-icons', content: '#water-games' }
            ]
        });
        accordion.appendTo('#sf-accordion');
    }

    // rendering tab control
    if (isFiltered('tab')) {
        var tabs = new ej.navigations.Tab({
            items: window.tabItems
        });
        tabs.appendTo('#sf-tab');
    }

    // rendering schedule control
    if (isFiltered('schedule')) {
        var schedule = new ej.schedule.Schedule({
            height: '550px',
            selectedDate: new Date(2018, 1, 15),
            eventSettings: { dataSource: ej.base.extend([], window.scheduleData, null, true) }
        });
        schedule.appendTo('#sf-schedule');
    }

    // rendering checkbox controls
    if (isFiltered('check-box')) {
        var checkbox = new ej.buttons.CheckBox({ label: 'CheckBox', checked: true, });
        checkbox.appendTo('#sf-check-box-checked');
        checkbox = new ej.buttons.CheckBox({ label: 'Unchecked', checked: false, disabled: true });
        checkbox.appendTo('#sf-check-box-unchecked');
        checkbox = new ej.buttons.CheckBox({ label: 'Indeterminate', indeterminate: true, disabled: true });
        checkbox.appendTo('#sf-check-box-intermediate');
    }

    // rendering radio-button controls
    if (isFiltered('radio-button')) {
        var radioButton = new ej.buttons.RadioButton({
            checked: true,
            name: 'payment',
            value: 'credit/debit',
            label: 'Credit/Debit Card',
        });
        radioButton.appendTo('#sf-radio-button1');
        radioButton = new ej.buttons.RadioButton({ label: 'Net Banking', name: 'payment', value: 'netbanking' });
        radioButton.appendTo('#sf-radio-button2');
        radioButton = new ej.buttons.RadioButton({ label: 'Cash on Delivery', name: 'payment', value: 'cashondelivery' });
        radioButton.appendTo('#sf-radio-button3');
    }

    // rendering toolbar control
    if (isFiltered('toolbar')) {
        var toolbar = new ej.navigations.Toolbar({
            items: window.toolbarItems
        });
        toolbar.appendTo('#sf-toolbar');
    }

    // rendering file upload control
    if (isFiltered('uploader')) {
        var fileUpload = new ej.inputs.Uploader({
            autoUpload: false,
            dropArea: ej.base.select('#upload-area'),
            files: [
                { name: 'TypeScript Succintly', size: 12000, type: '.pdf' },
                { name: 'ASP.NET Webhooks', size: 500000, type: '.docx' },
            ],
            asyncSettings: {
                saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
                removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
            }
        });
        fileUpload.appendTo('#sf-uploader');
    }

    // rendering context menu control 
    if (isFiltered('context-menu')) {
        var contextMenu = new ej.navigations.ContextMenu({
            items: menuItems,
            target: '#sf-context-menu-target'
        });
        contextMenu.appendTo('#sf-context-menu');
    }

    // rendering tooltip control
    if (isFiltered('tooltip')) {
        var tooltipButton = new ej.buttons.Button();
        tooltipButton.appendTo('#sf-tooltip');
        var tooltip = new ej.popups.Tooltip({
            content: 'Lets go green & Save Earth !!!'
        });
        tooltip.appendTo('#sf-tooltip');
    }

    // rendering color-picker control
    if (isFiltered('color-picker')) {
        var colorPicker = new ej.inputs.ColorPicker({});
        colorPicker.appendTo('#sf-color-picker');
    }

    // rendering switch controls
    if (isFiltered('switch')) {
        var switchControl = new ejs.buttons.Switch({ checked: true });
        switchControl.appendTo('#sf-switch-checked');
        switchControl = new ejs.buttons.Switch({});
        switchControl.appendTo('#sf-switch-unchecked');
    }

    // rendering toast control
    if (isFiltered('toast')) {
        var toast = new ej.notifications.Toast({
            width: 230,
            height: 250,
            target: '#element',
            title: 'Anjolie Stokes',
            position: { X: 'Center', Y: 'Bottom' },
            content: '<p><img src="https://ej2.syncfusion.com/documentation/samples/toast/actionBtn-cs1/laura.png"></p>',
            buttons: [{
                model: { content: 'Ignore' },
                click: () => toast.hide()
            }, {
                model: { content: 'reply' }
            }],
            beforeOpen: (e) => {
                e.cancel = toast.element.childElementCount > 0;
            }
        });
        toast.appendTo('#sf-toast');
        toast.show();
        ej.base.select('#sf-toast-button').onclick = () => toast.show();
    }

    // rendering rating control
    if(isFiltered('rating')) {
        var basic = new ej.inputs.Rating({});
        basic.appendTo('#sf-rating1');

        var reset = new ej.inputs.Rating({
            allowReset: true,
            value: 3.0
        });
        reset.appendTo('#sf-rating2');

        var single = new ej.inputs.Rating({
            enableSingleSelection: true,
            value: 3.0
        });
        single.appendTo('#sf-rating3');

        var read = new ej.inputs.Rating({
            readOnly: true,
            value: 3.0
        });
        read.appendTo('#sf-rating4');

        var disable = new ej.inputs.Rating({
            disabled: true,
            value: 3.0
        });
        disable.appendTo('#sf-rating5');

        var itemCount = new ej.inputs.Rating({
            itemsCount: 8,
            value: 3.0
        });
        itemCount.appendTo('#sf-rating6');
    }

    // rendering message control
    if (isFiltered('message')) {
        var showButton = new ej.buttons.Button({ content: 'Show Default Message', cssClass: "e-outline e-primary msg-hidden" });
        showButton.appendTo('#sf-btn1');
        showButton.element.onclick = function () {
            show(msgDefaultIcon, showButton);
        };

        var infoButton = new ej.buttons.Button({ content: 'Show Info Message', cssClass: "e-outline e-primary e-info msg-hidden" });
        infoButton.appendTo('#sf-btn2');
        infoButton.element.onclick = function () {
            show(msgInfoIcon, infoButton);
        };    

        var successButton = new ej.buttons.Button({ content: 'Show Success Message', cssClass: "e-outline e-primary e-success msg-hidden" });
        successButton.appendTo('#sf-btn3');
        successButton.element.onclick = function () {
            show(msgSuccessIcon, successButton);
        };

        var warningButton = new ej.buttons.Button({ content: 'Show Warning Message', cssClass: "e-outline e-primary e-warning msg-hidden" });
        warningButton.appendTo('#sf-btn4');
        warningButton.element.onclick = function () {
            show(msgWarningIcon, warningButton);
        };

        var errorButton = new ej.buttons.Button({ content: 'Show Error Message', cssClass: "e-outline e-primary e-danger msg-hidden" });
        errorButton.appendTo('#sf-btn5');
        errorButton.element.onclick = function () {
            show(msgErrorIcon, errorButton);
        };

        var msgDefaultIcon = new ej.notifications.Message({
            content: "Editing is restricted",
            showCloseIcon: true,
            closed: function () {
                showButton.element.classList.remove('msg-hidden');
            }
        });
        msgDefaultIcon.appendTo('#sf-msg_default_icon');

        var msgInfoIcon = new ej.notifications.Message({
            content: "Please read the comments carefully",
            severity: "Info",
            showCloseIcon: true,
            closed: function () {
                infoButton.element.classList.remove('msg-hidden');
            }
        });   
        msgInfoIcon.appendTo('#sf-msg_info_icon');

        var msgSuccessIcon = new ej.notifications.Message({
            content: "Your message has been sent successfully",
            severity: "Success",
            showCloseIcon: true,
            closed: function () {
                successButton.element.classList.remove('msg-hidden');
            }
        });
        msgSuccessIcon.appendTo('#sf-msg_success_icon');

        var msgWarningIcon = new ej.notifications.Message({
            content: "There was a problem with your network connection",
            severity: "Warning",
            showCloseIcon: true,
            closed: function () {
                warningButton.element.classList.remove('msg-hidden');
            }
        });
        msgWarningIcon.appendTo('#sf-msg_warning_icon');

        var msgErrorIcon = new ej.notifications.Message({
            content: "A problem has been occurred while submitting your data",
            severity: "Error",
            showCloseIcon: true,
            closed: function () {
                errorButton.element.classList.remove('msg-hidden');
            }
        }); 
        msgErrorIcon.appendTo('#sf-msg_error_icon');
        function show(message, btn) {
            message.visible = true;
            btn.element.classList.add('msg-hidden');
          }
    }

    // rendering flaoting action button control
    if (isFiltered('floating-action-button')) {
        var fabObj = new ej.buttons.Fab({
            iconCss: 'e-icons  e-plus',
            position:'BottomLeft',
            target: '#floating-action-button'
        });
        fabObj.appendTo('#sf-fab');
        var fabObj1 = new ej.buttons.Fab({
            iconCss: 'e-icons  e-plus',
            content:'Add',
            target: '#floating-action-button'
        });
        fabObj1.appendTo('#sf-fab1');
    }

    //rendering speed dial control
    if(isFiltered('speed-dial')) {
        var itemlist = [
            { text: 'Cut', iconCss: 'e-icons e-cut' },
            { text: 'Copy', iconCss: 'e-icons e-copy' },
            { text: 'Paste', iconCss: 'e-icons e-paste' },
        ];
        var sdObj1 = new ej.buttons.SpeedDial({
            openIconCss: 'e-icons e-edit',
            target: '#speed-dial',
            items:itemlist,
            mode: "Radial"
        });
        sdObj1.appendTo('#sf-speeddial');
        var sdObj2 = new ej.buttons.SpeedDial({
            openIconCss: 'e-icons e-edit',
            target: '#speed-dial',
            content: "Edit",
            items:itemlist,
            position: "BottomLeft",
        });
        sdObj2.appendTo('#sf-speeddial1');
    }

    //rendering skeleton control

    if (isFiltered('skeleton')) {
        var skeletonCircleSmall = new ej.notifications.Skeleton({
            shape: 'Circle',
            width: "2rem"
        });
        skeletonCircleSmall.appendTo("#sf-skeletonCircleSmall");

        var skeletonCircleMedium = new ej.notifications.Skeleton({
            shape: 'Circle',
            width: "48px"
        });
        skeletonCircleMedium.appendTo("#sf-skeletonCircleMedium");

        var skeletonCircleLarge = new ej.notifications.Skeleton({
            shape: 'Circle',
            width: "64px"
        });
        skeletonCircleLarge.appendTo("#sf-skeletonCircleLarge");

        var skeletonCircleLarger = new ej.notifications.Skeleton({
            shape: 'Circle',
            width: "80px"
        });
        skeletonCircleLarger.appendTo("#sf-skeletonCircleLarger");

        var skeletonSquareSmall = new ej.notifications.Skeleton({
            shape: 'Square',
            width: "2rem"
        });
        skeletonSquareSmall.appendTo("#sf-skeletonSquareSmall");

        var skeletonSquareMedium = new ej.notifications.Skeleton({
            shape: 'Square',
            width: "48px"
        });
        skeletonSquareMedium.appendTo("#sf-skeletonSquareMedium");

        var skeletonSquareLarge = new ej.notifications.Skeleton({
            shape: 'Square',
            width: "64px"
        });
        skeletonSquareLarge.appendTo("#sf-skeletonSquareLarge");

        var skeletonSquareLarger = new ej.notifications.Skeleton({
            shape: 'Square',
            width: "80px"
        });
        skeletonSquareLarger.appendTo("#sf-skeletonSquareLarger");

        var skeletonText = new ej.notifications.Skeleton({
            width: "100%",
            height: "15px"
        });
        skeletonText.appendTo("#sf-skeletonText");

        var skeletonTextMedium = new ej.notifications.Skeleton({
            width: "30%",
            height: "15px"
        });
        skeletonTextMedium.appendTo("#sf-skeletonTextMedium");

        var skeletonTextSmall = new ej.notifications.Skeleton({
            width: "15%",
            height: "15px"
        });
        skeletonTextSmall.appendTo("#sf-skeletonTextSmall");

        var skeletonTextMedium1 = new ej.notifications.Skeleton({
            width: "60%",
            height: "15px"
        });
        skeletonTextMedium1.appendTo("#sf-skeletonTextMedium1");

        var skeletonTextSmall1 = new ej.notifications.Skeleton({
            width: "15%",
            height: "15px"
        });
        skeletonTextSmall1.appendTo("#sf-skeletonTextSmall1");

        var skeletonRectangle = new ej.notifications.Skeleton({
            shape: 'Rectangle',
            width: '100%',
            height: '100px'
        });
        skeletonRectangle.appendTo("#sf-skeletonRectangle");

        var skeletonRectangleMedium = new ej.notifications.Skeleton({
            shape: 'Rectangle',
            width: '20%',
            height: '35px'
        });
        skeletonRectangleMedium.appendTo("#sf-skeletonRectangleMedium");

        var skeletonRectangleMediumRight = new ej.notifications.Skeleton({
            shape: 'Rectangle',
            width: '20%',
            height: '35px'
        });
        skeletonRectangleMediumRight.appendTo("#sf-skeletonRectangleMediumRight");
    }

    // rendering appbar control
    if (isFiltered('appbar')) {
        var lightAppBarObj = new ej.navigations.AppBar({
            colorMode: 'Light'
        });
        lightAppBarObj.appendTo('#lightAppBar');
    
        var lightButtonMenuObj = new ej.buttons.Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
        lightButtonMenuObj.appendTo('#lightButtonMenu');
    
        var lightButtonLoginObj = new ej.buttons.Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
        lightButtonLoginObj.appendTo('#lightButtonLogin');
    
        var darkAppBarObj = new ej.navigations.AppBar({
            colorMode: 'Dark'
        });
        darkAppBarObj.appendTo('#darkAppBar');
    
        var darkButtonMenuObj = new ej.buttons.Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
        darkButtonMenuObj.appendTo('#darkButtonMenu');
    
        var darkButtonLoginObj = new ej.buttons.Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
        darkButtonLoginObj.appendTo('#darkButtonLogin');
    
        var primaryAppBarObj = new ej.navigations.AppBar({
            colorMode: 'Primary',
        });
        primaryAppBarObj.appendTo('#primaryAppBar');
    
        var primaryButtonMenuObj = new ej.buttons.Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
        primaryButtonMenuObj.appendTo('#primaryButtonMenu');
    
        var primaryButtonLoginObj = new ej.buttons.Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
        primaryButtonLoginObj.appendTo('#primaryButtonLogin');
    }

    //rendering mention control
    if (isFiltered('mention')) {
        // Initialize Textbox component.
        window.emailData = [
            { Name: 'Selma Rose', Eimg: '7', EmailId: 'selma@gmail.com' }, 
            { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com' },
            { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com' },
            { Name: 'Garth', Eimg: '3', EmailId: 'garth@gmail.com' }, 
            { Name: 'Ursula Ann', Eimg: '10', EmailId: 'ursula@gmail.com' },
            { Name: 'Margaret', Eimg: '5', EmailId: 'margaret@gmail.com' }, 
            { Name: 'Laura Grace', Eimg: '7', EmailId: 'laura@gmail.com' },
            { Name: 'Robert', Eimg: '8', EmailId: 'robert@gmail.com' }, 
            { Name: 'Albert', Eimg: '9', EmailId: 'albert@gmail.com' },
            { Name: 'Michale', Eimg: '10', EmailId: 'michale@gmail.com' }, 
            { Name: 'Andrew James', Eimg: '3', EmailId: 'james@gmail.com' },
            { Name: 'William', Eimg: '4', EmailId: 'william@gmail.com' }, 
            { Name: 'David', Eimg: '5', EmailId: 'david@gmail.com' },
            { Name: 'Richard Rose', Eimg: '7', EmailId: 'richard@gmail.com' }, 
            { Name: 'Joseph', Eimg: '8', EmailId: 'joseph@gmail.com' },
            { Name: 'Thomas', Eimg: '9', EmailId: 'thomas@gmail.com' }, 
            { Name: 'Charles Danny', Eimg: '10', EmailId: 'charles@gmail.com' },
            { Name: 'Daniel', Eimg: '3', EmailId: 'daniel@gmail.com' }, 
            { Name: 'Matthew', Eimg: '2', EmailId: 'matthew@gmail.com' },
            { Name: 'Donald Krish', Eimg: '1', EmailId: 'donald@gmail.com' },
            { Name: 'Paul', Eimg: '4', EmailId: 'paul@gmail.com' },
            { Name: 'Kevin Paul', Eimg: '5', EmailId: 'kevin@gmail.com' }
        ];
        
        var emailTextbox = new ej.inputs.TextBox({
            placeholder: 'Type @ and tag the email'
        });
        emailTextbox.appendTo('#emailsMention');

	    // Initialize Mention component.
        var emailObj = new ej.dropdowns.Mention({
            dataSource: window.emailData,
            fields: { text: 'EmailId' }
        });
        emailObj.appendTo('#emailsMention');

        var messageData = new ej.dropdowns.Mention({
            dataSource: window.emailData,
            fields: { text: 'Name' }
        });
        messageData.appendTo('#commentsMention');
    }

    //rendering image editor control
    if (isFiltered('image-editor')) {
        var imageEditorObj = new ej.imageeditor.ImageEditor({
            width: '100%',
            height: '100%',
            created: function () {
                if (ej.base.Browser.isDevice) {
                    imageEditorObj.open('../Images/image-editor/horizontal.jpg');
                } else {
                    imageEditorObj.open('../Images/image-editor/vertical.jpg');
                }
                imageEditorObj.theme = window.location.href.split('theme=')[1];
            }
          });
          imageEditorObj.appendTo('#sf-imageeditor');
    }
    // rendering rich-text-editor control
    if (isFiltered('rich-text-editor')) {
        var richTextEditor = new ej.richtexteditor.RichTextEditor({
            toolbarSettings: {
                items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                    'LowerCase', 'UpperCase', '|',
                    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                    'Outdent', 'Indent', '|',
                    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
            }
        });
        richTextEditor.appendTo('#sf-rich-text-editor');
    }

    // rendering progress button controls
    if (isFiltered('progress-button')) {
        var progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Spin Left', isPrimary: true
        });
        progressButton.appendTo('#sf-progress-button-left');
        progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Spin Right', spinSettings: { position: 'Right' }, isPrimary: true
        });
        progressButton.appendTo('#sf-progress-button-right');
        progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Download', duration: 4000, enableProgress: true,
            cssClass: 'e-hide-spinner e-progress-top', iconCss: 'e-btn-sb-icons e-download-icon'
        });
        progressButton.appendTo('#sf-progress-button-download');
        progressButton = new ej.splitbuttons.ProgressButton({ content: 'Disabled', disabled: true });
        progressButton.appendTo('#sf-progress-button-disabled');
    }

    // rendering menu control
    if (isFiltered('menu')) {
        var menu = new ej.navigations.Menu({
            items: window.menuItems
        });
        menu.appendTo('#sf-menu');
    }

    // rendering pivot-view control
    if (isFiltered('pivotview')) {
        var pivotGridObj = new ej.pivotview.PivotView({
            height: 600,
            width: '100%',
            showFieldList: true,
            showGroupingBar: true,
            allowCalculatedField: true,
            gridSettings: { columnWidth: 140 },
            dataSourceSettings: {
                filters: [],
                expandAll: true,
                enableSorting: true,
                dataSource: window.pivotData,
                valueSortSettings: { headerDelimiter: ' - ' },
                columns: [{ name: 'Year' }, { name: 'Quarter' }],
                rows: [{ name: 'Country' }, { name: 'Products' }],
                formatSettings: [{ name: 'Amount', format: 'C0' }],
                values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }]
            }
        });
        pivotGridObj.appendTo('#sf-pivotview');
    }

    // rendering tree-grid control
    if (isFiltered('treegrid')) {
        var treeGridData = new ej.data.DataManager({
            crossDomain: true,
            adaptor: new ej.data.WebApiAdaptor(),
            url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData'
        });
        var treeGrid = new ej.treegrid.TreeGrid({
            height: 260,
            height: 380,
            allowPaging: true,
            treeColumnIndex: 1,
            idMapping: 'TaskID',
            dataSource: treeGridData,
            hasChildMapping: 'isParent',
            parentIdMapping: 'ParentItem',
            columns: [
                { field: 'TaskID', headerText: 'Task ID', width: 80, textAlign: 'Right' },
                { field: 'TaskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'StartDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'Duration', headerText: 'Duration', width: 90, textAlign: 'Right' },
            ]
        });
        treeGrid.appendTo('#sf-treegrid');
    }

    // rendering in-place editor control
    if (isFiltered('inplace-editor')) {
        var inPlaceEditor = new ej.inplaceeditor.InPlaceEditor({
            type: 'Text',
            mode: 'Inline',
            value: 'Andrew',
            submitOnEnter: true,
            model: {
                placeholder: 'Enter employee name'
            }
        });
        inPlaceEditor.appendTo('#sf-inplace-editor');
    }

    // rendering splitter control
    if (isFiltered('splitter')) {
        var splitter = new ej.layouts.Splitter({
            height: '110px',
            width: '100%',
            separatorSize: 4,
            paneSettings: [
                { size: '25%', min: '60px' },
                { size: '50%', min: '60px' },
                { size: '25%', min: '60px' }
            ]
        });
        splitter.appendTo('#sf-splitter');
    }

    // rendering pdf-viewer control
    if (isFiltered('pdfviewer')) {
        var pdfViewer = new ej.pdfviewer.PdfViewer({
            documentPath: 'PDF_Succinctly.pdf',
            serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer'
        });
        ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation);
        pdfViewer.appendTo('#Component-pdfviewer');
    }

    // rendering document editor control
    if (isFiltered('document-editor')) {
        var documenteditor = new ej.documenteditor.DocumentEditor({ isReadOnly: false });
        documenteditor.acceptTab = true;
        documenteditor.enableAllModules();
        documenteditor.pageOutline = '#E0E0E0';

        //Documenteditor control rendering starts
        documenteditor.appendTo('#Component-documenteditor');
    }

    // rendering query builder control
    if (isFiltered('query-builder')) {
        var importRules = {
            'condition': 'and',
            'rules': [{
                'label': 'Employee ID',
                'field': 'EmployeeID',
                'type': 'number',
                'operator': 'equal',
                'value': 1
            },
            {
                'label': 'Title',
                'field': 'Title',
                'type': 'string',
                'operator': 'equal',
                'value': 'Sales Manager'
            }]
        };
        var columnData = [
            { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
            { field: 'FirstName', label: 'First Name', type: 'string' },
            { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
            { field: 'Title', label: 'Title', type: 'string' },
            { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
            { field: 'City', label: 'City', type: 'string' }
        ];
        var queryBuilder = new ej.querybuilder.QueryBuilder({
            width: '100%',
            rule: importRules,
            columns: columnData,
            dataSource: window.queryBuilderData
        });
        queryBuilder.appendTo('#sf-query-builder');
    }

    // rendering chips control
    if (isFiltered('chips')) {
        var chips = new ej.buttons.ChipList({ chips: window.chipsData.defaultData });
        chips.appendTo('#sf-chips');
    }

    // rendering list-box control
    if (isFiltered('list-box')) {
        var listBox = new ej.dropdowns.ListBox({
            dataSource: window.listBoxData,
            fields: { text: 'text', value: 'id' },
            selectionSettings: { type: 'CheckBox' }
        });
        listBox.appendTo('#sf-list-box');
    }

    // rendering file manager control
    if (isFiltered('file-manager')) {
        var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        var fileManager = new ej.filemanager.FileManager({
            view: 'Details',
            ajaxSettings: {
                url: hostUrl + 'api/FileManager/FileOperations',
                getImageUrl: hostUrl + 'api/FileManager/GetImage',
                uploadUrl: hostUrl + 'api/FileManager/Upload',
                downloadUrl: hostUrl + 'api/FileManager/Download'
            }
        });
        fileManager.appendTo('#sf-file-manager');
    }

    // rendering gantt control
    if (isFiltered('gantt')) {
        var ganttChart = new ej.gantt.Gantt({
            height: '450px',
            highlightWeekends: true,
            dataSource: projectNewData,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                child: 'subtasks',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                startDate: 'StartDate',
                dependency: 'Predecessor',
            },
            eventMarkers: [
                {
                    day: new Date('04/09/2019'),
                    label: 'Research phase'
                }, {
                    day: new Date('04/30/2019'),
                    label: 'Design phase'
                }, {
                    day: new Date('05/23/2019'),
                    label: 'Production phase'
                }, {
                    day: new Date('06/20/2019'),
                    label: 'Sales and marketing phase'
                }
            ]
        });
        ganttChart.appendTo('#sf-gantt');
    }

    // rendering spread-sheet control
    if (isFiltered('spreadsheet')) {
        var spreadSheet = new ej.spreadsheet.Spreadsheet({
            sheets: [
                {
                    name: 'Car Sales Report',
                    ranges: [{ dataSource: defaultData }],
                    rows: [
                        {
                            index: 30,
                            cells: [
                                { index: 4, value: 'Total Amount:', style: { fontWeight: 'bold', textAlign: 'right' } },
                                { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } },
                            ]
                        }
                    ],
                    columns: [
                        { width: 180 }, { width: 130 }, { width: 130 }, { width: 180 },
                        { width: 130 }, { width: 120 }
                    ]
                }
            ],
            openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
            created: function () {
                spreadSheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
                spreadSheet.numberFormat('$#,##0.00', 'F2:F31');
            }
        });
        spreadSheet.appendTo('#sf-spreadsheet');
    }

    // rendering dashboard-layout control
    if (isFiltered('dashboard-layout')) {
        var dashboard = new ej.layouts.DashboardLayout({
            cellSpacing: [15, 15],
            columns: 4,
            allowResizing: true,
        });
        dashboard.appendTo('#defaultLayout');
        var dashboardObject = document.getElementById('defaultLayout').ej2_instances[0];
    }
    // rendering spinner control
    if (isFiltered('spinner')) {
        ej.popups.createSpinner({
            target: ej.base.select('#sf-spinner')
        });
        ej.popups.showSpinner(ej.base.select('#sf-spinner'));
    }

    // rendering kanban control
    if (isFiltered('kanban')) {
        var kanban = new ej.kanban.Kanban({
            keyField: 'Status',
            dataSource: kanbanData,
            cardSettings: {
                headerField: 'Id',
                contentField: 'Summary'
            },
            columns: [
                { headerText: 'To Do', keyField: 'Open' },
                { headerText: 'In Progress', keyField: 'InProgress' },
                { headerText: 'Testing', keyField: 'Testing' },
                { headerText: 'Done', keyField: 'Close' }
            ]
        });
        kanban.appendTo('#sf-kanban');
    }
}

// Render the right pane controls
function renderRightPane() {
    themeSwitcherPopup = new ej.popups.Popup(ej.base.select('#theme-switcher-popup'), {
        offsetY: 2,
        relateTo: themeDropDown,
        collision: { X: 'flip', Y: 'flip' },
        position: { X: 'left', Y: 'bottom' },
        open: () => { isThemeSwitcherOpen = true; },
        close: () => { isThemeSwitcherOpen = false; }
    });
    var togglePopup = (isOpened) => {
        themeSwitcherPopup[isOpened ? 'hide' : 'show']();
    };
    themeDropDown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePopup(isThemeSwitcherOpen);
    });
    document.addEventListener('click', () => togglePopup(true));

    ej.base.select('#theme-list').addEventListener('click', (e) => {
        var parent = e.target.closest('li');
        var themeName = parent.id;
        if (themeName === currentTheme) {
            return;
        }
        document.querySelector('#theme-list>.active').classList.remove('active');
        document.querySelector('#theme-list>#' + themeName).classList.add('active');
        themeDropDownText.innerHTML = parent.querySelector('.switch-text').innerHTML;
        currentTheme = themeName;
        themeSwitcherPopup.hide();
        if (ej.base.select('#dark').ej2_instances[0].checked && themeName !== 'highcontrast' && themeName !== BOOTSTRAP4 && themeName !== 'fusion') {
            themeName += '-dark';
        }
        ej.base.select('.bv4-advanced-mode').style.display = currentTheme === BOOTSTRAP4 ? 'block' : 'none';
        ej.base.select('.tailwind-advanced-mode').style.display = currentTheme === 'tailwind' ? 'block' : 'none';
        renderProperties(themeName);
        loadTheme(themeName, true);
    });

    var queryString = window.location.search;
    if (queryString && queryString.indexOf(QUERY_STRING) !== -1) {
        queryString = queryString.replace(GOOGLE_REGEX, '').replace(QUERY_STRING, '').trim();
        currentTheme = queryString;
        renderProperties(queryString);
        var themeName = queryString.indexOf('-') !== -1 ? queryString.replace('-dark', '').trim() : queryString;
        themeDropDownText.innerHTML = getThemeName(themeName);
        document.querySelector('#theme-list>.active').classList.remove('active');
        document.querySelector('#theme-list>#' + themeName).classList.add('active');
    } else {
        renderProperties(MATERIAL3);
    }

    // rendering theme mode light/dark
    var lightMode = new ej.buttons.RadioButton({
        label: 'Light', name: 'theme-mode', value: 'Light', checked: true,
        change: () => {
            currentTheme = currentTheme === 'highcontrast' ? currentTheme += '-light' : currentTheme;
            currentTheme = currentTheme.indexOf('-dark') ? currentTheme.replace('-dark', '') : currentTheme;
            renderProperties(currentTheme);
            loadTheme(currentTheme, true);
        }
    });
    lightMode.appendTo('#light');
    var darkMode = new ej.buttons.RadioButton({
        label: 'Dark', name: 'theme-mode', value: 'Dark',
        change: () => {
            if (currentTheme !== 'highcontrast') {
                currentTheme += '-dark';
            }
            renderProperties(currentTheme);
            loadTheme(currentTheme, true);
        }
    });
    darkMode.appendTo('#dark');
    darkMode.checked = DEFAULT_THEMES.indexOf(currentTheme) === -1;

    var bv4AdvancedMode = new ej.buttons.Switch({
        change: (args) => {
            isAdvancedChecked = args.checked;
            loadTheme(currentTheme, true);
            changeRightPanelWidth();
            renderBV4Properties(currentTheme);
            refreshColorPickerBG();
        }
    });
    bv4AdvancedMode.appendTo('#advanced-mode-check'); 

    var tailwindAdvancedMode = new ej.buttons.Switch({
        change: (args) => {
            isAdvancedChecked = args.checked;
            loadTheme(currentTheme, true);
            changeRightPanelWidth();
            renderTailwindProperties(currentTheme);
            refreshColorPickerBG();
        }
    });
    tailwindAdvancedMode.appendTo('#tailwind-advanced-mode-check'); 

    ej.base.select('.bv4-advanced-mode').style.display = currentTheme !== BOOTSTRAP4 ? 'none' : '';
    ej.base.select('.tailwind-advanced-mode').style.display = currentTheme !== 'tailwind' ? 'none' : '';
    if (currentTheme === BOOTSTRAP4) {
        document.getElementById('advanced-mode-check').ej2_instances[0].checked = isAdvancedChecked;
        document.getElementById('advanced-mode-check').ej2_instances[0].dataBind();
    }
    if (currentTheme === 'tailwind') {
        document.getElementById('tailwind-advanced-mode-check').ej2_instances[0].checked = isAdvancedChecked;
        document.getElementById('tailwind-advanced-mode-check').ej2_instances[0].dataBind();
    }
    var isDarkTheme = currentTheme.indexOf('-dark') !== -1;
    if ((DARK_THEMES.indexOf(currentTheme) !== -1 || isDarkTheme) && currentTheme !== BOOTSTRAP4 && currentTheme !== 'tailwind') {
        ej.base.select(isDarkTheme ? '#dark' : '#light').ej2_instances[0].checked = true;
    }
    refreshColorPickerBG();
}

// Returns the theme name for theme switcher.
function getThemeName(themeName) {
    themeName = themeName === BOOTSTRAP4 ? 'Bootstrap v4' : themeName;
    themeName = themeName === 'highcontrast' ? 'High Contrast' : themeName;
    return themeName;
}

function changeRightPanelWidth(themeName) {
    ej.base.select('.theme-body-right').style.width = (!isAdvancedChecked && themeName !== 'tailwind') ? '280px' : '337px';
    ej.base.select('.right-panel').style.width = (!isAdvancedChecked && themeName !== 'tailwind') ? '282px' : '337px';
    ej.base.select('.theme-body-left').style.width = (!isAdvancedChecked && themeName !== 'tailwind') ? 'calc(100% - 280px)' : 'calc(100% - 337px)';
}

function changeRightPanelWidthMaterial3(themeName) {
    ej.base.select('.theme-body-right').style.width = '337px';
    ej.base.select('.right-panel').style.width = '337px';
    ej.base.select('.theme-body-left').style.width = 'calc(100% - 337px)';
}

// Renders color picker in the right pane for changing theme color.
function renderProperties(themeName) {
    ej.base.enableRipple(false);
    if (themeName === MATERIAL3 || themeName === 'material3-dark') {
        changeRightPanelWidthMaterial3(themeName);
    }
    else {
        changeRightPanelWidth(themeName);
    }

    if (themeName === BOOTSTRAP4) {
        renderBV4Properties(themeName);
        return;
    }
    if (themeName === 'tailwind') {
        renderTailwindProperties(themeName);
        return;
    }
    var properties = THEME_PROPERTIES[themeName];
    if (properties) {
        var propertyKeys = Object.keys(properties);
        document.getElementById('theme-properties').innerHTML = '';
        document.getElementById('theme-properties').style.padding = '12px';
        ej.base.select('.theme-mode').style.display = '';
        ej.base.select('.bv4-advanced-mode').style.display = 'none';
        ej.base.select('.tailwind-advanced-mode').style.display = 'none';
        for (var propertyName of propertyKeys) {
            var property = properties[propertyName];
            if(themeName === 'material3' || themeName === 'material3-dark') {
                if((property.default).indexOf('#') === -1) {
                    property.default = rgbToHex(property.default);
                    for(var i=0; i <property.palettes.length; i++) {
                        property.palettes[i] = rgbToHex(property.palettes[i]);
                    }
                }
                var variables = document.querySelector(':root');
                for(var i=0; i <variables.style.length; i++) {
                    variables.style.removeProperty(variables.style[i])
                }
            }
            var wrapper = new ej.base.createElement('div', {
                className: 'theme-prop-wrapper',
                attrs: { 'data-id': property.id }
            });
            var labelElement = new ej.base.createElement('div', {
                className: 'f-left theme-property',
                innerHTML: '<span>' + propertyName + '</span'
            });
            var colorPickerWrapper = new ej.base.createElement('div', {
                className: 'f-right theme-value',
                innerHTML: `<input type='color' class='color-picker ${property.id}' />`
            });
            wrapper.appendChild(labelElement);
            wrapper.appendChild(colorPickerWrapper);
            document.getElementById('theme-properties').appendChild(wrapper);
            new ej.inputs.ColorPicker({
                columns: 6,
                inline: false,
                mode: 'Palette',
                showButtons: true,
                modeSwitcher: true,
                value: property.default,
                cssClass: 'theme-studio-color-picker',
                presetColors: { 'custom': property.palettes },
                beforeTileRender: (args) => {
                    args.element.classList.add('e-circle-palette');
                    args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                    if (args.element.getAttribute('aria-label') === '#ffffff') {
                        args.element.classList.add('white-color-palette')
                    }
                },
                change: function (args) {
                    var value = args.currentValue.rgba;
                    var element = this.element.closest('.theme-prop-wrapper');
                    var colorElement = this.getWrapper().querySelector('.theme-color');
                    var themeProps = getThemeProperties(themeName, element.getAttribute('data-id'), value, false, false);
                    var controlSection = document.getElementById('control-section');
                    var scrollTop = controlSection.scrollTop;
                    themeBodyLeftOverlay.style.backgroundColor = '#383838';
                    if(currentTheme === 'material3' || currentTheme === "material3-dark"){
                        var variable = document.querySelector(':root');
                        var rgbValue = value.replace('rgba(', '').slice(0, -3);
                        variable = variable.style.setProperty(element.dataset.id, rgbValue);
                        colorElement.style.backgroundColor = value;
                    }
                    else {
                        showOverlay();
                        compileTheme(themeProps, () => {
                            colorElement.style.backgroundColor = value;
                            removeOverlay();
                        });
                    }
                    themeBodyLeftOverlay.style.backgroundColor = 'transparent';
                    controlSection.scrollTop = scrollTop;
                }
            }, '.color-picker.' + property.id);
        }
        if (themeName === MATERIAL || themeName === 'material-dark') {
            ej.base.enableRipple(true);
        }
    }
}

// Renders color-pickers for tailwind theme.

function renderTailwindProperties(themeName) {
    document.getElementById('theme-properties').innerHTML = '';
    document.getElementById('theme-properties').style.padding = '0px';
    ej.base.select('.bv4-advanced-mode').style.display = 'none';
    ej.base.select('.tailwind-advanced-mode').style.display = '';
    var tailwindCategories = THEME_PROPERTIES[themeName];
    if(tailwindCategories) {
        if (!isAdvancedChecked) {
            var categoryTypes = ['primary'];
            for (var tailwindCategory of categoryTypes) {
                var wrapper = new ej.base.createElement('div', {
                    id: `tailwind-normal-${tailwindCategory}-wrapper`,
                    className: `tailwind-normal-${tailwindCategory}-wrapper`
                });
                var headLabel = new ej.base.createElement('div', {
                    innerHTML: `<span>${tailwindCategories[tailwindCategory].id}</span>`,
                    className: `tailwind-normal-${tailwindCategory}-label`
                });
                wrapper.appendChild(headLabel);
                document.getElementById('theme-properties').appendChild(wrapper);
                var properties = Object.keys(tailwindCategories[tailwindCategory]);
                for (var propertyName of properties) {
                    if (propertyName === 'id' || propertyName === 'dependentProps') {
                        continue;
                    }
                    var property = tailwindCategories[tailwindCategory][propertyName];
                    var propertyWrapper = new ej.base.createElement('div', {
                        className: 'tailwind-normal-prop-wrapper',
                        attrs: { 'data-id': property.id }
                    });
                    var propertyLabel = new ej.base.createElement('div', {
                        className: 'tailwind-normal-prop',
                        innerHTML: `<span>${propertyName}</span>`
                    });
                    var propertyValue = new ej.base.createElement('div', {
                        className: 'tailwind-normal-value',
                        innerHTML: `
                                <div id='${property.id}' class='color-inputs'>
                                    <input class='e-input color-text ${property.id}' type='text'/>
                                    <input type='color' class='color-picker ${property.id}' />
                                </div>`
                    });
                    propertyWrapper.appendChild(propertyLabel);
                    propertyWrapper.appendChild(propertyValue);
                    document.getElementById(`tailwind-normal-${tailwindCategory}-wrapper`).appendChild(propertyWrapper);
                    new ej.inputs.ColorPicker({
                        columns: 6,
                        inline: false,
                        mode: 'Palette',
                        showButtons: true,
                        modeSwitcher: true,
                        value: property.default,
                        cssClass: 'theme-studio-color-picker',
                        presetColors: { 'custom': property.palettes },
                        beforeTileRender: (args) => {
                            args.element.classList.add('e-circle-palette');
                            args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                            if (args.element.getAttribute('aria-label') === '#ffffff') {
                                args.element.classList.add('white-color-palette');
                            }
                        },
                        change: function (args) {
                            tailwindColorChange(args, themeName, this.element, this.getWrapper().querySelector('.theme-color'));
                        }
                    }, '.color-picker.' + property.id);
                    var inputElement = new ej.inputs.TextBox({
                        value: property.default,
                        change: (args) => textChange(args),
                        input: (args) => inputChange(args)
                    });
                    inputElement.appendTo(`#${property.id}`);
                    ej.base.select(`.e-input.color-text.${property.id}`).value = property.default;
                }
            }
        }
        else {
            var accordionItem = [];
            var tailwindCategoryKeys = Object.keys(tailwindCategories);
            // var tailwindCategoryKeys = ['coolgrays', 'indigos', 'greens', 'reds', 'cyans', 'oranges'];
            var accordionWrapper = new ej.base.createElement('div', {id: 'tailwind-theme-accordion' });
            document.getElementById('theme-properties').appendChild(accordionWrapper);
            for(var tailwindCategory of tailwindCategoryKeys) {
                var tailwindWrapper = new ej.base.createElement('div', {
                    id: `tailwind-theme-${tailwindCategory}-wrapper`,
                    className: `tailwind-theme-${tailwindCategory}-wrapper`
                });
                var tailwindProperties = Object.keys(tailwindCategories[tailwindCategory]);
                for (var tlwndPropertyName of tailwindProperties) {
                    if(tlwndPropertyName === 'id' || tlwndPropertyName === 'dependentProps') {
                        continue;
                    }
                    var tlwndProperty = tailwindCategories[tailwindCategory][tlwndPropertyName];
                    var tlwndPropertyWrapper =  new ej.base.createElement('div', {
                        className: `tailwind-theme-prop-wrapper ${tlwndProperty.id}`,
                        attrs: { 'data-id': tlwndProperty.id }
                    });
                    var tlwndPropertyLabel = new ej.base.createElement('div', {
                        className: 'tailwind-theme-prop',
                        innerHTML: `<span class='color-label'>${tlwndPropertyName}</span>`
                    });
                    var tlwndPropertyValue = new ej.base.createElement('div', {
                        className: `tailwind-theme-value ${tlwndProperty.id}`,
                        attrs: { 'data-hex': '', 'data-name': '' },
                        innerHTML: `
                            <input class='color-auto ${tlwndProperty.id} ${tlwndProperty.defaultCategory}' />
                            <div id='${tlwndProperty.id.startsWith('$') ? tlwndPropertyName : tlwndProperty.id}' class='color-inputs ${tlwndProperty.id} ${tailwindCategory}'>
                                <input class='e-input color-text ${tlwndProperty.id.startsWith('$') ? tlwndPropertyName : tlwndProperty.id} ${tailwindCategory}' type='text'/>
                                <input type='color' class='color-picker ${tlwndProperty.id.startsWith('$') ? tlwndPropertyName : tlwndProperty.id} ${tailwindCategory}' />
                            </div>`
                    });
                    tlwndPropertyWrapper.appendChild(tlwndPropertyLabel);
                    tlwndPropertyWrapper.appendChild(tlwndPropertyValue);
                    tailwindWrapper.appendChild(tlwndPropertyWrapper);
                }
                accordionItem.push({ header: tailwindCategories[tailwindCategory].id, expanded: true, content: tailwindWrapper.outerHTML });
            }
        var accordion = new ej.navigations.Accordion({
            items: accordionItem,
            expanding: tailwindAccordionExpanded,
        });
        accordion.appendTo('#tailwind-theme-accordion');
        document.getElementById('tailwind-theme-accordion').ej2_instances[0].hideItem(6);
        document.getElementById('tailwind-theme-accordion').ej2_instances[0].hideItem(7);
        document.getElementById('tailwind-theme-accordion').ej2_instances[0].hideItem(8);
        document.getElementById('tailwind-theme-accordion').ej2_instances[0].hideItem(9);
        document.getElementById('tailwind-theme-accordion').ej2_instances[0].hideItem(10);
    }
}
}
// Renders color-pickers for bootstrap4 theme.
function renderBV4Properties(themeName) {
    document.getElementById('theme-properties').innerHTML = '';
    document.getElementById('theme-properties').style.padding = '0px';
    ej.base.select('.theme-mode').style.display = 'none';
    ej.base.select('.bv4-advanced-mode').style.display = '';
    var bv4Categories = THEME_PROPERTIES[themeName];
    if (bv4Categories) {
        if (!isAdvancedChecked) {
            var categoryTypes = ['primary', 'secondary'];
            for (var bv4Category of categoryTypes) {
                var wrapper = new ej.base.createElement('div', {
                    id: `bv4-normal-${bv4Category}-wrapper`,
                    className: `bv4-normal-${bv4Category}-wrapper`
                });
                var headLabel = new ej.base.createElement('div', {
                    innerHTML: `<span>${bv4Categories[bv4Category].id}</span>`,
                    className: `bv4-normal-${bv4Category}-label`
                });
                wrapper.appendChild(headLabel);
                document.getElementById('theme-properties').appendChild(wrapper);
                var properties = Object.keys(bv4Categories[bv4Category]);
                for (var propertyName of properties) {
                    if (propertyName === 'id' || propertyName === 'dependentProps') {
                        continue;
                    }
                    var property = bv4Categories[bv4Category][propertyName];
                    var propertyWrapper = new ej.base.createElement('div', {
                        className: 'bv4-normal-prop-wrapper',
                        attrs: { 'data-id': property.id }
                    });
                    var propertyLabel = new ej.base.createElement('div', {
                        className: 'bv4-normal-prop',
                        innerHTML: `<span>${propertyName}</span>`
                    });
                    var propertyValue = new ej.base.createElement('div', {
                        className: 'bv4-normal-value',
                        innerHTML: `
                                <div id='${property.id}' class='color-inputs'>
                                    <input class='e-input color-text ${property.id}' type='text'/>
                                    <input type='color' class='color-picker ${property.id}' />
                                </div>`
                    });
                    propertyWrapper.appendChild(propertyLabel);
                    propertyWrapper.appendChild(propertyValue);
                    document.getElementById(`bv4-normal-${bv4Category}-wrapper`).appendChild(propertyWrapper);
                    new ej.inputs.ColorPicker({
                        columns: 6,
                        inline: false,
                        mode: 'Palette',
                        showButtons: true,
                        modeSwitcher: true,
                        value: property.default,
                        cssClass: 'theme-studio-color-picker',
                        presetColors: { 'custom': property.palettes },
                        beforeTileRender: (args) => {
                            args.element.classList.add('e-circle-palette');
                            args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                            if (args.element.getAttribute('aria-label') === '#ffffff') {
                                args.element.classList.add('white-color-palette');
                            }
                        },
                        change: function (args) {
                            bv4ColorChange(args, themeName, this.element, this.getWrapper().querySelector('.theme-color'));
                        }
                    }, '.color-picker.' + property.id);
                    var inputElement = new ej.inputs.TextBox({
                        value: property.default,
                        change: (args) => textChange(args),
                        input: (args) => inputChange(args)
                    });
                    inputElement.appendTo(`#${property.id}`);
                    ej.base.select(`.e-input.color-text.${property.id}`).value = property.default;
                }
            }
        }
        else {
            var accordionItems = [];
            var bv4CategoryKeys = Object.keys(bv4Categories);
            var accordionWrapper = new ej.base.createElement('div', { id: 'bv4-advanced-accordion' });
            document.getElementById('theme-properties').appendChild(accordionWrapper);
            for (var bv4Category of bv4CategoryKeys) {
                var bv4Wrapper = new ej.base.createElement('div', {
                    id: `bv4-advanced-${bv4Category}-wrapper`,
                    className: `bv4-advanced-${bv4Category}-wrapper`
                });
                var bv4Properties = Object.keys(bv4Categories[bv4Category]);
                for (var bv4PropertyName of bv4Properties) {
                    if (bv4PropertyName === 'id' || bv4PropertyName === 'dependentProps') {
                        continue;
                    }
                    var bv4Property = bv4Categories[bv4Category][bv4PropertyName];
                    var bv4PropertyWrapper = new ej.base.createElement('div', {
                        className: `bv4-advanced-prop-wrapper ${bv4Property.id}`,
                        attrs: { 'data-id': bv4Property.id }
                    });
                    var bv4PropertyLabel = new ej.base.createElement('div', {
                        className: 'bv4-advanced-prop',
                        innerHTML: `<span class='color-label'>${bv4PropertyName}</span>`
                    });
                    var bv4PropertyValue = new ej.base.createElement('div', {
                        className: `bv4-advanced-value ${bv4Property.id}`,
                        attrs: { 'data-hex': '', 'data-name': '' },
                        innerHTML: `
                                <input class='color-auto ${bv4Property.id} ${bv4Property.defaultCategory}' />
                                <div id='${bv4Property.id.startsWith('$') ? bv4PropertyName : bv4Property.id}' class='color-inputs ${bv4Property.id} ${bv4Category}'>
                                    <input class='e-input color-text ${bv4Property.id.startsWith('$') ? bv4PropertyName : bv4Property.id} ${bv4Category}' type='text'/>
                                    <input type='color' class='color-picker ${bv4Property.id.startsWith('$') ? bv4PropertyName : bv4Property.id} ${bv4Category}' />
                                </div>`
                    });
                    bv4PropertyWrapper.appendChild(bv4PropertyLabel);
                    bv4PropertyWrapper.appendChild(bv4PropertyValue);
                    bv4Wrapper.appendChild(bv4PropertyWrapper);
                }
                accordionItems.push({ header: bv4Categories[bv4Category].id, expanded: true, content: bv4Wrapper.outerHTML });
            }
            var accordion = new ej.navigations.Accordion({
                items: accordionItems,
                expanding: accordionExpanded,
            });
            accordion.appendTo('#bv4-advanced-accordion');
        }
    }
}

// Returns theme properties.
function getThemeProperties(themeName, property, color, isPicker) {
    var themeProps = {};
    themeProps.properties = themeColors[themeName];
    if ((isAdvancedChecked && themeName === BOOTSTRAP4)) {
        var bv4AdvancedElements = document.querySelector('div#bv4-advanced-accordion').querySelectorAll(isPicker ? '.color-picker' : '.color-text');
        for (var element of bv4AdvancedElements) {
            var propertyName = element.classList[isPicker ? 1 : 2];
            themeProps.properties['$' + propertyName] = element.value;
        }
    }
    else if ((isAdvancedChecked && themeName === 'tailwind')) {
        var tailwindAdvancedElements = document.querySelector('div#tailwind-theme-accordion').querySelectorAll(isPicker ? '.color-picker' : '.color-text');
        for (var element of tailwindAdvancedElements) {
            var propertyName = element.classList[isPicker ? 1 : 2];
            themeProps.properties['$' + propertyName] = element.value;
        }
    }
    else {
        themeProps.properties['$' + property] = color;
    }
    themeProps['theme'] = themeName;
    themeProps['dependencies'] = window.dependencies;
    themeProps['isCustomTheme'] = DEFAULT_THEMES.indexOf(themeName) === -1;
    return themeProps;
}

// Show overlay background on the application page.
function showOverlay(isThemeSwitched) {
    if (isThemeSwitched) {
        ej.base.select('.control-container').classList.add('theme-hide');
        ej.base.select('.right-panel').classList.add('theme-hide');
    }
    themeBodyLeftOverlay.classList.remove('theme-hide');
    ej.base.select('.control-container').classList.add('.click-events');
}

// Remove overlay background on the application page.
function removeOverlay(isThemeSwitched) {
    if (!themeBodyLeftOverlay.classList.contains('theme-hide')) {
        if (isThemeSwitched) {
            ej.base.select('.control-container').classList.remove('theme-hide');
            ej.base.select('.right-panel').classList.remove('theme-hide');
        }
        themeBodyLeftOverlay.classList.add('theme-hide');
        ej.base.select('.control-container').classList.remove('.click-events');
    }
}

// Exports the customized theme as downloadable zip file.
function exporting(hasExport) {
    if (hasExport) {
        var themeProps = {};
        themeProps['theme'] = currentTheme;
        themeProps['isCustomTheme'] = DEFAULT_THEMES.indexOf(currentTheme) === -1;
        themeProps['file'] = document.getElementById('default-input').value;;
        themeProps.properties = themeColors[currentTheme];
        themeProps['components'] = getFilteredControls();
        themeProps['compatibility'] = document.getElementById('ts-checkbox').checked;
        if (currentTheme === BOOTSTRAP4) {
            themeProps['isAdvanced'] = isAdvancedChecked;
        }
        if (currentTheme === 'tailwind') {
            themeProps['isAdvanced'] = isAdvancedChecked;
        }
        setDependencies();
        themeProps['dependencies'] = window.dependencies;
        themeProps['individualDeps'] = getStyleDeps();
        themeBodyLeftOverlay.style.backgroundColor = '#383838';
        showOverlay();
        ajaxRequest(NODEJS_URL + 'ExportTheme', themeProps, (data) => {
            var download = ej.base.select('#download-link');
            download.href = data;
            download.click();
            removeOverlay();
            themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        });
    }
    exportDialog.hide();
}

// Change color-picker button class and background.
function changeButtonClass(propertyElement, value, className) {
    var wrapperElement = propertyElement;
    if (className) {
        wrapperElement = propertyElement.querySelector(className);
        wrapperElement.querySelectorAll('button')[0].style.display = 'none';
    }
    var buttonElement = wrapperElement.querySelectorAll('button')[1];
    buttonElement.classList = 'theme-color-picker-override';
    buttonElement.children[0].classList = 'theme-color';
    buttonElement.children[0].style.backgroundColor = value;
};

// Update dependent property values and change its updated color values to the color picker button element.
function updateDependentProperties(category, value, previousValue) {
    var dependentProps = document.querySelector(`.bv4-advanced-${category}-wrapper`).getAttribute('data-dependent-props').split(',');
    for (var property of dependentProps) {
        var propertyElement = ej.base.select(`.bv4-advanced-value.${property}`);
        var textElement = propertyElement.querySelector('.color-text');
        var pickerElement = propertyElement.querySelector('.color-picker');
        var oldPalettes = pickerElement.ej2_instances[0].presetColors.custom;
        if (oldPalettes.includes(previousValue)) {
            oldPalettes.pop(previousValue);
            oldPalettes.push(value);
        }
        pickerElement.ej2_instances[0].presetColors.custom = oldPalettes;
        if (textElement.value.startsWith('$') && textElement.getAttribute('data-hex') === previousValue) {
            textElement.setAttribute('data-hex', value);
            pickerElement.value = value;
            changeButtonClass(propertyElement, value, '.e-colorpicker-wrapper');
        }
        else if (textElement.value === previousValue) {
            textElement.value = value;
            pickerElement.value = value;
            changeButtonClass(propertyElement, value, '.e-colorpicker-wrapper');
        }
    }
}

function updateTailwindProperties(category, value, previousValue) {
    var dependentProps = document.querySelector(`.tailwind-theme-${category}-wrapper`).getAttribute('data-dependent-props').split(',');
    for (var property of dependentProps) {
        var propertyElement = ej.base.select(`.tailwind-theme-value.${property}`);
        var textElement = propertyElement.querySelector('.color-text');
        var pickerElement = propertyElement.querySelector('.color-picker');
        var oldPalettes = pickerElement.ej2_instances[0].presetColors.custom;
        if (oldPalettes.includes(previousValue)) {
            oldPalettes.pop(previousValue);
            oldPalettes.push(value);
        }
        pickerElement.ej2_instances[0].presetColors.custom = oldPalettes;
        if (textElement.value.startsWith('$') && textElement.getAttribute('data-hex') === previousValue) {
            textElement.setAttribute('data-hex', value);
            pickerElement.value = value;
            changeButtonClass(propertyElement, value, '.e-colorpicker-wrapper');
        }
        else if (textElement.value === previousValue) {
            textElement.value = value;
            pickerElement.value = value;
            changeButtonClass(propertyElement, value, '.e-colorpicker-wrapper');
        }
    }
}

// Apply theme color changes to the control for bootstrap4 theme.
function bv4ColorChange(args, themeName, colorPickerElement, colorElement) {
    var element = colorPickerElement.closest(`.bv4-${isAdvancedChecked ? 'advanced' : 'normal'}-prop-wrapper`);
    var inputElement = element.querySelector('.e-input.color-text');
    var pickerElement = element.querySelector('.color-picker');
    pickerElement.value = inputElement.value = args.currentValue.hex;
    var categoryName = inputElement.classList[3] ? inputElement.classList[3] : inputElement.classList[2];
    if (isAdvancedChecked && (categoryName === 'grays' || categoryName === 'colors')) {
        updateDependentProperties(categoryName, args.currentValue.hex, args.previousValue.hex);
        if (categoryName === 'grays') {
            bv4GrayProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'colors') {
            bv4ColorProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
    }
    var value = args.currentValue.rgba;
    if (categoryName === 'page') {
        //     var isBG = element.getAttribute('data-id') === 'page-bg';
        //     var cards = ej.base.selectAll('.layout-card');
        //     for(var card of cards) {
        //         card.style[isBG ? 'backgroundColor': 'color'] = value;
        //     }
        return;
    }
    var themeProps = getThemeProperties(themeName, element.getAttribute('data-id'), value, true);
    var controlSection = document.getElementById('control-section');
    var scrollTop = controlSection.scrollTop;
    themeBodyLeftOverlay.style.backgroundColor = '#383838';
    showOverlay();
    compileTheme(themeProps, () => {
        colorElement.style.backgroundColor = value;
        removeOverlay();
        themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        controlSection.scrollTop = scrollTop;
    });
}

function tailwindColorChange(args, themeName, colorPickerElement, colorElement) {
    var element = colorPickerElement.closest(`.tailwind-${isAdvancedChecked ? 'theme' : 'normal'}-prop-wrapper`);
    var inputElement = element.querySelector('.e-input.color-text');
    var pickerElement = element.querySelector('.color-picker');
    pickerElement.value = inputElement.value = args.currentValue.hex;
    var categoryName = inputElement.classList[3] ? inputElement.classList[3] : inputElement.classList[2];
    if (categoryName === 'coolgrays' || categoryName === 'indigos' || categoryName === 'greens' || categoryName === 'reds' || categoryName === 'cyans' || categoryName === 'oranges') {
        updateTailwindProperties(categoryName, args.currentValue.hex, args.previousValue.hex);
        if (categoryName === 'coolgrays') {
            tailwindGrayProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'indigos') {
            tailwindIndigoProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'greens') {
            tailwindGreenProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'reds') {
            tailwindRedProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'cyans') {
            tailwindCyanProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
        if (categoryName === 'oranges') {
            tailwindOrangeProps['$' + pickerElement.classList[1]] = args.currentValue.hex;
        }
    }
    var value = args.currentValue.rgba;
    if (categoryName === 'page') {
        //     var isBG = element.getAttribute('data-id') === 'page-bg';
        //     var cards = ej.base.selectAll('.layout-card');
        //     for(var card of cards) {
        //         card.style[isBG ? 'backgroundColor': 'color'] = value;
        //     }
        return;
    }
    var themeProps = getThemeProperties(themeName, element.getAttribute('data-id'), value, true);
    var controlSection = document.getElementById('control-section');
    var scrollTop = controlSection.scrollTop;
    themeBodyLeftOverlay.style.backgroundColor = '#383838';
    showOverlay();
    compileTheme(themeProps, () => {
        colorElement.style.backgroundColor = value;
        removeOverlay();
        themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        controlSection.scrollTop = scrollTop;
    });
}

// Accordion expanding event functionalities for bootstrap4 theme.
function accordionExpanded(e) {
    var wrapperElements = e.element.querySelectorAll('.e-colorpicker-wrapper');
    if (!wrapperElements || wrapperElements.length > 0) {
        return;
    }
    var bv4CategoryName = e.element.querySelector('.e-acrdn-content').children[0].id.split('-')[2];
    var bv4Category = THEME_PROPERTIES[BOOTSTRAP4][bv4CategoryName];
    if (bv4CategoryName === 'grays' || bv4CategoryName === 'colors') {
        e.element.querySelector('.e-acrdn-content').children[0].setAttribute('data-dependent-props', bv4Category.dependentProps);
    }
    var colorPickerElements = e.element.querySelectorAll('.color-picker');
    var textElements = e.element.querySelectorAll('.color-text');
    var labelElements = e.element.querySelectorAll('.color-label');
    colorPickerElements.forEach((pickerElement, index) => {
        var labelText = labelElements[index].innerText;
        if (bv4CategoryName === 'grays') {
            bv4GrayProps['$' + bv4Category[labelText].id] = bv4Category[labelText].default;
        }
        if (bv4CategoryName === 'colors') {
            bv4ColorProps['$' + bv4Category[labelText].id] = bv4Category[labelText].default;
        }
        if (bv4CategoryName !== 'grays' && bv4CategoryName !== 'colors' && bv4CategoryName !== 'page') {
            textElements[index].setAttribute('data-hex', bv4Category[labelText].default);
            textElements[index].setAttribute('data-name', bv4Category[labelText].defaultName);
            textElements[index].setAttribute('data-category', bv4Category[labelText].defaultCategory);
        }
        new ej.inputs.ColorPicker({
            columns: 6,
            inline: false,
            mode: 'Palette',
            showButtons: true,
            cssClass: 'theme-studio-color-picker',
            value: bv4Category[labelText].default,
            modeSwitcher: bv4Category.dependentProps ? true : false,
            presetColors: {
                'custom': bv4Category[labelText].palettes
            },
            beforeTileRender: (args) => {
                args.element.classList.add('e-circle-palette');
                args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                if (args.element.getAttribute('aria-label') === '#ffffff') {
                    args.element.classList.add('white-color-palette');
                }
            },
            change: function (args) {
                bv4ColorChange(args, BOOTSTRAP4, this.element, this.getWrapper().querySelector('.theme-color'));
            }
        }, pickerElement);
        var inputElement = new ej.inputs.TextBox({
            value: bv4Category[labelText].default,
            change: (args) => bv4OnChange(args),
            input: (args) => bv4OnInput(args)
        });
        inputElement.appendTo(`.color-inputs.${bv4Category[labelText].id}`);
        ej.base.select(`.e-input.color-text.${bv4Category[labelText].id}`).value = bv4Category[labelText].default;
        if (bv4Category[labelText].defaultCategory) {
            var popupParent = e.element.querySelector(`.bv4-advanced-value.${bv4Category[labelText].id}`);
            var autoComplete = new ej.dropdowns.AutoComplete({
                dataSource: bv4Category[labelText].defaultCategory === 'grays' ? BV4_GRAY_ITEMS : BV4_COLOR_ITEMS,
                change: (args) => autoPopupChange(args),
                open: (args) => autoPopupOpen(args, popupParent)
            });
            autoComplete.appendTo(`.${bv4Category[labelText].id}.${bv4Category[labelText].defaultCategory}`);
        }
    });

    for (var wrapElement of wrapperElements) {
        changeButtonClass(wrapElement, wrapElement.querySelector('input').ej2_instances[0].value);
    }
}

function tailwindAccordionExpanded(e) {
    var wrapperElements = e.element.querySelectorAll('.e-colorpicker-wrapper');
    if (!wrapperElements || wrapperElements.length > 0) {
        return;
    }
    var tailwindCategoryName = e.element.querySelector('.e-acrdn-content').children[0].id.split('-')[2];
    var tailwindCategory = THEME_PROPERTIES['tailwind'][tailwindCategoryName];
    if (tailwindCategoryName === 'coolgrays' || tailwindCategoryName === 'indigos' || tailwindCategoryName === 'greens' || tailwindCategoryName === 'reds' || tailwindCategoryName === 'cyans' || tailwindCategoryName === 'oranges') {
        e.element.querySelector('.e-acrdn-content').children[0].setAttribute('data-dependent-props', tailwindCategory.dependentProps);
    }
    var colorPickerElements = e.element.querySelectorAll('.color-picker');
    var textElements = e.element.querySelectorAll('.color-text');
    var labelElements = e.element.querySelectorAll('.color-label');
    colorPickerElements.forEach((pickerElement, index) => {
        var labelText = labelElements[index].innerText;
        if (tailwindCategoryName === 'coolgrays') {
            tailwindGrayProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName === 'indigos') {
            tailwindIndigoProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName === 'greens') {
            tailwindGreenProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName === 'reds') {
            tailwindRedProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName === 'cyans') {
            tailwindCyanProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName === 'oranges') {
            tailwindOrangeProps['$' + tailwindCategory[labelText].id] = tailwindCategory[labelText].default;
        }
        if (tailwindCategoryName !== 'coolgrays' && tailwindCategoryName !== 'indigos' && tailwindCategoryName !== 'greens' && tailwindCategoryName !== 'reds' && tailwindCategoryName !== 'cyans' && tailwindCategoryName !== 'oranges') {
            textElements[index].setAttribute('data-hex', tailwindCategory[labelText].default);
            textElements[index].setAttribute('data-name', tailwindCategory[labelText].defaultName);
            textElements[index].setAttribute('data-category', tailwindCategory[labelText].defaultCategory);
        }
        new ej.inputs.ColorPicker({
            columns: 6,
            inline: false,
            mode: 'Palette',
            showButtons: true,
            cssClass: 'theme-studio-color-picker',
            value: tailwindCategory[labelText].default,
            modeSwitcher: tailwindCategory.dependentProps ? true : false,
            presetColors: {
                'custom': tailwindCategory[labelText].palettes
            },
            beforeTileRender: (args) => {
                args.element.classList.add('e-circle-palette');
                args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                if (args.element.getAttribute('aria-label') === '#ffffff') {
                    args.element.classList.add('white-color-palette');
                }
            },
            change: function (args) {
                tailwindColorChange(args, 'tailwind', this.element,this.getWrapper().querySelector('.theme-color'));
            }
        }, pickerElement);
        var inputElement = new ej.inputs.TextBox({
            value: tailwindCategory[labelText].default,
            change: (args) => tailwindOnChange(args),
            input: (args) => tailwindOnInput(args)
        });
        inputElement.appendTo(`.color-inputs.${tailwindCategory[labelText].id}`);
        ej.base.select(`.e-input.color-text.${tailwindCategory[labelText].id}`).value = tailwindCategory[labelText].default;
        if (tailwindCategory[labelText].defaultCategory) {
            var popupParent = e.element.querySelector(`.tailwind-theme-value.${tailwindCategory[labelText].id}`);
            var autoComplete = new ej.dropdowns.AutoComplete({
                dataSource: tailwindCategory[labelText].defaultCategory === 'coolgrays' ? TAILWIND_BASE_ITEMS : TAILWIND_BRAND_ITEMS,
                change: (args) => tailwindAutoPopupChange(args),
                open: (args) => autoPopupOpen(args, popupParent)
            });
            autoComplete.appendTo(`.${tailwindCategory[labelText].id}.${tailwindCategory[labelText].defaultCategory}`);
        }
    });

    for (var wrapElement of wrapperElements) {
        changeButtonClass(wrapElement, wrapElement.querySelector('input').ej2_instances[0].value);
    }
}
// AutoComplete change event functionalities for bootstrap4 theme.
function autoPopupChange(e) {
    var parentElement = e.element.parentElement.parentElement;
    var propName = parentElement.parentElement.getAttribute('data-id');
    var propCategory = parentElement.querySelector('.color-inputs').classList[2];
    var isGrays = THEME_PROPERTIES[BOOTSTRAP4]['grays'].dependentProps.split(',').includes(propName) && bv4GrayProps[e.value];
    var isColors = THEME_PROPERTIES[BOOTSTRAP4]['colors'].dependentProps.split(',').includes(propName) && bv4ColorProps[e.value];
    var textElement = parentElement.querySelector('.color-text');
    var pickerElement = parentElement.querySelector('.color-picker');
    if (isGrays || isColors) {
        var hexValue = isGrays ? bv4GrayProps[e.value] : (isColors ? bv4ColorProps[e.value] : THEME_PROPERTIES[propCategory][propName].default);
        textElement.value = e.value;
        pickerElement.value = hexValue;
        textElement.setAttribute('data-hex', hexValue);
        textElement.setAttribute('data-name', e.value);
        changeButtonClass(parentElement, hexValue);
        textElement.blur();
    }
    else {
        alert('Please enter a valid color name');
        textElement.value = pickerElement.value;
    }
}

function tailwindAutoPopupChange(e) {
    var parentElement = e.element.parentElement.parentElement;
    var propName = parentElement.parentElement.getAttribute('data-id');
    var propCategory = parentElement.querySelector('.color-inputs').classList[2];
    var isCoolGrays = THEME_PROPERTIES['tailwind']['coolgrays'].dependentProps.split(',').includes(propName) && tailwindGrayProps[e.value];
    var isIndigos = THEME_PROPERTIES['tailwind']['indigos'].dependentProps.split(',').includes(propName) && tailwindIndigoProps[e.value];
    var isGreens = THEME_PROPERTIES['tailwind']['greens'].dependentProps.split(',').includes(propName) && tailwindGreenProps[e.value];
    var isReds = THEME_PROPERTIES['tailwind']['reds'].dependentProps.split(',').includes(propName) && tailwindRedProps[e.value];
    var isCyan = THEME_PROPERTIES['tailwind']['cyans'].dependentProps.split(',').includes(propName) && tailwindCyanProps[e.value];
    var isOrange = THEME_PROPERTIES['tailwind']['oranges'].dependentProps.split(',').includes(propName) && tailwindOrangeProps[e.value];
    var textElement = parentElement.querySelector('.color-text');
    var pickerElement = parentElement.querySelector('.color-picker');
    if (isCoolGrays || isIndigos) {
        var hexValue = isCoolGrays ? tailwindGrayProps[e.value] : (isIndigos ? tailwindIndigoProps[e.value] : THEME_PROPERTIES[propCategory][propName].default);
        textElement.value = e.value;
        pickerElement.value = hexValue;
        textElement.setAttribute('data-hex', hexValue);
        textElement.setAttribute('data-name', e.value);
        changeButtonClass(parentElement, hexValue);
        textElement.blur();
    }
    else {
        alert('Please enter a valid color name');
        textElement.value = pickerElement.value;
    }
}

// AutoComplete open event functionalities for bootstrap4 theme.
function autoPopupOpen(e, parent) {
    e.popup.offsetX = 0;
    e.popup.offsetY = 0;
    e.popup.width = parent.offsetWidth + 'px';
    e.popup.dataBind();
    e.popup.refreshPosition(parent, true);
}

// Input change event functionalities inside accordion for bootstrap4 theme.
function bv4OnChange(e) {
    var textElement = e.event.currentTarget.querySelector('.color-text');
    var pickerElement = e.event.currentTarget.querySelector('.color-picker');
    var propName = pickerElement.closest(`.bv4-${isAdvancedChecked ? 'advanced' : 'normal'}-prop-wrapper`).getAttribute('data-id');
    var categoryName = textElement.classList[3] ? textElement.classList[3] : textElement.classList[2];
    var previousValue = pickerElement.value;
    var value = textElement.value;
    if (isAdvancedChecked) {
        if (categoryName === 'grays' || categoryName === 'colors') {
            updateDependentProperties(categoryName, value, previousValue);
            if (categoryName === 'grays') {
                bv4GrayProps['$' + pickerElement.classList[1]] = value;
            }
            if (categoryName === 'colors') {
                bv4ColorProps['$' + pickerElement.classList[1]] = value;
            }
        }
        else if (['primary', 'secondary', 'content', 'others'].indexOf(categoryName) !== -1) {
            if (value.startsWith('$')) {
                var inputCategory = textElement.getAttribute('data-category');
                var colorProps = inputCategory === 'grays' ? bv4GrayProps : bv4ColorProps;
                value = Object.keys(colorProps).includes(textElement.value) ? colorProps[textElement.value] : null;
                if (value) {
                    textElement.setAttribute('data-hex', value);
                    textElement.setAttribute('data-name', textElement.value);
                }
                else {
                    alert('Please enter valid color name');
                    textElement.value = previousValue;
                    value = previousValue;
                }
            }
        }
    }
    pickerElement.value = value;
    var themeProps = getThemeProperties(BOOTSTRAP4, propName, hexToRgb(value), false);
    var controlSection = document.getElementById('control-section');
    var scrollTop = controlSection.scrollTop;
    themeBodyLeftOverlay.style.backgroundColor = '#383838';
    showOverlay();
    compileTheme(themeProps, () => {
        themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        controlSection.scrollTop = scrollTop;
        removeOverlay();
    });
    changeButtonClass(e.event.currentTarget, pickerElement.value, '.theme-studio-color-picker');
}

function tailwindOnChange(e) {
    var textElement = e.event.currentTarget.querySelector('.color-text');
    var pickerElement = e.event.currentTarget.querySelector('.color-picker');
    var propName = pickerElement.closest(`.tailwind-${isAdvancedChecked ? 'advanced' : 'normal'}-prop-wrapper`).getAttribute('data-id');
    // var propName = pickerElement.closest(`.tailwind-theme-prop-wrapper`).getAttribute('data-id');
    var categoryName = textElement.classList[3] ? textElement.classList[3] : textElement.classList[2];
    var previousValue = pickerElement.value;
    var value = textElement.value;
        updateTailwindProperties(categoryName, value, previousValue);
        if (categoryName === 'coolgrays') {
            tailwindGrayProps['$' + pickerElement.classList[1]] = value;
        }
        if (categoryName === 'indigos') {
            tailwindIndigoProps['$' + pickerElement.classList[1]] = value;
        }
        if (categoryName === 'greens') {
            tailwindGreenProps['$' + pickerElement.classList[1]] = value;
        }
        if (categoryName === 'reds') {
            tailwindRedProps['$' + pickerElement.classList[1]] = value;
        }
        if (categoryName === 'cyans') {
            tailwindCyanProps['$' + pickerElement.classList[1]] = value;
        }
        if (categoryName === 'oranges') {
            tailwindOrangeProps['$' + pickerElement.classList[1]] = value;
        }

    // else if (['primary', 'secondary', 'content', 'others'].indexOf(categoryName) !== -1) {
    //     if (value.startsWith('$')) {
    //         var inputCategory = textElement.getAttribute('data-category');
    //         var colorProps = inputCategory === 'coolgrays' ? tailwindGrayProps : tailwindIndigoProps;
    //         value = Object.keys(colorProps).includes(textElement.value) ? colorProps[textElement.value] : null;
    //         if (value) {
    //             textElement.setAttribute('data-hex', value);
    //             textElement.setAttribute('data-name', textElement.value);
    //         }
    //         else {
    //             alert('Please enter valid color name');
    //             textElement.value = previousValue;
    //             value = previousValue;
    //         }
    //     }
    // }
    pickerElement.value = value;
    var themeProps = getThemeProperties('tailwind', propName, hexToRgb(value), false);
    var controlSection = document.getElementById('control-section');
    var scrollTop = controlSection.scrollTop;
    themeBodyLeftOverlay.style.backgroundColor = '#383838';
    showOverlay();
    compileTheme(themeProps, () => {
        themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        controlSection.scrollTop = scrollTop;
        removeOverlay();
    });
    changeButtonClass(e.event.currentTarget, pickerElement.value, '.theme-studio-color-picker');
}

// Converts hexa decimal to RGBA color code.
function hexToRgb(hex) {
    var shortHandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shortHandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 1)`;
}

// Converts hexa decimal to RGBA color code.
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(value) {
    var rgb = value.split(',');
    return "#" + componentToHex(Number(rgb[0])) + componentToHex(Number(rgb[1])) + componentToHex(Number(rgb[2]));
}
  
// Input event functionalities inside accordion for bootstrap4 theme.
function bv4OnInput(e) {
    var textElement = e.container.querySelector('.color-text');
    var category = textElement.getAttribute('data-category');
    if (category && (category === 'grays' || category === 'colors')) {
        var autoComplete = e.container.parentElement.querySelector('.color-auto').ej2_instances[0];
        autoComplete.inputElement.value = textElement.value;
        autoComplete.onInput();
        autoComplete.onFilterUp({ preventDefault: function () { }, target: null, type: null, keyCode: 72 });
    }
    else {
        if (!textElement.value.startsWith('#')) {
            alert('Please enter valid hexa color code.');
            textElement.value = e.container.querySelector('.color-picker').value;
        }
    }
}

// Input event functionalities inside accordion for tailwind theme.
function tailwindOnInput(e) {
    var textElement = e.container.querySelector('.color-text');
    var autoComplete = e.container.parentElement.querySelector('.color-auto').ej2_instances[0];
    autoComplete.inputElement.value = textElement.value;
    autoComplete.onInput();
    autoComplete.onFilterUp({ preventDefault: function () { }, target: null, type: null, keyCode: 72 });
    if (!textElement.value.startsWith('#')) {
        alert('Please enter valid hexa color code.');
        textElement.value = e.container.querySelector('.color-picker').value;
    }
}

// Create checkboxes inside filter dialog.
function createCheckBox(element, isCategory) {
    var checkbox = new ej.buttons.CheckBox({
        checked: false,
        label: element.value,
        change: isCategory ? filterCategoryCheck : filterControlCheck
    });
    checkbox.appendTo(element);
}

// Change event handler for filter category checkbox.
function filterCategoryCheck(args) {
    isFilterChecked = true;
    setCheckBoxState(ej.base.select('[data=' + args.event.currentTarget.id + ']').querySelectorAll('input'), args.checked);
    setSelectAllState();
}

// Change event handler for filter controls checkbox.
function filterControlCheck(args) {
    isFilterChecked = true;
    var controlDiv = ej.base.closest(args.event.currentTarget, '.control-checkbox');
    var categoryCheckbox = ej.base.select('.category-checkbox #' + controlDiv.getAttribute('data')).ej2_instances[0];
    var input = getCheckboxState(controlDiv.querySelectorAll('input'));
    categoryCheckbox.checked = input.checked;
    categoryCheckbox.indeterminate = input.intermediate;
    setSelectAllState();
}

// Returns checkbox state based on selected controls. 
function getCheckboxState(inputs) {
    var inputCount = inputs.length;
    var checkedCount = 0;
    for (var input of inputs) {
        if (input.ej2_instances[0].checked) {
            ++checkedCount;
        }
    }
    var state = { checked: false, intermediate: true };
    if (checkedCount === 0) {
        state = { checked: false, intermediate: false };
    } else if (checkedCount === inputCount) {
        state = { checked: true, intermediate: false };
    }
    return state;
}

// Set checked/unchecked state to a input checkbox.
function setCheckBoxState(inputs, isChecked) {
    for (var input of inputs) {
        input.ej2_instances[0].checked = isChecked;
    }
}

// Set the state of select all checkbox inside the filter dialog.
function setSelectAllState() {
    var inputs = ej.base.selectAll('.control-checkbox input');
    var inputsCount = inputs.length;
    var checkedCount = 0;
    for (var input of inputs) {
        if (input.ej2_instances[0].checked)
            ++checkedCount
    }
    var selectAll = ej.base.select('.theme-filter-header .theme-filter-select-all input').ej2_instances[0];
    if (checkedCount === 0) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
        document.getElementById('apply').disabled = true;
    } else if (checkedCount === inputsCount) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
        document.getElementById('apply').disabled = false;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = true;
        document.getElementById('apply').disabled = false;
    }
}

// Set checked/unchecked to controls checkbox in filter dialog.
function changeCheckedState(args) {
    isFilterChecked = true;
    var inputs = ej.base.selectAll('.theme-filter-body .category-checkbox [aria-checked="mixed"] input');
    for (var input of inputs) {
        input.ej2_instances[0].indeterminate = undefined;
    }
    var allInputs = ej.base.selectAll('.theme-filter-body input');
    for (var i = 0; i < allInputs.length; i++) {
        var isChecked = args.checked;
        if (isInitRender) {
            var controlName = allInputs[i].id.replace('comp-', '');
            isChecked = HIDDEN_CONTROLS.indexOf(controlName) === -1;
            if (isChecked && controlName.indexOf('filter-category-') === -1) {
                filteredControls.push(controlName);
            }
        }
        allInputs[i].ej2_instances[0].checked = isChecked;
    }
    document.getElementById('apply').disabled = !args.checked;
}

function quickFilter(args) {
    changeCheckedState({ checked: false });
    setSelectAllState();
    var filterCategories = args.value;
    for (var fCategory of fCategoriesCheckbox) {
        ej.base.closest(ej.base.select('#' + fCategory.id), '.category-checkbox').classList.remove('filter-hide');
        ej.base.select('[data="' + fCategory.id + '"]').classList.remove('filter-hide');
        var wrapperElements = ej.base.selectAll('[data="' + fCategory.id + '"] div.e-checkbox-wrapper');
        for (var wrapElement of wrapperElements) {
            wrapElement.classList.remove('filter-hide');
        }
    }

    selectAllDiv.classList.remove('filter-hide');
    if (filterCategories.length !== 0) {
        selectAllDiv.classList.add('filter-hide');
        for (var fCategory of fCategoriesCheckbox) {
            var id = fCategory.id;
            if (filterCategories.indexOf(id) !== -1) {
                ej.base.closest(ej.base.select('#' + id), '.category-checkbox').classList.remove('filter-hide');
                ej.base.select('[data="' + id + '"]').classList.remove('filter-hide');
                var catgeoryCheckbox = ej.base.select('#' + id);
                if (!catgeoryCheckbox.ej2_instances[0].checked) {
                    catgeoryCheckbox.click();
                }
            } else {
                ej.base.closest(ej.base.select('#' + id), '.category-checkbox').classList.add('filter-hide');
                ej.base.select('[data="' + id + '"]').classList.add('filter-hide');
            }
        }
    }
}

Array.prototype.diff = function (a1) {
    return this.filter(function (a2) {
        return a1.indexOf(a2) === -1;
    });
};

function filterSearch(value) {
    var filteredControls = [];
    var selectedCategories = [];
    changeCheckedState({ checked: false });
    setSelectAllState();
    quickFilter({ value: '' });
    if (!value) {
        return;
    }
    selectAllDiv.classList.add('filter-hide');
    var selectedControls = filterDefaultData.executeLocal(new ej.data.Query().where('name', 'contains', value, true));
    filteredControls = filteredData.controls.diff(selectedControls);

    for (var control of selectedControls) {
        var selectedCategory = filteredData.categories[control.name];
        if (selectedCategories.indexOf(selectedCategory) === -1) {
            selectedCategories.push(selectedCategory);
        }
    }

    for (var control of filteredControls) {
        ej.base.closest(ej.base.select(`.control-checkbox [value="${control.name}"]`), 'div.e-checkbox-wrapper').classList.add('filter-hide');
        if (selectedCategories.indexOf(filteredData.categories[control.name]) === -1) {
            ej.base.closest(ej.base.select('#' + filteredData.categories[control.name]), '.category-checkbox').classList.add('filter-hide');
        }
    }
}

function filtering(canFilter, isImporting) {
    filterDialog.hide();
    if (canFilter && isFilterChecked) {
        if (!isImporting) {
            showOverlay(true);
        }
        isFilterChecked = false;
        filteredControls = [];
        var filterInfo = {
            controls: { checked: [], unchecked: [] },
            categories: { checked: [], unchecked: [], intermediate: [] }
        };
        var controlsCheckbox = ej.base.selectAll('.theme-filter-body .control-checkbox input');
        if (ej.base.select('.theme-filter-header .theme-filter-select-all input').ej2_instances[0].checked) {
            isFilterApplied = false;
            controlsCheckbox.forEach((checkbox) => { filteredControls.push(checkbox.id.slice(5)); });
            if (!isImporting) {
                compileTheme(null, () => {
                    renderControls();
                    renderTwoColumnLayout();
                    document.getElementById('filters').classList.remove('actives');
                    removeOverlay(true);
                });
            }
            return;
        }
        isFilterApplied = true;

        var categoriesCheckbox = ej.base.selectAll('.theme-filter-body .category-checkbox input');
        for (let checkbox of controlsCheckbox) {
            var controlName = checkbox.id.slice(5);
            var state = checkbox.ej2_instances[0].checked ? 'checked' : 'unchecked';
            filterInfo.controls[state].push(controlName);
            if (state === 'checked') {
                filteredControls.push(controlName);
            }
        }
        for (let checkbox of categoriesCheckbox) {
            var categoryName = checkbox.id.replace('filter-category-', '');
            var categoryElement = checkbox.ej2_instances[0].element.parentElement.querySelector('.e-frame');
            if (categoryElement.classList.contains('e-stop') || checkbox.ej2_instances[0].indeterminate) {
                filterInfo.categories.intermediate.push(categoryName);
            } else if (checkbox.ej2_instances[0].checked) {
                filterInfo.categories.checked.push(categoryName);
            } else {
                filterInfo.categories.unchecked.push(categoryName);
            }
        }
        hiddenControls = [];
        categories.small.controls = [];
        categories.small.card = [];
        categories.big = {};
        getCheckedCategories(filterInfo.categories.checked, filterInfo.controls, true);
        getCheckedCategories(filterInfo.categories.intermediate, filterInfo.controls, false);
        if (!isImporting) {
            compileTheme(null, () => {
                generateFilterHtml();
                // 2500ms delay for applying app styles.
                setTimeout(() => {
                    removeOverlay(true);
                }, 2500)
            });
            applyAppStyles();
        }
    }
    document.getElementById('filters').classList.add('actives');
    document.getElementById('filters').classList.remove('actives');
}

function getCheckedCategories(fCategories, controls, isChecked) {
    for (var category of fCategories) {
        var categoryInfo = CARD_CATEGORY[category];
        var smallCards = categoryInfo['col-cards'];
        var smallCardKeys = Object.keys(smallCards);
        for (var smallCard of smallCardKeys) {
            var cardValue = smallCards[smallCard];
            if (!cardValue && controls.checked.includes(smallCard)) {
                categories.small.card[smallCard] = cardValue;
            }
            else if (cardValue instanceof Array && cardValue.length > 0) {
                categories.small.controls[smallCard] = { checked: [], unchecked: [] };
                if (isChecked) {
                    categories.small.controls[smallCard].checked = cardValue;
                }
                else {
                    for (var control of cardValue) {
                        var state = controls.checked.includes(control) ? 'checked' : 'unchecked';
                        categories.small.controls[smallCard][state].push(control);
                    }
                }
            }
        }
        var bigCards = categoryInfo['big-cards'];
        var bigCardKeys = Object.keys(bigCards);
        for (var bigCard of bigCardKeys) {
            var cardValue = bigCards[bigCard];
            if (!cardValue && controls.checked.includes(bigCard)) {
                categories.big[bigCard] = cardValue;
            }
        }
    }
}

// Returns filtered controls details.
function getFilteredControls() {
    filteredControls = isInitRender ? filteredControls : [];
    var checked = ej.base.selectAll('.theme-filter-body input:checked');
    for (var element of checked) {
        if (element.id.indexOf('category') === -1 && element.ej2_instances[0].checked) {
            var controlId = element.id;
            controlId = controlId.replace('comp-', '');
            controlId = controlId === 'textbox' ? 'input' : controlId;
            filteredControls.push(controlId);
        }
    }
    return filteredControls;
}

// Sets the controls dependencies into window variable for later usage.
function setDependencies(isAppStyles) {
    var controls = [];
    var controlDependencies = ['base'];
    if (isAppStyles) {
        APP_CONTROLS.forEach((controlName) => {
            if (!isFiltered(controlName)) {
                controls.push(controlName);
            }
        });
        if (currentTheme === BOOTSTRAP4 || currentTheme === 'tailwind') {
            ['switch', 'accordion'].forEach((controlName) => {
                if (!isFiltered(controlName)) {
                    controls.push(controlName);
                }
            });
        }
        var isCommonTheme = currentTheme.startsWith(MATERIAL) || currentTheme.startsWith(MATERIAL3) || currentTheme.startsWith('fabric') || currentTheme.startsWith('fluent') || currentTheme.startsWith('bootstrap') || currentTheme.startsWith('tailwind');
        if (!isFiltered('radio-button') && isCommonTheme) {
            controls.push('radio-button');
        }
    }
    else {
        controls = getFilteredControls();
    }
    var controlsInfo = getControlsInfo(controls, window.dependentCollection['styles'], window.dependentCollection['resources']);
    controlDependencies = dependencyList(controlDependencies, controlsInfo);
    if (!isAppStyles) {
        window.dependencies = controlDependencies;
    }
    return controlDependencies;
}

function getStyleDeps() {
    var individualDeps = {};
    var stylesJson = window.dependentCollection['styles'];
    for (var control of Object.keys(stylesJson)) {
        if (stylesJson[control][0] === 'e' || control === 'data-grid') {
            continue;
        } else {
            var controlDeps = Object.keys(stylesJson[control]);
            if (controlDeps.length) {
                for (var dependency of controlDeps) {
                    individualDeps[dependency] = dependencyList(['base'], updateControlsInfo(dependency, control, { fullPackages: [], dependentPackages: [], packageControls: {} }, stylesJson));
                }
            }
        }
    }
    return individualDeps;
}

function dependencyList(controlDependencies, controlsInfo) {
    var packages = Object.keys(controlsInfo.packageControls);
    if (packages.indexOf('buttons') !== -1 && controlsInfo.packageControls.buttons.indexOf('button') !== -1) {
        controlDependencies.push('buttons/button');
    }

    var fileControl = [];
    var selectedControls = [];
    var colorPickerControl = [];
    for (var pakcage of packages) {
        for (var control of controlsInfo.packageControls[pakcage]) {
            var dependencyPath = (pakcage === 'inplaceeditor' ? 'inplace-editor' : pakcage) + '/' +
                (control === 'listview' ? 'list-view' : control);
            if (pakcage === 'imageeditor') {
                var dependencyPath = (pakcage === 'imageeditor' ? 'image-editor' : pakcage) + '/image-editor';
            }
            if ((controlDependencies.indexOf(control) !== -1 || controlDependencies.indexOf(control) !== -1) &&
                (controlDependencies.indexOf('navigations/context-menu') === -1 || control !== 'context-menu')) {
                selectedControls.push(dependencyPath);
            }
            else {
                if ((control === 'color-picker' && controlDependencies.indexOf('button') === -1) && control !== 'file-manager') {
                    colorPickerControl.push((pakcage === 'inplaceeditor' ? 'inplace-editor' : pakcage) + '/' + control);
                } else if (control !== 'file-manager') {
                    if (control === 'menu' && controlDependencies.indexOf('navigations/context-menu') === -1) {
                        controlDependencies.push('navigations/context-menu');
                    }
                    controlDependencies.push(dependencyPath);
                } else {
                    fileControl.push(dependencyPath);
                }
            }
        }
    }

    if (packages.indexOf('documenteditor') !== -1 && controlsInfo.packageControls.documenteditor.indexOf('document-editor') !== -1) {
        controlDependencies.push('documenteditor/document-editor-container');
    }

   // controlDependencies.push('icons');
    controlDependencies = controlDependencies.concat(selectedControls);
    controlDependencies = controlDependencies.concat(colorPickerControl);
    controlDependencies = controlDependencies.concat(fileControl);
    return controlDependencies;
}

// Returns controls and its package details.
function getControlsInfo(controls, styles, resources) {
    var controlsInfo = {
        // packages with all controls included as dependency
        fullPackages: [],
        // All dependent package list
        dependentPackages: [],
        // package details with required dependent controls
        packageControls: {}
    };
    for (var control of controls) {
        var packageValue = PACKAGE_MAPPER[control];
        var package = packageValue ? packageValue : getPackageName(resources[control].package);
        controlsInfo = updateControlsInfo(control, package, controlsInfo, styles);
    }
    return controlsInfo;
}

// Returns package name for dependency ordering.
function getPackageName(input) {
    return input.replace(/(ej2-|-)/g, '');
}

// Updates the controls details with its package information.
function updateControlsInfo(control, package, controlsInfo, styles) {
    var dependencies = [];
    if (controlsInfo.dependentPackages.indexOf(package) === -1) {
        controlsInfo.dependentPackages.push(package);
    }
    if (controlsInfo.fullPackages.indexOf(package) === -1) {
        if (!controlsInfo.packageControls[package]) {
            controlsInfo.packageControls[package] = [];
        }
        if (controlsInfo.packageControls[package].indexOf(control) === -1) {
            controlsInfo.packageControls[package].push(control);
            if (styles[package]) {
                dependencies = styles[package][control];
                if (dependencies ? dependencies.length : false) {
                    controlsInfo = getStyleDependencies(dependencies, styles, controlsInfo, package);
                }
            }
        }
    }
    return controlsInfo;
}

// Returns the style dependencies with specified format.
function getStyleDependencies(dependencies, styles, controlsInfo, packageName) {
    var package = '';
    var controlName = '';
    for (var dependency of dependencies) {
        var depSplit = dependency.split('/');
        if (depSplit[0].indexOf('ej2-') !== -1) {
            if (depSplit.length === 2) {
                package = getPackageName(depSplit[0]);
                controlName = depSplit[1];
                controlsInfo = updateControlsInfo(controlName, package, controlsInfo, styles);
            } else if (depSplit.length === 1) {
                package = getPackageName(dependency);
                var controls = styles[package] ? Object.keys(styles[package]) : [];
                for (var control of controls) {
                    controlsInfo = updateControlsInfo(control, package, controlsInfo, styles);
                }
                controlsInfo.fullPackages.push(package);
            }
        } else if (dependency.indexOf('../') !== -1) {
            controlName = dependency.replace(/(\.\/\.\.\/)|(\.\.\/)/, '');
            controlsInfo = updateControlsInfo(controlName, packageName, controlsInfo, styles);
        }
    }
    return controlsInfo;
}

// Imports existing theme settings in the application.
function importing(canImport) {
    if (canImport) {
        showOverlay(true);
        var fileContents;
        var fileReader = new FileReader();
        var fileElement = document.getElementById('file-uploads');
        if (!fileElement.files || !fileElement.files[0]) {
            return;
        }
        fileReader.readAsText(fileElement.files[0]);
        fileReader.onload = function () {
            fileContents = JSON.parse(fileReader.result);
            isAdvancedChecked = false;
            if (fileContents.theme === BOOTSTRAP4) {
                if (fileContents['isadvanced']) {
                    fileContents['isAdvanced'] = fileContents['isadvanced'] === 'true';
                    delete fileContents['isadvanced'];
                }
                isAdvancedChecked = fileContents.isAdvanced;
                document.querySelector('.bv4-advanced-mode').style.display = 'block';
                document.getElementById('advanced-mode-check').ej2_instances[0].checked = fileContents.isAdvanced;
                document.getElementById('advanced-mode-check').ej2_instances[0].dataBind();
            }
            if (fileContents.theme === 'tailwind') {
                if (fileContents['isadvanced']) {
                    fileContents['isAdvanced'] = fileContents['isadvanced'] === 'true';
                    delete fileContents['isadvanced'];
                }
                isAdvancedChecked = fileContents.isAdvanced;
                document.querySelector('.tailwind-advanced-mode').style.display = 'block';
                document.getElementById('tailwind-advanced-mode-check').ej2_instances[0].checked = fileContents.isAdvanced;
                document.getElementById('tailwind-advanced-mode-check').ej2_instances[0].dataBind();
            }
            var properties = typeof fileContents.properties === 'string' ? JSON.parse(fileContents.properties) : fileContents.properties;
            var controls = typeof fileContents.components === 'string' ? JSON.parse(fileContents.components) : fileContents.components;
            fileContents.properties = properties;
            fileContents.components = controls;
            fileContents['dependencies'] = window.dependencies;
            fileContents['isCustomTheme'] = DEFAULT_THEMES.indexOf(fileContents.theme) === -1;
            renderProperties(fileContents.theme);
            refreshColorPickerBG();
            applyExistingChanges(fileContents);
            var isDarkTheme = fileContents.theme.indexOf('-dark') !== -1;
            if ((DARK_THEMES.indexOf(fileContents.theme) !== -1 || isDarkTheme) && fileContents.theme !== BOOTSTRAP4) {
                ej.base.select(isDarkTheme ? '#dark' : '#light').ej2_instances[0].checked = true;
            }
        }
    }
    importDialog.hide();
    document.getElementById('imports').classList.remove('actives');
    // remove uploaded file from import dialog upload.
    ej.base.select('#file-uploads').ej2_instances[0].clearAll();
}

function applyExistingChanges(themeProps) {
    refreshUrl(themeProps.theme);
    themeColors[themeProps.theme] = themeProps.properties;
    changeCheckedState({ checked: false });
    setSelectAllState();
    for (var control of themeProps.components) {
        var controlId = control.startsWith('comp-') ? control : 'comp-' + control;
        controlId = controlId === 'comp-input' ? 'comp-textbox' : controlId;
        var controlCheckbox = ej.base.select('#' + controlId);
        if (!controlCheckbox.ej2_instances[0].checked) {
            controlCheckbox.click();
        }
    }
    filtering(true, true);
    setDependencies();
    themeBodyLeftOverlay.style.backgroundColor = '#383838';
    var controlSection = document.getElementById('control-section');
    var scrollTop = controlSection.scrollTop;
    compileTheme(themeProps, () => {
        generateFilterHtml();
        var properties = themeProps.properties;
        var propertyKeys = Object.keys(properties);
        var element = document.getElementById('theme-properties');
        var colorElements = element.querySelectorAll('.theme-color');
        if (!isAdvancedChecked) {
            for (i = 0; i < colorElements.length; i++) {
                colorElements[i].style.backgroundColor = properties[propertyKeys[i]];
            }
        }
        var themeName = currentTheme.indexOf('-dark') !== -1 ? currentTheme.replace('-dark', '') : currentTheme;
        document.querySelector('#theme-list>.active').classList.remove('active');
        document.querySelector('#theme-list>#' + themeName).classList.add('active');
        themeDropDownText.innerHTML = getThemeName(themeName);

        themeBodyLeftOverlay.style.backgroundColor = 'transparent';
        controlSection.scrollTop = scrollTop;

        // 2500ms delay for applying app styles.
        setTimeout(() => {
            if (themeProps.theme === BOOTSTRAP4) {
                if (isAdvancedChecked) {
                    ej.base.select('#bv4-advanced-accordion').ej2_instances[0].refresh();
                }
                for (var property of propertyKeys) {
                    if (!themeProps.isAdvanced && BV4_NORMAL_ITEMS.indexOf(property) === -1) {
                        continue;
                    }
                    var propClass = property.replace('$', '').trim();
                    var textElement = document.querySelector(`.color-text.${propClass}`);
                    textElement.value = properties[property];
                    document.querySelector(`.color-picker.${propClass}`).value = properties[property];
                    document.querySelector(`.color-picker.${propClass}`).ej2_instances[0].value = properties[property];
                }
                refreshColorPickerBG();
            }
            if (themeProps.theme === 'tailwind') {
                if (isAdvancedChecked) {
                    ej.base.select('#tailwind-theme-accordion').ej2_instances[0].refresh();
                }
                for (var property of propertyKeys) {
                    if (!themeProps.isAdvanced && TAILWIND_NORMAL_ITEMS.indexOf(property) === -1) {
                        continue;
                    }
                    var propClass = property.replace('$', '').trim();
                    var textElement = document.querySelector(`.color-text.${propClass}`);
                    textElement.value = properties[property];
                    document.querySelector(`.color-picker.${propClass}`).value = properties[property];
                    document.querySelector(`.color-picker.${propClass}`).ej2_instances[0].value = properties[property];
                }
                refreshColorPickerBG();
            }
            removeOverlay(true);
        }, 2500);
    });
    applyAppStyles();
}

// Save the changes into localStorage
function setLocalStorage() {
    var isColorChanged = JSON.stringify(themeColors[currentTheme]) !== JSON.stringify(defaultThemeColors[currentTheme]);
    if (isColorChanged && !isLocalStorageCleared) {
        var themeProps = {};
        themeProps['theme'] = currentTheme;
        themeProps['components'] = filteredControls;
        themeProps['isAdvanced'] = isAdvancedChecked;
        themeProps['dependencies'] = window.dependencies;
        themeProps['properties'] = themeColors[currentTheme];
        themeProps['isCustomTheme'] = DEFAULT_THEMES.indexOf(currentTheme) === -1;
        localStorage.setItem('sf-theme-studio', JSON.stringify(themeProps));
    }
    isLocalStorageCleared = false;
}

function renderTwoColumnLayout() {
    var col2Elements = ej.base.select('#col-2').children;
    var col3Elements = ej.base.select('#col-3').children;
    var j = 0, k = 0;
    for (var i = 0; i < col2Elements.length; i++) {
        if (col2Elements[i].classList.contains('two-column') && i < col3Elements.length) {
            var colHeight = ej.base.select('#' + col2Elements[i].id).offsetHeight + 40 + 'px';
            document.getElementById(col3Elements[((i - j) + k)].id).style.marginTop = colHeight;
            k = 1;
        }
        else {
            j++;
        }
    }
}
