#!/usr/bin/env python3
"""Validate the portable MAGNUM instruction kit without invoking any external agent."""
from pathlib import Path
from collections import Counter
import json, re, sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
def check(ok,msg):
    if not ok: errors.append(msg)
for fn in ('AGENTS.md','AGENT.md','SKILL.md','DESIGN.md','FINAL_ANTIGRAVITY_PROMPT.md','README_START_HERE.md','references/PROJECT_BRIEF.md'):
    check((ROOT/fn).is_file(),f'Missing {fn}')
seed=json.loads((ROOT/'data/assignments.seed.json').read_text())['assignments']
check(len(seed)==14,'assignment count must be 14')
check([x['id'] for x in seed]==[f'EW-{n:02d}' for n in range(1,15)],'ID sequence invalid')
check(sum(bool(x['portalBadgeObserved']) for x in seed)==13,'portal badge observation count must be 13')
check(seed[0]['portalBadgeObserved'] is False,'EW-01 portal badge must be unconfirmed')
check(all(x['actualSubmissionStatus']=='unverified' and x['workStatus']=='not_reviewed' and x['qualityStatus']=='not_assessed' for x in seed),'initial state not truthful')
check(all(x['dueDate'] is None and x['grade'] is None and x['published'] is False and x['files']==[] for x in seed),'unexpected seeded private/grade data')
check(Counter(x['category'] for x in seed)==Counter({'Data Analytics & Tracking':4,'Technical & Recovery Processes':3,'Research, Policy & Sustainability':4,'Innovation & Awareness':2,'Assessment / Administrative':1}),'category distribution invalid')
for d in (ROOT/'.agents/agents').iterdir():
    if d.is_dir() and (d/'agent.md').is_file():
        s=(d/'agent.md').read_text()
        check(s.startswith('---\nname: ') and '\ndescription: ' in s[:500], f'bad agent frontmatter {d.name}')
for d in (ROOT/'.agents/skills').iterdir():
    if d.is_dir() and (d/'SKILL.md').is_file():
        s=(d/'SKILL.md').read_text()
        check(s.startswith('---\nname: ') and '\ndescription: ' in s[:500], f'bad skill frontmatter {d.name}')
check(len(list((ROOT/'.agents/agents').glob('*/agent.md')))==20,'expected 20 discoverable agents')
check(len(list((ROOT/'.agents/skills').glob('*/SKILL.md')))==6,'expected six discoverable skills')
if errors:
    print('FAIL\n'+'\n'.join('- '+e for e in errors));sys.exit(1)
print('PASS: 14 assignments, 13 observed badges, 20 agent definitions, 6 skill definitions, core instruction files present.')
print('NOTE: This validates files only. It does NOT show that agents spawned, MCPs connected, or the app was built.')
