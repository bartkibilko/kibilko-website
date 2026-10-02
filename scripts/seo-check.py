#!/usr/bin/env python3
"""Offline publication checks; uses only the Python standard library."""
import json
import re
import struct
import sys
from datetime import date
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
BASE = 'https://www.kibilko.pl/'
PERSON = BASE + '#person'
errors = []


def check(ok, where, message):
    if not ok:
        errors.append(f'{where}: {message}')


def public(path):
    dirs = path.relative_to(ROOT).parts[:-1]
    return not (dirs and dirs[0] in {'scripts', 'scratch', 'screenshots'}
                or any(part.startswith(('.', '_')) for part in dirs))


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.head = False
        self.capture = None
        self.titles, self.h1, self.ld, self.times, self.author = [], [], [], [], []
        self.meta, self.ids = {}, []
        self.canonical, self.refs = [], []
        self.lang = None
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'head':
            self.head = True
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.refs.append(attrs[key])
        if self.head and tag == 'meta':
            key = attrs.get('name') or attrs.get('property')
            self.meta.setdefault(key, []).append(attrs.get('content', ''))
        if self.head and tag == 'link' and 'canonical' in attrs.get('rel', '').split():
            self.canonical.append(attrs.get('href', ''))
        if tag == 'time':
            self.times.append(attrs.get('datetime'))
        if tag == 'title' and self.head:
            self.capture = ('title', self.titles)
            self.titles.append('')
        elif tag == 'h1':
            self.capture = ('h1', self.h1)
            self.h1.append('')
        elif tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.capture = ('script', self.ld)
            self.ld.append('')
        elif tag == 'a' and attrs.get('href') == '/#about':
            self.capture = ('a', self.author)
            self.author.append('')

    def handle_endtag(self, tag):
        if tag == 'head':
            self.head = False
        if self.capture and tag == self.capture[0]:
            self.capture = None

    def handle_data(self, text):
        if self.capture:
            self.capture[1][-1] += text

    def one(self, key):
        values = self.meta.get(key, [])
        check(len(values) == 1 and bool(values[0].strip()), self.path.relative_to(ROOT),
              f'expected one nonempty {key}')
        return values[0] if values else ''


def nodes(page):
    result = []
    for block in page.ld:
        try:
            value = json.loads(block)
            check(isinstance(value, dict), page.path.relative_to(ROOT), 'JSON-LD must be an object')
            if isinstance(value, dict):
                graph = value.get('@graph', [value])
                check(isinstance(graph, list) and all(isinstance(n, dict) for n in graph),
                      page.path.relative_to(ROOT), 'JSON-LD graph nodes must be objects')
                if isinstance(graph, list):
                    result.extend(n for n in graph if isinstance(n, dict))
        except (ValueError, TypeError) as exc:
            check(False, page.path.relative_to(ROOT), f'invalid JSON-LD: {exc}')
    return result


def local(url, current):
    parsed = urlsplit(urljoin(BASE + current.relative_to(ROOT).as_posix(), url))
    if parsed.scheme not in ('http', 'https') or parsed.netloc not in ('www.kibilko.pl', 'kibilko.pl'):
        return None, ''
    path = ROOT / unquote(parsed.path).lstrip('/')
    if parsed.path.endswith('/') or path.is_dir():
        path = path / 'index.html'
    return path, unquote(parsed.fragment)


def image_info(path):
    data = path.read_bytes()
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'image/png', *struct.unpack('>II', data[16:24])
    if data.startswith(b'\xff\xd8'):
        offset = 2
        while offset < len(data):
            if data[offset] != 255:
                raise ValueError('invalid JPEG marker')
            while data[offset] == 255:
                offset += 1
            marker = data[offset]
            offset += 1
            size = int.from_bytes(data[offset:offset + 2], 'big')
            if marker in {0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf}:
                height, width = struct.unpack('>HH', data[offset + 3:offset + 7])
                return 'image/jpeg', width, height
            offset += size
    raise ValueError('unsupported or invalid image (expected PNG or JPEG)')


pages = {p: Page(p) for p in sorted(ROOT.rglob('*.html')) if public(p)}
check(bool(pages), ROOT, 'no public pages found')
canonicals, titles, descriptions, posts = [], [], [], {}
placeholder = re.compile(r'\b(?:POST TITLE|ONE-SENTENCE SUMMARY|SLUG|YYYY-MM-DD|IMAGE-(?:FILENAME|MIME-TYPE|WIDTH|HEIGHT|ALT-TEXT)|D Month YYYY|N min read)\b|NOTES · #NO\b')
for path, page in pages.items():
    label = path.relative_to(ROOT)
    check(page.lang == 'en', label, 'lang must be en')
    check(len(page.titles) == 1 and bool(page.titles[0].strip()), label, 'expected one nonempty head title')
    title = page.titles[0].strip() if page.titles else ''
    titles.append(title)
    description = page.one('description')
    descriptions.append(description)
    check(len(page.h1) == 1 and bool(page.h1[0].strip()), label, 'expected one nonempty H1')
    check(len(page.canonical) == 1 and bool(page.canonical[0]), label, 'expected one canonical')
    canonical = page.canonical[0] if page.canonical else ''
    canonicals.append(canonical)
    expected = BASE + (label.parent.as_posix().strip('.') + '/' if label.name == 'index.html' and label.parent != Path('.') else '' )
    if label.name != 'index.html':
        expected = BASE + label.as_posix()
    check(canonical == expected, label, 'canonical must match page HTTPS/www URL')
    check(not any('noindex' in v.lower() for v in page.meta.get('robots', [])), label, 'public page has noindex')
    check(not placeholder.search(path.read_text(encoding='utf-8')), label, 'unfilled publication placeholder')
    expected_type = 'article' if label.parts[0] == 'blog' and label != Path('blog/index.html') else 'website'
    check(page.meta.get('og:type') == [expected_type], label, 'Open Graph type differs from page kind')
    for key in ('og:type', 'og:site_name', 'og:locale', 'og:title', 'og:description', 'og:url',
                'og:image', 'og:image:width', 'og:image:height', 'og:image:alt',
                'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'):
        page.one(key)
    check(page.meta.get('og:url') == [canonical], label, 'og:url differs from canonical')
    check(page.meta.get('og:description') == [description] == page.meta.get('twitter:description'), label, 'card descriptions differ')
    check(page.meta.get('og:title') == page.meta.get('twitter:title'), label, 'card titles differ')
    image = page.meta.get('og:image', [''])[0]
    check(image.startswith(BASE), label, 'social image must use absolute HTTPS/www URL')
    check(page.meta.get('twitter:image') == [image], label, 'card images differ')
    check(page.meta.get('twitter:image:alt') == page.meta.get('og:image:alt'), label, 'image alt texts differ')
    image_path, _ = local(image, path)
    if image_path and image_path.is_file():
        try:
            mime, width, height = image_info(image_path)
            check(page.meta.get('og:image:width') == [str(width)] and page.meta.get('og:image:height') == [str(height)], label, 'image dimensions differ from file')
            if 'og:image:type' in page.meta:
                check(page.meta['og:image:type'] == [mime], label, 'image MIME type differs from file')
        except (ValueError, IndexError, struct.error) as exc:
            check(False, label, f'image invalid: {exc}')
    else:
        check(False, label, 'social image file missing')
    check(len(page.ids) == len(set(page.ids)), label, 'duplicate HTML id')
    for ref in page.refs:
        target, fragment = local(ref, path)
        if target is None:
            continue
        check(target.is_file(), label, f'missing local reference: {ref}')
        if target.is_file():
            check(public(target), label, f'reference to unpublished path: {ref}')
            if fragment and target.suffix == '.html':
                destination = pages.get(target) or Page(target)
                check(fragment in destination.ids, label, f'missing static fragment: {ref}')
    data = nodes(page)
    if label == Path('index.html'):
        people = [n for n in data if n.get('@type') == 'Person']
        sites = [n for n in data if n.get('@type') == 'WebSite']
        check(len(people) == len(sites) == 1, label, 'expected one Person and one WebSite')
        if people and sites:
            person, site = people[0], sites[0]
            check(person.get('@id') == PERSON and person.get('url') == BASE and person.get('name') == 'Bartosz Kibiłko', label, 'Person identity differs')
            check(all(site.get(k) == v for k, v in {'@id':BASE+'#website', 'url':BASE, 'name':person.get('name'), 'inLanguage':'en', 'publisher':{'@id':PERSON}}.items()), label, 'WebSite fields differ')
            check('potentialAction' not in site, label, 'site has no search action')
    if page.meta.get('og:type') == ['article']:
        articles = [n for n in data if n.get('@type') == 'BlogPosting']
        check(len(articles) == 1, label, 'expected one BlogPosting')
        if articles:
            article = articles[0]
            fields = {'@id':canonical+'#post', 'url':canonical, 'mainEntityOfPage':canonical,
                      'headline':page.h1[0].strip() if page.h1 else '', 'description':description,
                      'inLanguage':'en', 'image':image}
            check(all(article.get(k) == v for k, v in fields.items()), label, 'BlogPosting fields differ from page')
            check(article.get('author') == {'@type':'Person', '@id':PERSON, 'name':'Bartosz Kibiłko', 'url':BASE}, label, 'article author differs')
            published = article.get('datePublished', '')
            try:
                date.fromisoformat(published)
            except (ValueError, TypeError):
                check(False, label, 'invalid publication date')
            check(page.times == [published] and page.meta.get('article:published_time') == [published], label, 'publication dates differ')
            check('Bartosz Kibiłko' in page.author, label, 'author profile link missing')
            posts[canonical] = article

for name, values in [('title', titles), ('description', descriptions), ('canonical', canonicals)]:
    check(len(values) == len(set(values)), 'site', f'duplicate {name}')
# Templates are excluded from public-page checks but their JSON-LD must still parse.
for path in ROOT.glob('_templates/**/*.html'):
    template = Page(path)
    nodes(template)
    check(template.meta.get('robots') == ['noindex'], path.relative_to(ROOT), 'template must keep noindex')
try:
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    urls = [n.text for n in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    check(len(urls) == len(set(urls)) and set(urls) == set(canonicals), 'sitemap.xml', 'URLs must equal public canonical URLs without duplicates')
    feed = ET.parse(ROOT / 'feed.xml')
    links, guids = [], []
    for item in feed.findall('./channel/item'):
        link, guid = item.findtext('link'), item.findtext('guid')
        links.append(link); guids.append(guid)
        check(link == guid and link in posts, 'feed.xml', 'item link/guid must match a published post')
        if link in posts:
            post = posts[link]
            check(item.findtext('title') == post.get('headline') and item.findtext('description') == post.get('description'), 'feed.xml', 'item metadata differs from post')
            check(parsedate_to_datetime(item.findtext('pubDate')).date().isoformat() == post.get('datePublished'), 'feed.xml', 'item publication date differs')
    check(len(links) == len(set(links)) and len(guids) == len(set(guids)) and set(links) == set(posts), 'feed.xml', 'feed must contain every published post once')
except (ET.ParseError, OSError, ValueError, TypeError) as exc:
    check(False, 'XML', str(exc))
try:
    robots = RobotFileParser()
    robots.parse((ROOT / 'robots.txt').read_text(encoding='utf-8').splitlines())
    check(robots.site_maps() == [BASE+'sitemap.xml'] and (ROOT/'sitemap.xml').is_file(), 'robots.txt', 'expected existing sitemap URL')
    for url in canonicals:
        for agent in ('*', 'Googlebot', 'Bingbot'):
            check(robots.can_fetch(agent, url), 'robots.txt', f'public page blocked for {agent}: {url}')
except OSError as exc:
    check(False, 'robots.txt', str(exc))

if errors:
    print('\n'.join('FAIL ' + error for error in errors))
    print(f'FAILED: {len(errors)} error(s)')
    sys.exit(1)
print(f'PASS: {len(pages)} public pages; metadata, JSON-LD, local links/images, sitemap, RSS and robots.')
print('Static HTML fragments checked. Links/fragment IDs generated by JavaScript require a separate browser check.')
