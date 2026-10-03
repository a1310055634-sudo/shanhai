# -*- coding: utf-8 -*-
# G77:八条 verified 词条 laterReception claim 批量追加(python utf-8,带守卫)
import io, re, sys

REPO = 'D:/zcode/workspace/default/shanhai/src/data/entities/'
WIKI = 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/'
WIKI_RAW = 'https://zh.wikisource.org/wiki/'

def claim(text, juan, quote, note):
    return {
        'text': text,
        'sourceTitle': '《山海經廣注》(四庫全書本)%s·吳任臣案引' % juan,
        'sourceUrl': WIKI_RAW + juan,
        'quote': quote,
        'archive': 'EDITION_EVIDENCE/guangzhu-%s-20261004.txt' % juan.replace('卷', 'juan'),
        'note': note,
    }

J1 = '卷01'
J2 = '卷02'
J8 = '卷08'
J14 = '卷14'

ENTRIES = {
  'xingxing': dict(
    juan=J1,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》與《淮南萬畢術》',
    text='吴任臣《山海经广注》于狌狌条下并引郭璞《图赞》「狌狌似猴,走立行伏」与《淮南万毕术》「狌狌知往」二说;前者状其形,后者记其「知往」之性。',
    claims=[claim(
      '郭璞《山海经图赞》咏狌狌「似猴,走立行伏」,状其形似猴而行止特异。',
      J1, '圖贊曰狌狌似猴走立行伏櫰木挺力少辛明目',
      '郭注「生生禺獸狀如猿」;图赞文字依四庫本廣注案语所引照录(「走立行伏」句读从存档)。',
    ), claim(
      '《淮南万毕术》有「狌狌知往」之说,谓狌狌能知过去,吴任臣引之与郭注并陈。',
      J1, '任臣案淮南萬畢術曰婦終知來狌狌知往',
      '「知往」与《海内南经》「狌狌知人名」同为后人增衍的智性叙述;本站照录并存。',
    )],
  ),
  'lushu': dict(
    juan=J1,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》',
    text='吴任臣《山海经广注》鹿蜀条引郭璞《图赞》「鹿蜀之獸,馬質虎文,攘首吟鳴,矯足騰羣,佩其皮尾,子孫如雲」,把经文「佩之宜子孫」的佩护传统凝为韵语。',
    claims=[claim(
      '郭璞《山海经图赞》咏鹿蜀「馬質虎文」,并重申「佩其皮尾,子孫如雲」的佩护宜子孙之说。',
      J1, '圖贊曰鹿蜀之獸馬質虎文攘首吟鳴矯足騰羣佩其皮尾子孫如雲',
      '「馬質虎文」概括经文「其狀如馬…其文如虎」;「子孫如雲」即「宜子孫」的赞语化。',
    )],
  ),
  'luwu': dict(
    juan=J2,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》',
    text='陆吾之神郭璞注「即肩吾也」(并引《庄子》「肩吾得之以處大山」);吴任臣《广注》引郭璞《图赞》「肩吾得一以處崑崙,開明是對,司帝之門,吐納靈氣」,把经文「司天之九部及帝之囿时」的门卫职守神格化。',
    claims=[claim(
      '郭璞以陆吾即《庄子》所载肩吾,其《图赞》咏「肩吾得一以處崑崙」,司帝之门。',
      J2, '圖贊曰肩吾得一以處崑崙開明是對司帝之門吐納靈氣熊熊魂魂',
      '郭注「即肩吾也。莊周曰肩吾得之以處大山也」;图赞承此以「肩吾」称之。',
    )],
  ),
  'yingzhao': dict(
    juan=J2,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》',
    text='英招为槐江之山之神,「其狀馬身而人面,虎文而鳥翼,狥于四海」;吴任臣《广注》引郭璞《图赞》「槐江之山,英招是主,巡游四海,撫翼雲儛」,把「狥于四海」化为「巡游四海」的巡行意象。',
    claims=[claim(
      '郭璞《山海经图赞》咏英招「巡游四海,撫翼雲儛」,承经文「狥于四海」的巡行叙述。',
      J2, '圖贊曰槐江之山英招是主巡游四海撫翼雲儛實唯帝囿有謂𤣥圃',
      '郭注「狥謂周行也」;图赞「巡游四海」即周行四海的赞语化。',
    )],
  ),
  'wenyaoyu': dict(
    juan=J2,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》',
    text='文鳐鱼「常行西海,游于东海,以夜飞」,「见则天下大穰」;吴任臣《广注》引郭璞《图赞》「見則邑穰,厥名曰鰩,經營二海,矯翼閑霄,唯味之竒,寄厥伊庖」,兼收其丰穰征兆与「味奇」之说。',
    claims=[claim(
      '郭璞《山海经图赞》咏文鳐鱼「見則邑穰」「經營二海」,承经文「見則天下大穰」与跨海夜飞的叙述。',
      J2, '圖贊曰見則邑穰厥名曰鰩經營二海矯翼閑霄唯味之竒寄厥伊庖',
      '「經營二海」即「常行西海,游于東海」;「寄厥伊庖」呼应「其味酸甘,食之已狂」的食用记载。',
    )],
  ),
  'dijiang': dict(
    juan=J2,
    era='清·吳任臣《山海經廣注》引郭璞《圖贊》',
    text='帝江为天山之神,「六足四翼,渾敦無面目,是識歌舞」;郭璞注「夫形無全者,則神自然靈照」,并以《庄子》儵忽凿七窍的混沌寓言为说。吴任臣《广注》引郭璞《图赞》「質則渾沌,神則旁通」,正是这一「形缺神全」传统的凝练;又引王融《曲水诗序》「傳妙靡于帝江」,见其与歌舞之妙的关联进入六朝文章。',
    claims=[claim(
      '郭璞《山海经图赞》咏帝江「質則渾沌,神則旁通」,概括其形浑敦无面目而神识通达歌舞的记载。',
      J2, '圗贊曰質則渾沌神則旁通自然靈照聽不以聦强之為名曰惟帝江',
      '郭注「其帝江之謂乎。莊生所云中央之帝混沌為儵忽所鑿七竅而死者,葢假此以寓言也」;图赞承此。',
    ), claim(
      '南朝王融《三月三日曲水诗序》已有「傳妙靡于帝江」之句,帝江识歌舞之说进入六朝骈文。',
      J2, '王融曲水詩序傳妙靡于帝江盧柟滄溟賦云帝江䠞左而歛翼謂此也',
      '任臣案引;王融序为六朝名篇,「妙靡」谓歌舞之美,与经文「是識歌舞」相承。',
    )],
  ),
  'zhuyin': dict(
    juan=J8,
    era='清·吳任臣《山海經廣注》引《括地圖》等',
    text='烛阴(烛龙)为钟山之神,「視為晝,暝為夜,吹為冬,呼為夏……身長千里」;吴任臣《广注》并引《括地圖》「鍾山之神,名曰燭龍,視為晝,眠為夜」,及《楚辞·天問》王逸注「有龍銜燭而照之」、柳宗元《天對》,与经文相证成。',
    claims=[claim(
      '《括地圖》亦载「鍾山之神,名曰燭龍,視為晝,眠為夜」,与《海外北经》烛阴叙述几乎全同。',
      J8, '括地圖曰鍾山之神名曰燭龍視為晝眠為夜吹為冬吁為夏息為風',
      '吴任臣案引;「燭陰/燭龍」两名并存,经文作「燭陰」。',
    ), claim(
      '《楚辞·天問》「燭龍何照」之問,王逸注谓「天之西北有幽冥無日之國,有龍銜燭而照之」,与烛阴神话同源。',
      J8, '楚辭曰安不到燭龍何照王逸注云天之西北有幽冥無日之國有龍銜燭而照之',
      '吴任臣案引;柳宗元《天對》「日安不到,燭龍何照」相关的答问系统亦经其引及。',
    )],
  ),
  'yinglong': dict(
    juan=J14,
    era='清·吳任臣《山海經廣注》引《楚辭》等',
    text='应龙「殺蚩尤與夸父,不得復上,故下數旱」,郭注谓「應龍遂住地下,故上無復下雨」;吴任臣《广注》并引《楚辞·天問》「應龍何畫?河海何歷?」、《述異記》「龍千年為應龍」诸说,把应龙杀伐、致雨的双重叙述串为一系。',
    claims=[claim(
      '《楚辞·天問》「應龍何畫?河海何歷?」之问,王逸系之于应龙以尾画地导流的传说,与经文应龙杀蚩尤的叙述同属一系。',
      J14, '楚辭云應龍何畫河海何厯漢周憬碑應龍之畫謂此',
      '吴任臣案引;「應龍何畫」的「畫」通「划」,指以尾划地成江河(王逸说)。',
    ), claim(
      '《述異記》有「龍千年為應龍」之说,应龙被视为龙之寿者,吴任臣引之以释其名。',
      J14, '又虬龍千年謂之應龍述異記亦云龍千年為應龍',
      '吴任臣案引;梁任昉《述異记》题名,内容为龙龄分级传说。',
    )],
  ),
}

ORDER = ['xingxing', 'lushu', 'luwu', 'yingzhao', 'wenyaoyu', 'dijiang', 'zhuyin', 'yinglong']

def render_entry(e):
    claims_js = []
    for c in e['claims']:
        claims_js.append(
            '        {\n'
            "          text: '%s',\n"
            "          sourceTitle: '%s',\n"
            "          sourceUrl: '%s',\n"
            "          quote: '%s',\n"
            "          archive: '%s',\n"
            "          note: '%s',\n"
            '        }' % (c['text'], c['sourceTitle'], c['sourceUrl'], c['quote'], c['archive'], c['note'])
        )
    claims_block = 'claims: [\n' + ',\n'.join(claims_js) + ',\n      ]'
    entry = (
        '    {\n'
        "      era: '%s',\n"
        "      text: '%s',\n"
        '      %s,\n'
        '    },' % (e['era'], e['text'], claims_block)
    )
    return entry

applied = 0
for slug in ORDER:
    e = ENTRIES[slug]
    p = REPO + slug + '.ts'
    s = io.open(p, encoding='utf-8').read()
    entry = render_entry(e)
    if 'laterReception' in s:
        # 在 laterReception: [ ... ] 数组尾(最后一个 ] 之前,即 "  ],\n  disputedReadings" 或 "  ],\n  relatedEntityIds") 追加
        m = re.search(r'(laterReception: \[\n)(.*?)(\n  \],)', s, re.S)
        if not m:
            # 单行/无换行变体
            m = re.search(r'(laterReception: \[)([^\]]*)(\])', s, re.S)
            if not m:
                print('FAIL locate laterReception', slug); sys.exit(1)
            s = s[:m.start(2)] + m.group(2).rstrip() + ',\n' + entry + s[m.start(3):]
        else:
            body = m.group(2).rstrip()
            if body.endswith(','):
                body = body  # 保留
            s = s[:m.start(2)] + body + ',\n' + entry + s[m.start(3):]
    else:
        # 无 laterReception:在 disputedReadings: [ 前插入整个字段
        anchor = '  disputedReadings: ['
        if anchor not in s:
            anchor = '  relatedEntityIds: []'
            if anchor not in s:
                print('FAIL no anchor', slug); sys.exit(1)
            blk = '  laterReception: [\n' + entry + '\n  ],\n  relatedEntityIds: []'
            s = s.replace(anchor, blk, 1)
        else:
            blk = '  laterReception: [\n' + entry + '\n  ],\n  disputedReadings: ['
            s = s.replace(anchor, blk, 1)
    io.open(p, 'w', encoding='utf-8').write(s)
    applied += 1
    print('OK', slug)

print('APPLIED', applied)
sys.exit(0 if applied == len(ORDER) else 1)
