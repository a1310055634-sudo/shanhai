# -*- coding: utf-8 -*-
"""G80 互链取材:在广注各卷存档中检索「一条注文同时提及两个本站词条」的 genuine 互链证据。
只输出候选片段供人工判读,不自动写入数据。
"""
import io
import os
import re

FILES = [
    'guangzhu-juan01-20261004.txt',
    'guangzhu-juan02-20261004.txt',
    'guangzhu-juan03-20261004.txt',
    'guangzhu-juan08-20261004.txt',
    'guangzhu-juan14-20261004.txt',
    'guangzhu-juan17-20261004.txt',
]

# 本站 17 词条的底本用字(含繁体/异体)
NAMES = [
    '狌狌', '猩猩', '鹿蜀', '蠱雕', '䍺', '鳳皇', '九尾狐', '帝江',
    '精衛', '陸吾', '英招', '文鰩', '燭陰', '應龍', '夔', '長右',
    '猾褢', '彘',
]

OUT = 'dev/round80-links.txt'
buf = []

for fn in FILES:
    path = os.path.join('EDITION_EVIDENCE', fn)
    if not os.path.exists(path):
        buf.append('!! missing %s' % fn)
        continue
    with io.open(path, encoding='utf-8') as f:
        text = f.read()
    buf.append('#' * 74)
    buf.append('# %s' % fn)
    buf.append('#' * 74)
    hits = 0
    # 找同时含两个不同兽名的注文片段
    for i, a in enumerate(NAMES):
        for b in NAMES[i + 1:]:
            for m in re.finditer(re.escape(a), text):
                seg = text[max(0, m.start() - 160):m.start() + 200]
                if b in seg:
                    hits += 1
                    buf.append('--- %s + %s  @%d' % (a, b, m.start()))
                    buf.append(seg)
                    buf.append('')
    if hits == 0:
        buf.append('(no co-occurrence)')
        buf.append('')

with io.open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(buf))

print('written %s (%d chars)' % (OUT, len('\n'.join(buf))))
