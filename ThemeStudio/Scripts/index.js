// Theme properties
var defaultVal = {};
var themeColors = {};
var exportDialog, importDialog, filterDialog;
var themes = ['material', 'fabric', 'bootstrap', 'highcontrast', 'fabricdark', 'materialdark', 'bootstrapdark', 'highcontrastlight','bootstrap4','fusion'];
var curTheme = 'material';
var controlContent;
var colorchange = {};
var themeSwitherPopup;
var themeDropDownStatus = false;
var themeDropDown = document.getElementById('dropdownMenu1');
var themeDropDownText = document.getElementById('themeDropText');
var componentsId = [];
var clrpkrWrapper;
var checking = [];
var curThemeName = 'material';
var queryRegex = /\?+[^>]+/g;
var googleAngRegex = /\&+[^>]+/g;
var banana = 44;
//var element = document.getElementById("controls");
var themeProps = {
    material: {
        "Primary Color": {
            id: "primary",
            default: "#3f51b5",
            palettes: [
                "#f34235", "#e81d62", "#9b26af", "#6639b6", "#3e50b4", "#2095f2",
                "#02a8f3", "#00bbd3", "#009587", "#4bae4f", "#8ac249", "#ccdb38",
                "#ffea3a", "#ffc006", "#ff9700", "#ff5621", "#9d9d9d", "#5f7c8a",
                "#785447", "#000000", "#ffffff"
            ]
        },
        "Primary Font": {
            id: "primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Accent Color": {
            id: "accent",
            default: "#ff4081",
            palettes: [
                "#ff8A80", "#ff5252", "#ff1744", "#d50000", "#ff80ab", "#ff4081", "#f50057", "#c51162",
                "#ea80fc", "#e040fb", "#d500f9", "#aa00ff", "#b388ff", "#7c4dff", "#651fff", "#6200ea",
                "#8c9eff", "#536dfe", "#3d5afe", "#304ffe", "#82b1fc", "#448aff", "#2979ff", "#2962ff",
                "#80d8ff", "#40c4ff", "#00b0ff", "#0091ea", "#84ffff", "#18ffff", "#00e5ff", "#00b8d4",
                "#a7ffeb", "#64ffda", "#1de986", "#00bfa5", "#b9fbca", "#69f0ae", "#00e676", "#00c853",
                "#ccff90", "#b2ff59", "#76ff03", "#64dd17", "#f4ff81", "#eeff41", "#c6ff00", "#aeea00",
                "#ffff8d", "#ffff00", "#ffea00", "#ffd600", "#ffe57f", "#ffd740", "#ffc400", "#ffa600",
                "#ffd1b0", "#ffab40", "#ff9100", "#ff6d00", "#ff9e80", "#ff6e40", "#ff3d00", "#dd2c00",
                "#000000", "#ffffff"
            ]
        },
        "Accent Font": {
            id: "accent-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }


    },
    fabric: {
        "Primary Color": {
            id: "theme-primary",
            default: "#0078d7",
            palettes: [
                "#002050", "#00188f", "#0078d7", "#0077ff", "#00bcf2", "#0C0C0C",
                "#004b50", "#004b1c", "#107c10", "#008272", "#00b294", "#474747",
                "#32145a", "#80397b", "#5c2d91", "#b4009e", "#e300bc", "#6B6D7F",
                "#a80000", "#d83b01", "#e81123", "#ea4300", "#ff8c00",
            ]
        },
        "Primary font": {
            id: "theme-primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    bootstrap: {
        "Primary Color": {
            id: "brand-primary",
            default: "#428bca",
            palettes: [
                "#0070F0", "#6610F2", "#6F42C1", "#E83E8B", "#DC3243", "#845454",
                "#218739", "#128260", "#108193", "#6C7A00", "#B12EF1", "#0178C9",
                "#74588B", "#C34143", "#5866B6", "#0178C9", "#A459A1", "#C639AE",
                "#437584", "#6B6D7F", "#333333"
            ]
        },
        "Primary Font": {
            id: "brand-primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    fusion: {
        "Primary Color": {
            id: "brand-primary",
            default: "#0565ff",
            palettes: [
                "#0565ff", "#6610F2", "#6F42C1", "#E83E8B", "#DC3243", "#845454",
                "#218739", "#128260", "#108193", "#6C7A00", "#B12EF1", "#0178C9",
                "#74588B", "#C34143", "#5866B6", "#0178C9", "#A459A1", "#C639AE",
                "#437584", "#6B6D7F", "#333333"
            ]
        },
        "Primary Font": {
            id: "brand-primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    bootstrap4: {
        "Primary Color": {
            id: "primary",
            default: "#007bff",
            palettes: [
                "#0070F0", "#6610F2", "#6F42C1", "#E83E8B", "#DC3243", "#845454",
                "#218739", "#128260", "#108193", "#6C7A00", "#B12EF1", "#0178C9",
                "#74588B", "#C34143", "#5866B6", "#0178C9", "#A459A1", "#C639AE",
                "#437584", "#6B6D7F", "#333333"
            ]
        },
        "Primary Font": {
            id: "primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    highcontrastlight: {
        "Selection BG": {
            id: "selection-bg",
            default: "#23726C",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Selection Border": {
            id: "selection-border",
            default: "#23726c",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Selection Font": {
            id: "selection-font",
            default: "#FFFFFF",
            palettes: [
                "#FFFFFF", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Hover BG": {
            id: "hover-bg",
            default: "#C9EDEB",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Hover Border": {
            id: "hover-border",
            default: "#000000",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Hover Font": {
            id: "hover-font",
            default: "#000000",
            palettes: [
                "#FFFFFF", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Disable": {
            id: "disable",
            default: "#757575",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        }
    },
    materialdark: {
        "Primary Color": {
            id: "primary",
            default: "#3F51B5",
            palettes: [
                "#f34235", "#e81d62", "#9b26af", "#6639b6", "#3e50b4", "#2095f2",
                "#02a8f3", "#00bbd3", "#009587", "#4bae4f", "#8ac249", "#ccdb38",
                "#ffea3a", "#ffc006", "#ff9700", "#ff5621", "#9d9d9d", "#5f7c8a",
                "#785447", "#000000", "#ffffff"
            ]
        },
        "Primary Font": {
            id: "primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Accent Color": {
            id: "accent",
            default: "#00b0ff",
            palettes: [
                "#ff8A80", "#ff5252", "#ff1744", "#d50000", "#ff80ab", "#ff4081", "#f50057", "#c51162",
                "#ea80fc", "#e040fb", "#d500f9", "#aa00ff", "#b388ff", "#7c4dff", "#651fff", "#6200ea",
                "#8c9eff", "#536dfe", "#3d5afe", "#304ffe", "#82b1fc", "#448aff", "#2979ff", "#2962ff",
                "#80d8ff", "#40c4ff", "#00b0ff", "#0091ea", "#84ffff", "#18ffff", "#00e5ff", "#00b8d4",
                "#a7ffeb", "#64ffda", "#1de986", "#00bfa5", "#b9fbca", "#69f0ae", "#00e676", "#00c853",
                "#ccff90", "#b2ff59", "#76ff03", "#64dd17", "#f4ff81", "#eeff41", "#c6ff00", "#aeea00",
                "#ffff8d", "#ffff00", "#ffea00", "#ffd600", "#ffe57f", "#ffd740", "#ffc400", "#ffa600",
                "#ffd1b0", "#ffab40", "#ff9100", "#ff6d00", "#ff9e80", "#ff6e40", "#ff3d00", "#dd2c00",
                "#000000", "#ffffff"
            ]
        },
        "Accent Font": {
            id: "accent-font",
            default: "#000000",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }


    },
    fabricdark: {
        "Primary Color": {
            id: "theme-primary",
            default: "#0074CC",
            palettes: [
                "#0070F0", "#2F4AD0", "#2972AE", "#886CE5", "#00BCF2", "#309AEF",
                "#0A8A0A", "#027E2F", "#538014", "#028172 ", "#FFC906", "#F26F25",
                "#BD3281", "#BF463B", "#6B4A96", "#BA455A", "#AD1CF8", "#6BBD12",
                "#C62F2F", "#D93F02", "#AC4AA3", "#AA7A2B", "#FFEF22", "#00D085"
            ]
        },
        "Primary font": {
            id: "theme-primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    bootstrapdark: {
        "Primary Color": {
            id: "brand-primary",
            default: "#0070f0",
            palettes: [
                "#0070F0", "#2F4AD0", "#2972AE", "#886CE5", "#00BCF2", "#309AEF",
                "#0A8A0A", "#027E2F", "#538014", "#028172 ", "#FFC906", "#F26F25",
                "#BD3281", "#BF463B", "#6B4A96", "#BA455A", "#AD1CF8", "#6BBD12",
                "#C62F2F", "#D93F02", "#AC4AA3", "#AA7A2B", "#FFEF22", "#00D085"
            ]
        },
        "Primary Font": {
            id: "brand-primary-font",
            default: "#fff",
            palettes: [
                "#ffffff", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        }
    },
    highcontrast: {
        "Selection BG": {
            id: "selection-bg",
            default: "#FFD939",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Selection Border": {
            id: "selection-border",
            default: "#FFD939",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Selection Font": {
            id: "selection-font",
            default: "#000000",
            palettes: [
                "#FFFFFF", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Hover BG": {
            id: "hover-bg",
            default: "#685708",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Hover Border": {
            id: "hover-border",
            default: "#ffffff",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        },
        "Hover Font": {
            id: "hover-font",
            default: "#FFFFFF",
            palettes: [
                "#FFFFFF", "#F2F2F2", "#D8D8D8", "#BFBFBF", "#A5A5A5", "#7F7F7F",
                "#6E6E6E", "#595959", "#3F3F3F", "#262626", "#0C0C0C", "#000000"
            ]
        },
        "Disable": {
            id: "disable",
            default: "#757575",
            palettes: ["#3aca4d", "#ffd939", "#cc76f6", "#18d2eb", "#fe8aeb", "#5b94ff",
                "#ff82aa", "#7D8DFF", "#00D8AE", "#FF7C7E", "#7AA8FF", "#FF8860",
                "#00CBF1", "#7ED321", "#FD852F", "#E0FF00", "#CDE6F7", "#C09EF7",
                "#35D283", "#7FCBFE", "#DBE782", "#FFFFFF"
            ]
        }
    },
}

function filterChanged(event) {
    document.querySelectorAll('.theme-prop-wrapper').forEach(function (el) {
        if (event.target.value.length <= 0 || el.getAttribute('data-id').toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || el.querySelector('span').innerText.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 ) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

function loadJson() {
    getThemeColors();
    renderDialogs();
    //renderRightPane();
    
    var queystring = window.location.search;
    if (queystring.indexOf("?theme=") !== -1) {
        queystring = queystring.replace(googleAngRegex, "");
        queystring = queystring.replace("?theme=", "");
        queystring = queystring.trim();
        loadTheme(queystring, false);
        renderRightPane();
    } else {
        loadDefaultThemes('material', false);
    }
    
}
loadJson();

function getThemeColors() {
    for (var i = 0; i < themes.length; i++) {
        var properties = themeProps[themes[i]];
        var keys = Object.keys(properties);
        var colors = {};
        for (var j = 0; j < keys.length; j++) {
            var p = properties[keys[j]];
            colors['$' + p.id] = p.default;
        }
        themeColors[themes[i]] = colors;
    }
    defaultVal = ej.base.extend({}, themeColors, {}, true);
}

// Render the right pane components
function renderRightPane() {
    // theme switcher datasource
    
    themeSwitherPopup = new ej.popups.Popup(document.getElementById('theme-switcher-popup'), {

        relateTo: themeDropDown,
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        offsetY: 2,
        open: function () {
            themeDropDownStatus = true;
        },
        close: function () {
            themeDropDownStatus = false;
        }
    });
    themeDropDown.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePopup(themeDropDownStatus);
    });
    function togglePopup(status) {
        themeSwitherPopup[status ? 'hide' : 'show']();
    }
    document.addEventListener('click', function () { togglePopup(true) });
    document.getElementById('themelist').addEventListener('click', function (e) {
        var parent = e.target.closest('li');
        var theme= parent.id;
        if (theme === curTheme) {
            return;
        }
        var text = parent.querySelector('.switch-text').innerHTML;
        document.querySelector('#themelist>.active').classList.remove('active');
        document.querySelector('#themelist>#' + theme).classList.add('active');
        themeDropDownText.innerHTML = text;
        curTheme = theme;
        //window.location.href = window.location.origin;
        themeSwitherPopup.hide();
        var isDark = document.getElementById("dark").ej2_instances[0].checked; 
        if (isDark) {
            if (theme !== "highcontrast" && theme !== "bootstrap4"  && theme !== "fusion") {
                theme = theme + "-dark";
            }
        } else {
            //if (theme === "highcontrast") {
            //    theme = theme + "-light";
                
            //}
            theme = theme;
        }
        renderProperties(theme);
        loadTheme(theme,true);
    });

    var queystring = window.location.search;
    if (queystring) {
        queystring = queystring.replace("?theme=", "");
        queystring = queystring.trim();
        renderProperties(queystring);
        if (queystring.indexOf('-') !== -1) {
            curThemeName = queystring.replace("-dark", '');
            curThemeName = curThemeName.trim();
        } else {
            curThemeName = queystring;
        }

        themeDropDownText.innerHTML = curThemeName;
        document.querySelector('#themelist>.active').classList.remove('active');
        document.querySelector('#themelist>#' + curThemeName).classList.add('active');
    } else {
        renderProperties('material');
    }
    // rendering theme mode light/dark
    var themeMode = new ej.buttons.RadioButton({
        label: 'Light', name: 'theme-mode', value: 'Light', checked: true,
        change: function (e) {
            var themes = curTheme;
            if (themes === "highcontrast") {
                themes = themes + "-light";
                renderProperties(themes);
                loadTheme(themes,true);
            } else {
                renderProperties(themes);
                loadTheme(themes,true);
            }
        }
       });
    themeMode.appendTo('#light');

    themeMode = new ej.buttons.RadioButton({
        label: 'Dark', name: 'theme-mode', value: 'Dark',
        change: function (e) {
            var themes = curTheme;
            if (themes !== "highcontrast") {
                themes = themes + "-dark";
                renderProperties(themes);
                loadTheme(themes,true);
            } else {
                renderProperties(themes);
                loadTheme(themes,true);
            }
        }
    });
    themeMode.appendTo('#dark');


    //renderProperties('material');
    colorpicker();
}

function loadThemeProperties(theme, callback) {
    if (themeProps[theme]._varsLoaded) {
        callback();
    } else {
        fetch('Home/themeProperties?theme=' + theme)
            .then(response => response.json())
            .then(data => {
                Object.assign(themeProps[theme], data);
                themeProps[theme]._varsLoaded = true;
                callback();
            });
    }
}

function loadDefaultThemes(theme, isRightpanerender) {
    window.themes = theme;
    var themeObj = {};
    themeObj['theme'] = theme;
    var baseurl = window.location.href;
    if (baseurl.match(queryRegex)) {
        baseurl = baseurl.replace(queryRegex, "");
        baseurl = baseurl.trim();
    }
    var str = "";
    str = "?theme=" + theme;
    history.replaceState({}, '', baseurl + str);    
    curTheme = theme;
    themeColors = ej.base.extend({}, defaultVal, {}, true);
    var ajax = new ej.base.Ajax({
        type: "POST",
        url: "Home/loadtheme",
        contentType: 'application/json; charset=utf-8',
        processData: false,
        data: JSON.stringify({ themes: themeObj }) // Note it is important
    }, 'POST', true);
    ajax.send();
    ajax.onSuccess = function (data) {
        var styles = document.getElementById('custom-theme');
        styles.innerHTML = data;
        if (isfilterapplied) {
            generatefilterhtml();
        }
        else {
            destroyControls();

            renderComponents();
            if (!isRightpanerender) {
                renderRightPane();
            }

        }

        setTimeout(function () {
            removeOverlay(true);
            twocolumn_layout();
        }, 500);

        $('.theme-filter-header').show();
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    };
}


var themeBodyLeftOverlay = ej.base.select('.theme-body-left-ovelay');

function renderComponents() {
    //ej.base.select('.sb-body-overlay').classList.remove('sb-hide');
    var isMaterial = curTheme === 'material' ||  curTheme === 'material-dark';
    ej.base.enableRipple(isMaterial);
    if (!controlContent) {
        cardelements = $('.layout-card');
        cardsContent = {};
        for (let i = 0; i < cardelements.length; i++) {
            cardsContent[cardelements[i].id] = cardelements[i].outerHTML;
        };
        controlContent = $('#controls').html();
    } else {
        if (!isfilterapplied) {
            $('#controls').html(controlContent);
        }
    }
    if ($("#component-numeric").length) {
        var numeric = new ej.inputs.NumericTextBox({
            value: 15
        });
        numeric.appendTo('#component-numeric');
    }
    if ($("#component-maskedtextbox").length) {
        var masked = new ej.inputs.MaskedTextBox({
            mask: '000-000-0000'
        });
        masked.appendTo('#component-maskedtextbox');
    }
    if ($("#component-slider").length) {
        var defaultObj = new ej.inputs.Slider({
            tooltip: { isVisible: true, showOn: 'Focus' },
            type: 'MinRange'
        });
        defaultObj.appendTo('#component-slider');
        defaultObj.value = 30;
    }

    //{ field: 'Freight', width: 120, format: 'C', textAlign: 'Right' }
    //{ field: 'CustomerID', headerText: 'Customer Name', width: 150 },
    if ($("#component-grid").length) {
        var grid = new ej.grids.Grid({
            dataSource: window.gridData,
            allowPaging: true,
           
            groupSettings: { columns: ['OrderID'] },
            allowFiltering: true,
            filterSettings: { type: 'Menu' },
            pageSettings: { pageCount: 3, pageSize: 3 },
            actionComplete:function(args) {
                if (args.requestType === 'grouping') {
                    grid.pageSettings.pageSize = 3;
                }
                if (args.requestType === 'ungrouping') {
                    grid.pageSettings.pageSize = 6;
                }

            },
            allowGrouping: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120 },
                { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 120 },
                { field: 'Freight', width: 120, format: 'C2', width: 130 },
                { field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', width: 180 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ]
        });
        grid.appendTo('#component-grid');
    }

    var sportsData = ['Badminton', 'Basketball', 'Cricket',
        'Football', 'Golf', 'Gymnastics',
        'Hockey', 'Rugby', 'Snooker', 'Tennis'];

    if ($("#component-autcomplete").length) {
        // initialize AutoComplete component
        var atcObj = new ej.dropdowns.AutoComplete({
            //set the data to dataSource property
            dataSource: sportsData,
            // set the placeholder to AutoComplete input element
            placeholder: 'e.g. Basketball'
        });
        atcObj.appendTo('#component-autcomplete');
    }

    if ($("#component-dropdownlist").length) {
        var listObj = new ej.dropdowns.DropDownList({
            index: 2,
            placeholder: 'Select a game',
            popupHeight: '200px',

        });
        listObj.appendTo('#component-dropdownlist');
    }



    if ($("#dialogComponent").length) {
        ej.popups.Dialog.prototype.focusContent = function () { }
        var dlgObj = new ej.popups.Dialog({
            header: 'Delete Multiple Items',
            content: '<span>Are you sure you want to permanently delete these items ?</span>',
            target: document.getElementById('theme-dialog-wrapper'),
            showCloseIcon: true,
            buttons: [{
                click: confirmDlgBtnClick,
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            { click: confirmDlgBtnClick, buttonModel: { content: 'No' } }],
            width: '40%',
            isModal: true,
            animationSettings: { effect: 'None' }
        });
        dlgObj.appendTo('#dialogComponent');
        function confirmDlgBtnClick() {
            dlgObj.hide();
        }

        // Create Button to open the confirmation Dialog
        var confirmBtn = new ej.buttons.Button({});
        confirmBtn.appendTo('#confirmBtn');
        document.getElementById('confirmBtn').onclick = function () {
            dlgObj.show();
        };

    }


    if ($("#component-multiselect").length) {
        var listObj = new ej.dropdowns.MultiSelect({
            placeholder: 'Favorite Sports',
            mode: 'Box'
        });
        listObj.appendTo('#component-multiselect');
    }

    if ($("#component-combobox").length) {
        var comboBoxObj = new ej.dropdowns.ComboBox({
            dataSource: window.ddCountryData,
            fields: { text: 'Name', value: 'Code' },
            placeholder: 'Select a country',
            popupHeight: '270px',
            allowFiltering: true,
            filtering: function (e) {
                var query = new ej.data.Query();
                query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
                e.updateData(window.ddCountryData, query);
            }
        });
        comboBoxObj.appendTo('#component-combobox');
    }

    if ($("#component-datepicker").length) {
        var datepicker = new ej.calendars.DatePicker();
        datepicker.appendTo('#component-datepicker');
    }

    if ($("#component-timepicker").length) {
        var timepicker = new ej.calendars.TimePicker();
        timepicker.appendTo('#component-timepicker');
    }

    if ($("#component-datetimepicker").length) {
        var datetimepicker = new ej.calendars.DateTimePicker();
        datetimepicker.appendTo('#component-datetimepicker');
    }

    if ($("#component-daterangepicker").length) {
        var daterangepicker = new ej.calendars.DateRangePicker();
        daterangepicker.appendTo('#component-daterangepicker');
    }

    if ($("#primarybtn").length) {
        var button = new ej.buttons.Button({ isPrimary: true });
        button.appendTo('#primarybtn');
    }

    if ($("#normalbtn").length) {
        button = new ej.buttons.Button({});
        button.appendTo('#normalbtn');
    }

    if ($("#outlinebtn").length) {
        button = new ej.buttons.Button({ cssClass: 'e-outline', isPrimary: true });
        button.appendTo('#outlinebtn');
    }

    if ($("#flatbtn").length) {
        button = new ej.buttons.Button({ cssClass: 'e-flat' });
        button.appendTo('#flatbtn');
    }

    if ($("#successbtn").length) {
        button = new ej.buttons.Button({ cssClass: 'e-success' });
        button.appendTo('#successbtn');
    }

    if ($("#warningbtn").length) {
        button = new ej.buttons.Button({ cssClass: 'e-warning' });
        button.appendTo('#warningbtn');
    }

    if ($("#togglebtn").length) {
        var toggleBtn = new ej.buttons.Button({ iconCss: 'e-btn-sb-icons e-play-icon', cssClass: 'e-flat e-primary', isToggle: true });
        toggleBtn.appendTo('#togglebtn');
        //Toggle button click event handler
        toggleBtn.element.onclick = function () {
            if (toggleBtn.element.classList.contains('e-active')) {
                toggleBtn.content = 'Pause';
                toggleBtn.iconCss = 'e-btn-sb-icons e-pause-icon';
            } else {
                toggleBtn.content = 'Play';
                toggleBtn.iconCss = 'e-btn-sb-icons e-play-icon';
            }
        };
    }


    if ($("#component-calendar").length) {
        var calendar = new ej.calendars.Calendar({});
        calendar.appendTo('#component-calendar');
    }


    var items = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }];

    if ($("#textbtn").length) {
        btnObj = new ej.splitbuttons.DropDownButton({ items: items });
        btnObj.appendTo('#textbtn');
    }

    if ($("#icontextbtn").length) {
        btnObj = new ej.splitbuttons.DropDownButton({ items: items, iconCss: 'e-ddb-icons e-profile', cssClass: 'e-primary' });
        btnObj.appendTo('#icontextbtn');
    }


    if ($("#custombtn").length) {
        btnObj = new ej.splitbuttons.DropDownButton({ items: items, cssClass: 'e-caret-hide' });
        btnObj.appendTo('#custombtn');
    }
    var sitems = [
        {
            text: 'Paste',
            iconCss: 'e-btn-icons e-paste'
        },
        {
            text: 'Paste Special',
            iconCss: 'e-btn-icons e-paste-special'
        },
        {
            text: 'Paste as Formula',
            iconCss: 'e-btn-icons e-paste-formula'
        },
        {
            text: 'Paste as Hyperlink',
            iconCss: 'e-btn-icons e-paste-hyperlink'
        }
    ];

    if ($("#iconsplitbtn").length) {
        var splitButton = new ej.splitbuttons.SplitButton({ items: sitems, iconCss: 'e-btn-icons e-paste' });
        splitButton.appendTo('#iconsplitbtn');
    }

    if ($("#textsplitbtn").length) {
        splitButton = new ej.splitbuttons.SplitButton({ items: sitems, content: 'Paste', cssClass: 'e-primary' });
        splitButton.appendTo('#textsplitbtn');
    }

    if ($("#icontextsplitbtn").length) {
        splitButton = new ej.splitbuttons.SplitButton({ items: sitems, content: 'Paste', iconCss: 'e-btn-icons e-paste' });
        splitButton.appendTo('#icontextsplitbtn');
    }
    if ($("#listview-def").length) {
        var listObj = new ej.lists.ListView({
            dataSource: window.listData,
            fields: { groupBy: 'category' }
        });


        //Render initialized ListView component
        listObj.appendTo('#listview-def');
    }

    if ($("#treeviewComponent").length) {
        var treeObj = new ej.navigations.TreeView({
            fields: { dataSource: window.hierarchicalData, id: 'id', text: 'name', child: 'subChild' }
        });
        treeObj.appendTo('#treeviewComponent');
    }

    if ($("#Accordion_icon").length) {
        var accordion = new ej.navigations.Accordion({
            items: [
                { header: 'Athletics', iconCss: 'e-athletics e-acrdn-icons', content: '#athletics', expanded: true },
                { header: 'Water Games', iconCss: 'e-water-game e-acrdn-icons', content: '#water_games' },
                //{ header: 'Racing', iconCss: 'e-racing-games e-acrdn-icons', content: '#racing_games' },
                //{ header: 'Indoor Games', iconCss: 'e-indoor-games e-acrdn-icons', content: '#indoor_games' }
            ]
        });
        //Render initialized Accordion component
        accordion.appendTo('#Accordion_icon');
    }

    if ($("#tabComponent").length) {
        var tabObj = new ej.navigations.Tab({
            items: [
                {
                    header: { 'text': 'Twitter' },
                    content: 'Twitter is an online social networking service that enables users to send and read short 140-character ' +
                        'messages called "tweets". Registered users can read and post tweets, but those who are unregistered can only read ' +
                        'them. Users access Twitter through the website interface, SMS or mobile device app Twitter Inc. is based in San ' +
                        'Francisco and has more than 25 offices around the world. Twitter was created in March 2006 by Jack Dorsey, ' +
                        'Evan Williams, Biz Stone, and Noah Glass and launched in July 2006. The service rapidly gained worldwide popularity, ' +
                        'with more than 100 million users posting 340 million tweets a day in 2012.The service also handled 1.6 billion ' +
                        'search queries per day.'
                },
                {
                    header: { 'text': 'Facebook' },
                    content: 'Facebook is an online social networking service headquartered in Menlo Park, California. Its website was ' +
                        'launched on February 4, 2004, by Mark Zuckerberg with his Harvard College roommates and fellow students Eduardo ' +
                        'Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.The founders had initially limited the website\'\s ' +
                        'membership to Harvard students, but later expanded it to colleges in the Boston area, the Ivy League, and Stanford ' +
                        'University. It gradually added support for students at various other universities and later to high-school students.'
                },
                {
                    header: { 'text': 'WhatsApp' },
                    content: 'WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones that operates ' +
                        'under a subscription business model. It uses the Internet to send text messages, images, video, user location and ' +
                        'audio media messages to other users using standard cellular mobile numbers. As of February 2016, WhatsApp had a user ' +
                        'base of up to one billion,[10] making it the most globally popular messaging application. WhatsApp Inc., based in ' +
                        'Mountain View, California, was acquired by Facebook Inc. on February 19, 2014, for approximately US$19.3 billion.'
                }
            ]
        });
        //Render initialized Tab component
        tabObj.appendTo('#tabComponent');
    }

    if ($("#scheduleComponent").length) {
        var scheduleObj = new ej.schedule.Schedule({
            height: '550px',
            selectedDate: new Date(2018, 1, 15),
            eventSettings: { dataSource: ej.base.extend([], window.scheduleData, null, true) }
        });
        scheduleObj.appendTo('#scheduleComponent');
    }

    if ($("#cb-componentchecked").length) {
        var checkBoxObj = new ej.buttons.CheckBox({ label: 'CheckBox', checked: true, });
        checkBoxObj.appendTo('#cb-componentchecked');
    }

    if ($("#cb-componentunchecked").length) {
        checkBoxObj = new ej.buttons.CheckBox({ label: 'Unchecked', checked: false, disabled: true });
        checkBoxObj.appendTo('#cb-componentunchecked');
    }

    if ($("#cb-componentintermediate").length) {
        checkBoxObj = new ej.buttons.CheckBox({ label: 'Indeterminate', indeterminate: true, disabled: true });
        checkBoxObj.appendTo('#cb-componentintermediate');
    }

    // function to handle the CheckBox change event
    function onChange(args) {
        this.label = 'CheckBox: ' + args.checked;
    }


    if ($("#componentradio1").length) {
        var radioButton = new ej.buttons.RadioButton({ label: 'Credit/Debit Card', name: 'payment', value: 'credit/debit', checked: true });
        radioButton.appendTo('#componentradio1');
    }

    if ($("#componentradio2").length) {
        radioButton = new ej.buttons.RadioButton({ label: 'Net Banking', name: 'payment', value: 'netbanking' });
        radioButton.appendTo('#componentradio2');
    }

    if ($("#componentradio3").length) {
        radioButton = new ej.buttons.RadioButton({ label: 'Cash on Delivery', name: 'payment', value: 'cashondelivery' });
        radioButton.appendTo('#componentradio3');
    }

    if ($("#toolbar_default").length) {
        var toolbarObj = new ej.navigations.Toolbar({
            items: [
                {
                    prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut'
                },
                {
                    prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy'
                },
                {
                    prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold'
                },
                {
                    prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline'
                },
                {
                    prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic'
                },
                {
                    prefixIcon: 'e-color-icon tb-icons', tooltipText: 'Color-Picker'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align-Left'
                },
                {
                    prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align-Right'
                },
                {
                    prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align-Center'
                },
                {
                    prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align-Justify'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets'
                },
                {
                    prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-ascending-icon tb-icons', tooltipText: 'Sort A - Z'
                },
                {
                    prefixIcon: 'e-descending-icon tb-icons', tooltipText: 'Sort Z - A'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-upload-icon tb-icons', tooltipText: 'Upload'
                },
                {
                    prefixIcon: 'e-download-icon tb-icons', tooltipText: 'Download'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-indent-icon tb-icons', tooltipText: 'Text Indent'
                },
                {
                    prefixIcon: 'e-outdent-icon tb-icons', tooltipText: 'Text Outdent'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-clear-icon tb-icons', tooltipText: 'Clear'
                },
                {
                    prefixIcon: 'e-reload-icon tb-icons', tooltipText: 'Reload'
                },
                {
                    prefixIcon: 'e-export-icon tb-icons', tooltipText: 'Export'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-radar-icon tb-icons', tooltipText: 'Radar Chart'
                },
                {
                    prefixIcon: 'e-bubble-icon tb-icons', tooltipText: 'Bubble Chart'
                },
                {
                    prefixIcon: 'e-line-icon tb-icons', tooltipText: 'Line Chart'
                }
            ]

        });
        //Render initialized Toolbar component
        toolbarObj.appendTo('#toolbar_default');
    }
    if ($("#fileupload").length) {
        var dropElement = document.getElementById('upload-area');
        var preloadFiles = [
            { name: 'TypeScript Succintly', size: 12000, type: '.pdf' },
            { name: 'ASP.NET Webhooks', size: 500000, type: '.docx' },
        ];
        var uploadObj = new ej.inputs.Uploader({
            asyncSettings: {
                saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
            },
            autoUpload: false,
            files: preloadFiles,
            removing: onRemove,
            success: onUploadSuccess,
            dropArea: dropElement
        });
        uploadObj.appendTo('#fileupload');
    }
    function onRemove(args) {
        var li = this.uploadWrapper.querySelector('[data-file-name="' + args.filesData[0].name + '"]');
        if (li.classList.contains('e-icon-spinner')) {
            return;
        }

    }
    function onUploadSuccess(args) {
        var _this = this;
        var li = this.uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            li.querySelector('.e-file-delete-btn').onclick = function () {

            };
            li.querySelector('.e-file-delete-btn').onkeydown = function (e) {
                if (e.keyCode === 13) {

                }
            };
        }
        else {
            ej.popups.hideSpinner(this.uploadWrapper);
            ej.base.detach(this.uploadWrapper.querySelector('.e-spinner-pane'));
        }
    }

    // context-menu coding
    if ($("#contextmenuComponent").length) {
        var menuItems = [
            {
                text: 'Cut',
                iconCss: 'e-cm-icons e-cut'
            },
            {
                text: 'Copy',
                iconCss: 'e-cm-icons e-copy'
            },
            {
                text: 'Paste',
                iconCss: 'e-cm-icons e-paste',
                items: [
                    {
                        text: 'Paste Text',
                        iconCss: 'e-cm-icons e-pastetext'
                    },
                    {
                        text: 'Paste Special',
                        iconCss: 'e-cm-icons e-pastespecial'
                    }
                ]
            },
            {
                separator: true
            },
            {
                text: 'Link',
                iconCss: 'e-cm-icons e-link'
            },
            {
                text: 'New Comment',
                iconCss: 'e-cm-icons e-comment'
            }
        ];

        //ContextMenu model definition
        var menuOptions = {
            target: '#contextmenuComponent',
            items: menuItems,
            // Event triggers while rendering each menu item where �Link� menu item is disabled
            beforeItemRender: function (args) {
                if (args.item.text === 'Link') {
                    args.element.classList.add('e-disabled');
                }
            }
        };

        var menuObj = new ej.navigations.ContextMenu(menuOptions, '#contextmenu');
        if (ej.base.Browser.isDevice) {
            ej.base.select('#contextmenuComponent').textContent = 'Touch hold to open the ContextMenu';
            menuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            ej.base.select('#contextmenuComponent').textContent = 'Right click/Touch hold to open the ContextMenu';
            menuObj.animationSettings.effect = 'SlideDown';
        }
    }
    //tool tip component render
    if ($("#component-tooltip").length) {
        //Initialize Button component
        var button = new ej.buttons.Button();

        //Render initialized Button component
        button.appendTo('#component-tooltip');

        //Initialize Tooltip component
        var tooltip = new ej.popups.Tooltip({

            //Set tooltip content
            content: 'Lets go green & Save Earth !!!'

        });

        //Render initialized Tooltip component
        tooltip.appendTo('#component-tooltip');
    }
    //tooltip for filter
    var next = new ej.popups.Tooltip({
        content: 'Filter'
    });

    next.appendTo('#filters');
    var next = new ej.popups.Tooltip({
        content: 'Import'
    });

    next.appendTo('#imports');
    //check box
    var next = new ej.popups.Tooltip({
        content: "If  include compatibility css option is checked, it will generate compatiblity  css files.  " +

            "Using these compatiblity theme files you can render both Essential JS 1 and Essential JS 2 components in a single page."
    });
    next.appendTo('#import');
    //render colorpicker components
    if ($("#component-color-picker").length) {
        var defaultObj = new ej.inputs.ColorPicker({}, '#component-color-picker');
    }

    //render switch components
    if ($("#switch-checked").length) {
        var switchObj = new ejs.buttons.Switch({ checked: true });
        switchObj.appendTo('#switch-checked');
    }
    if ($('#switch-unchecked').length) {
        switchObj = new ejs.buttons.Switch({});
        switchObj.appendTo('#switch-unchecked');
    }
    //render toast
    if ($('#component-toast').length) {
        let prevDuplicates = false;
        var toastObj = new ej.notifications.Toast({
            title: 'Anjolie Stokes',
            content: '<p><img src="http://npmci.syncfusion.com.s3-website.ap-south-1.amazonaws.com/production/documentation/samples/toast/actionBtn-cs1/laura.png"></p>',
            position: { X: "Center", Y: "Bottom" },
            width: 230,
            height: 250,
            maxcount: 1,
            target: '#element',
            buttons: [{
                model: { content: "Ignore" }, click: btnClick
            }, {
                model: { content: "reply" }
            }],
            beforeOpen: onBeforeOpen
        });

        //Render initialized Toast component
        toastObj.appendTo('#component-toast');

        ele = document.getElementById('toastBtnShow');

        ele.onclick = function () {


            toastObj.show();
        };

        function btnClick(e) {
            let toastEle = ej.base.closest(e.target, '.e-toast');
            toastObj.hide(toastEle);
        }
        function onBeforeOpen(e) {
            e.cancel = preventDuplicate(e);
        }
        function preventDuplicate(e) {
            let toastEle = e.element;
            let toasts = e.toastObj.element.children;
            for (let i = 0; i < toasts.length; i++) {
                if (toasts[i].querySelector('.e-toast-title').isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                    return true;
                }
            }
            return false;
        }
    }
    if ($('#Component-rich-text-editor')) {
        var defaultRTE = new ej.richtexteditor.RichTextEditor({
            
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
        defaultRTE.appendTo('#Component-rich-text-editor');
    }
    if ($("#spinleft").length) {
        var progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Spin Left', isPrimary: true
        });
        progressButton.appendTo('#spinleft');
    }
   
    if ($("#spinright").length) {
        progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Spin Right', spinSettings: { position: 'Right' }, isPrimary: true
        });
        progressButton.appendTo('#spinright');
    }
    if ($("#download").length) {
        progressButton = new ej.splitbuttons.ProgressButton({
            content: 'Download', duration: 4000, enableProgress: true,
            cssClass: 'e-hide-spinner e-progress-top', iconCss: 'e-btn-sb-icons e-download-icon'
        });
        progressButton.appendTo('#download');
    }
    if ($("#disabled").length) {
        progressButton = new ej.splitbuttons.ProgressButton({ content: 'Disabled', disabled: true });
        progressButton.appendTo('#disabled');
    }
    if ($('#MenuComponent')) {
         menuItems = [
            {
                text: 'File',
                iconCss: 'em-icons e-file',
                items: [
                    { text: 'Open', iconCss: 'em-icons e-open' },
                    { text: 'Save', iconCss: 'e-icons e-save' },
                    { separator: true },
                    { text: 'Exit' }
                ]
            },
            {
                text: 'Edit',
                iconCss: 'em-icons e-edit',
                items: [
                    { text: 'Cut', iconCss: 'em-icons e-cut' },
                    { text: 'Copy', iconCss: 'em-icons e-copy' },
                    { text: 'Paste', iconCss: 'em-icons e-paste' }
                ]
            },
            {
                text: 'View',
                items: [
                    {
                        text: 'Toolbars',
                        items: [
                            { text: 'Menu Bar' },
                            { text: 'Bookmarks Toolbar' },
                            { text: 'Customize' },
                        ]
                    },
                    {
                        text: 'Zoom',
                        items: [
                            { text: 'Zoom In' },
                            { text: 'Zoom Out' },
                            { text: 'Reset' },
                        ]
                    },
                    { text: 'Full Screen' }
                ]
            },
            {
                text: 'Tools',
                items: [
                    { text: 'Spelling & Grammar' },
                    { text: 'Customize' },
                    { separator: true },
                    { text: 'Options' }
                ]
            },
            {
                text: 'Help'
            }
        ];

        //Menu model definition 
        menuOptions = {
            items: menuItems
        };

        //Menu initialization
        menuObj = new ej.navigations.Menu(menuOptions, '#MenuComponent');
    }
    if ($('#Component-pivotview')) {
        var pivotGridObj = new ej.pivotview.PivotView({
            dataSource: {
                enableSorting: true,
                columns: [{ name: 'Year' }, { name: 'Quarter' }],
                valueSortSettings: { headerDelimiter: ' - ' },
                values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
                data: getPivotData(),
                rows: [{ name: 'Country' }, { name: 'Products' }],
                formatSettings: [{ name: 'Amount', format: 'C0' }],
                expandAll: false,
                filters: []
            },
            width: '100%',
            height: 300,
            gridSettings: { columnWidth: 140 }
        });
        pivotGridObj.appendTo('#Component-pivotview');
        function getPivotData() {
            var pivotData = [
                { 'Sold': 25, 'Amount': 42600, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 27, 'Amount': 46008, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 49, 'Amount': 83496, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 90, 'Amount': 153360, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 95, 'Amount': 161880, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 67, 'Amount': 114168, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 90, 'Amount': 153360, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 67, 'Amount': 114168, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 93, 'Amount': 139412, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 35, 'Amount': 52470, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 16, 'Amount': 27264, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 69, 'Amount': 117576, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 75, 'Amount': 127800, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 20, 'Amount': 29985, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 83, 'Amount': 124422, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 16, 'Amount': 23989, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 28, 'Amount': 41977, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 48, 'Amount': 71957, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 57, 'Amount': 85448, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 25, 'Amount': 37480, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 69, 'Amount': 103436, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 36, 'Amount': 53969, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 75, 'Amount': 119662.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 28, 'Amount': 41977, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 19, 'Amount': 28486, 'Country': 'France', 'Products': 'Road Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 91, 'Amount': 145190.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 24, 'Amount': 38292, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 94, 'Amount': 149977, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 100, 'Amount': 159550, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 30, 'Amount': 47865, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 89, 'Amount': 141999.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 25, 'Amount': 39887.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 42, 'Amount': 67011, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 21, 'Amount': 33505.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 74, 'Amount': 126096, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 76, 'Amount': 121258, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 69, 'Amount': 110089.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 16, 'Amount': 23989, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 52, 'Amount': 82966, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 85, 'Amount': 144840, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 99, 'Amount': 148406, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 31, 'Amount': 49460.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 33, 'Amount': 52651.5, 'Country': 'France', 'Products': 'Touring Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 41, 'Amount': 61464, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 64, 'Amount': 102112, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 57, 'Amount': 97128, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 39, 'Amount': 66456, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 76, 'Amount': 129504, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 33, 'Amount': 56232, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 81, 'Amount': 138024, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 65, 'Amount': 110760, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 47, 'Amount': 70458, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 91, 'Amount': 155064, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 16, 'Amount': 27264, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 71, 'Amount': 120984, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 36, 'Amount': 61344, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 39, 'Amount': 58466, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 59, 'Amount': 100536, 'Country': 'Germany', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 83, 'Amount': 124422, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 19, 'Amount': 28486, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 34, 'Amount': 50971, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 26, 'Amount': 38979, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 15, 'Amount': 22490, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 13, 'Amount': 20741.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 79, 'Amount': 118426, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 14, 'Amount': 20991, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 34, 'Amount': 50971, 'Country': 'Germany', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 47, 'Amount': 74988.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 93, 'Amount': 148381.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 15, 'Amount': 23932.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 48, 'Amount': 76584, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 44, 'Amount': 70202, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 59, 'Amount': 94134.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 77, 'Amount': 131208, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 84, 'Amount': 143136, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 34, 'Amount': 54247, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 56, 'Amount': 95424, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 35, 'Amount': 55842.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 71, 'Amount': 113280.5, 'Country': 'Germany', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 91, 'Amount': 155064, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 90, 'Amount': 153360, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 40, 'Amount': 68160, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 24, 'Amount': 40896, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 31, 'Amount': 46474, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 92, 'Amount': 156768, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 14, 'Amount': 23856, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 95, 'Amount': 161880, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 51, 'Amount': 86904, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 39, 'Amount': 66456, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 36, 'Amount': 53969, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 86, 'Amount': 128919, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 40, 'Amount': 59965, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 96, 'Amount': 163584, 'Country': 'United Kingdom', 'Products': 'Mountain Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 24, 'Amount': 35981, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 97, 'Amount': 145408, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 69, 'Amount': 103436, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 95, 'Amount': 142410, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 30, 'Amount': 44975, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 11, 'Amount': 16494, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 95, 'Amount': 142410, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 11, 'Amount': 16494, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 27, 'Amount': 40478, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 68, 'Amount': 101937, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 100, 'Amount': 149905, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 45, 'Amount': 67460, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 16, 'Amount': 23989, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 40, 'Amount': 59965, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 18, 'Amount': 26987, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 70, 'Amount': 104935, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 43, 'Amount': 73272, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 43, 'Amount': 73272, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 83, 'Amount': 124422, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 52, 'Amount': 88608, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 91, 'Amount': 155064, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 100, 'Amount': 149905, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 70, 'Amount': 104935, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 37, 'Amount': 63048, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 41, 'Amount': 69864, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 99, 'Amount': 148406, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 67, 'Amount': 114168, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 41, 'Amount': 65415.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 81, 'Amount': 121424, 'Country': 'United States', 'Products': 'Road Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 20, 'Amount': 29985, 'Country': 'United Kingdom', 'Products': 'Road Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 85, 'Amount': 144840, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 49, 'Amount': 83496, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 23, 'Amount': 39192, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 34, 'Amount': 54247, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 53, 'Amount': 90312, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 82, 'Amount': 130831, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
                { 'Sold': 60, 'Amount': 95730, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 71, 'Amount': 113280.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
                { 'Sold': 25, 'Amount': 42600, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 28, 'Amount': 47712, 'Country': 'United States', 'Products': 'Mountain Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 21, 'Amount': 33505.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 94, 'Amount': 149977, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
                { 'Sold': 45, 'Amount': 71797.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
                { 'Sold': 75, 'Amount': 119662.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 49, 'Amount': 78179.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 50, 'Amount': 79775, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q2' },
                { 'Sold': 56, 'Amount': 89348, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 40, 'Amount': 63820, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q3' },
                { 'Sold': 14, 'Amount': 22337, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 76, 'Amount': 121258, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' },
                { 'Sold': 75, 'Amount': 119662.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 11, 'Amount': 17550.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q2' },
                { 'Sold': 94, 'Amount': 149977, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 80, 'Amount': 127640, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 54, 'Amount': 86157, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 14, 'Amount': 22337, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q3' },
                { 'Sold': 17, 'Amount': 27123.5, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2016', 'Quarter': 'Q4' },
                { 'Sold': 45, 'Amount': 71797.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q1' },
                { 'Sold': 76, 'Amount': 121258, 'Country': 'United States', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' },
                { 'Sold': 45, 'Amount': 71797.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2018', 'Quarter': 'Q1' },
                { 'Sold': 11, 'Amount': 17550.5, 'Country': 'United Kingdom', 'Products': 'Touring Bikes', 'Year': 'FY 2017', 'Quarter': 'Q4' }];

            return pivotData;
        }
    }
    if ($('#Component-treegrid')) {
        var treeGridObj = new ej.treegrid.TreeGrid({
            dataSource: window.TreegridData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 380,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 80, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 90, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 90, textAlign: 'Right' },
            ]
        });
        treeGridObj.appendTo('#Component-treegrid');
    }
    if ($('#component-inplace-editor')) {
        var editObj = new ej.inplaceeditor.InPlaceEditor({
            mode: 'Inline',
            type: 'Text',
            value: 'Andrew',
            submitOnEnter: true,
            model: {
                placeholder: 'Enter employee name'
            }
        });
        editObj.appendTo('#component-inplace-editor');
    }
    if ($('#Component-splitter')) {
        var splitObj1 = new ej.layouts.Splitter({
            height: '110px',
            paneSettings: [
                { size: '25%', min: '60px' },
                { size: '50%', min: '60px' },
                { size: '25%', min: '60px' }
            ],
            width: '100%',
            separatorSize: 4
        });
        splitObj1.appendTo('#Component-splitter');
    }
    if ($('#Component-pdf-viewer')) {
        var viewer = new ej.pdfviewer.PdfViewer({
            documentPath: "PDF_Succinctly.pdf",
            serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer'
        });
        ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation);
        viewer.appendTo('#Component-pdf-viewer');
    }
    if ($('#Component-query-builder')) {
        var columnData = [
            { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
            { field: 'FirstName', label: 'First Name', type: 'string' },
            { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
            { field: 'Title', label: 'Title', type: 'string' },
            { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
            { field: 'City', label: 'City', type: 'string' }
        ];
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
            }
            ]
        };
        var qryBldrObj = new ej.querybuilder.QueryBuilder({
            width: '100%',
            dataSource: window.querybuilderemployeeData,
            columns: columnData,
            rule: importRules,
        });
        qryBldrObj.appendTo('#Component-query-builder');
       
    }
    if ($('#Component-chips')) {
        new ej.buttons.ChipList({ chips: window.chipsData.defaultData }, '#Component-chips');
    }
    //if ($('#Component-diagram')) {


    //    ej.diagrams.Diagram.Inject(ej.diagrams.UndoRedo);

    //    //Create and add ports for node.
    //    function getNodePorts(obj) {
    //        var ports = [
    //            { id: 'nport1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    //            { id: 'nport2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    //            { id: 'nport3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    //            { id: 'nport4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
    //        ];
    //        return ports;
    //    }
    //    var bounds = document.getElementById('diagram-space').getBoundingClientRect();
    //    var centerX = bounds.width / 2;
    //    //Initializes the nodes for the diagram
    //    var nodes = [{
    //        id: 'NewIdea', height: 60, offsetX: centerX - 50, offsetY: 80,
    //        shape: { type: 'Flow', shape: 'Terminator' },
    //        annotations: [{
    //            content: 'Place Order'
    //        }]
    //    }, {
    //        id: 'Meeting', height: 60, offsetX: centerX - 50, offsetY: 160,
    //        shape: { type: 'Flow', shape: 'Process' },
    //        annotations: [{
    //            content: 'Start Transaction'
    //        }]
    //    }, {
    //        id: 'BoardDecision', height: 60, offsetX: centerX - 50, offsetY: 240,
    //        shape: { type: 'Flow', shape: 'Process' },
    //        annotations: [{
    //            content: 'Verification'
    //        }]
    //    }, {
    //        id: 'Project', height: 60, offsetX: centerX - 50, offsetY: 330,
    //        shape: { type: 'Flow', shape: 'Decision' },
    //        annotations: [{
    //            content: 'Credit card valid?'
    //        }]
    //    }, {
    //        id: 'End', height: 60, offsetX: centerX - 50, offsetY: 430,
    //        shape: { type: 'Flow', shape: 'Decision' },
    //        annotations: [{
    //            content: 'Funds available?'
    //        }]
    //    }, {
    //        id: 'node11', height: 60, offsetX: (centerX - 50) + 230, offsetY: 330,
    //        shape: { type: 'Flow', shape: 'Process' },
    //        annotations: [{
    //            content: 'Enter payment method'
    //        }]
    //    }, {
    //        id: 'transaction_entered', height: 60, offsetX: (centerX - 50), offsetY: 630,
    //        shape: { type: 'Flow', shape: 'Terminator' },
    //        annotations: [{
    //            content: 'Log transaction'
    //        }]
    //    }, {
    //        id: 'node12', height: 60, offsetX: (centerX - 50) + 180, offsetY: 630,
    //        shape: { type: 'Flow', shape: 'Process' },
    //        annotations: [{
    //            content: 'Reconcile the entries'
    //        }]
    //    }, {
    //        id: 'transaction_completed', height: 60, offsetX: (centerX - 50), offsetY: 530,
    //        shape: { type: 'Flow', shape: 'Process' },
    //        annotations: [{
    //            content: 'Complete Transaction'
    //        }]
    //    }, {
    //        id: 'data', height: 45, offsetX: (centerX - 50) - 190, offsetY: 530,
    //        shape: { type: 'Flow', shape: 'Data' },
    //        annotations: [{
    //            content: 'Send e-mail', margin: { left: 25, right: 25 }
    //        }]
    //    }, {
    //        id: 'node10', height: 70, offsetX: (centerX - 50) + 175, offsetY: 530,
    //        shape: { type: 'Flow', shape: 'DirectData' },
    //        annotations: [{ content: 'Customer Database', margin: { left: 25, right: 25 } }]
    //    }];
    //    //Initializes the Connectors for the diagram
    //    var connectors = [
    //        {
    //            id: 'connector1', sourceID: 'NewIdea', targetID: 'Meeting'
    //        },
    //        { id: 'connector2', sourceID: 'Meeting', targetID: 'BoardDecision' },
    //        { id: 'connector3', sourceID: 'BoardDecision', targetID: 'Project' },
    //        {
    //            id: 'connector4', sourceID: 'Project',
    //            annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'End'
    //        },
    //        {
    //            id: 'connector5', sourceID: 'End',
    //            annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'transaction_completed'
    //        },
    //        { id: 'connector6', sourceID: 'transaction_completed', targetID: 'transaction_entered' },
    //        { id: 'connector7', sourceID: 'transaction_completed', targetID: 'data' },
    //        { id: 'connector8', sourceID: 'transaction_completed', targetID: 'node10' },
    //        {
    //            id: 'connector9', sourceID: 'node11', targetID: 'Meeting',
    //            segments: [{ direction: 'Top', type: 'Orthogonal', length: 120 }]
    //        },
    //        {
    //            id: 'connector10', sourceID: 'End', annotations: [{ content: 'No', style: { fill: 'white' } }],
    //            targetID: 'node11', segments: [{ direction: 'Right', type: 'Orthogonal', length: 100 }]
    //        },
    //        {
    //            id: 'connector11', sourceID: 'Project', annotations: [{ content: 'No', style: { fill: 'white' } }],
    //            targetID: 'node11'
    //        },
    //        {
    //            id: 'connector12', style: { strokeDashArray: '2,2' },
    //            sourceID: 'transaction_entered', targetID: 'node12'
    //        }
    //    ];
    //    var interval = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
    //    var gridlines = { lineColor: '#e0e0e0', lineIntervals: interval };
    //    //Initializes diagram control
    //    var diagram = new ej.diagrams.Diagram({
    //        width: '100%', height: '700px', nodes: nodes, connectors: connectors,
    //        snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
    //        //Sets the default values of a node
    //        getNodeDefaults: function (node) {
    //            var obj = {};
    //            if (obj.width === undefined) {
    //                obj.width = 145;
    //            } else {
    //                var ratio = 100 / obj.width;
    //                obj.width = 100;
    //                obj.height *= ratio;
    //            }
    //            obj.style = { fill: '#357BD2', strokeColor: 'white' };
    //            obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
    //            obj.ports = getNodePorts(node);
    //            return obj;
    //        },
    //        //Sets the default values of a Connector.
    //        getConnectorDefaults: function (obj) {
    //            if (obj.id.indexOf('connector') !== -1) {
    //                obj.type = 'Orthogonal';
    //                obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    //            }
    //        },
    //        //Sets the Node style for DragEnter element.
    //        dragEnter: function (args) {
    //            var obj = args.element;
    //            if (obj instanceof ej.diagrams.Node) {
    //                var oWidth = obj.width;
    //                var oHeight = obj.height;
    //                var ratio = 100 / obj.width;
    //                obj.width = 100;
    //                obj.height *= ratio;
    //                obj.offsetX += (obj.width - oWidth) / 2;
    //                obj.offsetY += (obj.height - oHeight) / 2;
    //                obj.style = { fill: '#357BD2', strokeColor: 'white' };
    //            }
    //        }
    //    });
    //    diagram.appendTo('#Component-diagram')
    //}
    if ($('#component-list-box')) {
        var listBoxObj = new ej.dropdowns.ListBox({
            // Set the dataSource property.
            dataSource: window.info,

            fields: { text: 'text', value: 'id' },
            // Set the selection settings with type as `CheckBox`.

            selectionSettings: { type: 'CheckBox' }

        });

        listBoxObj.appendTo('#component-list-box');
    }
    if ($('#Component-file-manager')) {
        var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        var fileObject = new ej.filemanager.FileManager({
            ajaxSettings: {
                url: hostUrl + 'api/FileManager/FileOperations',
                getImageUrl: hostUrl + 'api/FileManager/GetImage',
                uploadUrl: hostUrl + 'api/FileManager/Upload',
                downloadUrl: hostUrl + 'api/FileManager/Download'
            },
            view: 'Details'
        });
       

        fileObject.appendTo('#Component-file-manager');
    }
    if ($('#Component-gantt')) {
        var ganttChart = new ej.gantt.Gantt({
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
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
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
        });
        ganttChart.appendTo('#Component-gantt');
    }
}

function overlay(IsThemeSwitch) {
    if (IsThemeSwitch) {
        ej.base.select('.cont-container').classList.add('theme-hide');
        ej.base.select('.rightpanel').classList.add('theme-hide');
    }

    themeBodyLeftOverlay.classList.remove('theme-hide');
    ej.base.select('.cont-container').classList.add('.click-events');
}

function removeOverlay(IsThemeSwitch) {
    if (!themeBodyLeftOverlay.classList.contains('theme-hide')) {
        if (IsThemeSwitch) {
            ej.base.select('.cont-container').classList.remove('theme-hide');
            ej.base.select('.rightpanel').classList.remove('theme-hide');
        }
        themeBodyLeftOverlay.classList.add('theme-hide');
        ej.base.select('.cont-container').classList.remove('.click-events');
    }
}

function renderDialogs() {
    // rendering filter dialog
    $('.theme-filter-header').hide();
    var template = ej.base.select('#filter-content-template');
    var confirmContent = template.innerHTML;
    template.parentElement.removeChild(template);
    filterDialog = new ej.popups.Dialog({
        visible: false,
        content: `<div id ="filter-dialogs">
                    <div class = "filter-header">
                        <span class = "header-content" > Filter </span>
                         <div class="filter-dialog-close" onclick="filtering(false)"><span class="e-icons close-icon "></span></div>
                    </div>`+ confirmContent + `</div>
                         <div id = "filter-buttons">   
                             <button type="button" class="btn btn-primary" id = "Apply" onclick="filtering(true)">APPLY</button>
                              <button type="button" class="btn btn-default" id="cancel-filter" onclick="filtering(false)">CANCEL</button>
                            </div>`,
        modal: true,

        width: '50%',
        target: document.body,
        isModal: true,
        animationSettings: {
            effect: 'None'
        }
    });
    filterDialog.appendTo('#filterDialog');
    // rendering export dialog
    exportDialog = new ej.popups.Dialog({
        visible: false,
        modal: true,
        content: `<div id ="export-dialogs">
                    <div class = "headers">
                        <span class = "header-content" > Download </span>
                         <div class="filter-dialog-close" onclick="exporting(false)"><span class="e-icons close-icon "></span></div>
                    </div>
                   <div class="form-group">
                     <label for="inputdefault" id="input-font">File Name</label>
                     <input class="form-control form-control-sm" id="inputdefault" type="text" > 
                   </div>
                  <div class="download-options" style="display:none" id="downloads-info">
                    <div class="include-css">
                        <input id="ts-checkbox" type="checkbox" value="compatibility">
                         
                    </div>
                    <div class="comp-info"id = "import">
                       <span class="e-icons sb-compatable-info sb-icons" ></span>
                    </div>
                  </div>
                 </div>
                 <div id = "export-buttons">
                     <button type="button" class="btn btn-primary" id = "Download" onclick="exporting(true)">DOWNLOAD</button>
                     <button type="button" class="btn btn-default" id ="export-cancel" onclick="exporting(false)">CANCEL</button>
               <div>`,
        width: '330px',
        isModal: true,

        target: document.body,
        animationSettings: { effect: 'None' }
    });
    exportDialog.appendTo('#export-dialog');
    document.getElementById("inputdefault").value = curTheme;

    //render import dialog 
    importDlg = new ej.popups.Dialog({

        visible: false,
        width: '300px',
        target: document.body,
        modal: true,
        isModal: true,
        animationSettings: {
            effect: 'None'
        }
    });
    importDlg.appendTo('#import-dialog');
    document.getElementById('imports').onclick = function () {
        document.getElementById('imports').classList.add('actives');
        document.getElementById('contents').style.display = '';
        document.getElementById("import-Download").disabled = true;
        importDlg.show();
    };
    ej.base.L10n.load({
        'en-US': {
            'uploader': {
                dropFilesHint: 'Select theme file'
            }
        }
    })
    var uploadObjs = new ej.inputs.Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        allowedExtensions: '.json',
        removing: onRemove,
        success: onUploadSuccess,
        dropArea: document.getElementById('dropArea'),
        locale: 'en-US'

    });
    function onRemove(args) {
        var li = this.uploadWrapper.querySelector('[data-file-name="' + args.filesData[0].name + '"]');
        if (li.classList.contains('e-icon-spinner')) {
            return;
        }
        document.getElementById("import-Download").disabled = true;

    }
    function onUploadSuccess(args) {
        var _this = this;
        var li = this.uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            li.querySelector('.e-file-delete-btn').onclick = function () {

            };
            li.querySelector('.e-file-delete-btn').onkeydown = function (e) {
                if (e.keyCode === 13) {

                }
            };
            document.getElementById("import-Download").disabled = false;
        }
        else {
            ej.popups.hideSpinner(this.uploadWrapper);
            ej.base.detach(this.uploadWrapper.querySelector('.e-spinner-pane'));
        }

    }


    uploadObjs.appendTo('#fileuploads');

}

function exporting(boolean) {
    if (boolean) {
        var components = [];
        componentsId = [];
        var checked = ej.base.selectAll('.theme-filter-body input:checked');
        for (var comp of checked) {
            if (comp.id.indexOf('cat') == -1) {
                var compName = comp.id;
                componentsId.push(compName);
                compName = compName.replace("comp-", "");
                compName = compName === 'textbox' ? 'input' : compName;
                components.push(compName);
            }


        }
        var compatibility = document.getElementById("ts-checkbox").checked; // check compatibility css required or not
        var fileElement = document.getElementById("inputdefault");
        var filename = fileElement.value;
        getdependency(components);


        if (colorchange) {
            colorchange['theme'] = window.themes;
            var themes_var;
            if (window.themes.indexOf('-') !== 1) {
               
             themes_var = window.themes.replace("-", "");
                
                themes_var = themes_var.trim();
            } else {
                themes_var = window.themes;
            }
            colorchange['file'] = filename;
            colorchange.properties = themeColors[themes_var];
            colorchange['components'] = componentsId;
            colorchange['compatiblity'] = compatibility;
        }
        colorchange["dependency"] = window.dependency_arr;
        themeBodyLeftOverlay.style.backgroundColor = "#383838";
        overlay(false);
        var ajax = new ej.base.Ajax({
            type: "POST",
            url: "Home/export",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            data: JSON.stringify({ exporting: colorchange }) // Note it is important
        }, 'POST', true);
        ajax.send();
        ajax.onSuccess = function (data) {
            var download = ej.base.select('#downloadlink');
            download.href = data;
            download.click();
            removeOverlay(false);
            themeBodyLeftOverlay.style.backgroundColor = "transparent";

        };

    }
    exportDialog.hide();
}

function renderProperties(themeName) {
    loadThemeProperties(themeName, function () {
        _renderProperties(themeName);
        colorpicker();
    });
}

// Rendering theme properties elements
function _renderProperties(themeName) {
    ej.base.enableRipple(false);
    if (themeName.indexOf('-') !== -1) {
        themeName = themeName.replace('-', "");
        themeName = themeName.trim();
    }
    var properties = window.themeProps[themeName];
    if (properties !== undefined) {
        var keys = Object.keys(properties);
        document.getElementById('theme-properties').innerHTML = "";
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].startsWith('_')) {
                break;
            }
            var property = properties[keys[i]];
            
            var wrapper = new ej.base.createElement('div', { className: 'theme-prop-wrapper', attrs: { 'data-id': property.id } });
            var labelElement = new ej.base.createElement('div', { className: 'f-left theme-property', innerHTML: '<span>' + keys[i] + '</span' });
            clrpkrWrapper = new ej.base.createElement('div', { className: 'f-right theme-value', innerHTML: `<input type="color" class="color-picker ${property.id}" />` });
            wrapper.appendChild(labelElement);
            wrapper.appendChild(clrpkrWrapper);
            document.getElementById('theme-properties').appendChild(wrapper);
            var obj = new ej.inputs.ColorPicker({
                mode: 'Palette',
                value: property.default,
                inline: false,
                showButtons: true,
                cssClass: 'e-themestudio-colorpicker',
                modeSwitcher: true,
                columns: 6,
                presetColors: {
                    'custom': property.palettes
                },
                beforeTileRender: (args) => {
                    args.element.classList.add('e-circle-palette');
                    args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
                    var value = args.element.getAttribute("aria-label");
                    if (value === "#ffffff") {
                        args.element.classList.add('white-colorpattle')
                    }
                },
                beforeOpen: function (args) {
                },
                open: function (args) {

                },

                change: function (args) {                    
                    var element = this.element.closest('.theme-prop-wrapper');
                    var value = args.currentValue.rgba;
                    var colorEle = this.getWrapper().querySelector('.theme-color');
                    var colorchange = change(themeName, element.getAttribute('data-id'), value);
                    var controlSection = document.getElementById('control-section');
                    var scrollTop = controlSection.scrollTop;
                    themeBodyLeftOverlay.style.backgroundColor = "#383838";
                    overlay(false);
                    if (themeName.indexOf('dark') === -1 && themeName.indexOf('light') === -1) {
                        var ajax = new ej.base.Ajax({
                            type: "POST",
                            url: "Home/ThemeChange",
                            contentType: 'application/json; charset=utf-8',
                            processData: false,
                            data: JSON.stringify({ color: colorchange }) // Note it is important
                        }, 'POST', true);
                        ajax.send();
                        ajax.onSuccess = function (data) {
                            var styles = document.getElementById('custom-theme');
                            styles.innerHTML = data;
                            colorEle.style.backgroundColor = value;

                            removeOverlay(false);
                            themeBodyLeftOverlay.style.backgroundColor = "transparent";
                            controlSection.scrollTop = scrollTop;
                        };
                    } else {
                        window.dependency_arr.push("layouts/card");
                        colorchange["dependency"] = window.dependency_arr;
                        colorchange.theme = colorchange.theme.replace('light', '');
                        var ajax1 = new ej.base.Ajax({
                            type: "POST",
                            url: "Home/DarkThemeChange",
                            contentType: 'application/json; charset=utf-8',
                            processData: false,
                            data: JSON.stringify({ color: colorchange }) // Note it is important
                        }, 'POST', true);
                        ajax1.send();
                        ajax1.onSuccess = function (data) {
                            var styles = document.getElementById('custom-theme');
                            styles.innerHTML = data;
                            colorEle.style.backgroundColor = value;

                            removeOverlay(false);
                            themeBodyLeftOverlay.style.backgroundColor = "transparent";
                            controlSection.scrollTop = scrollTop;
                        };
                    }

                }
            }, '.color-picker.' + property.id);
        }
        if (themeName === 'material' || themeName === 'materialdark') {
            ej.base.enableRipple(true);
        }
    }
    //else {
    //    var properties = window.themeProps["material"];
    //        var keys = Object.keys(properties);
    //        document.getElementById('theme-properties').innerHTML = "";
    //        for (var i = 0; i < keys.length; i++) {
    //            var property = properties[keys[i]];
    //            var wrapper = new ej.base.createElement('div', { className: 'theme-prop-wrapper', attrs: { 'data-id': property.id } });
    //            var labelElement = new ej.base.createElement('div', { className: 'f-left theme-property', innerHTML: '<span>' + keys[i] + '</span' });
    //            clrpkrWrapper = new ej.base.createElement('div', { className: 'f-right theme-value', innerHTML: `<input type="color" class="color-picker ${property.id}" />` });
    //            wrapper.appendChild(labelElement);
    //            wrapper.appendChild(clrpkrWrapper);
    //            document.getElementById('theme-properties').appendChild(wrapper);
    //            var obj = new ej.inputs.ColorPicker({
    //                mode: 'Palette',
    //                value: property.default,
    //                inline: false,
    //                showButtons: true,
    //                cssClass: 'e-themestudio-colorpicker',
    //                modeSwitcher: true,
    //                columns: 6,
    //                presetColors: {
    //                    'custom': property.palettes
    //                },
    //                beforeTileRender: (args) => {
    //                    args.element.classList.add('e-circle-palette');
    //                    args.element.appendChild(new ej.base.createElement('span', { className: 'e-circle-selection' }));
    //                    var value = args.element.getAttribute("aria-label");
    //                    if (value === "#ffffff") {
    //                        args.element.classList.add('white-colorpattle')
    //                    }
    //                },
    //                beforeOpen: function (args) {
    //                },
    //                open: function (args) {

    //                }
    //            }, '.color-picker.' + property.id);
    //        }
    //        if (themeName === 'material') {
    //            ej.base.enableRipple(true);
    //        }
    //}
}

/* change the color values */
function change(theme, property, color) {
    var colorObj = {};
    colorObj.properties = themeColors[theme];
    colorObj.properties['$' + property] = color;
    if (theme.indexOf('dark') !== -1) {
        theme = theme.replace('dark', '-dark');
        theme = theme.trim();
        colorObj['theme'] = theme;
    } else {
        colorObj['theme'] = theme;
    }

    return colorObj;
}

/* load theme */
function loadTheme(theme, isOverylay) {
    if (isOverylay) {
        overlay(true);
    }
    
    if (theme === 'highcontrast') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.add('themestudio-highcontrast');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrp4');
        document.body.classList.remove('themestudio-fusion');
    }
    else if (theme === "bootstrap-dark") {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.add('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrap4');
        document.body.classList.remove('themestudio-fusion');
    }
    else if (theme === 'material-dark') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.add('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrap4');
        document.body.classList.remove('themestudio-fusion');
    }
    else if (theme === 'fabric-dark') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.add('themestudio-fabric-dark');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrap4');
        document.body.classList.remove('themestudio-fusion');
    } else if (theme === 'highcontrast-light') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.add('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrp4');
        document.body.classList.remove('themestudio-fusion');
        document.body.classList.remove('themestudio-fusion');
    }
    else if (theme === 'bootstrap4') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.add('themestudio-bootstrap4');
        document.body.classList.remove('themestudio-fusion');
        
    }
    else if (theme === 'fusion') {
        document.body.classList.remove('themestudio-bootstrap');
        document.body.classList.remove('themestudio-fabric');
        document.body.classList.remove('themestudio-material');
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrap4');
        document.body.classList.add('themestudio-fusion');
        
    }
    else {
        document.body.classList.remove('themestudio-bootstrap-dark');
        document.body.classList.remove('themestudio-highcontrast');
        document.body.classList.remove('themestudio-material-dark');
        document.body.classList.remove('themestudio-fabric-dark');
        document.body.classList.remove('themestudio-highcontrast-light');
        document.body.classList.remove('themestudio-bootstrap4');
        document.body.classList.remove('themestudio-fusion');
        if (theme === 'material') {
            document.body.classList.remove('themestudio-bootstrap');
            document.body.classList.remove('themestudio-fabric');
            document.body.classList.add('themestudio-material');
        }
        else if (theme === 'bootstrap') {
            document.body.classList.add('themestudio-bootstrap');
            document.body.classList.remove('themestudio-fabric');
            document.body.classList.remove('themestudio-material');
        }
        else if (theme === 'fabric') {
            document.body.classList.remove('themestudio-bootstrap');
            document.body.classList.add('themestudio-fabric');
            document.body.classList.remove('themestudio-material');
        }
    }
    document.getElementById("inputdefault").value = theme;

    if (theme === 'material' || theme === 'fabric' || theme === 'bootstrap' || theme === 'highcontrast' || theme === 'bootstrap4' || theme === 'fusion') {
        colorpicker();
        loadDefaultThemes(theme, true);
    }
    else {
        setTimeout(function () {
            colorpicker();
            var components = [];
            componentsId = [];
            var checked = ej.base.selectAll('.theme-filter-body input:checked');
            for (var comp of checked) {
                if (comp.id.indexOf('cat') == -1) {
                    var compName = comp.id;
                    componentsId.push(compName);
                    compName = compName.replace("comp-", "");
                    compName = compName === 'textbox' ? 'input' : compName;
                    components.push(compName);
                }


            }
            getdependency(components);
            document.getElementById("dark").ej2_instances[0].checked = true;
            loadDefaultThemes1(theme, true);
        }, 500);

       
    }

}

function destroyControls() {
    var elementlist = ej.base.selectAll('.e-control', document.getElementById('control-section'));
    for (var i = 0; i < elementlist.length; i++) {
        var control = elementlist[i];
        if (control.ej2_instances) {
            for (var a = 0; a < control.ej2_instances.length; a++) {
                var instance = control.ej2_instances[a];
                if (!instance.isDestroyed)
                    instance.destroy();
            }
        }
    }
}

//Filtering Script Start
var checkBoxObj = new ej.buttons.CheckBox({
    label: 'Include compatibility css'
});
checkBoxObj.appendTo('#ts-checkbox');

document.getElementById('filters').onclick = function () {
    document.getElementById('filters').classList.add('actives');
    filterDialog.show();
};
document.getElementById('download-now').onclick = function () {
    exportDialog.show();
    document.getElementById('downloads-info').style.display = '';
};
var selectAll = new ej.buttons.CheckBox({
    label: 'Select all',
    checked: false,
    change: selectAllState
});
selectAll.appendTo('#filter-selectall');

var catchbxs = ej.base.selectAll('.theme-filter-body .cat-chbx input');
var compchbxs = ej.base.selectAll('.theme-filter-body .comp-chbx input');

var qsData = [];
var fsData = {
    comps: [],
    compCat: {}
};

for (var catDiv of catchbxs) {
    qsData.push({
        name: catDiv.getAttribute('value'),
        code: catDiv.id
    });
    for (var compcb of ej.base.selectAll('[data="' + catDiv.id + '"] input')) {
        fsData.comps.push({
            name: compcb.value
        });
        fsData.compCat[compcb.value] = catDiv.id;
    }
}

var selectAllDiv = ej.base.select('.theme-filter-selectall');
var fsDmData = new ej.data.DataManager(fsData.comps);

for (var catchbx of catchbxs) {
    createCheckBox(catchbx, true);
}

for (var compchbx of compchbxs) {
    createCheckBox(compchbx, false);
}

function createCheckBox(elem, catComp) {
    var checkbox = new ej.buttons.CheckBox({
        label: elem.value,
        checked: false,
        change: catComp ? catCheck : compCheck
    });
    checkbox.appendTo(elem);
}

function catCheck(args) {
    setCheckBoxState(ej.base.select('[data=' + args.event.currentTarget.id + ']').querySelectorAll('input'), args.checked);
    getSelectAllState();
}

function compCheck(args) {
    var compDiv = ej.base.closest(args.event.currentTarget, '.comp-chbx');
    var catChbx = ej.base.select('.cat-chbx #' + compDiv.getAttribute('data')).ej2_instances[0];
    var check = getCheckboxState(compDiv.querySelectorAll('input'));
    catChbx.checked = check.check;
    catChbx.indeterminate = check.int;
    getSelectAllState();
}

function getCheckboxState(chbxs) {
    var tCheck = chbxs.length;
    var checkTrue = 0;
    for (var chbx of chbxs) {
        if (chbx.ej2_instances[0].checked) {
            ++checkTrue;
        }
    }
    if (checkTrue === 0) {
        return {
            check: false,
            int: false
        };
    } else if (checkTrue === tCheck) {
        return {
            check: true,
            int: false
        };
    } else {
        return {
            check: false,
            int: true
        };
    }
}

function setCheckBoxState(chbxs, check) {
    for (var chbx of chbxs) {
        chbx.ej2_instances[0].checked = check;
    }
}

function getSelectAllState() {
    var chbxs = ej.base.selectAll('.comp-chbx input');
    var tCheck = chbxs.length;
    var checkTrue = 0;
    for (var chbx of chbxs) {
        if (chbx.ej2_instances[0].checked)
            ++checkTrue
    }
    if (checkTrue === 0) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
        document.getElementById("Apply").disabled = true;
    } else if (checkTrue === tCheck) {
        selectAll.indeterminate = false;
        selectAll.checked = true;
        document.getElementById("Apply").disabled = false;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = true;
        document.getElementById("Apply").disabled = false;
    }

}

function selectAllState(args) {
    var boolean = args.checked;
    for (let chbx of ej.base.selectAll('.theme-filter-body .cat-chbx [aria-checked="mixed"] input')) {
        chbx.ej2_instances[0].indeterminate = undefined;

    }
    for (let chbx of ej.base.selectAll('.theme-filter-body input')) {
        chbx.ej2_instances[0].checked = args.checked;

    }
    if (boolean) {
        document.getElementById("Apply").disabled = false;
    }
    else {
        document.getElementById("Apply").disabled = true;
    }
}
selectAllState({ checked: true });
getSelectAllState();

function quickfilter(args) {
    selectAllState({
        checked: false
    });
    getSelectAllState();
    var cats = args.value;
    for (var chbx of catchbxs) {
        var id = chbx.id;
        ej.base.closest(ej.base.select('#' + id), '.cat-chbx').classList.remove('filter-hide');
        ej.base.select('[data="' + id + '"]').classList.remove('filter-hide');
        for (var chx of ej.base.selectAll('[data="' + id + '"] div.e-checkbox-wrapper')) {
            chx.classList.remove('filter-hide');
        }
    }
    selectAllDiv.classList.remove('filter-hide');
    if (cats.length !== 0) {
        selectAllDiv.classList.add('filter-hide');
        for (var chbx of catchbxs) {
            var id = chbx.id;
            if (cats.indexOf(id) !== -1) {
                ej.base.closest(ej.base.select('#' + id), '.cat-chbx').classList.remove('filter-hide');
                ej.base.select('[data="' + id + '"]').classList.remove('filter-hide');
                var catgeoryChbx = $('#' + id)[0]
                if (!catgeoryChbx.ej2_instances[0].checked) {
                    catgeoryChbx.click();
                }
            } else {
                ej.base.closest(ej.base.select('#' + id), '.cat-chbx').classList.add('filter-hide');
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

    selectAllState({
        checked: false
    });
    getSelectAllState();
    var filterComps = [];
    quickfilter({
        value: ''
    });
    var selCats = [];
    if (value) {
        selectAllDiv.classList.add('filter-hide');
        var selComps = fsDmData.executeLocal(new ej.data.Query().where('name', 'contains', value, true));
        filterComps = fsData.comps.diff(selComps);
        for (var selComp of selComps) {
            var selCat = fsData.compCat[selComp.name];
            if (selCats.indexOf(selCat) === -1)
                selCats.push(selCat);
        }
    } else {
        return;
    }
    for (var fComp of filterComps) {
        var val = fComp.name;
        ej.base.closest(ej.base.select('.comp-chbx [value="' + val + '"]'), 'div.e-checkbox-wrapper').classList.add('filter-hide');
        if (selCats.indexOf(fsData.compCat[val]) === -1) {
            ej.base.closest(ej.base.select('#' + fsData.compCat[val]), '.cat-chbx').classList.add('filter-hide');
        }
    }
}
//Filtering Script End
var allcomps = [];
var checked = ej.base.selectAll('.theme-filter-body input');
for (var comp of checked) {
    allcomps.push(comp.id);


}

var catCard = {
    'grids': {
        'col-cards': { 'grid': null },
        'big-cards': { 'pivotview': null, "treegrid": null }
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
            'cat-editors': ['textbox', 'numerictextbox', 'maskedtextbox', 'slider', 'inplace-editor'],
            'cat-pickers': ['datepicker', 'timepicker', 'datetimepicker', 'daterangepicker'],
            'cat-dropdown': ['auto-complete', 'drop-down-list', 'multi-select', 'combo-box','list-box'],
            'cat-button': ['button', 'drop-down-button', 'split-button', 'button-group', 'progress-button'],
            'check-box': null,
            'radio-button': null,
            'uploader': null,
            'color-picker': null,
            'switch': null
        },
        'big-cards': {
            'rich-text-editor': null,
            'chips': null
        }
    },
    'layout': {
        'col-cards': {
            'listview': null,
            'tooltip': null
        },
        'big-cards': {
            'dialog': null,
            'splitter': null
        }
    },
    'forums': {
        'col-cards': {


        },
        'big-cards': {
            'query-builder': null

        }
    },
    'notification': {
        'col-cards': {
            'badge': null,
            'toast': null
        },
        'big-cards': {
            'dialog': null
        }
    },
    'navigation': {
        'col-cards': {
            'treeview': null,
            'toolbar': null,
            'accordion': null,
            'context-menu': null,
            'tab': null,
            'menu': null
        },
        'big-cards': {

            'file-manager': null
        }

    }
};


var selectedComp = {};
var isfilterapplied = false;
var categs = {
    small: {
        compcard: {},
        card: {}
    },
    big: {}
};

var hcomp = [];
function filtering(boolean) {
    if (boolean) {
        var filterObj = {
            comps: { checked: [], unchecked: [] },
            cats: { checked: [], unchecked: [], intermediate: [] }
        };
        var selectall = ej.base.selectAll('.theme-filter-header .theme-filter-selectall input');
        if (selectall[0].ej2_instances[0].checked) {
            isfilterapplied = false;
            renderComponents();
            twocolumn_layout();
            filterDialog.hide();
            document.getElementById('filters').classList.remove('actives');
            return;
        }

        isfilterapplied = true;

        //Change-start
        var compCheckBoxes = ej.base.selectAll('.theme-filter-body .comp-chbx input');
        var catCheckBoxes = ej.base.selectAll('.theme-filter-body .cat-chbx input');
        for (let compcbx of compCheckBoxes) {
            var compName = compcbx.id.slice(5);
            if (compcbx.ej2_instances[0].checked) {
                filterObj.comps.checked.push(compName);
            } else {
                filterObj.comps.unchecked.push(compName);
            }
        }
        for (let catcbx of catCheckBoxes) {
            var catName = catcbx.id.slice(6);
            var catElements = catcbx.ej2_instances[0].element.parentElement.querySelector('.e-frame');
            if (catElements.classList.contains('e-stop') || catcbx.ej2_instances[0].indeterminate) {
                filterObj.cats.intermediate.push(catName);
            } else if (catcbx.ej2_instances[0].checked) {
                filterObj.cats.checked.push(catName);
            } else {
                filterObj.cats.unchecked.push(catName);
            }
        }
        hcomp = [];
        categs.small.compcard = [];
        categs.small.card = [];
        categs.big = {};
        getCheckedCategories(filterObj.cats.checked, filterObj.comps, true);
        getCheckedCategories(filterObj.cats.intermediate, filterObj.comps, false);
        generatefilterhtml();

    }

    document.getElementById('filters').classList.add('actives');
    filterDialog.hide();
    document.getElementById('filters').classList.remove('actives');
}



function getCheckedCategories(categories, comps, ischecked) {

    for (let category of categories) {
        var catinfo = catCard[category];
        var smallcards = catinfo['col-cards'];
        Object.keys(smallcards).forEach((smallcard) => {
            var scardvalue = smallcards[smallcard];
            if (scardvalue === null) {
                if (comps.checked.includes(smallcard)) {
                    categs.small.card[smallcard] = scardvalue;
                }
            }
            else if (scardvalue instanceof Array && scardvalue.length > 0) {
                categs.small.compcard[smallcard] = {
                    checked: [],
                    unchecked: []
                }
                if (ischecked) {
                    categs.small.compcard[smallcard].checked = scardvalue;
                }
                else {
                    scardvalue.forEach((compname) => {
                        if (comps.checked.includes(compname)) {
                            categs.small.compcard[smallcard].checked.push(compname);
                        }
                        else {
                            categs.small.compcard[smallcard].unchecked.push(compname);
                        }
                    });
                }
            }
        });
        var bigcards = catinfo['big-cards'];
        Object.keys(bigcards).forEach((bigcard) => {
            var bcardvalue = bigcards[bigcard];
            if (bcardvalue === null) {
                if (comps.checked.includes(bigcard)) {
                    categs.big[bigcard] = bcardvalue;
                }
            }
        });
    }
}

function generatefilterhtml() {
    var twocolumnCollection = ['grid', 'tab', 'toolbar'];
    var count = 1;
    var smallhtml = {
        col1: '', col2: '', col3: ''
    }
    var bightml = '';
    var twocolhtml = '';
    Object.keys(categs.small.card).forEach((c) => {
        if (twocolumnCollection.indexOf(c) !== -1) {
            twocolhtml += cardsContent[c];
        } else {
            smallhtml[`col${count}`] = smallhtml[`col${count}`] + cardsContent[c];
            count = count === 3 ? 1 : ++count;
        }
    });
    Object.keys(categs.small.compcard).forEach((c) => {
        if (categs.small.compcard[c].checked.length > 0) {
            smallhtml[`col${count}`] = smallhtml[`col${count}`] + cardsContent[c];
            count = count === 3 ? 1 : ++count;
            hcomp = hcomp.concat(categs.small.compcard[c].unchecked);
        }
    });

    Object.keys(categs.big).forEach(c => {
        bightml = bightml + cardsContent[c];
    });
    destroyControls();
    $('#col-1').html(smallhtml.col1);
    $('#col-2').html(smallhtml.col2);
    $('#col-3').html(smallhtml.col3);
    $('#big-control').html(bightml);
    $('#two-column-control').html(twocolhtml);
    renderComponents();
    //twocolumn_layout();
    $(hcomp.map(h => `#${h}`).join(',')).hide();
}

/* style dependency methods for exporting starting */
function getdependency(comp_array) {
    var styles = "";
    var resource = "";
    var theme = "";
    window.dependency_arr = [];
    theme = themeDeps(comp_array, window.dependentCollection["styles"], window.dependentCollection["resources"]);
    var packs = Object.keys(theme.compPack);
    dependency_arr = ['base','buttons/button'];
    var selectComparray = [];
    var colorpickercomponent = [];
    var filecomponent = [];
    for (var pack of packs) {

        for (var comp of theme.compPack[pack]) {
            if (comp_array.indexOf(comp) !== -1 || dependency_arr.indexOf(comp) !== -1  ) {
               
                    var styledependency = pack + '/' + (comp === 'listview' ? 'list-view' : comp);
                selectComparray.push(styledependency);
                
            }
            else {
                if (((comp === "color-picker") && window.dependency_arr.indexOf('button') === -1) && comp !== "file-manager") {
                    var styledependency = pack + '/' + comp;
                    colorpickercomponent.push(styledependency);
                } else if (comp !== "file-manager") {
                    var styledependencys = pack + '/' + (comp === 'listview' ? 'list-view' : comp);
                    window.dependency_arr.push(styledependencys);
                } else {
                    var styledependency = pack + '/' + comp;
                    filecomponent.push(styledependency);
                }

                }
               

        }
       
    }
    window.dependency_arr.push('layouts/dashboardlayout');
    window.dependency_arr = window.dependency_arr.concat(selectComparray);
    window.dependency_arr = window.dependency_arr.concat(colorpickercomponent);
    window.dependency_arr = window.dependency_arr.concat(filecomponent);



}
var packMapper = { "listview": "lists", "tooltip": "popups", "badge": "notifications", "toast": "notifications", "button-group": "splitbuttons", "input": "inputs" };
function themeDeps(comps, styles, resources) {
    var theme = {
        packs: [],
        compPack: {},
        allPack: []
    };
    var pack = '';
    var deps = [];
    for (var comp of comps) {
        var packValue = packMapper[comp];
        if (packValue) {
            pack = packValue;
        } else {
            pack = name(resources[comp].package);
        }
        theme = themeProcess(comp, pack, theme, styles);
    }
    return theme;
}

function styleDeps(deps, styles, theme, packName) {
    var pack = '';
    var compName = '';
    for (var dep of deps) {
        var depSplit = dep.split('/');
        if (depSplit[0].indexOf('ej2-') !== -1) {
            if (depSplit.length === 2) {
                pack = name(depSplit[0]);
                compName = depSplit[1];
                theme = themeProcess(compName, pack, theme, styles);
            } else if (depSplit.length === 1) {
                pack = name(dep);
                var comps = styles[pack] ? Object.keys(styles[pack]) : [];
                for (var comp of comps) {
                    theme = themeProcess(comp, pack, theme, styles);
                }
                theme.allPack.push(pack);
            }
        } else if (dep.indexOf('../') !== -1) {
            compName = dep.replace(/(\.\/\.\.\/)|(\.\.\/)/, '');
            theme = themeProcess(compName, packName, theme, styles);
        }
    }
    return theme;
}

function themeProcess(comp, pack, theme, styles) {
    var deps = [];
    if (theme.packs.indexOf(pack) === -1) {
        theme.packs.push(pack);
    }
    if (theme.allPack.indexOf(pack) === -1) {
        if (!theme.compPack[pack]) {
            theme.compPack[pack] = [];
        }
        if (theme.compPack[pack].indexOf(comp) === -1) {
            theme.compPack[pack].push(comp);
            if (styles[pack]) {
                deps = styles[pack][comp];
                if (deps ? deps.length !== 0 : false) {
                    theme = styleDeps(deps, styles, theme, pack);
                }
            }
        }
    }
    return theme;
}

function name(input, bool) {
    if (bool) {
        return input.replace('-').toLowerCase();
    }
    return input.replace(/(ej2-|-)/g, '');
}


/* style dependency ending */


/*importing method */

function importing(boolean) {
    if (boolean) {
        var filecontents;
        var components = [];
        var i = 0;
        var fileElement = document.getElementById("fileuploads");
        var fileread = new FileReader();
        if (!fileElement.files || !fileElement.files[0]) {
            return;
        }
        fileread.readAsText(fileElement.files[0]);
        fileread.onload = function () {
            filecontents = JSON.parse(fileread.result);
            //this.hide();
            var properties = JSON.parse(filecontents.properties);
            components = JSON.parse(filecontents.components);
            var key = Object.keys(properties);
            var element = document.getElementById('theme-properties');
            var colorElement = element.querySelectorAll('.theme-color');
            selectAllState({ checked: false });
            getSelectAllState();
            for (var i = 0; i < components.length; i++) {
                var componentChbx = $('#' + components[i])[0]
                if (!componentChbx.ej2_instances[0].checked) {
                    componentChbx.click();
                }
            }
            //var baseurl = window.location.href;
            //if (baseurl.match(queryRegex)) {
            //    baseurl = baseurl.replace(queryRegex, "");
            //    baseurl = baseurl.trim();
            //}
            //var str = "";
            //str = "?theme=" + filecontents.theme;
            //history.replaceState({}, '', baseurl + str);
            filtering(true);
            filecontents["properties"] = properties;
            var controlSection = document.getElementById('control-section');
            var scrollTop = controlSection.scrollTop;
            themeBodyLeftOverlay.style.backgroundColor = "#383838";
            overlay(false);
            if (filecontents.theme.indexOf("-") === -1) {
                var ajax = new ej.base.Ajax({
                    type: "POST",
                    url: "Home/ThemeChange",
                    contentType: 'application/json; charset=utf-8',
                    processData: false,
                    data: JSON.stringify({ color: filecontents }) // Note it is important
                }, 'POST', true);
                ajax.send();
                ajax.onSuccess = function (data) {
                    var styles = document.getElementById('custom-theme');
                    styles.innerHTML = data;
                    //renderProperties(filecontents.theme);
                    //colorpicker();
                    for (i = 0; i < colorElement.length; i++) {
                        colorElement[i].style.backgroundColor = properties[key[i]];
                    }
                    //document.querySelector('#themelist>.active').classList.remove('active');
                    //document.querySelector('#themelist>#' + filecontents.theme).classList.add('active');
                    //themeDropDownText.innerHTML = filecontents.theme;
                    removeOverlay(false);
                    themeBodyLeftOverlay.style.backgroundColor = "transparent";
                    controlSection.scrollTop = scrollTop;
                }
            }
            else {
                //if (filecontents.theme.indexOf('-light') !== -1) {
                //    filecontents.theme = filecontents.theme.replace('-light', '');
                //} else {
                //        filecontents.theme = filecontents.theme.replace('-dark', '');
                //}
                var components = [];
                componentsId = [];
                var checked = ej.base.selectAll('.theme-filter-body input:checked');
                for (var comp of checked) {
                    if (comp.id.indexOf('cat') == -1) {
                        var compName = comp.id;
                        componentsId.push(compName);
                        compName = compName.replace("comp-", "");
                        compName = compName === 'textbox' ? 'input' : compName;
                        components.push(compName);
                    }


                }
                getdependency(components);
                window.dependency_arr.push("layouts/card");
                filecontents["dependency"] = window.dependency_arr;
                var ajax2 = new ej.base.Ajax({
                    type: "POST",
                    url: "Home/DarkThemeChange",
                    contentType: 'application/json; charset=utf-8',
                    processData: false,
                    data: JSON.stringify({ color: filecontents }) // Note it is important
                }, 'POST', true);
                ajax2.send();
                ajax2.onSuccess = function (data) {
                    var styles = document.getElementById('custom-theme');
                    styles.innerHTML = data;
                    for (i = 0; i < colorElement.length; i++) {
                        colorElement[i].style.backgroundColor = properties[key[i]];
                    }
                    removeOverlay(false);
                    themeBodyLeftOverlay.style.backgroundColor = "transparent";
                    controlSection.scrollTop = scrollTop;
                }
            }
            
        }

    }
    importDlg.hide();
    document.getElementById('imports').classList.remove('actives');

}

/* importing method end */

/* quick filter */
/* two column component render */
function twocolumn_layout() {
    var col2_element = $('#col-2').children();
    var col3_element = $('#col-3').children();
    var j = 0;
    k = 0;
    for (var i = 0; i < col2_element.length; i++) {
        if (col2_element[i].classList.contains("two-column")) {
            var secondcolumComponentId = col2_element[i].id;
            var id = '#' + secondcolumComponentId;
            var secondColumnheight = $(id).height();
            var height = secondColumnheight + 40;
            height = height + 'px';

            if (i < col3_element.length) {

                var thirdColumnelementId = col3_element[((i - j) + k)].id;
                document.getElementById(thirdColumnelementId).style.marginTop = height;
                k = 1;
            }

        }
        else {
            j++;
        }
    }
}
$(document).keyup(function (e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        filterDialog.hide();
        exportDialog.hide();
        importDialog.hide();
    }
})

function colorpicker() {
    var themeElement = document.getElementById('theme-properties')
    var element = themeElement.querySelectorAll('.e-colorpicker-wrapper');
    for (var i = 0, len = element.length; i < len; i++) {
        var ele = element[i];
        var cl = ele.querySelectorAll('button')[1];
        cl.classList = '';
        cl.classList.add('theme-color-picker-override');
        cl.children[0].classList = 'theme-color';
        var colorele = element[i].querySelector('input');
        cl.children[0].style.backgroundColor = colorele.ej2_instances[0].value;
    }
}
function loadDefaultThemes1(theme, rendered) {
    window.themes = theme;
    var darktheme = theme;
    var themeObj = {};
    var baseurl = window.location.href;
    if (baseurl.match(queryRegex)) {
        baseurl = baseurl.replace(queryRegex, "");
        baseurl = baseurl.trim();
    }
    var str = "";
    str = "?theme=" + theme;
    history.replaceState({}, '', baseurl + str);
    theme = theme.trim();
    themeObj['theme'] = theme;
    window.dependency_arr.push("layouts/card");
    themeObj["dependency"] = window.dependency_arr;
    var ajax = new ej.base.Ajax({
        type: "POST",
        url: "Home/dark",
        contentType: 'application/json; charset=utf-8',
        processData: false,
        data: JSON.stringify({ themes: themeObj }) // Note it is important
    }, 'POST', true);
    ajax.send();
    ajax.onSuccess = function (data) {
        var styles = document.getElementById('custom-theme');
        styles.innerHTML = data;
        destroyControls();
        renderComponents();
        
        renderRightPane1(darktheme);
        



        setTimeout(function () {
            removeOverlay(true);
            twocolumn_layout();
        }, 500);

        $('.theme-filter-header').show();
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    };
}
function renderRightPane1(theme) {
    // theme switcher datasource
   
        
        renderProperties(theme);
                
}