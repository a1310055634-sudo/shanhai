# -*- coding: utf-8 -*-
"""G80 纵深取材:从广注卷01存档逐字提取 蠱雕/䍺/丹穴 三处注文,供 claim 引文照录。
输出到 dev/round80-extract.txt(UTF-8),人工 Read 复核后再写入词条。
"""
import io
import re
import sys

ARCHIVE = 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt'
OUT = 'dev/round80-extract.txt'

with io.open(ARCHIVE, encoding='utf-8') as f:
    text = f.read()

# 定位三个目标注文块
targets = {
    'gudiao': '名曰蠱雕',
    'xun': '又東四百里曰洵山',
    'danxue': '丹穴',
}

out = []
for key, needle in targets.items():
    idx = text.find(needle)
    out.append('=' * 70)
    out.append('KEY=%sneedle=%s  char_index=%d' % (key, needle, idx))
    out.append('=' * 70)
    if idx < 0:
        out.append('!! NOT FOUND')
        continue
    # 取往后 1400 字,够覆盖注文块
    out.append(text[idx:idx + 1400])
    out.append('')

# 另:凡含「圖贊曰」的片段(䍺/蠱雕 图赞原句)
out.append('=' * 70)
out.append('ALL 圖贊曰 occurrences in juan01')
out.append('=' * 70)
for m in re.finditer('圖贊曰', text):
    s = max(0, m.start() - 30)
    out.append('[%d] ...%s...' % (m.start(), text[s:m.start() + 90]))
    out.append('')

with io.open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('written %s (%d chars)' % (OUT, len('\n'.join(out))))
