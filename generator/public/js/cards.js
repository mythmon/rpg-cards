// ============================================================================
// Card definition related functions
// ============================================================================
function card_default_options() {
    return {
        foreground_color: "white",
        background_color: "white",
        default_color: "black",
        default_icon_front: "",
        default_icon_back: "",
        default_title_size: "13",
        default_card_font_size: "inherit",
        page_size: "210mm,297mm",
        page_rows: "3",
        page_columns: "3",
        page_zoom: "100",
        card_arrangement: "doublesided",
        card_size: "Custom",
        card_width: "70mm",
        card_height: "120mm",
        card_count: null,
        icon_inline: true,
        rounded_corners: true,
        back_bleed: "2mm,2mm",
        back_bleed_width: "2mm",
        back_bleed_height: "2mm",
    };
}

function card_default_data() {
    return {
        count: 1,
        title: "New card",
        contents: [],
        tags: []
    };
}

function card_init(card) {
    card.title = card.title || "";
    card.contents = card.contents || [];
    card.tags = card.tags || [];
}

function card_has_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    var index = card.tags.indexOf(tag);
    return index > -1;
}

function card_add_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    var index = card.tags.indexOf(tag);
    if (index === -1) {
        card.tags.push(tag);
    }
}

function card_remove_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    card.tags = card.tags.filter(function (t) {
        return tag !== t;
    });
}

// ============================================================================
// Card definition related functions
// ============================================================================

function card_data_color_front(card_data, options) {
    return card_data.color_front || card_data.color || options.default_color || "black";
}

function card_data_color_back(card_data, options) {
    return card_data.color_back || card_data.color || options.default_color || "black";
}

function card_data_icon_front(card_data, options) {
    return card_data.icon_front || options.default_icon_front || "";
}

function card_data_icon_back(card_data, options) {
    return card_data.icon_back || options.default_icon_back || "";
}

function card_data_split_params(value) {
    return value.split("|").map(function (str) { return str.trim(); });
}

function card_element_class(card_data, options) {
    var card_font_size_class = card_size_class(card_data, options);
    return 'card-element card-description-line' + card_font_size_class;
}

function card_size_class(card_data, options) {
    var card_font_size = card_data.card_font_size || options.default_card_font_size || '';
    return (card_font_size != '' && card_font_size != "inherit") ? ' card-font-size-' + card_font_size : '';
}

// ============================================================================
// Card element generating functions
// ============================================================================

function card_element_title(card_data, options) {
    var title = card_data.title || "";
    var title_size = card_data.title_size || options.default_title_size || 'normal';
    return '<div class="card-title card-title-' + title_size + '">' + title + '</div>';
}

function card_element_icon(card_data, options) {
    var icons = card_data_icon_front(card_data, options).split(/[\s\uFEFF\xA0]+/).filter(icon=>icon);
    var classname = "icon";
    if (options.icon_inline) {
        classname = "inlineicon";
    }

    var result = "";
    result += '<div class="card-title-' + classname + '-container">';
    icons.forEach(function(icon){
        result += '    <img class="card-title-' + classname + ' icon-' + icon + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">';
    });
    result += '</div>';
    return result;
}

function card_element_subtitle(params, card_data, options) {
    var subtitle = params[0] || "";
    var result = '<div class="card-element card-subtitle">';
    if (params[1])
	{
		result += '<div style="float:right">' + params[1] + '</div>';
	}
    result += '<div>' + subtitle + '</div>';
    result += '</div>';
    return result;
}

function card_element_inline_icon(params, card_data, options) {
    var icon = params[0] || "";
    var size = params[1] || "40";
    var align = params[2] || "center";
    var color = card_data_color_front(card_data, options);
    return '<div class="card-element card-inline-icon align-' + align + ' icon-' + icon + '" style ="height:' + size + 'px;min-height:' + size + 'px;width: ' + size + 'px;background-color: ' + color + '"></div>';
}

function card_element_picture(params, card_data, options) {
    var url = params[0] || "";
    var height = params[1] || "";
    return '<div class="card-element card-picture" style ="background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center;background-repeat: no-repeat; height:' + height + 'px"></div>';
}

function card_element_ruler(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var fill = 'fill="' + color + '"';
    var stroke = 'stroke="' + color + '"';
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<svg class="card-ruler' + card_font_size_class + '" height="1" width="100" viewbox="0 0 100 1" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg">';
    result += '    <polyline points="0,0 100,0.5 0,1" ' + fill + '></polyline>';
    result += '</svg>';
    return result;
}

function card_element_p2e_ruler(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var fill = 'fill="' + color + '"';
    var stroke = 'stroke="' + color + '"';
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<svg class="card-p2e-ruler' + card_font_size_class + '" height="1" width="100" viewbox="0 0 100 5" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg">';
    result += '    <polyline points="0,0 100,0.5 0,1" ' + fill + '></polyline>';
    result += '</svg>';
    return result;
}

function card_element_boxes(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var fill = ' fill="none"';
    var stroke = ' stroke="' + color + '"';
    var count = params[0] || 1;
    var size = params[1] || 3;
    var additional_text = params[2] || "";
    var style = 'style="width:' + size + 'em;height:' + size + 'em"';
    var element_class = card_element_class(card_data, options);

    var result = "";
    result += '<div class="' + element_class + '">';
    for (var i = 0; i < count; ++i) {
        result += '<svg class="card-box" height="100" width="100" viewbox="0 0 100 100" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg" ' + style + '>';
        result += '    <rect x="5" y="5" width="90" height="90" ' + fill + stroke + ' style="stroke-width:10">';
        result += '</svg>';
    }
    result += additional_text + '</div>';
    return result;
}

function card_element_property(params, card_data, options) {
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<div class="card-element card-property-line' + card_font_size_class + '">';
    result += '   <h4 class="card-property-name">' + params[0] + '</h4>';
    result += '   <p class="card-p card-property-text">' + params[1] + '</p>';
	if (params[2])
	{
		result += '   <div style="float:right">';
		result += '       <h4 class="card-property-name">' + params[2] + '</h4>';
		result += '       <p class="card-p card-property-text">' + params[3] + '</p>';
		result += '   </div>';
	}
    result += '</div>';
    return result;
}

function card_element_description(params, card_data, options) {
    var element_class = card_element_class(card_data, options);

    var result = "";
    result += '<div class="' + element_class + '">';
    result += '   <h4 class="card-description-name">' + params[0] + '</h4>';
    result += '   <p class="card-p card-description-text">' + params[1] + '</p>';
    result += '</div>';
    return result;
}

function card_element_text(params, card_data, options) {
    var element_class = card_element_class(card_data, options);

    var result = "";
    result += '<div class="' + element_class + '">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_center(params, card_data, options) {
    var element_class = card_element_class(card_data, options);

    var result = "";
    result += '<div class="' + element_class + '" style="text-align: center">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_justify(params, card_data, options) {
    var element_class = card_element_class(card_data, options);

    var result = "";
    result += '<div class="' + element_class + '" style="text-align: justify; hyphens: auto">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_dndstats(params, card_data, options) {
    var stats = [10, 10, 10, 10, 10, 10];
    var mods = [0,0,0,0,0,0];
    for (var i = 0; i < 6; ++i) {
        stats[i] = parseInt(params[i], 10) || 0;
        var mod = Math.floor(((stats[i] - 10) / 2));
        if (mod >= 0) {
            mod = "+" + mod;
        } else {
            mod = "" + mod;
        }
        mods[i] = "&nbsp;(" + mod + ")";
    }
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<table class="card-stats' + card_font_size_class + '">';
    result += '    <tbody><tr>';
    result += '      <th class="card-stats-header">STR</th>';
    result += '      <th class="card-stats-header">DEX</th>';
    result += '      <th class="card-stats-header">CON</th>';
    result += '      <th class="card-stats-header">INT</th>';
    result += '      <th class="card-stats-header">WIS</th>';
    result += '      <th class="card-stats-header">CHA</th>';
    result += '    </tr>';
    result += '    <tr>';
    result += '      <td class="card-stats-cell">' + stats[0] + mods[0] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[1] + mods[1] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[2] + mods[2] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[3] + mods[3] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[4] + mods[4] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[5] + mods[5] + '</td>';
    result += '    </tr>';
    result += '  </tbody>';
    result += '</table>';
    return result;
}

function card_element_p2e_stats(params, card_data, options) {
    var result = "";
    result += '<div class="card-p2e-attribute-line">';
    result += '   <p class="card-p2e-attributes-text">';
    result += '       <b>Str</b> ' + params[0] + ', <b>Dex</b> ' + params[1] + ', <b>Con</b> ' + params[2] + ', <b>Int</b> ' + params[3] + ', <b>Wis</b> ' + params[4] + ', <b>Cha</b> ' + params[5]
    result += '   </p>';
    result += '</div>';
    result += card_element_p2e_ruler(params, card_data, options)
    result += '<div class="card-p2e-attribute-line">';
    result += '   <p class="card-p2e-attributes-text">';
    result += '       <b>AC </b> ' + params[6] + '; <b>Fort</b> ' + params[7] + '; <b>Ref</b> ' + params[8] + '; <b>Will</b> ' + params[9]
    result += '   </p>';
    result += '   <p class="card-p2e-attributes-text">';
    result += '       <b>HP </b> ' + params[10]
    result += '   </p>';
    result += '</div>';
    return result;
}

function card_element_start_p2e_trait() {
    return '<div class="card-p2e-trait-container">';
}

function card_element_end_p2e_trait() {
    return '</div>';
}

function card_element_p2e_trait(params, card_data, options) {
    var card_font_size_class = card_size_class(card_data, options);
    var badge_type = ' card-p2e-trait-' + params[0];

    var result = "";
    result += '<span class="card-p2e-trait' + badge_type + card_font_size_class + '">';
    result += params[1];
    result += '</span>';
    return result;
}

function card_element_p2e_activity(params, card_data, options) {
    var card_font_size_class = card_size_class(card_data, options);

    var activity_icon;
    if (params[1] == '0') {
        activity_icon = 'icon-p2e-free-action';
    } else if (params[1] == '1') {
        activity_icon = 'icon-p2e-1-action';
    } else if (params[1] == '2') {
        activity_icon = 'icon-p2e-2-actions';
    } else if (params[1] == '3') {
        activity_icon = 'icon-p2e-3-actions';
    } else if (params[1] == 'R') {
        activity_icon = 'icon-p2e-reaction';
    }

    var result = "";
    result += '<div class="card-element card-property-line' + card_font_size_class + '">';
    result += '   <h4 class="card-property-name">' + params[0] + '</h4>';
    result += '   <div class="card-inline-icon ' + activity_icon + '" style="display: inline-block; vertical-align: middle; height: 10px; min-height: 10px; width: 10px; background-color: black;"></div>';
    result += '   <p class="card-p card-property-text">' + params[2] + '</p>';
    result += '</div>';
    return result;
}



function card_element_swstats(params, card_data, options) {
    var stats = [];
    for (var i = 0; i < 9; ++i) {
        stats[i] = params[i] || '-';
    }
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<table class="card-stats' + card_font_size_class + '">';
    result += '    <tbody><tr>';
    result += '      <th class="card-stats-header">Agility</th>';
    result += '      <th class="card-stats-header">Smarts</th>';
    result += '      <th class="card-stats-header">Spirit</th>';
    result += '      <th class="card-stats-header">Strength</th>';
    result += '      <th class="card-stats-header">Vigor</th>';
    result += '    </tr>';
    result += '    <tr>';
    result += '      <td class="card-stats-cell">d' + stats[0] + '</td>';
    result += '      <td class="card-stats-cell">d' + stats[1] + '</td>';
    result += '      <td class="card-stats-cell">d' + stats[2] + '</td>';
    result += '      <td class="card-stats-cell">d' + stats[3] + '</td>';
    result += '      <td class="card-stats-cell">d' + stats[4] + '</td>';
    result += '    </tr>';
    result += '  </tbody>';
    result += '</table>';
    result += '<p class="card-stats-sw-derived">';
    result += ' <b>Pace</b> ' + stats[5];
    result += ' <b>Parry</b> ' + stats[6];
    result += ' <b>Toughness</b> ' + stats[7];
    result += stats[8] ? ' <b>Loot</b> ' + stats[8] : '';
    result += '</p>';
    return result;
}

function card_element_bullet(params, card_data, options) {
    var card_font_size_class = card_size_class(card_data, options);

    var result = "";
    result += '<ul class="card-element card-bullet-line' + card_font_size_class + '">';
    result += '   <li class="card-bullet">' + params[0] + '</li>';
    result += '</ul>';
    return result;
}

function card_element_section(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var section = params[0] || "";

    var result = '<h3 class="card-section" style="color:' + color + '">';
    if (params[1])
	{
		result += '<div style="float:right">' + params[1]+ '</div>';
	}
    result += '<div>' + section + '</div>';
    result += '</h3>';

    return result;
}

function card_element_fill(params, card_data, options) {
    var flex = params[0] || "1";
    return '<span class="card-fill" style="flex:' + flex + '"></span>';
}

function card_element_unknown(params, card_data, options) {
    return '<div>Unknown element: ' + params.join('<br />') + '</div>';
}

function card_element_empty(params, card_data, options) {
    return '';
}

var card_element_generators = {
    subtitle: card_element_subtitle,
    property: card_element_property,
    rule: card_element_ruler,
    ruler: card_element_ruler,
    p2e_rule: card_element_p2e_ruler,
    p2e_ruler: card_element_p2e_ruler,
    boxes: card_element_boxes,
    description: card_element_description,
    dndstats: card_element_dndstats,
    p2e_stats: card_element_p2e_stats,
    p2e_start_trait_section: card_element_start_p2e_trait,
    p2e_trait: card_element_p2e_trait,
    p2e_end_trait_section: card_element_end_p2e_trait,
    p2e_activity: card_element_p2e_activity,
    swstats: card_element_swstats,
    text: card_element_text,
    center: card_element_center,
    justify: card_element_justify,
    bullet: card_element_bullet,
    fill: card_element_fill,
    section: card_element_section,
    disabled: card_element_empty,
    picture: card_element_picture,
    icon: card_element_inline_icon
};

// ============================================================================
// Card generating functions
// ============================================================================

function card_generate_contents(contents, card_data, options) {
    var result = "";

    var html = contents.map(function (value) {
        var parts = card_data_split_params(value);
        var element_name = parts[0];
        var element_params = parts.splice(1);
        var element_generator = card_element_generators[element_name];
        if (element_generator) {
            return element_generator(element_params, card_data, options);
        } else if (element_name.length > 0) {
            return card_element_unknown(element_params, card_data, options);
        }
    }).join("\n");

    var tagNames = ['icon'];

    tagNames.forEach(function(tagName){
        var tagRegExp = new RegExp('<'+tagName+'[^>]*>', 'g');
        var attrRegExp = new RegExp('([\\w-]+)="([^"]+)"', 'g')

        var matches = [];
        forEachMatch(tagRegExp, html, function(m){
            matches.push(m);
        });
        if (!matches.length) return null;

        var tagResults = new Array(matches.length);
        matches.forEach(function(match, i){
            if (tagName === 'icon') {
                var attrs = {};
                forEachMatch(attrRegExp, match[0], function(m,i){
                    var attrName = m[1];
                    var attrValue = m[2];
                    if (attrName === 'name') {
                        if(!attrs.class) attrs.class = '';
                        attrs.class += 'game-icon game-icon-' + attrValue;
                    }
                    else if (attrName === 'size') {
                        if(!attrs.style) attrs.style = '';
                        attrs.style += 'font-size:' + attrValue + 'pt;';
                    }
                });
                forEachMatch(attrRegExp, match[0], function(m,i){
                    var attrName = m[1];
                    var attrValue = m[2];
                    if (attrName === 'style') {
                        if(!attrs.style) attrs.style = '';
                        attrs.style += attrValue;
                    }
                });
                var tagResult = '<i';
                Object.keys(attrs).forEach(function(k){
                    tagResult += ' ' + k + '="' + attrs[k] + '"';
                });
                tagResult += '></i>';
                tagResults[i] = tagResult;
            }
        });

        html = html.replace(tagRegExp, function(){
            return tagResults.shift();
        });

    });

    result += '<div class="card-content-container">';
    result += html;
    result += '</div>';
    return result;
}

function card_repeat(card, count) {
    var result = [];
    for (var i = 0; i < count; ++i) {
        result.push(card);
    }
    return result;
}

function card_generate_color_style(color, options) {
    return 'style="color:' + color + '; border-color:' + color + '; background-color:' + color + '"';
}

function card_generate_color_gradient_style(color, options) {
    return 'style="background: radial-gradient(ellipse at center, white 20%, ' + color + ' 120%)"';
}

function add_size_to_style(style, width, height) {
    // style string example ----> `style="color:red;"`
    style = style.slice(0, -1) + ";" + "width:" + width + ";" + "height:" + height + ";" + style.slice(-1);
    return style;
}

function add_padding_to_style(style, options) {
    // style string example ----> `style="color:red;"`
    style = `${style.slice(0, -1)}padding: ${options.back_bleed_height} ${options.back_bleed_width};${style.slice(-1)}`;
    return style;
}

function card_generate_front(data, options) {
    var color = card_data_color_front(data, options);
    var style_color = card_generate_color_style(color, options);

    var width = options.card_width;
    var height = options.card_height;
    var back_bleed_width = options.back_bleed_width;
    var back_bleed_height = options.back_bleed_height;

    var card_width = "calc(" + width + " + " + back_bleed_width + ")";
    var card_height = "calc(" + height + " + " + back_bleed_height + ")";

    var card_size_style = add_size_to_style(style_color, card_width, card_height);
    var card_style = add_padding_to_style(card_size_style, options);

    var result = "";
    result += '<div class="card ' + (options.rounded_corners ? 'rounded-corners' : '') + '" ' + card_style + '>';
    result += '<div class="card-header">';
    result += card_element_title(data, options);
    result += card_element_icon(data, options);
    result += '</div>';
    result += card_generate_contents(data.contents, data, options);
    result += '</div>';

    return result;
}

function card_generate_back(data, options) {
    var color = card_data_color_back(data, options);
    var style_color = card_generate_color_style(color, options);

    var width = options.card_width;
    var height = options.card_height;
    var back_bleed_width = options.back_bleed_width;
    var back_bleed_height = options.back_bleed_height;

    var card_width = "calc(" + width + " + " + back_bleed_width + ")";
    var card_height = "calc(" + height + " + " + back_bleed_height + ")";

    var card_style = add_size_to_style(style_color, card_width, card_height);

    var $tmpCardContainer = $('<div style="position:absolute;visibility:hidden;pointer-events:none;"></div>');
    var $tmpCard = $('<div class="card" ' + card_style + '><div class="card-back"><div class="card-back-inner"><div class="card-back-icon"></div></div></div></div>');
    $('#preview-container').append($tmpCardContainer.append($tmpCard));

    var $tmpCardInner = $tmpCard.find('.card-back-inner');
    var innerWidth = $tmpCardInner.width();
    var innerHeight = $tmpCardInner.height();
    var iconSize = Math.min(innerWidth, innerHeight) / 2 + 'px';
    $tmpCard.remove();

    var icon_style = add_size_to_style(style_color, iconSize, iconSize);

	var url = data.background_image;
	var background_style = "";
	if (url)
	{
		background_style = 'style = "background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center; background-repeat: no-repeat;"';
	}
	else
	{
		background_style = card_generate_color_gradient_style(color, options);
    }
	var icon = card_data_icon_back(data, options);

    var result = "";
    result += '<div class="card' + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + '" ' + card_style + '>';
    result += '  <div class="card-back" ' + background_style + '>';
	if (!url)
	{
		result += '    <div class="card-back-inner">';
		result += '      <div class="card-back-icon icon-' + icon + '" ' + icon_style + '></div>';
		result += '    </div>';
	}
    result += '  </div>';
    result += '</div>';

    return result;
}

function card_generate_empty(count, options) {
    var style_color = card_generate_color_style("white");
    var card_style = add_size_to_style(style_color, options.card_width, options.card_height);

    var result = "";
    result += '<div class="card' + '" ' + card_style + '>';
    result += '</div>';

    return card_repeat(result, count);
}

// ============================================================================
// Functions that generate pages of cards
// ============================================================================

function card_pages_split(data, rows, cols) {
    var cards_per_page = rows * cols;
    var result = [];
    for (var i = 0; i < data.length; i += cards_per_page) {
        var page = data.slice(i, i + cards_per_page);
        result.push(page);
    }
    return result;
}

function card_pages_merge(front_pages, back_pages) {
    var result = [];
    for (var i = 0; i < front_pages.length; ++i) {
        result.push(front_pages[i]);
        result.push(back_pages[i]);
    }
    return result;
}

function card_pages_add_padding(cards, options) {
    var cards_per_page = options.page_rows * options.page_columns;
    var last_page_cards = cards.length % cards_per_page;
    if (last_page_cards !== 0) {
        return cards.concat(card_generate_empty(cards_per_page - last_page_cards, options));
    } else {
        return cards;
    }
}

function card_pages_interleave_cards(front_cards, back_cards, options) {
    var result = [];
    var i = 0;
    while (i < front_cards.length) {
        result.push(front_cards[i]);
        result.push(back_cards[i]);
        if (options.page_columns > 2) {
            result.push(card_generate_empty(options.page_columns - 2, options));
        }
        ++i;
    }
    return result;
}

function card_pages_interleave_cards_alt(front_cards, back_cards, options) {
    var result = [];
    var i = 0;
    while (i < front_cards.length) {
        if (i % 2) {
            result.push(back_cards[i]);
            result.push(front_cards[i]);
        } else {
            result.push(front_cards[i]);
            result.push(back_cards[i]);
        }
        if (options.page_columns > 2) {
            result.push(card_generate_empty(options.page_columns - 2, options));
        }
        ++i;
    }
    return result;
}

function card_pages_wrap(pages, options) {
    // force portrait layout then rotate if landscape
    var orientation = getOrientation(options.page_width, options.page_height);
    var pageWidth = options.page_width;
    var pageHeight = options.page_height;
    var parsedPageWidth = parseNumberAndMeasureUnit(pageWidth || "210mm");
    var parsedPageHeight = parseNumberAndMeasureUnit(pageHeight || "297mm");

    var result = "";
    for (var i = 0; i < pages.length; ++i) {
        var style = 'style="';
        if ((options.card_arrangement === "doublesided") &&  (i % 2 === 1)) {
            style += 'background-color:' + options.background_color + ';';
        } else {
            style += 'background-color:' + options.foreground_color + ';';
        }
        // style += 'padding-left: calc( (' + (parsedPageWidth.number + parsedPageWidth.mu) + ' - ' + options.card_width + ' * ' + options.page_columns + ' ) / 2);';
        // style += 'padding-right: calc( (' + (parsedPageWidth.number + parsedPageWidth.mu) + ' - ' + options.card_width + ' * ' + options.page_columns + ' ) / 2);';
        style += '"';
        style = add_size_to_style(style, parsedPageWidth.number + parsedPageWidth.mu, parsedPageHeight.number + parsedPageHeight.mu);

        var z = options.page_zoom / 100;
        // var zoomWidth = parsedPageWidth.number * z;
        // var zoomHeight = parsedPageHeight.number * z;
        var zoomStyle = 'style="';
        zoomStyle += 'transform: scale(' + z + ');';
        if ((options.card_arrangement === "doublesided") &&  (i % 2 === 1)) {
            zoomStyle += 'flex-direction:' + 'row-reverse' + ';';
        }
        zoomStyle += '"';
        zoomStyle = add_size_to_style(zoomStyle, parsedPageWidth.number + parsedPageWidth.mu, parsedPageHeight.number + parsedPageHeight.mu);

        result += '<page class="page page-preview ' + orientation + '" ' + style + '>\n';
        result += '<div class="page-zoom page-zoom-preview" ' + zoomStyle + '>\n';
        result += pages[i].join("\n");
        result += '</div>\n';
        result += '</page>\n';
    }
    return result;
}

function card_pages_generate_style(options) {
    const page_width = options.page_width;
    const page_height = options.page_height;
    const portrait = parseFloat(page_width) < parseFloat(page_height);
    const pw = portrait ? page_width : page_height;
    const ph = portrait ? page_height : page_width;
    var result = "";
    result += "<style>\n";
    result += "@page {\n";
    result += "    margin: 0;\n";
    result += "    size:" + pw + " " + ph + ";\n";
    result += "    -webkit-print-color-adjust: exact;\n";
    result += "}\n";
    result += "</style>\n";
    return result;
}

function card_pages_generate_html(card_data, options) {
    options = options || card_default_options();
    var rows = options.page_rows || 3;
    var cols = options.page_columns || 3;

    // Generate the HTML for each card
    var front_cards = [];
    var back_cards = [];
    card_data.forEach(function (data) {
        var count = options.card_count || data.count || 1;
        var front = card_generate_front(data, options);
        var back = card_generate_back(data, options);
        front_cards = front_cards.concat(card_repeat(front, count));
        back_cards = back_cards.concat(card_repeat(back, count));
    });

    var pages = [];
    if (options.card_arrangement === "doublesided") {
        // Add padding cards so that the last page is full of cards
        front_cards = card_pages_add_padding(front_cards, options);
        back_cards = card_pages_add_padding(back_cards, options);
        // Split cards to pages
        var front_pages = card_pages_split(front_cards, rows, cols);
        var back_pages = card_pages_split(back_cards, rows, cols);
        // Interleave front and back pages so that we can print double-sided
        pages = card_pages_merge(front_pages, back_pages);
    } else if (options.card_arrangement === "front_only") {
        var cards = card_pages_add_padding(front_cards, options);
        pages = card_pages_split(cards, rows, cols);
    } else if (options.card_arrangement === "side_by_side") {
        var cards = card_pages_interleave_cards(front_cards, back_cards, options);
        cards = card_pages_add_padding(cards, options);
        pages = card_pages_split(cards, rows, cols);
    } else if (options.card_arrangement === "side_by_side_alt") {
        var cards = card_pages_interleave_cards_alt(front_cards, back_cards, options);
        cards = card_pages_add_padding(cards, options);
        pages = card_pages_split(cards, rows, cols);
    }

    // Wrap all pages in a <page> element and add CSS for the page size
    var result = "";
    result += card_pages_generate_style(options);
    result += card_pages_wrap(pages, options);

    return result;
}

function card_pages_insert_into(card_data, container) {

    // Clear the previous content of the document
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    // Insert the HTML
    var html = card_pages_generate_html(card_data);
    container.innerHTML = html;
}
