# Working repository for the E-Cell website

Built with Jekyll and Bootstrap 4

## Contribution guideline

### For those with master access
Create a branch for any change and merge accordingly.

Keep your local master branches up to date

### For those without master access

Fork, branch out for any change, and submit PRs.

Keep your local master branches up to date

## Keeping gh-pages up to date with master

[This should work](https://gist.github.com/mandiwise/44d1edce18f2ffb14f63)

```
// Reference: http://lea.verou.me/2011/10/easily-keep-gh-pages-in-sync-with-master/

$ git add .
$ git status // to see what changes are going to be commited
$ git commit -m 'Some descriptive commit message'
$ git push origin master

$ git checkout gh-pages // go to the gh-pages branch
$ git rebase master // bring gh-pages up to date with master
$ git push origin gh-pages // commit the changes
$ git checkout master // return to the master branch
```

Main changes are incorporated from branches into master, then into gh-pages. Ideally.

NOTE: From my limited experience, this doesn't entirely work. You'll need to run

```
git fetch origin
git rebase origin/gh-pages
git push origin gh-pages
```

just after `git rebase master`. Keep using git log to check that the commit history is clean.

To be noted. You'll probably run into merge conflicts. And they'll be painful. Very painful.

Most of these issues arise with the `gh-pages` branch, with the baseurl in `_config.yml`
Please suggest a simpler fix 
