# NPM PREPUBLISH VERIFY GIT SHELL SCRIPT

Sometimes we're moving too fast and end up having to publish several package versions consecutively. This adds risks as you might not be with the right branch checked out, or might be outdated with remote. Imagine even, having a dirty working tree, and publishing that. You may end up publishing a version that has dummy code and well, you don't want to do that.

This script is merely to verify that:
1. You're in the right branch.
2. Your branch is up-to-date.
3. Your working tree is not dirty.
4. (optional) Will check if there isn't a version of your package already available in your npm registry.

If so, it exits 0 and continues with publishing your package version.

![Example screenshot](https://github.com/angeloreale/npm-prepublish-verify-git/blob/master/screenshot.png?raw=true)
## Steps

1. Copy this script to the directory of your convenience.
2. Make it executable with `chmod +x ./check-git.sh`
3. Add it to your package.json prepublishOnly script, as in:
```
"prepublishOnly": "./check-git.sh main && npm run build & ..."
````

## Options

You can pass up to 3 arguments to the script:

1. first argument specifies the branch you should be using to publish. (ie. `./check-git.sh main`)
2. second argument will force check for npm version conflicts. (ie. `./check-git.sh main npm`)
3. third argument will force skip checking for npm version conflicts. (ie. `./check-git.sh main skip npm`)
4. running the script without the first argument will default publishing branch as `main`.
5. running the script without the second argument will prompt you if you want to check for npm version conflicts.

![Example 2 screenshot](https://github.com/angeloreale/npm-prepublish-verify-git/blob/master/screenshot-2.png?raw=true)

When you run `npm publish` next time, if any of the criteria doesn't meet the rules, this script will exit 1 and the publishing of your package will be interrupted.

I hope this helps.

Happy coding!

![CC-BY](https://licensebuttons.net/l/by/4.0/80x15.png)
2021 Angelo Reale

