---
title: gh-reveal
subtitle: Slides with reveal.js & Jekyll for Github Pages.
theme: sky
initialization:
  slideNumber: c/t
  transition: concave
---

<script src="https://use.fontawesome.com/bc0b7d3ca9.js"></script>


## Yet Another, why ?

Inspired by 

- [<i class="fa fa-2 fa-github" aria-hidden="true"></i> dploeger/jekyll-revealjs](https://github.com/dploeger/jekyll-revealjs)
- [<i class="fa fa-2 fa-github" aria-hidden="true"></i> ungoldman/jekyll-reveal](https://github.com/ungoldman/jekyll-reveal)
- and other...

§fragment:1§; But

- §fragment:1§; not fully compatible with GitHub Pages
- §fragment:1§; only for one presentation
- §fragment:1§; not simple to use reveal.js power


§break

## What's new ?

- Write your presentation with **markdown**, **online on GitHub** or offline
- Use **simples keywords** to start new slide or configure your slides
- **Customize** Reveal.js with YAML Front Matter
- **One repository** to store all your presentations

§new



## Keywords

Start **new** slide with `PARAGRAPHnew`

§break

## Keywords

Start **new vertical** slide with `PARAGRAPHbreak`

§break

## Keywords

Write **notes** with `PARAGRAPHnotes`

Press the S key to try it out.

§notes
Hey you ! This is a note.

§break

## Keywords

Customize slide **id** with `PARAGRAPHid:SLIDE_IDPARAGRAPH;`

```
PARAGRAPHid:id_commandPARAGRAPH;
```
§id:id_command§;


§break

## Keywords

**Customize a slide** with `PARAGRAPHslide:ATTRIBUTES§;`

```
PARAGRAPHslide: data-background=#38F247 PARAGRAPH;
```
§slide: data-background=#38F247 §;

- [Backgrounds](https://github.com/hakimel/reveal.js#slide-backgrounds)
- [Transitions](https://github.com/hakimel/reveal.js#slide-transitions)

§break

## Keywords

**Customize an element** with `PARAGRAPHelement:ATTRIBUTES§;`

```
- regular element
- leaning element PRAGRAPHelement:style=-ms-transform:rotate(7deg);-webkit-transform:rotate(7deg);transform:rotate(7deg);PARAGRAPH;
- regular element
```

- regular element
- leaning element §element:style=-ms-transform:rotate(7deg);-webkit-transform:rotate(7deg);transform:rotate(7deg);§;
- regular element

§break

## Keywords

Create **fragments** with `PARAGRAPHfragment` or `PARAGRAPHfragment:NPARAGRAPH;` where N is the display order.

Combine with `PARAGRAPHelement:class=growPARAGRAPH;` to control the fragments style

```
- element 2 PARAGRAPHfragment:2PARAGRAPH; PARAGRAPHelement:class=growPARAGRAPH;
- element 1 PARAGRAPHfragment:1PARAGRAPH;
- element 3 PARAGRAPHfragment:3PARAGRAPH;
```

- element 2 §fragment:2§; §element:class=grow§;
- element 1 §fragment:1§;
- element 3 §fragment:3§;

§new


## Configuration

All options listed in the [README of reveal.js](https://github.com/hakimel/reveal.js#configuration) can be set in the YAML Front Matter, attribute *initialization*

```
---
title: gh-reveal
subtitle: Slides with Reveal.js & Jekyll for GitHub Pages.
theme: sky
initialization:
  slideNumber: c/t
  transition: concave
---
```

§break

## Theme

Choose your theme in the YAML Front Matter, attribute *theme*.

[Theming](https://github.com/hakimel/reveal.js#theming)

§new

## Keyboard shorcuts

- S : speaker view (with notes)
- B : break the presentation
- F : fullscreen
- ESC : slide overview
- Ctrl+P : print

§new

## And

All the features of [reveal.js](https://github.com/hakimel/reveal.js) (I hope...)

§new

## Share


> Check gh-reveal, multi-presentations with @revealjs & @jekyllrb for Github Pages
>
> https://github.com/tcoupin/gh-reveal
> via @thibbojunior

[Click to tweet <i class="fa fa-twitter" aria-hidden="true"></i>](https://twitter.com/intent/tweet?text=Check%20gh-reveal%2C%20multi-presentations%20with%20%40revealjs%20%26%20%40jekyllrb%20for%20Github%20Pages&url=https%3A%2F%2Fgithub.com%2Ftcoupin%2Fgh-reveal&via=thibbojunior)

---

<small>[<i class="fa fa-github" aria-hidden="true"></i> tcoupin/gh-reveal](https://github.com/tcoupin/gh-reveal) [<i class="fa fa-twitter" aria-hidden="true"></i> @thibbojunior](https://twitter.com/thibbojunior) [<i class="fa fa-external-link" aria-hidden="true"></i> tcoupin.github.io](https://tcoupin.github.io)</small>


<!-- Hack to display the github ribbon "Fork me" -->
<script type="text/javascript">
(function(){
	var mlink=document.createElement('a');
	mlink.setAttribute("href","https://github.com/tcoupin/gh-reveal");
	mlink.setAttribute("style","    position: absolute; top: 0; left: 0; z-index: 1000;");
	mlink.innerHTML='<img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png">';
	document.body.insertBefore(mlink, document.body.childNodes[0]);
})();
</script>
