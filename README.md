# tcoupin.github.io

Mon site web.

Basé sur le thème de [@mdo](https://twitter.com/mdo) https://github.com/poole/hyde

## Déploiement local 

```
docker run --rm -it --name=jekyll -v $(pwd):/srv/jekyll -p 4000:4000 jekyll/jekyll:pages jekyll serve --watch --drafts
```

