# change to your repo branch to publish
publishingbranch="master"


# don't bother about what comes next.
git fetch origin
currentbranch=$(git symbolic-ref --short -q HEAD)

local="`git log --pretty=%H ...refs/heads/${currentbranch}^ | head -n 1`"
origin="`git ls-remote origin -h refs/heads/${publishingbranch} | cut -f1`"
dirtytree="$(git status --porcelain)"

echo "your `tput setaf 4;tput smso` local `tput rmso;tput setaf 7` is at: `tput setaf 4;tput smso` ${currentbranch} ${local} `tput rmso;tput setaf 7`"
echo "your `tput setaf 5;tput smso` origin `tput rmso;tput setaf 7` is at: `tput setaf 5;tput smso` ${publishingbranch} ${origin} `tput rmso;tput setaf 7`"

# checks if you're in the right branch
if [[ "${publishingbranch}" != "${currentbranch}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` \n check if you're in your publishing branch (which should be `tput setaf 5;tput smso` ${publishingbranch} `tput rmso;tput setaf 7`). \n you're currently in `tput setaf 4;tput smso` ${currentbranch} `tput rmso;tput setaf 7` .\n remember, you're about to publish a package version."
  exit 1
fi

# checks if your working tree is clean
if [[ "${dirtytree}" != "" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7`\n your tree is DIRTY, please don't publish uncommited work.\n remember, you're about to publish a package version."
  exit 1
fi

# checks if you're up-to-date with remote
if [[ "${origin}" != "${local}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7`\n check if you're up-to-date with remote. \n remember, you're about to publish a package version."
  exit 1
fi

# checks if we need to check for registry version conflicts
checknpm=0
if [[ $2 = '' ]]; then
  if [[ $1 = '' ]]; then
    read -p "`tput setaf 3;tput smso` would you like to check if your package version already exists on NPM? ('y' for yes)`tput rmso;tput setaf 7` " npm
    if [[ "${npm}" = "Y" || "${npm}" = "y" ]]; then
      checknpm=1
    fi
  else
    checknpm=1
  fi
fi

if [[ "${checknpm}" = 1 ]]; then
  packagename="$(node -p "require('./package.json').name")" 
  localpackageversion="$(node -p "require('./package.json').version")"
  remotepackageversion="$(npm info ${packagename} versions | grep -w "'${localpackageversion}'" | sed "s/'//g" | sed -e 's/^[ \t]*//' | sed "s/,//")"
  remotepackagelatest="$(npm show ${packagename} version)"

  if [[ "${packagename}" = '' || "${localpackageversion}" = '' || "${remotepackagelatest}" = '' ]]; then
    echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` we couldn't check your local package against remote. is your package published already? do you have access to it via npm?"
    exit 1
  fi

  echo "package name is `tput setaf 6;tput smso` ${packagename} `tput rmso;tput setaf 7`"
  echo "local version is `tput setaf 4;tput smso` ${localpackageversion} `tput rmso;tput setaf 7`"
  
  if [[ "${remotepackageversion}" != '' ]]; then
    echo "there is a remote version `tput setaf 5;tput smso` ${remotepackageversion} `tput rmso;tput setaf 7`"

    echo "`tput setaf 3;tput smso` WARNING `tput rmso;tput setaf 7` you're trying to publish a version that has already been published"

    read -p "`tput setaf 3;tput smso`ARE YOU SURE YOU WANT TO OVERWRITE THAT VERSION? ('y' for yes)`tput rmso;tput setaf 7`" x
    if [[ "${x}" = 'Y' || "${x}" = 'y' ]]; then
      echo "ok, we're going to `tput setaf 3;tput smso` replace `tput rmso;tput setaf 7` that version!"
    else
      echo "told'ya I'd be useful... mission aborted! :)"
      exit 1
    fi
  else
   echo "no version conflicts! :)"
  fi
fi
  

echo "`tput setaf 2;tput smso` √ GOOD `tput rmso;tput setaf 7`  to publish, trying to do it in 2 seconds..."
sleep 2s
exit 0
